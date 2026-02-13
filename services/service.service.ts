import { Service } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchServices = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "service"] | order(orderRank) {
      title {
        fr,
        en,
      },
      description {
        fr,
        en,
      },
      servicesList[] {
        fr,
        en,
      },
    }
  `;

  return await fetchSanityData<Service[]>(query, {}, context);
};
