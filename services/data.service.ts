import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';
import { Data } from '@/types';

export const fetchDataInfos = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "data"] {
      email,
      countriesCount,
      projectsCount,
      location,
      phone,
      socials[] {
        href,
        text,
      },
    }
  `;

  return await fetchSanityData<Data[]>(query, {}, context);
};
