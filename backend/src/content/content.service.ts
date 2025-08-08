import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../openai/openai.service';
import { GenerateContentDto, GenerateContentResponseDto } from './dto/generate.dto';
import { SelectOptionDto, SelectedOption } from './dto/select.dto';

@Injectable()
export class ContentService {
  constructor(
    private prisma: PrismaService,
    private openAiService: OpenAiService,
  ) {}

  async generateContent(dto: GenerateContentDto, userId: string): Promise<GenerateContentResponseDto> {
    if (!userId) {
      throw new Error('User authentication required');
    }

    // Generate AI content
    const { optionA, optionB } = await this.openAiService.generateContent(dto.prompt, dto.type);

    // Save to database
    const content = await this.prisma.content.create({
      data: {
        prompt: dto.prompt,
        type: dto.type,
        optionA,
        optionB,
        userId: userId,
      },
    });

    return {
      id: content.id,
      prompt: content.prompt,
      type: content.type as any,
      optionA: content.optionA as any,
      optionB: content.optionB as any,
      createdAt: content.createdAt,
    };
  }

  async selectOption(dto: SelectOptionDto, userId: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    // First verify the content belongs to the user
    const existingContent = await this.prisma.content.findFirst({
      where: { 
        id: dto.contentId,
        userId: userId,
      },
    });

    if (!existingContent) {
      throw new Error('Content not found or not authorized');
    }

    const content = await this.prisma.content.update({
      where: { id: dto.contentId },
      data: { selectedOption: dto.selectedOption },
    });

    return content;
  }

  async getHistory(userId: string, userRole?: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    // If user is admin, show all content, otherwise show only their own
    const whereCondition = userRole === 'ADMIN' ? {} : { userId: userId };

    const contents = await this.prisma.content.findMany({
      where: whereCondition,
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
      type: content.type,
      optionA: content.optionA,
      optionB: content.optionB,
      selectedOption: content.selectedOption,
      createdAt: content.createdAt,
      user: userRole === 'ADMIN' ? content.user : undefined, // Only show user info for admin
    }));
  }

  async getAnalytics(userId: string, userRole?: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    // If user is admin, show analytics for all content, otherwise show only their own
    const baseWhereCondition = userRole === 'ADMIN' ? {} : { userId: userId };

    const whereCondition = {
      ...baseWhereCondition,
      selectedOption: { not: null },
    };

    const totalSelections = await this.prisma.content.count({
      where: whereCondition,
    });

    const optionASelections = await this.prisma.content.count({
      where: { 
        ...baseWhereCondition,
        selectedOption: SelectedOption.A 
      },
    });

    const optionBSelections = await this.prisma.content.count({
      where: { 
        ...baseWhereCondition,
        selectedOption: SelectedOption.B 
      },
    });

    return {
      totalSelections,
      optionASelections,
      optionBSelections,
      optionAPercentage: totalSelections > 0 ? (optionASelections / totalSelections) * 100 : 0,
      optionBPercentage: totalSelections > 0 ? (optionBSelections / totalSelections) * 100 : 0,
    };
  }
}
