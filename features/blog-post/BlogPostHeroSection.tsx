import BackgroundLines from '@/components/layout/background-lines';
import Breadcrumb from '@/components/ui/breadcrumb';
import { urlFor } from '@/sanity/lib/image';
import { BlogPost, BlogPostBreadcrumbItem } from '@/types';
import Image from 'next/image';
import Footer from '../shared/footer';

interface Props {
  post: BlogPost;
  isFrench: boolean;
  location: string;
  totalAwards: number;
  breadcrumbItems?: BlogPostBreadcrumbItem[];
}

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

const BlogPostHeroSection = ({ post, breadcrumbItems, isFrench, location, totalAwards }: Props) => {
  const lang = isFrench ? 'fr' : 'en';
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <section className="sticky top-0 flex min-h-screen flex-col justify-between bg-linear-to-b from-[#000019] to-[#000049] pt-[calc(100px+var(--y-half-default))] text-white">
      <BackgroundLines className="z-0" isDark={true} />

      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb className="px-x-default col-span-12" items={breadcrumbItems} />
      )}

      <div className="px-x-default gap-y-y-default grid h-full grid-cols-12 gap-x-5">
        {/* Category badge */}
        <div className="col-span-12">
          <span className="border-blue/40 text-blue/80 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-widest uppercase">
            {categoryLabel}
          </span>
        </div>

        {/* H1 */}
        <h1 className="col-span-10 col-start-2">{post.h1[lang]}</h1>

        {/* Author + dates */}
        <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.photo && (
                <Image
                  alt={post.author.name}
                  className="h-9 w-9 rounded-full object-cover"
                  height={36}
                  src={urlFor(post.author.photo).width(72).height(72).url()}
                  width={36}
                />
              )}
              <span className="p3 font-medium">{post.author.name}</span>
            </div>
          )}

          <span className="h-4 w-px bg-white/20" />

          <time className="p3 text-white/60" dateTime={post.publishedAt}>
            {isFrench ? 'Publié le' : 'Published on'} {formatDate(post.publishedAt, isFrench)}
          </time>

          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              <span className="h-4 w-px bg-white/20" />
              <time className="p3 text-white/60" dateTime={post.updatedAt}>
                {isFrench ? 'Mis à jour le' : 'Updated on'} {formatDate(post.updatedAt, isFrench)}
              </time>
            </>
          )}

          {post.tags && post.tags.length > 0 && (
            <>
              <span className="h-4 w-px bg-white/20" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="p3 text-white/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer isDark={true} location={location} totalAwards={totalAwards} />
    </section>
  );
};

export default BlogPostHeroSection;
