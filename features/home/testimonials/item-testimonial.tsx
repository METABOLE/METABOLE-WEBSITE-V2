import { useLanguage } from '@/providers/language.provider';
import { urlFor } from '@/sanity/lib/image';
import { Testimonial } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

const ItemTestimonial = ({
  isActive,
  testimony,
  company,
  name,
  photo,
  role,
}: Testimonial & { isActive: boolean }) => {
  const testimonialRefs = {
    container: useRef<HTMLDivElement>(null),
    testimony: useRef(null),
    name: useRef(null),
    role: useRef(null),
    image: useRef(null),
  };
  const spliteTextRef = {
    testimony: useRef<SplitText>(null),
  };
  const [height, setHeight] = useState(0);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  const setupAnimation = contextSafe(() => {
    if (!testimonialRefs.testimony.current) return;
    spliteTextRef.testimony.current = new SplitText(testimonialRefs.testimony.current, {
      type: 'lines',
      mask: 'lines',
    });

    gsap.set(spliteTextRef.testimony.current?.lines || [], { y: 100, opacity: 0 });
    gsap.set([testimonialRefs.name.current, testimonialRefs.role.current], { y: 50, opacity: 0 });
    gsap.set(testimonialRefs.image.current, { clipPath: 'inset(0 100% 0 0%)' });
  });

  const revealAnimation = contextSafe(() => {
    gsap
      .timeline()
      .set(testimonialRefs.image.current, { clipPath: 'inset(0 100% 0 0%)' })
      .to(testimonialRefs.image.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(
        spliteTextRef.testimony.current?.lines || [],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.07,
          ease: 'power4.out',
        },
        '-=0.5',
      )
      .to(
        [testimonialRefs.name.current, testimonialRefs.role.current],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.07,
          ease: 'power4.out',
        },
        '<',
      );
  });

  const hideAnimation = contextSafe(() => {
    gsap
      .timeline()
      .to(spliteTextRef.testimony.current?.lines || [], {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power4.in',
      })
      .to(
        [testimonialRefs.name.current, testimonialRefs.role.current],
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power4.in',
        },
        '<',
      )
      .to(
        testimonialRefs.image.current,
        {
          clipPath: 'inset(0 0% 0 100%)',
          duration: 1,
          ease: 'power1.inOut',
        },
        '<',
      );
  });

  useGSAP(() => {
    setupAnimation();
    setHeight(testimonialRefs.container.current?.clientHeight || 0);
  }, []);

  useGSAP(() => {
    if (isActive) {
      revealAnimation();
    } else {
      hideAnimation();
    }
  }, [isActive]);

  return (
    <>
      <div
        ref={testimonialRefs.container}
        aria-hidden={!isActive}
        className="absolute col-span-10 col-start-2 w-full text-white"
        style={{
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        <div className="overflow-hidden">
          <p ref={testimonialRefs.testimony} className="h2 clamp-4">
            {testimony[isFrench ? 'fr' : 'en']}
          </p>
        </div>
        <div className="flex items-center gap-4 pt-10">
          <Image
            ref={testimonialRefs.image}
            alt={name}
            className="h-16 w-16 shrink-0 rounded-sm object-cover"
            height={100}
            src={urlFor(photo).url()}
            width={100}
          />
          <div>
            <div className="overflow-hidden">
              <p ref={testimonialRefs.name} className="p2 whitespace-nowrap uppercase">
                {name}
              </p>
            </div>
            <div className="overflow-hidden">
              <p
                ref={testimonialRefs.role}
                className="p3-regular pt-1 whitespace-nowrap text-white/70"
              >
                {role[isFrench ? 'fr' : 'en']} @{company}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="invisible col-start-1 col-end-1 row-start-1 row-end-1"
        style={{
          height: height + 'px',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />
    </>
  );
};

export default ItemTestimonial;
