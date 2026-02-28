import BackgroundLines from '@/components/layout/background-lines';
import Button from '@/components/ui/button';
import { urlFor } from '@/sanity/lib/image';
import { BlogPost } from '@/types';
import { useLanguage } from '@/providers/language.provider';
import FinalCta from '@/features/shared/final-cta';
import Footer from '@/features/shared/footer';
import Image from 'next/image';

const CATEGORY_LABELS: Record<string, string> = {
  'strategie-web': 'Stratégie web',
  'design-creativite': 'Design & créativité',
  developpement: 'Développement',
  'seo-performance': 'SEO & performance',
  branding: 'Branding',
  actualites: 'Actualités',
};

function formatDate(dateStr: string, isFrench: boolean): string {
  return new Date(dateStr).toLocaleDateString(isFrench ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogCard = ({ post, isFrench }: { post: BlogPost; isFrench: boolean }) => {
  const lang = isFrench ? 'fr' : 'en';
  const slug = post.slug?.current;
  const href = `/${isFrench ? 'fr' : 'en'}/blog/${slug}`;
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <article>
      <a className="group flex flex-col gap-4" href={href}>
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black/5">
          {post.featuredImage && (
            <Image
              alt={post.featuredImageAlt?.[lang] ?? post.metaTitle}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={urlFor(post.featuredImage).width(800).height(450).url()}
              fill
            />
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3">
          <span className="border-blue/30 text-blue p3 rounded-full border px-3 py-0.5 text-xs font-medium tracking-wider uppercase">
            {categoryLabel}
          </span>
          <span className="p3 text-black/40">{formatDate(post.publishedAt, isFrench)}</span>
        </div>

        {/* Title */}
        <h2 className="h3 group-hover:text-blue transition-colors duration-200">
          {post.h1?.[lang] ?? post.metaTitle}
        </h2>

        {/* Author */}
        {post.author && <p className="p3 text-black/50">{post.author.name}</p>}
      </a>
    </article>
  );
};

interface Props {
  posts: BlogPost[];
}

const BlogList = ({ posts }: Props) => {
  const { isFrench } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="sticky top-0 flex min-h-screen flex-col justify-between bg-linear-to-b from-[#000019] to-[#000049] pt-[calc(100px+var(--y-half-default))] text-white">
        <BackgroundLines className="z-0" isDark={true} />
        <div className="px-x-default gap-y-y-default grid h-full grid-cols-12 gap-x-5">
          <div className="col-span-12">
            <p className="p3 mb-4 tracking-widest text-white/50 uppercase">Blog</p>
            <h1 className="col-span-10">
              {isFrench ? 'Nos articles & ressources' : 'Our articles & resources'}
            </h1>
          </div>
          <div className="col-span-5 col-start-6">
            <p className="p2 text-white/70">
              {isFrench
                ? "Stratégie web, design, développement et SEO — les insights de l'équipe Metabole."
                : 'Web strategy, design, development and SEO — insights from the Metabole team.'}
            </p>
          </div>
        </div>
        <Footer isDark={true} location="Paris | Rotterdam" totalAwards={17} />
      </section>

      {/* Liste des articles */}
      <section className="sticky top-0 min-h-screen bg-white text-black">
        <BackgroundLines isDark={false} />

        <div className="px-x-default pt-y-default pb-y-double-default">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-32 text-center">
              <p className="p1 text-black/40">
                {isFrench ? 'Aucun article pour le moment.' : 'No articles yet.'}
              </p>
              <Button color="primary" href={isFrench ? '/fr' : '/en'}>
                {isFrench ? "Retour à l'accueil" : 'Back to home'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} isFrench={isFrench} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
};

export default BlogList;
