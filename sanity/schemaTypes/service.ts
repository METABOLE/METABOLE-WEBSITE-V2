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
      type: 'bilingualString',
      description: 'Titre du bloc de services (ex. STRATEGIE, IDENTITE, WEB).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'bilingualText',
      description: 'Description du service.',
    }),
    defineField({
      name: 'servicesList',
      title: 'Liste des services',
      type: 'array',
      description:
        'Liste des services proposés dans cette catégorie. Glisser-déposer pour réordonner.',
      of: [
        defineArrayMember({
          type: 'bilingualString',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'title.en',
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
