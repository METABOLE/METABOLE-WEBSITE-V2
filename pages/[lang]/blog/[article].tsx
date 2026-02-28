import BackgroundLines from '@/components/layout/background-lines';
import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import BlogPostContentSections from '@/features/blog-post/BlogPostContentSections';
import BlogPostFooterSection from '@/features/blog-post/BlogPostFooterSection';
import BlogPostHeroSection from '@/features/blog-post/BlogPostHeroSection';
import BlogPostIntroSection from '@/features/blog-post/BlogPostIntroSection';
import BlogPostTableOfContents from '@/features/blog-post/BlogPostTableOfContents';
import { useSanityData } from '@/hooks/useSanityData';
import { extractHeadings } from '@/lib/blog-headings';
import { useLanguage } from '@/providers/language.provider';
import { fetchAllBlogPostSlugs, fetchBlogPost } from '@/services/blogPost.service';
import { fetchDataInfos } from '@/services/data.service';
import { BlogPost, BlogPostSectionContenu, SanityProps } from '@/types';
import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';
import { PortableTextBlock } from 'sanity';

function buildBreadcrumbs(isFrench: boolean, slug: string, title: string) {
  const lang = isFrench ? 'fr' : 'en';
  return [
    { name: isFrench ? 'Accueil' : 'Home', url: `${META.url}/${lang}` },
    { name: 'Blog', url: `${META.url}/${lang}/blog` },
    { name: title, url: `${META.url}/${lang}/blog/${slug}` },
  ];
}

export default function BlogPostRoute({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSanityData(post);
  const { isFrench } = useLanguage();

  const headings = useMemo(() => {
    if (!data?.content) return [];
    const lang = isFrench ? 'fr' : 'en';
    const blocks = (data.content as BlogPostSectionContenu[])
      .filter((s) => s._type === 'blogPostSectionContenu')
      .flatMap((s) => (s.content?.[lang] ?? []) as PortableTextBlock[]);
    return extractHeadings(blocks);
  }, [data?.content, isFrench]);

  if (!data) return null;

  const breadcrumbs = buildBreadcrumbs(
    isFrench,
    data.slug.current,
    data.h1[isFrench ? 'fr' : 'en'],
  );

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
          __html: JSON.stringify(buildJsonLd(data, isFrench, breadcrumbs)),
        }}
      />

      <BlogPostHeroSection
        breadcrumbItems={breadcrumbs}
        isFrench={isFrench}
        location="Paris | Rotterdam"
        post={data}
        totalAwards={17}
      />

      <div className="pb-y-double-default sticky top-0 min-h-screen bg-white text-black">
        <BackgroundLines isDark={false} />

        <div>
          <div className={clsx('px-x-default pt-y-default grid grid-cols-12 gap-5')}>
            {headings.length > 0 && (
              <aside className="top-[100px] col-span-3 lg:sticky lg:self-start">
                <BlogPostTableOfContents headings={headings} isFrench={isFrench} />
              </aside>
            )}
            <main className="px-x-default col-span-9">
              <BlogPostIntroSection isFrench={isFrench} post={data} />
              {data.content && data.content.length > 0 && (
                <BlogPostContentSections isFrench={isFrench} sections={data.content} />
              )}
            </main>
          </div>
          <BlogPostFooterSection isFrench={isFrench} post={data} />
        </div>
      </div>
    </div>
  );
}

// ——— JSON-LD ———

function buildJsonLd(
  post: BlogPost,
  isFrench: boolean,
  breadcrumbs: { name: string; url: string }[],
) {
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

  // BreadcrumbList — généré automatiquement : Accueil > Blog > [article]
  graphs.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  });

  // FAQPage — section FAQ en fin d'article
  const faqItems =
    post.faq?.map((item) => ({
      '@type': 'Question',
      name: lang === 'fr' ? item.question.fr : item.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: lang === 'fr' ? item.answer.fr : item.answer.en,
      },
    })) ?? [];
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
      langs.map((lang) => ({ params: { lang, article: slug } })),
    ),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  post: SanityProps<BlogPost>;
}> = async (context) => {
  const { params, draftMode = false } = context;
  const slug = params?.article as string;

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
