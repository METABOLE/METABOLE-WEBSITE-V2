import { Image } from 'sanity';
import { Language } from './language.type';

export type Testimonial = {
  _id: string;
  photo: Image;
  name: string;
  role: Language;
  company: string;
  testimony: Language;
};
