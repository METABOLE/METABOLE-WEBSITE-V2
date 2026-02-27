import BackgroundLines from '@/components/layout/background-lines';
import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import BlogPostContentSections from '@/features/blog-post/BlogPostContentSections';
import BlogPostFooterSection from '@/features/blog-post/BlogPostFooterSection';
import BlogPostHeroSection from '@/features/blog-post/BlogPostHeroSection';
import BlogPostIntroSection from '@/features/blog-post/BlogPostIntroSection';
import { useSanityData } from '@/hooks/useSanityData';
import { useLanguage } from '@/providers/language.provider';
import { fetchAllBlogPostSlugs, fetchBlogPost } from '@/services/blogPost.service';
import { fetchDataInfos } from '@/services/data.service';
import { BlogPost, SanityProps } from '@/types';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

export default function BlogPostRoute({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSanityData(post);
  const { isFrench } = useLanguage();

  if (!data) return null;

  return (
    <div className="seo">
      <SEO
        descriptionEn={data.metaDescription}
        descriptionFr={data.metaDescription}
        isFrench={isFrench}
        noindex={false}
        title={data.metaTitle}
        url={META.url}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(data, isFrench)),
        }}
      />

      <BlogPostHeroSection
        breadcrumbItems={data.schemaBreadcrumbItems ?? []}
        isFrench={isFrench}
        location="Paris | Rotterdam"
        post={data}
        totalAwards={17}
      />

      <div className="pb-y-double-default sticky top-0 min-h-screen bg-white text-black">
        <BackgroundLines isDark={false} />

        <BlogPostIntroSection isFrench={isFrench} post={data} />

        {data.content && data.content.length > 0 && (
          <BlogPostContentSections isFrench={isFrench} sections={data.content} />
        )}

        <BlogPostFooterSection isFrench={isFrench} post={data} />
      </div>
    </div>
  );
}

// ——— JSON-LD ———

function buildJsonLd(post: BlogPost, isFrench: boolean) {
  const graphs: object[] = [];
  const lang = isFrench ? 'fr' : 'en';

  // BlogPosting / Article
  const articleNode: Record<string, unknown> = {
    '@type': post.schemaPrincipalType ?? 'BlogPosting',
    headline: post.metaTitle,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name ?? 'Metabole Studio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metabole Studio',
      url: META.url,
    },
  };
  if (post.updatedAt) articleNode.dateModified = post.updatedAt;
  graphs.push(articleNode);

  // BreadcrumbList
  if (post.schemaBreadcrumbItems?.length) {
    graphs.push({
      '@type': 'BreadcrumbList',
      itemListElement: post.schemaBreadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  // FAQPage — collecte toutes les sections FAQ
  const faqSections = post.content?.filter((s) => s._type === 'blogPostSectionFaq') ?? [];
  const faqItems = faqSections.flatMap((s) =>
    s._type === 'blogPostSectionFaq'
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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchAllBlogPostSlugs();
  const langs = ['fr', 'en'] as const;

  return {
    paths: (slugs ?? []).flatMap(({ slug }: { slug: string }) =>
      langs.map((lang) => ({ params: { lang, slug } })),
    ),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  post: SanityProps<BlogPost>;
}> = async (context) => {
  const { params, draftMode = false } = context;
  const slug = params?.slug as string;

  const dataInfos = await fetchDataInfos(context);
  const post = await fetchBlogPost(slug, { draftMode });

  if (!post.initial.data) {
    return { notFound: true };
  }

  return {
    props: {
      dataInfos,
      post,
      draftMode,
    },
  };
};
