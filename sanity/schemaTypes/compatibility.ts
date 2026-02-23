import { SyncIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';
import { AutoSlugInput } from '../components/AutoSlugInput';

export default defineType({
  name: 'compatibility',
  title: 'COMPATIBILITY',
  type: 'document',
  icon: SyncIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'compatibility' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Compatibility's name.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
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
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
});
