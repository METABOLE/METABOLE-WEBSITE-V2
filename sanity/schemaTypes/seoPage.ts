import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  seoPageSectionHero,
  seoPageSectionIntro,
  seoPageSectionContenu,
  seoPageSectionTestimonials,
  seoPageSectionRelatedProjects,
  seoPageSectionFaq,
  seoPageSectionCta,
} from './seoPageSections';
import { AutoSlugInput } from '../components/AutoSlugInput';

/**
 * Page SEO — 6 blocs : SEO, Schema.org, Hero, Introduction, Contenu (sections à choix), CTA final.
 */
export default defineType({
  name: 'seoPage',
  title: 'PAGE SEO',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'seo', title: '1. Métadonnées SEO', default: true },
    { name: 'schema', title: '2. Données structurées (Schema.org)' },
    { name: 'hero', title: '3. Hero : première section visible' },
    { name: 'intro', title: '4. Introduction : problème client' },
    { name: 'content', title: '5. Contenu' },
    { name: 'cta', title: '6. CTA final' },
  ],
  fields: [
    // ——— 1. MÉTADONNÉES SEO ———
    defineField({
      name: 'metaTitle',
      title: 'Balise Title',
      type: 'string',
      group: 'seo',
      description: "55–65 caractères. À rédiger en premier pour fixer l'angle.",
      validation: (Rule) => Rule.required().min(50).max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: '140–160 caractères. Bénéfice + CTA implicite.',
      validation: (Rule) => Rule.required().min(135).max(165),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'seo',
      options: { source: 'metaTitle', maxLength: 60 },
      components: { input: AutoSlugInput },
      description: 'Sans accents, sans stop words. Le préfixe /fr/ ou /en/ est géré côté front.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywordPrimary',
      title: 'Mot-clé principal',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keywordsSecondary',
      title: 'Mots-clés secondaires (séparés par des virgules)',
      type: 'string',
      group: 'seo',
    }),

    // ——— 2. DONNÉES STRUCTURÉES SCHEMA.ORG ———
    defineField({
      name: 'schemaPrincipalType',
      title: 'Type principal Schema.org',
      type: 'string',
      group: 'schema',
      options: {
        list: [
          { title: 'Service', value: 'Service' },
          { title: 'ProfessionalService', value: 'ProfessionalService' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'Service',
    }),
    defineField({
      name: 'schemaLocalBusiness',
      title: 'LocalBusiness',
      type: 'string',
      group: 'schema',
    }),
    // schemaBreadcrumbItems retiré — breadcrumb généré automatiquement : Accueil > [page]
    defineField({
      name: 'schemaAreaServed',
      title: 'areaServed',
      type: 'string',
      group: 'schema',
      description: 'Ex: Paris, Île-de-France, France.',
    }),
    defineField({
      name: 'schemaServiceType',
      title: 'serviceType',
      type: 'string',
      group: 'schema',
    }),
    defineField({
      name: 'schemaImage',
      title: 'image (Schema.org)',
      type: 'image',
      group: 'schema',
    }),

    // ——— 3. HERO : PREMIÈRE SECTION VISIBLE ———
    defineField({
      name: 'hero',
      title: 'Hero',
      type: seoPageSectionHero.name,
      group: 'hero',
      description: 'H1 + accroche + CTA. Toujours affiché en tête de page.',
      validation: (Rule) => Rule.required(),
    }),

    // ——— 4. INTRODUCTION : PROBLÈME CLIENT ———
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: seoPageSectionIntro.name,
      group: 'intro',
      description: '80–120 mots. Parler au visiteur (problème client).',
    }),

    // ——— 5. CONTENU (sections à choix : rich text, FAQ, témoignages, projets liés, etc.) ———
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      group: 'content',
      description:
        'Ajouter des blocs dans l’ordre souhaité. Choisir le type dans le menu déroulant à l’ajout.',
      of: [
        defineArrayMember({ type: seoPageSectionContenu.name }),
        defineArrayMember({ type: seoPageSectionTestimonials.name }),
        defineArrayMember({ type: seoPageSectionRelatedProjects.name }),
        defineArrayMember({ type: seoPageSectionFaq.name }),
      ],
    }),

    // ——— 6. CTA FINAL ———
    defineField({
      name: 'ctaFinal',
      title: 'CTA final',
      type: seoPageSectionCta.name,
      group: 'cta',
      description: 'Dernier appel à l’action. Texte + libellé bouton + URL.',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      slug: 'slug.current',
    },
    prepare({ title, slug }: { title?: string; slug?: string }) {
      return {
        title: title ?? 'Sans titre',
        subtitle: slug ? `/${slug}` : '—',
      };
    },
  },
});
