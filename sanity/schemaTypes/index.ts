import { type SchemaTypeDefinition } from 'sanity';
import projects from './projects';
import expertise from './expertise';
import bilingualString from './bilingualString';
import bilingualRichText from './bilingualRichText';
import service from './service';
import compatibility from './compatibility';
import testimonial from './testimonial';
import { blockContent } from './blockContent';
import bilingualText from './bilingualText';
import awards from './awards';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projects,
    expertise,
    bilingualString,
    bilingualRichText,
    bilingualText,
    service,
    compatibility,
    testimonial,
    awards,
    blockContent,
  ],
};
