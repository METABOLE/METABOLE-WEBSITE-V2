import { Image, Slug } from 'sanity';
import { Language } from './language.type';

export type Expertise = {
  name: Language;
  slug: Slug;
  image: Image;
};
