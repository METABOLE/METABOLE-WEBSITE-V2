import type { BilingualString } from './language.type';

export type Service = {
  title: BilingualString;
  description?: BilingualString | null;
  servicesList: BilingualString[];
};
