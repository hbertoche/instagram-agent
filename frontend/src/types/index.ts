export enum ContentType {
  POST = 'POST',
  STORY = 'STORY',
}

export enum SelectedOption {
  A = 'A',
  B = 'B',
}

export interface ContentOption {
  caption: string;
  hashtags: string[];
}

export interface Content {
  id: string;
  prompt: string;
  type: ContentType;
  optionA: ContentOption;
  optionB: ContentOption;
  selectedOption?: SelectedOption | null;
  createdAt: string;
  user?: {
    username: string;
    email: string;
    role: string;
  };
}

export interface GenerateContentRequest {
  prompt: string;
  type: ContentType;
}

export interface SelectOptionRequest {
  contentId: string;
  selectedOption: SelectedOption;
}

export interface Analytics {
  totalSelections: number;
  optionASelections: number;
  optionBSelections: number;
  optionAPercentage: number;
  optionBPercentage: number;
}
