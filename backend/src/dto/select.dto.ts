import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum SelectedOption {
  A = 'A',
  B = 'B',
}

export class SelectOptionDto {
  @IsNotEmpty()
  @IsString()
  contentId: string;

  @IsEnum(SelectedOption)
  selectedOption: SelectedOption;
}
