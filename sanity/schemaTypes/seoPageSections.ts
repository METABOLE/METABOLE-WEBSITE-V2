import { defineArrayMember, defineField, defineType } from 'sanity';

/** Hero : H1 + accroche + CTA */
export const seoPageSectionHero = defineType({
  name: 'seoPageSectionHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'h1',
      title: 'H1',
      type: 'bilingualString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche',
      type: 'bilingualText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé CTA',
      type: 'bilingualString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'URL du CTA',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { h1: 'h1.fr' },
    prepare: ({ h1 }: { h1?: string }) => ({ title: 'Hero', subtitle: h1 }),
  },
});

/** Introduction : contenu en rich text (titres dans le bloc) */
export const seoPageSectionIntro = defineType({
  name: 'seoPageSectionIntro',
  title: 'Introduction',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'bilingualRichTextSeo',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Introduction' }),
  },
});

/** Contenu : un seul rich text SEO (H2, H3, listes, liens dans l’éditeur) */
export const seoPageSectionContenu = defineType({
  name: 'seoPageSectionContenu',
  title: 'Contenu',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'bilingualRichTextSeo',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contenu' }),
  },
});

/** Témoignages */
export const seoPageSectionTestimonials = defineType({
  name: 'seoPageSectionTestimonials',
  title: 'Témoignages',
  type: 'object',
  fields: [
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Témoignages' }),
  },
});

/** Projets liés */
export const seoPageSectionRelatedProjects = defineType({
  name: 'seoPageSectionRelatedProjects',
  title: 'Projets liés',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'bilingualString',
    }),
    defineField({
      name: 'projects',
      title: 'Projets',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'projects' }] })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Projets liés' }),
  },
});

/** FAQ — question (string pour le schema) + réponse en rich text SEO */
export const seoPageSectionFaq = defineType({
  name: 'seoPageSectionFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Questions / Réponses',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'bilingualString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Réponse',
              type: 'bilingualRichTextSeo',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { question: 'question.fr' },
            prepare: ({ question }: { question?: string }) => {
              const title =
                question && question.length > 50 ? `${question.slice(0, 50)}…` : question || 'FAQ';
              return { title };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'FAQ' }),
  },
});

/** CTA final */
export const seoPageSectionCta = defineType({
  name: 'seoPageSectionCta',
  title: 'CTA final',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Texte', type: 'bilingualText' }),
    defineField({ name: 'buttonLabel', title: 'Libellé bouton', type: 'bilingualString' }),
    defineField({ name: 'href', title: 'URL', type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'CTA final' }),
  },
});

/** Liste des types de sections pour enregistrement et union */
export const seoPageSectionTypes = [
  seoPageSectionHero,
  seoPageSectionIntro,
  seoPageSectionContenu,
  seoPageSectionTestimonials,
  seoPageSectionRelatedProjects,
  seoPageSectionFaq,
  seoPageSectionCta,
];
