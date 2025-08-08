import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentGenerationService } from './services/content-generation.service';
import { ContentSelectionService } from './services/content-selection.service';
import { ContentQueryService } from './services/content-query.service';
import { ContentAnalyticsService } from './services/content-analytics.service';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../openai/openai.service';

@Module({
  controllers: [ContentController],
  providers: [
    ContentService,
    ContentGenerationService,
    ContentSelectionService,
    ContentQueryService,
    ContentAnalyticsService,
    PrismaService,
    OpenAiService,
  ],
})
export class ContentModule {}
