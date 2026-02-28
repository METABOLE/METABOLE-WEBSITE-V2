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
    <section className="space-y-y-half-default">
      {/* Featured image */}
      {post.featuredImage && (
        <div className="b-y-half-default relative aspect-video w-full overflow-hidden rounded-sm">
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
      <div className="pt-y-half-default intro">
        <RichTextSeo isIntro={true} value={post.introduction[lang]} />
      </div>

      {/* Key Takeaways */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div>
          <p className="p2 pb-y-half-default text-black">
            {isFrench
              ? 'Les points essentiels de cet article :'
              : 'The key takeaways of this article :'}
          </p>
          <ul className="[&_li::marker]:text-blue list-disc space-y-2 pl-6 [&_li]:text-black">
            {post.keyTakeaways.map((item) => (
              <li key={item._key} className="bullet">
                {item.text[lang]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default BlogPostIntroSection;
