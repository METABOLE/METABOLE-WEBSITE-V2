import { urlFor } from '@/sanity/lib/image';
import { Testimonial } from '@/types';
import Image from 'next/image';

type Props = {
  testimonial: Testimonial;
  isFrench: boolean;
};

const SeoPageTestimonialItem = ({ testimonial, isFrench }: Props) => {
  const { name, role, company, testimony, photo } = testimonial;

  return (
    <article className="w-[calc(90vw-var(--x-default)*2)] shrink-0 space-y-5 sm:w-[80vw] md:w-[60vw] lg:w-[40vw]">
      <blockquote className="p1">
        <p className="testimonials-item p1">{isFrench ? testimony.fr : testimony.en}</p>
      </blockquote>
      <div className="bg-blue/10 h-px w-56" />
      <footer className="flex items-center gap-3">
        {photo && (
          <Image
            alt={name}
            className="h-[46px] w-[46px] shrink-0 rounded-sm object-cover"
            height={48}
            src={urlFor(photo).width(96).height(96).url()}
            width={48}
          />
        )}
        <div className="space-y-1">
          <p className="text-blue p3">{name}</p>
          <p className="p3 text-black">
            {isFrench ? role.fr : role.en}
            {company && ` @${company}`}
          </p>
        </div>
      </footer>
    </article>
  );
};

export default SeoPageTestimonialItem;
