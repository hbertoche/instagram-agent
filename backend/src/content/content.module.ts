import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAiService } from '../openai/openai.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaService, OpenAiService],
})
export class ContentModule {}
