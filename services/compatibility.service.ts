import { Compatibility } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchCompatibility = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "compatibility"] | order(orderRank) {
      name,
      image,
      slug,
    }
  `;

  return await fetchSanityData<Compatibility[]>(query, {}, context);
};
