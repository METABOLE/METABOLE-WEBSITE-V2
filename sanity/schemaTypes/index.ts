import { type SchemaTypeDefinition } from 'sanity';
import projects from './projects';
import expertise from './expertise';
import bilingualString from './bilingualString';
import bilingualRichText from './bilingualRichText';
import service from './service';
import compatibility from './compatibility';
import testimonial from './testimonial';
import { blockContent } from './blockContent';
import { blockContentSeo } from './blockContentSeo';
import bilingualRichTextSeo from './bilingualRichTextSeo';
import bilingualText from './bilingualText';
import awards from './awards';
import values from './values';
import data from './data';
import team from './team';
import seoPage from './seoPage';
import { seoPageSectionTypes } from './seoPageSections';

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
    blockContentSeo,
    bilingualRichTextSeo,
    values,
    team,
    data,
    seoPage,
    ...seoPageSectionTypes,
  ],
};
