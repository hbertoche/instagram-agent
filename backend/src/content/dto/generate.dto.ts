import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export enum ContentType {
  POST = 'POST',
  STORY = 'STORY',
}

export class GenerateContentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Prompt must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Prompt cannot exceed 1000 characters' })
  prompt: string;

  @IsEnum(ContentType, { message: 'Type must be either POST or STORY' })
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

export class ContentHistoryResponseDto extends GenerateContentResponseDto {
  selectedOption?: string | null;
  user?: {
    username: string;
    email: string;
    role: string;
  };
}
