import BackgroundLines from '@/components/layout/background-lines';
import ParallaxImage from '@/components/shared/parallax-image';
import Title from '@/components/shared/title';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const JoinUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRefs = {
    left: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
  };

  const { isFrench, getInternalPath } = useLanguage();
  const isBelowMD = useMatchMedia(BREAKPOINTS.MD);
  const { contextSafe } = useGSAP();

  const scrubAnimation = contextSafe(() => {
    if (isBelowMD || !sectionRef.current || !itemsRefs.left.current || !itemsRefs.right.current)
      return;
    gsap
      .timeline({
        scrollTrigger: {
          end: 'bottom top',
          scrub: true,
          start: 'top bottom',
          trigger: sectionRef.current,
        },
        defaults: { ease: 'none' },
      })
      .to(itemsRefs.left.current, { y: 200 })
      .to(itemsRefs.right.current, { y: 400 }, '<');
  });

  useGSAP(() => {
    scrubAnimation();
  }, [isBelowMD]);

  useEffect(() => {
    if (isBelowMD && itemsRefs.left.current && itemsRefs.right.current) {
      gsap.set([itemsRefs.left.current, itemsRefs.right.current], { y: 0 });
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    }
  }, [isBelowMD]);

  return (
    <section
      ref={sectionRef}
      className="md:pt-y-double-default py-y-double-default sticky z-90 bg-white md:pb-0"
    >
      <BackgroundLines />
      <div className="px-x-default">
        <Title color="blue">{isFrench ? 'NOUS REJOINDRE' : 'JOIN US'}</Title>
      </div>
      <div className="px-x-default px-x grid md:grid-cols-[50px_5fr_2fr_5fr_50px] md:pb-[400px]">
        <div
          ref={itemsRefs.left}
          className="pt-y-default pb-y-default gap-y-default col-span-2 flex flex-col md:pb-0"
        >
          <Typography className="h2" variant="h3">
            {isFrench ? (
              <>
                Pour <span className="text-blue">construire les marques de demain</span> avec nous,
                c’est par ici.
              </>
            ) : (
              <>
                To <span className="text-blue">build the brands of tomorrow</span> with us, it’s
                here.
              </>
            )}
          </Typography>
          <ParallaxImage aspectRatio="aspect-square" parallaxOffset={-200}>
            <Image
              alt="Join Us"
              className="h-full w-full object-cover"
              height={1000}
              src="/images/home/join-us/join-us-1.jpg"
              width={1000}
            />
          </ParallaxImage>
        </div>
        <div ref={itemsRefs.right} className="gap-y-default col-span-2 -col-end-1 flex flex-col">
          <ParallaxImage
            aspectRatio="aspect-square"
            className="hidden md:block"
            parallaxOffset={-200}
          >
            <Image
              alt="Join Us"
              className="h-full w-full object-cover"
              height={1000}
              src="/images/home/join-us/join-us-2.jpg"
              width={1000}
            />
          </ParallaxImage>
          <div className="space-y-10">
            <Typography className="p3-regular" variant="h4">
              {isFrench
                ? 'Vous êtes à la fois créatif, ambitieux, stratégique et sympa. Venez, on s’écrit et on voit ce qu’on peut faire ensemble.'
                : 'You are both creative, ambitious, strategic and nice. Come, we write and see what we can do together.'}
            </Typography>
            <Button color="secondary" href={getInternalPath('/contact')}>
              {isFrench ? 'Contactez-nous' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
