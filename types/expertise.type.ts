import { Image, Slug } from 'sanity';
import { BilingualString } from './language.type';

export type Expertise = {
  name: BilingualString;
  slug: Slug;
  image: Image;
};
