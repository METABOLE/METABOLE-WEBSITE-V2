import { Image, Slug } from 'sanity';
import { BilingualString } from './language.type';
import { ProjectType } from './project.type';
import { Team } from './team.type';
import { BilingualRichTextSeo } from './seoPage.type';

// ——— Sections ———

export type BlogPostSectionContenu = {
  _type: 'blogPostSectionContenu';
  _key: string;
  content: BilingualRichTextSeo;
};

export type BlogPostSectionTipBox = {
  _type: 'blogPostSectionTipBox';
  _key: string;
  label?: BilingualString;
  content: BilingualRichTextSeo;
};

export type BlogPostSectionStatQuote = {
  _type: 'blogPostSectionStatQuote';
  _key: string;
  quote: BilingualString;
  source?: string;
  sourceUrl?: string;
};

export type BlogPostSectionFaqItem = {
  _key: string;
  question: BilingualString;
  answer: BilingualRichTextSeo;
};

export type BlogPostSectionFaq = {
  _type: 'blogPostSectionFaq';
  _key: string;
  items: BlogPostSectionFaqItem[];
};

export type BlogPostSectionRelatedProjects = {
  _type: 'blogPostSectionRelatedProjects';
  _key: string;
  intro?: BilingualString;
  projects?: ProjectType[];
};

export type BlogPostSection =
  | BlogPostSectionContenu
  | BlogPostSectionTipBox
  | BlogPostSectionStatQuote
  | BlogPostSectionFaq
  | BlogPostSectionRelatedProjects;

// ——— Sous-types ———

export type BlogPostKeyTakeaway = {
  _key: string;
  text: BilingualString;
};

export type BlogPostSource = {
  _key: string;
  label: string;
  url: string;
};

export type BlogPostRelated = {
  _id: string;
  slug: Slug;
  metaTitle: string;
  h1: BilingualString;
  featuredImage: Image;
  featuredImageAlt: BilingualString;
  publishedAt: string;
  category: string;
  author: Pick<Team, 'name'>;
};

export type BlogPostBreadcrumbItem = {
  _key: string;
  name: string;
  url: string;
};

// ——— Document principal ———

export type BlogPost = {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  slug: Slug;
  keywordPrimary: string;
  keywordsSecondary?: string;
  category: string;
  tags?: string[];
  featuredImage: Image;
  featuredImageAlt: BilingualString;
  schemaPrincipalType?: 'Article' | 'BlogPosting';
  schemaBreadcrumbItems?: BlogPostBreadcrumbItem[];
  h1: BilingualString;
  author: Team;
  publishedAt: string;
  updatedAt?: string;
  introduction: BilingualRichTextSeo;
  keyTakeaways?: BlogPostKeyTakeaway[];
  content?: BlogPostSection[];
  conclusion?: BilingualRichTextSeo;
  ctaLabel?: BilingualString;
  ctaHref?: string;
  sources?: BlogPostSource[];
  relatedPosts?: BlogPostRelated[];
  relatedProjects?: ProjectType[];
};
