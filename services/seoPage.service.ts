import { SeoPage } from '@/types';
import { groq } from 'next-sanity';
import { fetchSanityData } from './sanity.service';

const BILINGUAL_RICH_TEXT_SEO_FRAGMENT = groq`fr, en`;

const SECTION_FRAGMENT = groq`
  _type,
  _key,
  content { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} },
  reviewRating,
  testimonials[]-> {
    photo,
    name,
    role { fr, en },
    company,
    testimony { fr, en }
  },
  intro { fr, en },
  projects[]-> { _id, name, slug },
  items[] {
    _key,
    question { fr, en },
    answer { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} }
  },
  links[] {
    _key,
    anchor { fr, en },
    url
  }
`;

/** Tous les slugs — utilisé dans getStaticPaths de [slug] */
export const fetchAllSeoPageSlugs = async () => {
  const query = groq`*[_type == "seoPage" && defined(slug.current)]{ "slug": slug.current }`;
  const { initial } = await fetchSanityData<{ slug: string }[]>(query);
  return initial.data;
};

/** Liste légère — utilisé dans la page index /seo */
export const fetchAllSeoPages = async (context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "seoPage" && defined(slug.current)] | order(_createdAt desc) {
      _id,
      metaTitle,
      "slug": slug.current,
      keywordPrimary,
      pageType
    }
  `;
  return await fetchSanityData<
    { _id: string; metaTitle: string; slug: string; keywordPrimary: string; pageType: string }[]
  >(query, {}, context);
};

/** Une seule page par slug — utilisé dans getStaticProps de [slug] */
export const fetchSeoPage = async (slug: string, context: { draftMode?: boolean } = {}) => {
  const query = groq`
    *[_type == "seoPage" && slug.current == $slug][0] {
      _id,
      metaTitle,
      metaDescription,
      slug,
      keywordPrimary,
      keywordsSecondary,
      canonicalUrl,
      robots,
      schemaPrincipalType,
      schemaAreaServed,
      schemaServiceType,
      schemaBreadcrumbItems[] { _key, name, url },
      hero {
        h1 { fr, en },
        tagline { fr, en },
        ctaLabel { fr, en },
        ctaHref
      },
      introduction {
        content { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} }
      },
      content[] { ${SECTION_FRAGMENT} },
      ctaFinal {
        text { ${BILINGUAL_RICH_TEXT_SEO_FRAGMENT} },
        buttonLabel { fr, en },
        href
      }
    }
  `;

  return await fetchSanityData<SeoPage>(query, { slug }, context);
};
