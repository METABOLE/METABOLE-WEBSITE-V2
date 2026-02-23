import { Image } from 'sanity';
import { BilingualString } from './language.type';

export type Testimonial = {
  photo: Image;
  name: string;
  role: BilingualString;
  company: string;
  testimony: BilingualString;
};
