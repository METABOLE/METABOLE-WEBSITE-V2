import { PortableTextBlock } from 'sanity';

export type LanguageContextType = {
  isFrench: boolean;
  setIsFrench: (isFrench: boolean) => void;
};

export type Language = {
  en: string;
  fr: string;
};

export type BilingualPortableText = {
  fr: PortableTextBlock[];
  en: PortableTextBlock[];
};
