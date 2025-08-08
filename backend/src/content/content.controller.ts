import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { GenerateContentDto } from './dto/generate.dto';
import { SelectOptionDto } from './dto/select.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

interface AuthenticatedUser {
  id: string;
  role: string;
}

@Controller()
@UseGuards(JwtAuthGuard)
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post('generate')
  async generateContent(@Body() request: GenerateContentDto, @User() user: AuthenticatedUser) {
    return this.contentService.generateContent(request, user.id);
  }

  @Post('select')
  async selectOption(@Body() request: SelectOptionDto, @User() user: AuthenticatedUser) {
    return this.contentService.selectOption(request, user.id);
  }

  @Get('history')
  async getHistory(@User() user: AuthenticatedUser) {
    return this.contentService.getHistory(user.id, user.role);
  }

  @Get('analytics')
  async getAnalytics(@User() user: AuthenticatedUser) {
    return this.contentService.getAnalytics(user.id, user.role);
  }
}
