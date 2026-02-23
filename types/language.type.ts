import { PortableTextBlock } from 'sanity';

export type LanguageContextType = {
  isFrench: boolean;
  setIsFrench: (isFrench: boolean) => void;
};

export type BilingualString = {
  fr: string;
  en: string;
};

export type BilingualPortableText = {
  fr: PortableTextBlock[];
  en: PortableTextBlock[];
};
