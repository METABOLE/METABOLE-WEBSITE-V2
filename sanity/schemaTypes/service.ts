import { CogIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'SERVICE',
  type: 'document',
  icon: CogIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'service' }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre du bloc de services (ex. STRATEGIE, IDENTITE, WEB).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Courte description',
      type: 'text',
      description: 'Courte description du service.',
      rows: 3,
    }),
    defineField({
      name: 'servicesList',
      title: 'Liste des services',
      type: 'array',
      description:
        'Liste des services proposés dans cette catégorie. Glisser-déposer pour réordonner.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'servicesList',
    },
    prepare({ title, count }) {
      const length = Array.isArray(count) ? count.length : 0;
      return {
        title: title ?? 'Sans titre',
        subtitle: `${length} service${length > 1 ? 's' : ''}`,
      };
    },
  },
});
