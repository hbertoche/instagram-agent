import { GenerateContentDto, GenerateContentResponseDto, ContentHistoryResponseDto } from '../dto/generate.dto';
import { SelectOptionDto } from '../dto/select.dto';

export interface IContentGenerationService {
  generateContent(request: GenerateContentDto, userId: string): Promise<GenerateContentResponseDto>;
}

export interface IContentSelectionService {
  selectOption(request: SelectOptionDto, userId: string): Promise<GenerateContentResponseDto>;
}

export interface IContentQueryService {
  getHistory(userId: string, userRole?: string): Promise<ContentHistoryResponseDto[]>;
}

export interface IContentAnalyticsService {
  getAnalytics(userId: string, userRole?: string): Promise<{
    totalSelections: number;
    optionASelections: number;
    optionBSelections: number;
    optionAPercentage: number;
    optionBPercentage: number;
  }>;
}
