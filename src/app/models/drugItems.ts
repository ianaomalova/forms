import { PrimeIcons } from 'primeng/api';
import {FormElementType} from './formElement.interface';

export const DRUG_ITEMS = [
  {
    id: 1,
    label: 'Однострочный ответ',
    icon: PrimeIcons.PEN_TO_SQUARE,
    type: FormElementType.SINGLE_TEXT,
  },
  {
    id: 2,
    label: 'Многострочный ответ',
    icon: PrimeIcons.ALIGN_LEFT,
    type: FormElementType.SINGLE_TEXT,
  },
  {
    id: 3,
    label: 'Список одиночного выбора',
    icon: PrimeIcons.CHEVRON_CIRCLE_DOWN,
    type: FormElementType.SINGLE_TEXT,
  },
  {
    id: 4,
    label: 'Список множественного выбора',
    icon: PrimeIcons.PLUS,
    type: FormElementType.SINGLE_TEXT,
  },
];
