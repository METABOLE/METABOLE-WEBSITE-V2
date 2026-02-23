import { ProjectType } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

export const fetchProjects = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "projects"] {
      _id,
      name,
      slug,
    }
  `;

  return await fetchSanityData<ProjectType[]>(query, {}, context);
};
