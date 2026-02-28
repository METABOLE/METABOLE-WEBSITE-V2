import { PortableTextBlock } from 'sanity';
import { BlogPost, BlogPostSection } from '@/types';

const WPM = 250;
const WORDS_PER_BLOCK = 50; // estimation : ~50 mots par paragraphe

function countTextBlocks(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0;
  return (blocks as PortableTextBlock[]).filter((b) => b?._type === 'block').length;
}

function wordsFromSection(section: BlogPostSection, lang: 'fr' | 'en'): number {
  switch (section._type) {
    case 'blogPostSectionContenu':
    case 'blogPostSectionTipBox':
      return countTextBlocks(section.content?.[lang]) * WORDS_PER_BLOCK;
    case 'blogPostSectionStatQuote':
      return 10;
    default:
      return 0;
  }
}

/**
 * Calcule le temps de lecture estimé d'un article de blog.
 * Retourne une chaîne formatée : "5 min de lecture" / "5 min read"
 */
export function getReadingTime(post: BlogPost, lang: 'fr' | 'en'): string {
  let totalWords = 0;

  totalWords += countTextBlocks(post.introduction?.[lang]) * WORDS_PER_BLOCK;

  if (post.content) {
    for (const section of post.content) {
      totalWords += wordsFromSection(section, lang);
    }
  }

  if (post.conclusion?.[lang]) {
    totalWords += countTextBlocks(post.conclusion[lang]) * WORDS_PER_BLOCK;
  }

  // FAQ — question (~10 mots) + réponse (~2 blocs par item)
  if (post.faq?.length) {
    totalWords += post.faq.length * (10 + 2 * WORDS_PER_BLOCK);
  }

  const minutes = Math.max(1, Math.round(totalWords / WPM));

  return lang === 'fr' ? `${minutes} min de lecture` : `${minutes} min read`;
}
