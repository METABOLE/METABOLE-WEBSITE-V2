import { type SchemaTypeDefinition } from 'sanity';
import awards from './awards';
import bilingualRichText from './bilingualRichText';
import bilingualRichTextSeo from './bilingualRichTextSeo';
import bilingualString from './bilingualString';
import bilingualText from './bilingualText';
import { blockContent } from './blockContent';
import { blockContentSeo } from './blockContentSeo';
import blogPost from './blogPost';
import { blogPostSectionTypes } from './blogPostSections';
import compatibility from './compatibility';
import data from './data';
import expertise from './expertise';
import projects from './projects';
import seoPage from './seoPage';
import { seoPageSectionTypes } from './seoPageSections';
import service from './service';
import team from './team';
import testimonial from './testimonial';
import values from './values';

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
    blogPost,
    ...blogPostSectionTypes,
  ],
};
