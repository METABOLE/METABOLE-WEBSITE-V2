import { Expertise } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchExpertise = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "expertise"] | order(orderRank) {
      name,
      image,
      slug,
    }
  `;

  return await fetchSanityData<Expertise[]>(query, {}, context);
};
