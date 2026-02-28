import { BlogPost } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

const BILINGUAL_RICH_TEXT_SEO_FRAGMENT = groq`fr, en`;

const BLOG_SECTION_FRAGMENT = groq`
  _type,
  _key,
  content { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} },
  label { fr, en },
  quote { fr, en },
  source,
  sourceUrl,
  items[] {
    _key,
    question { fr, en },
    answer { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} }
  },
  intro { fr, en },
  projects[]-> { _id, name, slug }
`;

/** Liste légère — utilisé dans la page listing /blog */
export const fetchAllBlogPosts = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      slug,
      metaTitle,
      h1 { fr, en },
      featuredImage,
      featuredImageAlt { fr, en },
      publishedAt,
      category,
      author-> { name }
    }
  `;
  return await fetchSanityData<BlogPost[]>(query, {}, context);
};

/** Tous les slugs — utilisé dans getStaticPaths */
export const fetchAllBlogPostSlugs = async () => {
  const query = groq`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`;
  const { initial } = await fetchSanityData<{ slug: string }[]>(query);
  return initial.data;
};

/** Un article complet par slug — utilisé dans getStaticProps */
export const fetchBlogPost = async (slug: string, context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      metaTitle,
      metaDescription,
      slug,
      keywordPrimary,
      keywordsSecondary,
      category,
      tags,
      featuredImage,
      featuredImageAlt { fr, en },
      schemaPrincipalType,
      h1 { fr, en },
      author-> { name, role { fr, en }, photo, slug },
      publishedAt,
      updatedAt,
      introduction { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} },
      keyTakeaways[] { _key, text { fr, en } },
      content[] { ${BLOG_SECTION_FRAGMENT} },
      conclusion { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} },
      ctaLabel { fr, en },
      ctaHref,
      sources[] { _key, label, url },
      relatedPosts[]-> {
        _id,
        slug,
        metaTitle,
        h1 { fr, en },
        featuredImage,
        featuredImageAlt { fr, en },
        publishedAt,
        category,
        author-> { name }
      },
      relatedProjects[]-> { _id, name, slug }
    }
  `;

  return await fetchSanityData<BlogPost>(query, { slug }, context);
};
