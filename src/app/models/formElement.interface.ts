// export type formElementType = 'single-text' | 'multi-text' | 'single-choice' | 'multi-choice';

export enum FormElementType {
  SINGLE_TEXT,
  MULTI_TEXT,
  SINGLE_CHOICE,
  MULTI_CHOICE,
}

export interface FormElementData {
  id: number;
  type: FormElementType;
  question?: string;
  options?: string[];
  required?: boolean;
  label: string;
  icon?: string;
}

export interface DrugItem {
  label: string;
  icon: string;
  type: FormElementType;
}
