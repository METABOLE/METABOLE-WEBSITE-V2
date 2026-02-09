import { loadQuery, loadQueryOptions } from '@/sanity/ssr';
import { defineEncodeDataAttribute } from '@sanity/core-loader/encode-data-attribute';
import { studioUrl } from '@/sanity/env';
import type { QueryParams, ContentSourceMap } from '@sanity/client';

/**
 * Fetches data from Sanity with draft mode support
 * Use this in getStaticProps or getServerSideProps
 */
export async function fetchSanityData<T = unknown>(
  query: string,
  params: QueryParams = {},
  context: { draftMode?: boolean } = {},
) {
  const { draftMode = false } = context;
  const options = loadQueryOptions({ draftMode });
  const initial = await loadQuery<T>(query, params, options);

  return {
    initial,
    draftMode,
  };
}

/**
 * Creates the encodeDataAttribute function for click-to-edit overlays
 * Use this in your component to add data-sanity attributes
 */
export function createDataAttribute(
  data: unknown,
  sourceMap: ContentSourceMap | undefined,
  isDraftMode = false,
) {
  if (!isDraftMode) {
    return () => undefined;
  }

  return defineEncodeDataAttribute(data, sourceMap, studioUrl);
}
