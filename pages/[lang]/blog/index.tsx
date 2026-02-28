import SEO from '@/components/ui/SEO';
import BlogList from '@/features/blog/BlogList';
import { getStaticPathsForLang, META } from '@/constants';
import { useSanityData } from '@/hooks/useSanityData';
import { useLanguage } from '@/providers/language.provider';
import { fetchAllBlogPosts } from '@/services/blogPost.service';
import { BlogPost, SanityProps } from '@/types';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function BlogIndex({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSanityData(posts);
  const { isFrench } = useLanguage();

  return (
    <>
      <SEO
        descriptionEn="Web strategy, design, development and SEO — insights from the Metabole team."
        descriptionFr="Stratégie web, design, développement et SEO — les insights de l'équipe Metabole."
        isFrench={isFrench}
        noindex={false}
        title="Blog — Metabole Studio"
        url={`${META.url}/${isFrench ? 'fr' : 'en'}/blog`}
      />
      <BlogList posts={data ?? []} />
    </>
  );
}

export async function getStaticPaths() {
  return getStaticPathsForLang();
}

export const getStaticProps: GetStaticProps<{
  posts: SanityProps<BlogPost[]>;
}> = async (context) => {
  const { draftMode = false } = context;
  const posts = await fetchAllBlogPosts({ draftMode });

  return {
    props: {
      posts,
      draftMode,
    },
  };
};
