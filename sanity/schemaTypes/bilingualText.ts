import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'bilingualText',
  title: 'Texte bilingue (FR / EN)',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      fr: 'fr',
      en: 'en',
    },
    prepare({ fr, en }) {
      const title = [fr, en].filter(Boolean).join(' / ') || 'Texte bilingue';
      return { title: title.length > 60 ? `${title.slice(0, 60)}…` : title };
    },
  },
});
