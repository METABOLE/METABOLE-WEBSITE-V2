import RichTextSeo from '@/components/ui/rich-text-seo';
import { urlFor } from '@/sanity/lib/image';
import { BlogPost } from '@/types';
import Image from 'next/image';

interface Props {
  post: BlogPost;
  isFrench: boolean;
}

const BlogPostIntroSection = ({ post, isFrench }: Props) => {
  const lang = isFrench ? 'fr' : 'en';

  return (
    <section className="px-x-default pt-y-default">
      {/* Featured image */}
      {post.featuredImage && (
        <div className="pb-y-default relative aspect-video w-full overflow-hidden rounded-sm">
          <Image
            alt={post.featuredImageAlt?.[lang] ?? post.metaTitle}
            className="object-cover"
            src={urlFor(post.featuredImage).width(1400).height(788).url()}
            fill
            priority
          />
        </div>
      )}

      {/* Introduction */}
      <RichTextSeo value={post.introduction[lang]} />

      {/* Key Takeaways */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div className="border-blue/10 bg-blue/5 mt-y-half-default rounded-sm border p-6">
          <p className="p2 text-blue mb-4 font-semibold">
            {isFrench ? '💡 À retenir' : '💡 Key takeaways'}
          </p>
          <ol className="space-y-2">
            {post.keyTakeaways.map((item, index) => (
              <li key={item._key} className="p3 flex gap-3">
                <span className="text-blue shrink-0 font-semibold">{index + 1}.</span>
                <span>{item.text[lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default BlogPostIntroSection;
