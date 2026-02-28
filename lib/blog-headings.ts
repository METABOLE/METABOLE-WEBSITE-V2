import { PortableTextBlock } from 'sanity';

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getBlockText(block: PortableTextBlock): string {
  return (block.children as { text?: string }[])?.map((c) => c.text ?? '').join('') ?? '';
}

/** Extrait le texte brut d'un tableau de blocs PortableText */
export function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b) => b._type === 'block')
    .map(getBlockText)
    .join(' ');
}

export function extractHeadings(blocks: PortableTextBlock[]): Heading[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => {
      const text = getBlockText(b);
      return {
        id: slugify(text),
        text,
        level: (b.style === 'h2' ? 2 : 3) as 2 | 3,
      };
    });
}
