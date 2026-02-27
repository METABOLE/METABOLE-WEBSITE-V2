import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import SeoPageContentSections from '@/features/seo-page/SeoPageContentSections';
import SeoPageCtaSection from '@/features/seo-page/SeoPageCtaSection';
import SeoPageHeroSection from '@/features/seo-page/SeoPageHeroSection';
import SeoPageIntroSection from '@/features/seo-page/SeoPageIntroSection';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchPaths, fetchSeoPage } from '@/services/seoPage.service';
import { SanityProps, SeoPage } from '@/types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export default function SeoPageRoute({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSanityData(page);
  const { query } = useRouter();
  const isFrench = query.lang === 'fr';

  if (!data) return null;

  return (
    <>
      <SEO
        descriptionEn={data.metaDescription}
        descriptionFr={data.metaDescription}
        isFrench={isFrench}
        noindex={data.robots === 'noindex, nofollow' || data.robots === 'noindex, follow'}
        title={data.metaTitle}
        url={data.canonicalUrl ?? META.url}
      />

      {/* JSON-LD : Service + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(data, isFrench)),
        }}
      />

      <SeoPageHeroSection hero={data.hero} isFrench={isFrench} />

      {data.introduction && <SeoPageIntroSection intro={data.introduction} isFrench={isFrench} />}

      {data.content && data.content.length > 0 && (
        <SeoPageContentSections isFrench={isFrench} sections={data.content} />
      )}

      {data.ctaFinal && <SeoPageCtaSection cta={data.ctaFinal} isFrench={isFrench} />}
    </>
  );
}

// ——— JSON-LD ———

function buildJsonLd(page: SeoPage, isFrench: boolean) {
  const graphs: object[] = [];
  const lang = isFrench ? 'fr' : 'en';

  // Service / ProfessionalService
  const serviceNode: Record<string, unknown> = {
    '@type': [page.schemaPrincipalType ?? 'Service', 'LocalBusiness'],
    name: 'Metabole Studio',
    url: META.url,
    description: page.metaDescription,
  };
  if (page.schemaAreaServed) serviceNode.areaServed = page.schemaAreaServed;
  if (page.schemaServiceType?.length) serviceNode.serviceType = page.schemaServiceType;
  graphs.push(serviceNode);

  // BreadcrumbList
  if (page.schemaBreadcrumbItems?.length) {
    graphs.push({
      '@type': 'BreadcrumbList',
      itemListElement: page.schemaBreadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  // FAQPage — collecte toutes les sections FAQ
  const faqSections = page.content?.filter((s) => s._type === 'seoPageSectionFaq') ?? [];
  const faqItems = faqSections.flatMap((s) =>
    s._type === 'seoPageSectionFaq'
      ? s.items.map((item) => ({
          '@type': 'Question',
          name: lang === 'fr' ? item.question.fr : item.question.en,
          acceptedAnswer: {
            '@type': 'Answer',
            text: lang === 'fr' ? item.answer.fr : item.answer.en,
          },
        }))
      : [],
  );
  if (faqItems.length) {
    graphs.push({ '@type': 'FAQPage', mainEntity: faqItems });
  }

  return { '@context': 'https://schema.org', '@graph': graphs };
}

// ——— Routing ———
export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((seoPage: SeoPage) => ({
    params: { project: seoPage.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  page: SanityProps<SeoPage>;
}> = async (context) => {
  const { params, draftMode = false } = context;
  const slug = params?.slug as string;

  const page = await fetchSeoPage(slug, { draftMode });

  if (!page.initial.data) {
    return { notFound: true };
  }

  return {
    props: {
      page,
      draftMode,
    },
  };
};
