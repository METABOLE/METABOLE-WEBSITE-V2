import { defineArrayMember, defineField, defineType } from 'sanity';

/** Corps de l'article : rich text SEO (H2, H3, H4, listes, liens dans l'éditeur) */
export const blogPostSectionContenu = defineType({
  name: 'blogPostSectionContenu',
  title: 'Contenu (texte)',
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

/** Tip Box : conseil pratique mis en valeur */
export const blogPostSectionTipBox = defineType({
  name: 'blogPostSectionTipBox',
  title: 'Tip Box (conseil)',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'bilingualString',
      description: 'Titre du bloc, ex : "Conseil", "Astuce", "À retenir".',
      initialValue: { fr: 'Conseil', en: 'Tip' },
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'bilingualRichTextSeo',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { label: 'label.fr' },
    prepare: ({ label }: { label?: string }) => ({
      title: 'Tip Box',
      subtitle: label,
    }),
  },
});

/** Stat clé / Citation sourcée : chiffre ou quote qui renforce l'E-E-A-T */
export const blogPostSectionStatQuote = defineType({
  name: 'blogPostSectionStatQuote',
  title: 'Stat clé / Citation',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Citation ou statistique',
      type: 'bilingualText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Ex : Google, 2024 · Rapport Search Generative Experience.',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'URL de la source',
      type: 'string',
    }),
  ],
  preview: {
    select: { quote: 'quote.fr' },
    prepare: ({ quote }: { quote?: string }) => ({
      title: 'Stat / Citation',
      subtitle: quote ? `${quote.slice(0, 60)}…` : undefined,
    }),
  },
});

/** Projets liés — preuve sociale dans le corps ou en bas d'article */
export const blogPostSectionRelatedProjects = defineType({
  name: 'blogPostSectionRelatedProjects',
  title: 'Projets liés',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction (optionnelle)',
      type: 'bilingualString',
    }),
    defineField({
      name: 'projects',
      title: 'Projets',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'projects' }] })],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Projets liés' }),
  },
});

/** Liste des types de sections blog pour enregistrement et union */
export const blogPostSectionTypes = [
  blogPostSectionContenu,
  blogPostSectionTipBox,
  blogPostSectionStatQuote,
  blogPostSectionRelatedProjects,
];
