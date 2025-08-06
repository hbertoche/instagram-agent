import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { GenerateContentDto } from '../dto/generate.dto';
import { SelectOptionDto } from '../dto/select.dto';

@Controller('api')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('generate')
  async generateContent(@Body() dto: GenerateContentDto) {
    return await this.contentService.generateContent(dto);
  }

  @Post('select')
  async selectOption(@Body() dto: SelectOptionDto) {
    return await this.contentService.selectOption(dto);
  }

  @Get('history')
  async getHistory() {
    return await this.contentService.getHistory();
  }

  @Get('analytics')
  async getAnalytics() {
    return await this.contentService.getAnalytics();
  }
}
