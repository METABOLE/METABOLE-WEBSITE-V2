import { Image } from 'sanity';
import { BilingualString } from './language.type';

export type Testimonial = {
  _id: string;
  photo: Image;
  name: string;
  role: BilingualString;
  company: string;
  testimony: BilingualString;
};
