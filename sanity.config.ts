'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    // visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/enable-draft',
          disable: '/api/disable-draft',
        },
      },
      allowOrigins: [process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000'],
    }),
  ],
});
