import { FeedbackIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'TESTIMONIAL',
  type: 'document',
  icon: FeedbackIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'testimonial' }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Photo de la personne.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      description: 'Nom de la personne.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'bilingualString',
      description: 'Rôle ou fonction de la personne (ex. CEO, Client, Partenaire).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
      description: 'Entreprise de la personne.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimony',
      title: 'Témoignage',
      type: 'bilingualText',
      description: 'Témoignage de la personne (français et anglais).',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.fr',
      media: 'photo',
    },
  },
});
