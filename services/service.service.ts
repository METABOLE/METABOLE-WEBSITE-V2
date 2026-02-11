import { Service } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchServices = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "service"] {
      _id,
      title,
      description,
      servicesList,
    }
  `;

  return await fetchSanityData<Service[]>(query, {}, context);
};
