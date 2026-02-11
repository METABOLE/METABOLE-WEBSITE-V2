import { TiersIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';
import { AutoSlugInput } from '../components/AutoSlugInput';

export default defineType({
  name: 'expertise',
  title: 'EXPERTISE',
  type: 'document',
  icon: TiersIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'expertise' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'bilingualString',
      description: "Expertise's name (French + English).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name.fr',
      },
      components: {
        input: AutoSlugInput,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name.fr',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
});
