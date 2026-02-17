import { Image, Slug } from 'sanity';
import { BilingualString } from './language.type';

export type Team = {
  name: string;
  role: BilingualString;
  label?: string;
  slug: Slug;
  photo: Image;
};
