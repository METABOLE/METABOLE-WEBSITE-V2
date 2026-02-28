import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'bilingualRichTextSeo',
  title: 'Rich text SEO (FR / EN)',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'blockContentSeo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContentSeo',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { fr: 'fr', en: 'en' },
    prepare({
      fr,
      en,
    }: {
      fr?: { _type?: string; style?: string; children?: { text?: string }[] }[];
      en?: { _type?: string; style?: string; children?: { text?: string }[] }[];
    }) {
      const firstText = (
        blocks: { _type?: string; style?: string; children?: { text?: string }[] }[] | undefined,
      ) => {
        const block = blocks?.find((b) => b._type === 'block');
        const raw = block?.children?.map((c) => c.text ?? '').join('') ?? '';
        const style = block?.style;
        const prefix = style && style !== 'normal' ? `[${style.toUpperCase()}] ` : '';
        return raw ? `${prefix}${raw}` : '';
      };

      const frText = firstText(fr);
      const enText = firstText(en);
      const title = frText || enText || '(vide)';
      const subtitle = frText && enText ? `EN : ${enText.slice(0, 60)}` : undefined;

      const truncate = (s: string) => (s.length > 80 ? `${s.slice(0, 80)}…` : s);

      return {
        title: truncate(title),
        subtitle: subtitle ? truncate(subtitle) : undefined,
      };
    },
  },
});
