import { Team } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchTeam = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "team"] | order(orderRank) {
      orderRank,
      name,
      slug,
      role,
      label,
      photo,
    }
  `;

  return await fetchSanityData<Team[]>(query, {}, context);
};
