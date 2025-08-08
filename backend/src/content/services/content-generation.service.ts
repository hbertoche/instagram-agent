import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiService } from '../../openai/openai.service';
import { GenerateContentDto, GenerateContentResponseDto, ContentType, ContentOption } from '../dto/generate.dto';
import { IContentGenerationService } from '../interfaces/content-service.interfaces';

@Injectable()
export class ContentGenerationService implements IContentGenerationService {
  constructor(
    private prisma: PrismaService,
    private openAiService: OpenAiService,
  ) {}

  async generateContent(request: GenerateContentDto, userId: string): Promise<GenerateContentResponseDto> {
    if (!userId) {
      throw new Error('User authentication required');
    }

    const { optionA, optionB } = await this.openAiService.generateContent(request.prompt, request.type);

    const content = await this.prisma.content.create({
      data: {
        prompt: request.prompt,
        type: request.type,
        optionA,
        optionB,
        userId,
      },
    });

    return {
      id: content.id,
      prompt: content.prompt,
      type: content.type as ContentType,
      optionA: content.optionA as unknown as ContentOption,
      optionB: content.optionB as unknown as ContentOption,
      createdAt: content.createdAt,
    };
  }
}
