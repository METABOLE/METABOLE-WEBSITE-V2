import { DatabaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

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
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'countriesCount',
      title: 'Nombre de pays',
      type: 'number',
      description: 'Nombre de pays avec lesquels vous travaillez.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'projectsCount',
      title: 'Nombre de projets',
      type: 'number',
      description: 'Nombre de projets réalisés.',
      validation: (Rule) => Rule.min(0).integer(),
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
