import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../openai/openai.service';
import { GenerateContentDto, GenerateContentResponseDto } from '../dto/generate.dto';
import { SelectOptionDto, SelectedOption } from '../dto/select.dto';

@Injectable()
export class ContentService {
  constructor(
    private prisma: PrismaService,
    private openAiService: OpenAiService,
  ) {}

  async generateContent(dto: GenerateContentDto): Promise<GenerateContentResponseDto> {
    // Generate AI content
    const { optionA, optionB } = await this.openAiService.generateContent(dto.prompt, dto.type);

    // Save to database
    const content = await this.prisma.content.create({
      data: {
        prompt: dto.prompt,
        type: dto.type,
        optionA,
        optionB,
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

  async selectOption(dto: SelectOptionDto) {
    const content = await this.prisma.content.update({
      where: { id: dto.contentId },
      data: { selectedOption: dto.selectedOption },
    });

    return content;
  }

  async getHistory() {
    const contents = await this.prisma.content.findMany({
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
    }));
  }

  async getAnalytics() {
    const totalSelections = await this.prisma.content.count({
      where: { selectedOption: { not: null } },
    });

    const optionASelections = await this.prisma.content.count({
      where: { selectedOption: SelectedOption.A },
    });

    const optionBSelections = await this.prisma.content.count({
      where: { selectedOption: SelectedOption.B },
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
