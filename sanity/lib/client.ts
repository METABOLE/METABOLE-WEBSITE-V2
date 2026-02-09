import { createClient } from 'next-sanity';
import { createClient as createSanityClient } from '@sanity/client';

import { apiVersion, dataset, projectId, studioUrl } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: studioUrl,
  },
});

/**
 * Creates a server-side client for @sanity/react-loader
 * This is needed because setServerClient requires a client from @sanity/client
 * rather than next-sanity's createClient
 */
export const createServerClient = (token?: string) =>
  createSanityClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,
    stega: {
      enabled: true,
      studioUrl: studioUrl,
    },
  });
