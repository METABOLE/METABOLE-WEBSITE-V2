import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';
import { AutoSlugInput } from '../components/AutoSlugInput';

export default defineType({
  name: 'projects',
  title: 'PROJECT',
  type: 'document',
  // icon: ProjectIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Project's name.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      components: {
        input: AutoSlugInput,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
});
