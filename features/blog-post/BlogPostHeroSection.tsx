import BackgroundLines from '@/components/layout/background-lines';
import Breadcrumb from '@/components/ui/breadcrumb';
import { IconCross } from '@/components/ui/icons';
import { BlogPost } from '@/types';

interface Props {
  post: BlogPost;
  isFrench: boolean;
  location: string;
  totalAwards: number;
  breadcrumbItems?: { name: string; url: string }[];
}

function formatDate(dateStr: string, isFrench: boolean): string {
  return new Date(dateStr).toLocaleDateString(isFrench ? 'fr-FR' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const BlogPostHeroSection = ({ post, breadcrumbItems, isFrench }: Props) => {
  const lang = isFrench ? 'fr' : 'en';

  return (
    <section className="sticky top-0 flex min-h-screen flex-col justify-between bg-linear-to-b from-[#000019] to-[#000049] pt-[calc(100px+var(--y-half-default))] text-white">
      <BackgroundLines className="z-0" isDark={true} />

      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb className="px-x-default col-span-12" items={breadcrumbItems} />
      )}

      <div className="px-x-default gap-y-y-default grid h-full grid-cols-12 gap-x-5">
        {/* H1 */}
        <div className="space-y-y-default col-span-10 col-start-2">
          <h1 className="h1">{post.h1[lang]}</h1>
          <div className="flex flex-wrap items-center">
            {post.author && (
              <div className="label">
                <p>
                  Par <span className="text-yellow">{post.author.name}</span>
                </p>
                <p className="text-white/70">{post.author.role[lang]}</p>
                <p className="text-white/70">@Metabole Studio</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-x-default flex h-fit w-full grid-cols-3 items-center justify-between gap-5 pb-8 text-white sm:grid md:grid-cols-12">
        <time className="text-left text-sm! md:col-span-3" dateTime={post.publishedAt}>
          Publié le : {formatDate(post.publishedAt, isFrench)}
        </time>
        <div className="hidden md:block">
          <IconCross className="-translate-x-[5px] fill-white" />
        </div>
        <time
          className="font-safiro-medium! text-center text-sm! md:col-span-4"
          dateTime={post.updatedAt}
        >
          {post.updatedAt ? 'Mis à jour le : ' + formatDate(post.updatedAt, isFrench) : ''}
        </time>
        <div className="hidden justify-end md:flex">
          <IconCross className="translate-x-[5px] fill-white" />
        </div>
        <p className="hidden text-right text-sm! sm:block md:col-span-3">8 min de lecture</p>
      </div>
    </section>
  );
};

export default BlogPostHeroSection;
