import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SelectOptionDto } from '../dto/select.dto';
import { ContentType, ContentOption } from '../dto/generate.dto';
import { IContentSelectionService } from '../interfaces/content-service.interfaces';

@Injectable()
export class ContentSelectionService implements IContentSelectionService {
  constructor(private prisma: PrismaService) {}

  async selectOption(request: SelectOptionDto, userId: string) {
    if (!userId) {
      throw new Error('User authentication required');
    }

    const content = await this.prisma.content.findFirst({
      where: { 
        id: request.contentId,
        userId,
      },
    });

    if (!content) {
      throw new Error('Content not found or not authorized');
    }

    const updatedContent = await this.prisma.content.update({
      where: { id: request.contentId },
      data: { selectedOption: request.selectedOption },
    });

    return {
      id: updatedContent.id,
      prompt: updatedContent.prompt,
      type: updatedContent.type as ContentType,
      optionA: updatedContent.optionA as unknown as ContentOption,
      optionB: updatedContent.optionB as unknown as ContentOption,
      createdAt: updatedContent.createdAt,
    };
  }
}
