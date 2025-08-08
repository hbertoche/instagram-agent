import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContentOption, ContentType } from '../dto/generate.dto';
import { SelectedOption } from '../dto/select.dto';
import { IContentQueryService } from '../interfaces/content-service.interfaces';

@Injectable()
export class ContentQueryService implements IContentQueryService {
  constructor(private prisma: PrismaService) {}

  async getHistory(userId: string, userRole?: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    const filter = userRole === 'ADMIN' ? {} : { userId };

    const contents = await this.prisma.content.findMany({
      where: filter,
      include: {
        user: {
          select: {
            username: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return contents.map(content => ({
      id: content.id,
      prompt: content.prompt,
      type: content.type as ContentType,
      optionA: content.optionA as unknown as ContentOption,
      optionB: content.optionB as unknown as ContentOption,
      selectedOption: content.selectedOption as SelectedOption | null,
      createdAt: content.createdAt,
      user: userRole === 'ADMIN' ? content.user : undefined,
    }));
  }
}
