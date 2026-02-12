import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'bilingualRichText',
  title: 'Rich text bilingue (FR / EN)',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      fr: 'fr',
      en: 'en',
    },
    prepare({ fr, en }) {
      const frText =
        fr?.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
          ?.children?.[0]?.text ?? '';
      const enText =
        en?.find((b: { _type?: string; children?: { text?: string }[] }) => b._type === 'block')
          ?.children?.[0]?.text ?? '';
      const title = [frText, enText].filter(Boolean).join(' / ') || 'Rich text bilingue';
      return { title: title.length > 60 ? `${title.slice(0, 60)}…` : title };
    },
  },
});
