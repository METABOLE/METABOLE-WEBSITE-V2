import { StarIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'values',
  title: 'VALUES',
  type: 'document',
  icon: StarIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'values' }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'bilingualString',
      description: 'Nom de la valeur (ex. EXCELLENCE, CRÉATIVITÉ, etc.).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'bilingualText',
      description: 'Description du service.',
    }),
  ],
  preview: {
    select: {
      name: 'name.fr',
      description: 'description.en',
    },
    prepare({ name, description }) {
      return {
        title: name ?? 'Sans nom',
        subtitle: description ?? 'Sans description',
      };
    },
  },
});
