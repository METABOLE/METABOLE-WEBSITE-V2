import SEO from '@/components/ui/SEO';
import { getStaticPathsForLang, META } from '@/constants';
import { useSanityData } from '@/hooks/useSanityData';
import { useLanguage } from '@/providers/language.provider';
import { fetchAllSeoPages } from '@/services/seoPage.service';
import { SanityProps } from '@/types';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

const PAGE_TYPE_LABELS: Record<string, { fr: string; en: string }> = {
  service: { fr: 'Service', en: 'Service' },
  pillar: { fr: 'Page pilier', en: 'Pillar page' },
  landing: { fr: 'Landing', en: 'Landing' },
  other: { fr: 'Autre', en: 'Other' },
};

export default function SeoIndex({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSanityData(pages);
  const { isFrench, getInternalPath } = useLanguage();

  const title = isFrench ? 'Pages SEO' : 'SEO Pages';
  const typeLabel = (type: string) => PAGE_TYPE_LABELS[type]?.[isFrench ? 'fr' : 'en'] ?? type;

  return (
    <>
      <SEO
        descriptionEn="List of all SEO pages from Metabole Studio."
        descriptionFr="Liste de toutes les pages SEO de Metabole Studio."
        isFrench={isFrench}
        noindex={true}
        title={`${title} — ${META.title}`}
        url={META.url}
      />

      <main>
        <h1>{title}</h1>
        <p>
          {isFrench
            ? `${data.length} page${data.length > 1 ? 's' : ''} publiée${data.length > 1 ? 's' : ''}`
            : `${data.length} published page${data.length > 1 ? 's' : ''}`}
        </p>

        <ul>
          {data.map((page) => (
            <li key={page._id}>
              <Link href={getInternalPath(`/seo/${page.slug}`)}>{page.metaTitle}</Link>
              {page.keywordPrimary && <span> — {page.keywordPrimary}</span>}
              {page.pageType && <span> [{typeLabel(page.pageType)}]</span>}
            </li>
          ))}
        </ul>

        {data.length === 0 && (
          <p>
            {isFrench ? 'Aucune page SEO publiée pour le moment.' : 'No SEO pages published yet.'}
          </p>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  return getStaticPathsForLang();
}

export const getStaticProps = async (context: {
  draftMode?: boolean;
  params?: { lang: string };
}) => {
  const pages = await fetchAllSeoPages(context);

  return {
    props: {
      pages,
      draftMode: pages.draftMode,
    },
  };
};
