import { AwardsData } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchAwards = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "awards"] | order(orderRank) {
      _id,
      orderRank,
      name,
      categories[] {
        name,
        number,
      },
    }
  `;

  const result = await fetchSanityData<AwardsData[]>(query, {}, context);
  return result;
};
