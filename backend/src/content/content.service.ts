import { Injectable } from '@nestjs/common';
import { ContentGenerationService } from './services/content-generation.service';
import { ContentSelectionService } from './services/content-selection.service';
import { ContentQueryService } from './services/content-query.service';
import { ContentAnalyticsService } from './services/content-analytics.service';
import { GenerateContentDto, GenerateContentResponseDto } from './dto/generate.dto';
import { SelectOptionDto } from './dto/select.dto';

@Injectable()
export class ContentService {
  constructor(
    private contentGeneration: ContentGenerationService,
    private contentSelection: ContentSelectionService,
    private contentQuery: ContentQueryService,
    private contentAnalytics: ContentAnalyticsService,
  ) {}

  async generateContent(request: GenerateContentDto, userId: string): Promise<GenerateContentResponseDto> {
    return this.contentGeneration.generateContent(request, userId);
  }

  async selectOption(request: SelectOptionDto, userId: string) {
    return this.contentSelection.selectOption(request, userId);
  }

  async getHistory(userId: string, userRole?: string) {
    return this.contentQuery.getHistory(userId, userRole);
  }

  async getAnalytics(userId: string, userRole?: string) {
    return this.contentAnalytics.getAnalytics(userId, userRole);
  }
}
