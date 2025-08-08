import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SelectedOption } from '../dto/select.dto';
import { IContentAnalyticsService } from '../interfaces/content-service.interfaces';

@Injectable()
export class ContentAnalyticsService implements IContentAnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getAnalytics(userId: string, userRole?: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    const baseFilter = userRole === 'ADMIN' ? {} : { userId };
    
    const [total, optionA, optionB] = await Promise.all([
      this.prisma.content.count({
        where: { ...baseFilter, selectedOption: { not: null } },
      }),
      this.prisma.content.count({
        where: { ...baseFilter, selectedOption: SelectedOption.A },
      }),
      this.prisma.content.count({
        where: { ...baseFilter, selectedOption: SelectedOption.B },
      }),
    ]);

    const calculate = (value: number) => total > 0 ? (value / total) * 100 : 0;

    return {
      totalSelections: total,
      optionASelections: optionA,
      optionBSelections: optionB,
      optionAPercentage: calculate(optionA),
      optionBPercentage: calculate(optionB),
    };
  }
}
