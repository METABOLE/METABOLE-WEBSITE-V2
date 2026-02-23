import { DiamondIcon, StarIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'awards',
  title: 'AWARDS',
  type: 'document',
  icon: DiamondIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'awards' }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      description: 'Nom de la plateforme awards (ex. Awwwards, CSSDA, FWA).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Catégories d’awards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'awardCategory',
          icon: StarIcon,
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
              description: 'Nom de l’award (ex. SOTD, SOTY, HM).',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'number',
              title: 'Nombre',
              type: 'string',
              description: "Nombre d'awards",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              number: 'number',
            },
            prepare({ title, number }) {
              return {
                title: title || 'Award',
                subtitle: number ? `${number} award(s)` : '—',
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name || 'AWARDS',
      };
    },
  },
});
