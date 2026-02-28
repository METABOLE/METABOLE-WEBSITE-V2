import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { AutoSlugInput } from '../components/AutoSlugInput';
import {
  blogPostSectionContenu,
  blogPostSectionRelatedProjects,
  blogPostSectionStatQuote,
  blogPostSectionTipBox,
} from './blogPostSections';

/**
 * Article de blog — 5 groupes :
 * SEO, Schema.org, En-tête (H1 · auteur · intro · takeaways),
 * Contenu (sections à choix), Bas d'article (conclusion · sources · articles liés · projets liés).
 */
export default defineType({
  name: 'blogPost',
  title: 'ARTICLE DE BLOG',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'seo', title: '1. Métadonnées SEO', default: true },
    { name: 'schema', title: '2. Données structurées (Schema.org)' },
    { name: 'header', title: '3. En-tête (H1 · auteur · intro)' },
    { name: 'content', title: "4. Corps de l'article" },
    { name: 'footer', title: "5. Bas d'article (conclusion · sources · liens)" },
  ],
  fields: [
    // ——— 1. MÉTADONNÉES SEO ———
    defineField({
      name: 'metaTitle',
      title: 'Balise Title',
      type: 'string',
      group: 'seo',
      description: "55–65 caractères. À rédiger en premier pour fixer l'angle.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: '140–160 caractères. Bénéfice + CTA implicite.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'seo',
      options: { source: 'metaTitle', maxLength: 80 },
      components: { input: AutoSlugInput },
      description: 'Sans accents, sans stop words. Ex : choisir-studio-web-creatif-paris',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywordPrimary',
      title: 'Mot-clé principal',
      type: 'string',
      group: 'seo',
      description: 'Ex : choisir studio web créatif Paris · vol. ~50-200/mois',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywordsSecondary',
      title: 'Mots-clés secondaires (séparés par des virgules)',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: 'Stratégie web', value: 'strategie-web' },
          { title: 'Design & créativité', value: 'design-creativite' },
          { title: 'Développement', value: 'developpement' },
          { title: 'SEO & performance', value: 'seo-performance' },
          { title: 'Branding', value: 'branding' },
          { title: 'Actualités', value: 'actualites' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Ex : studio créatif, Paris, Next.js, web design',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image mise en avant',
      type: 'image',
      group: 'seo',
      description: '1200×630px · max 150ko · format .webp recommandé.',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Texte alternatif (alt)',
      type: 'bilingualString',
      group: 'seo',
      description: 'Doit contenir le mot-clé principal naturellement.',
      validation: (Rule) => Rule.required(),
    }),

    // ——— 2. DONNÉES STRUCTURÉES SCHEMA.ORG ———
    defineField({
      name: 'schemaPrincipalType',
      title: 'Type principal Schema.org',
      type: 'string',
      group: 'schema',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'BlogPosting', value: 'BlogPosting' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'BlogPosting',
    }),

    // ——— 3. EN-TÊTE ———
    defineField({
      name: 'h1',
      title: 'H1 — Titre principal',
      type: 'bilingualString',
      group: 'header',
      description: 'Mot-clé dans les 6 premiers mots. Différent de la balise Title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      group: 'header',
      to: [{ type: 'team' }],
      description: "Nom réel · renforce l'E-E-A-T.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'date',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Date de mise à jour',
      type: 'date',
      group: 'header',
      description: 'Google favorise les contenus maintenus à jour.',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'bilingualRichTextSeo',
      group: 'header',
      description:
        '100–150 mots. Mot-clé dans les 100 premiers mots. Aller droit au problème du lecteur.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways — À retenir',
      type: 'array',
      group: 'header',
      description: '3 à 5 points clés. Souvent repris en snippet Google : les rédiger avec soin.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Point clé',
              type: 'bilingualString',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { text: 'text.fr' },
            prepare: ({ text }: { text?: string }) => ({ title: text || 'Point clé' }),
          },
        }),
      ],
      validation: (Rule) => Rule.min(3).max(5),
    }),

    // ——— 4. CORPS DE L'ARTICLE ———
    defineField({
      name: 'content',
      title: 'Sections',
      type: 'array',
      group: 'content',
      description:
        "Ajouter des blocs dans l'ordre souhaité : Contenu (H2/H3), Tip Box, Stat/Citation, Projets liés.",
      of: [
        defineArrayMember({ type: blogPostSectionContenu.name }),
        defineArrayMember({ type: blogPostSectionTipBox.name }),
        defineArrayMember({ type: blogPostSectionStatQuote.name }),
        defineArrayMember({ type: blogPostSectionRelatedProjects.name }),
      ],
    }),

    // ——— 5. BAS D'ARTICLE ———
    defineField({
      name: 'faq',
      title: 'FAQ — Questions fréquentes',
      type: 'array',
      group: 'footer',
      description:
        "Section FAQ en fin d'article. Active le schema FAQPage (rich results Google). 2 à 6 questions.",
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
              description: '60–100 mots. Répondre directement dès la première phrase.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { question: 'question.fr' },
            prepare: ({ question }: { question?: string }) => ({
              title:
                question && question.length > 60
                  ? `${question.slice(0, 60)}…`
                  : question || 'Question',
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'bilingualRichTextSeo',
      group: 'footer',
      description: 'Synthèse de valeur. 1 seul CTA principal.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé du CTA',
      type: 'bilingualString',
      group: 'footer',
    }),
    defineField({
      name: 'ctaHref',
      title: 'URL du CTA',
      type: 'string',
      group: 'footer',
      description: 'Ex : /fr/contact',
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      group: 'footer',
      description:
        "Si l'article cite des stats ou études. Lier vers des sources de référence uniquement.",
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: 'label' },
            prepare: ({ label }: { label?: string }) => ({ title: label || 'Source' }),
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Articles recommandés',
      type: 'array',
      group: 'footer',
      description:
        '3 articles thématiquement proches. Réduit le taux de rebond + renforce le maillage.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'blogPost' }] })],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Projets clients liés',
      type: 'array',
      group: 'footer',
      description: 'Preuve sociale concrète. Min. 2 projets réels Metabole sur ce sujet.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'projects' }] })],
      validation: (Rule) => Rule.max(4),
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Article de blog' }),
    select: {
      title: 'metaTitle',
      slug: 'slug.current',
      media: 'featuredImage',
      author: 'author.name',
    },
  },
});
