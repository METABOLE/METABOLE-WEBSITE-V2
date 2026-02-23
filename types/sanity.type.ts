import type { ContentSourceMap } from '@sanity/client';

export interface SanityProps<T> {
  initial: {
    data: T;
    sourceMap?: ContentSourceMap;
  };
  draftMode: boolean;
}

export type EncodeDataAttribute = (path: string | (string | number)[]) => string | undefined;
