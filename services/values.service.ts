import { Value } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchValues = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "values"] | order(orderRank) {
      orderRank,
      name,
      description,
    }
  `;

  return await fetchSanityData<Value[]>(query, {}, context);
};
