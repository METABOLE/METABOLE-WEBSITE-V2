import * as serverOnly from '@sanity/react-loader';
import { ClientPerspective } from 'next-sanity';
import { createServerClient } from './lib/client';

const { loadQuery, setServerClient } = serverOnly;

if (typeof window === 'undefined') {
  setServerClient(createServerClient(process.env.SANITY_VIEWER_TOKEN));
}

const loadQueryOptions = (context: { draftMode?: boolean }) => {
  const { draftMode } = context;
  return draftMode
    ? {
        // At this time, this approach does not support dynamicly
        // pulling in the Studio perspective, so you must hard-code the value
        // or retrieve it from the cookie manually.
        perspective: 'drafts' as ClientPerspective,
        stega: true,
        useCdn: false,
      }
    : {};
};

export { loadQuery, loadQueryOptions };
