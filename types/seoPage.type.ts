import { PortableTextBlock } from 'sanity';
import { Testimonial } from './testimonial.type';
import { ProjectType } from './project.type';
import { BilingualString } from './language.type';

export type BilingualRichTextSeo = {
  fr: PortableTextBlock[];
  en: PortableTextBlock[];
};

// ——— Sections ———

export type SeoPageSectionContenu = {
  _type: 'seoPageSectionContenu';
  _key: string;
  content: BilingualRichTextSeo;
};

export type SeoPageSectionTestimonials = {
  _type: 'seoPageSectionTestimonials';
  _key: string;
  testimonials: Testimonial[];
  reviewRating?: number;
};

export type SeoPageSectionRelatedProjects = {
  _type: 'seoPageSectionRelatedProjects';
  _key: string;
  intro?: BilingualString;
  projects: ProjectType[];
};

export type SeoPageSectionFaqItem = {
  _key: string;
  question: BilingualString;
  answer: BilingualRichTextSeo;
};

export type SeoPageSectionFaq = {
  _type: 'seoPageSectionFaq';
  _key: string;
  items: SeoPageSectionFaqItem[];
};

export type SeoPageSectionInternalLink = {
  _key: string;
  anchor: BilingualString;
  url: string;
};

export type SeoPageSection =
  | SeoPageSectionContenu
  | SeoPageSectionTestimonials
  | SeoPageSectionRelatedProjects
  | SeoPageSectionFaq;

// ——— Blocs fixes ———

export type SeoPageHero = {
  h1: BilingualString;
  tagline: BilingualString;
  ctaLabel: BilingualString;
  ctaHref: string;
};

export type SeoPageIntro = {
  content: BilingualRichTextSeo;
};

export type SeoPageCtaFinal = {
  text?: BilingualString;
  buttonLabel?: BilingualString;
  href?: string;
};

// ——— Document principal ———
export type SeoPage = {
  _id: string;
  // Métadonnées SEO
  metaTitle: string;
  metaDescription: string;
  slug: { current: string };
  keywordPrimary: string;
  keywordsSecondary?: string[];
  canonicalUrl?: string;
  robots: string;
  // Schema.org
  schemaPrincipalType?: 'Service' | 'ProfessionalService';
  schemaAreaServed?: string;
  schemaServiceType?: string[];
  // Contenu
  hero: SeoPageHero;
  introduction?: SeoPageIntro;
  content?: SeoPageSection[];
  ctaFinal?: SeoPageCtaFinal;
};
