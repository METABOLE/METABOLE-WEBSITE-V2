import { defineArrayMember, defineType } from 'sanity';

/**
 * Block content adapté au SEO : titres (H2–H4) dans le rich text, listes, liens.
 * Pas de champ titre séparé — les titres sont saisis directement dans l'éditeur.
 */
export const blockContentSeo = defineType({
  name: 'blockContentSeo',
  title: 'Contenu SEO (rich text)',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Titre H2', value: 'h2' },
        { title: 'Titre H3', value: 'h3' },
        { title: 'Titre H4', value: 'h4' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'string',
                title: 'URL',
                description: 'Lien interne (ex: /fr/contact) ou externe.',
              },
              {
                name: 'follow',
                type: 'boolean',
                title: 'Follow',
                description:
                  'Indique si le lien doit être suivi par les moteurs de recherche (par défaut: true).',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
  ],
});
