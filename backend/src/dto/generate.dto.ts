import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ContentType {
  POST = 'POST',
  STORY = 'STORY',
}

export class GenerateContentDto {
  @IsNotEmpty()
  @IsString()
  prompt: string;

  @IsEnum(ContentType)
  type: ContentType;
}

export class ContentOption {
  caption: string;
  hashtags: string[];
}

export class GenerateContentResponseDto {
  id: string;
  prompt: string;
  type: ContentType;
  optionA: ContentOption;
  optionB: ContentOption;
  createdAt: Date;
}
