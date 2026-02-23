import { ReactNode } from 'react';
import { BilingualString } from './language.type';

export type QuestionType = {
  id: number;
  question: BilingualString;
  answer: {
    en: ReactNode;
    fr: ReactNode;
  };
  link?: {
    url: string;
    text: BilingualString;
  };
};
