import { Testimonial } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchTestimonials = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "testimonial"] | order(orderRank) {
      orderRank,
      _id,
      photo,
      name,
      role {
        fr,
        en,
      },
      company,
      testimony {
        fr,
        en,
      },
    }
  `;

  return await fetchSanityData<Testimonial[]>(query, {}, context);
};
