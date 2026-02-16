import { DatabaseIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'data',
  title: 'Données du site',
  type: 'document',
  icon: DatabaseIcon,
  description: 'Informations globales du site (un seul document).',
  fields: [
    defineField({
      name: 'email',
      title: 'Adresse e-mail',
      type: 'string',
      description: 'E-mail de contact principal du site.',
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
      description: "Localisation principale de l'entreprise.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Numéro de téléphone',
      type: 'string',
      description: 'Numéro de téléphone de contact principal du site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'countriesCount',
      title: 'Nombre de pays',
      type: 'number',
      description: 'Nombre de pays avec lesquels vous travaillez.',
      validation: (Rule) => Rule.min(0).integer().required(),
    }),
    defineField({
      name: 'projectsCount',
      title: 'Nombre de projets',
      type: 'number',
      description: 'Nombre de projets réalisés.',
      validation: (Rule) => Rule.min(0).integer().required(),
    }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'array',
      description: "Réseaux sociaux de l'entreprise.",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'Lien',
              type: 'url',
              description: 'URL du réseau social',
              validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
            }),
            defineField({
              name: 'text',
              title: 'Nom',
              type: 'string',
              description: 'Nom du réseau social (ex: Instagram, Linkedin, Awwwards, etc.)',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { text: 'text', href: 'href' },
            prepare({ text, href }: { text?: string; href?: string }) {
              return { title: text ?? 'Sans nom', subtitle: href };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Données du site',
        subtitle: 'E-mail, chiffres, infos diverses',
      };
    },
  },
});
