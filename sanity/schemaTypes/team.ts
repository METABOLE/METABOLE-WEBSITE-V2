import { UserIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';
import { AutoSlugInput } from '../components/AutoSlugInput';

export default defineType({
  name: 'team',
  title: 'TEAM',
  type: 'document',
  icon: UserIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'team' }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Project's name.",
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
      name: 'role',
      title: 'Role',
      type: 'bilingualString',
      description: "Team member's role.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Petit texte optionnel (ex. "Ancien CTO de...", réassurance).',
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: "Photo de l'équipe.",
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
