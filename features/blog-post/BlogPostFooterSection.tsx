import Button from '@/components/ui/button';
import RichTextSeo from '@/components/ui/rich-text-seo';
import { urlFor } from '@/sanity/lib/image';
import { BlogPost, BlogPostRelated } from '@/types';
import Image from 'next/image';

interface Props {
  post: BlogPost;
  isFrench: boolean;
}

const RelatedPostCard = ({ post, isFrench }: { post: BlogPostRelated; isFrench: boolean }) => {
  const lang = isFrench ? 'fr' : 'en';
  const slug = post.slug?.current;

  return (
    <a className="group flex flex-col gap-3" href={`/${isFrench ? 'fr' : 'en'}/blog/${slug}`}>
      {post.featuredImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-sm">
          <Image
            alt={post.featuredImageAlt?.[lang] ?? post.metaTitle}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={urlFor(post.featuredImage).width(600).height(338).url()}
            fill
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="p3 text-black/50">{post.author?.name}</p>
        <p className="p2 font-medium group-hover:underline">{post.h1?.[lang] ?? post.metaTitle}</p>
      </div>
    </a>
  );
};

const BlogPostFooterSection = ({ post, isFrench }: Props) => {
  const lang = isFrench ? 'fr' : 'en';

  return (
    <>
      {/* Conclusion */}
      {post.conclusion && (
        <section className="px-x-default pt-y-default">
          <div className="bg-blue/5 border-blue/10 rounded-sm border p-6 md:p-10">
            <RichTextSeo value={post.conclusion[lang]} />
          </div>
        </section>
      )}

      {/* CTA */}
      {post.ctaLabel && post.ctaHref && (
        <section className="px-x-default pt-y-default flex flex-col items-center text-center">
          <Button color="primary" href={post.ctaHref}>
            {post.ctaLabel[lang]}
          </Button>
        </section>
      )}

      {/* Sources */}
      {post.sources && post.sources.length > 0 && (
        <section className="px-x-default pt-y-default">
          <div className="bg-blue/10 mb-y-half-default h-px w-full" />
          <p className="p3 mb-3 tracking-widest text-black/50 uppercase">
            {isFrench ? 'Sources' : 'Sources'}
          </p>
          <ol className="space-y-1">
            {post.sources.map((source, index) => (
              <li key={source._key} className="p3">
                <span className="mr-2 text-black/40">{index + 1}.</span>
                <a
                  className="text-blue underline underline-offset-2"
                  href={source.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Related posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="px-x-default pt-y-default">
          <div className="bg-blue/10 mb-y-default h-px w-full" />
          <h2 className="h3 mb-y-half-default">
            {isFrench ? 'Articles recommandés' : 'Recommended articles'}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {post.relatedPosts.map((related) => (
              <RelatedPostCard key={related._id} isFrench={isFrench} post={related} />
            ))}
          </div>
        </section>
      )}

      {/* Related projects */}
      {post.relatedProjects && post.relatedProjects.length > 0 && (
        <section className="px-x-default pt-y-default pb-y-default">
          <p className="p3 mb-3 tracking-widest text-black/50 uppercase">
            {isFrench ? 'Projets clients liés' : 'Related client projects'}
          </p>
          <ul className="flex flex-wrap gap-3">
            {post.relatedProjects.map((project) => (
              <li key={project.slug?.current}>
                <a
                  className="border-blue/20 hover:border-blue p3 inline-block rounded-full border px-4 py-2 transition-colors"
                  href={`/${isFrench ? 'fr' : 'en'}/projects/${project.slug?.current}`}
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default BlogPostFooterSection;
