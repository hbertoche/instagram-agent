import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { GenerateContentDto } from './dto/generate.dto';
import { SelectOptionDto } from './dto/select.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateContent(
    @Body() dto: GenerateContentDto,
    @User() user: any,
  ) {
    if (!user?.id) {
      throw new Error('User authentication required');
    }
    return await this.contentService.generateContent(dto, user.id);
  }

  @Post('select')
  @UseGuards(JwtAuthGuard)
  async selectOption(
    @Body() dto: SelectOptionDto,
    @User() user: any,
  ) {
    if (!user?.id) {
      throw new Error('User authentication required');
    }
    return await this.contentService.selectOption(dto, user.id);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getHistory(@User() user: any) {
    if (!user?.id) {
      throw new Error('User authentication required');
    }
    return await this.contentService.getHistory(user.id, user.role);
  }

  @Get('analytics')
  @UseGuards(JwtAuthGuard)
  async getAnalytics(@User() user: any) {
    if (!user?.id) {
      throw new Error('User authentication required');
    }
    return await this.contentService.getAnalytics(user.id, user.role);
  }
}
