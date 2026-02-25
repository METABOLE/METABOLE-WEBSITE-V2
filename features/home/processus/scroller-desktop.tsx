import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import { useIdleCallback } from '@/hooks/useIdleCallback';
import { useLanguage } from '@/providers/language.provider';
import { processus } from '@/services/processus.service';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

const ScrollerDesktop = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRefs = {
    first: useRef<HTMLDivElement>(null),
    second: useRef<HTMLDivElement>(null),
    third: useRef<HTMLDivElement>(null),
  };
  const titleRefs = {
    first: useRef<HTMLDivElement>(null),
    second: useRef<HTMLDivElement>(null),
    third: useRef<HTMLDivElement>(null),
  };
  const textRefs = {
    first: useRef<HTMLParagraphElement>(null),
    second: useRef<HTMLParagraphElement>(null),
    third: useRef<HTMLParagraphElement>(null),
  };
  const splitTextRefs = {
    first: useRef<SplitText>(null),
    second: useRef<SplitText>(null),
    third: useRef<SplitText>(null),
  };

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const setupAnimation = contextSafe(() => {
    const textEls = [textRefs.first.current, textRefs.second.current, textRefs.third.current];
    const itemEls = [itemsRefs.first.current, itemsRefs.second.current, itemsRefs.third.current];
    const titleEls = [titleRefs.first.current, titleRefs.second.current, titleRefs.third.current];
    const allReady =
      textEls.every((el) => el != null) &&
      itemEls.every((el) => el != null) &&
      titleEls.every((el) => el != null);
    if (!allReady) return;

    splitTextRefs.first.current = new SplitText(textRefs.first.current, {
      type: 'lines',
      mask: 'lines',
    });
    splitTextRefs.second.current = new SplitText(textRefs.second.current, {
      type: 'lines',
      mask: 'lines',
    });
    splitTextRefs.third.current = new SplitText(textRefs.third.current, {
      type: 'lines',
      mask: 'lines',
    });

    const allLines = [
      ...(splitTextRefs.first.current?.lines ?? []),
      ...(splitTextRefs.second.current?.lines ?? []),
      ...(splitTextRefs.third.current?.lines ?? []),
    ].filter((el): el is Element => el instanceof Element);

    if (allLines.length > 0) {
      gsap.set(allLines, { y: 100 });
    }
    gsap.set(itemEls, { scaleY: 0 });
    gsap.set(titleEls, { clipPath: 'inset(0 100% 0 0%)' });
  });

  const pinAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${itemsRefs.first.current?.clientHeight ?? 0 * 2}`,
          pin: true,
          scrub: true,
        },
        defaults: {
          ease: 'none',
        },
      })
      .to(titleRefs.first.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        splitTextRefs.first.current?.lines || [],
        {
          y: 0,
          ease: 'power1.out',
          duration: 0.6,
          stagger: 0.07,
        },
        '<',
      )
      .to(titleRefs.second.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        splitTextRefs.second.current?.lines || [],
        {
          y: 0,
          ease: 'power1.out',
          duration: 0.6,
          stagger: 0.07,
        },
        '<',
      )
      .to(titleRefs.third.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        splitTextRefs.third.current?.lines || [],
        {
          y: 0,
          ease: 'power1.out',
          duration: 0.6,
          stagger: 0.07,
        },
        '<',
      );
  });

  const scrubAnimationEnter = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      })
      .to([itemsRefs.first.current, itemsRefs.second.current, itemsRefs.third.current], {
        scaleY: 1,
        ease: 'power1.out',
        stagger: 0.1,
      });
  });

  const scrubAnimationExit = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#testimonials',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to([itemsRefs.first.current, itemsRefs.second.current, itemsRefs.third.current], {
        y: -500,
        ease: 'power1.in',
        stagger: 0.1,
      });
  });

  useIdleCallback(() => {
    setupAnimation();
    pinAnimation();
    scrubAnimationEnter();
    scrubAnimationExit();
  });

  return (
    <section ref={sectionRef} className="sticky h-screen bg-white pt-[100px]">
      <BackgroundLines className="top-0" isDark={false} />
      <div className="pb-y-default px-x-default pt-y-default">
        <Title color="blue">PROCESSUS</Title>
      </div>
      <div
        className="grid items-end"
        style={{ gridTemplateColumns: 'var(--x-default) repeat(3, 1fr) var(--x-default)' }}
      >
        <div
          ref={itemsRefs.first}
          className="relative col-span-2 h-[calc(100vh-35px)] origin-bottom"
        >
          <div className="bg-blue/10 absolute top-0 left-0 h-[35px] w-full" />
          <div
            ref={titleRefs.first}
            className="bg-blue pl-x-double-default xl:pl-x-default flex h-[35px] w-full items-center gap-5 text-white xl:gap-10"
          >
            <span>/1</span>
            <p className="p3-medium">{processus[0].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="pl-x-double-default relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 pr-5 text-white xl:pl-[calc(var(--x-default)+54px)]">
            <BackgroundLines className="z-10" isDark={true} />
            <div ref={textRefs.first}>
              <p className="p3-medium pb-6">{processus[0].duration[isFrench ? 'fr' : 'en']}</p>
              <p className="p3-regular text-white/70">
                {processus[0].description[isFrench ? 'fr' : 'en']}
              </p>
            </div>
          </div>
        </div>
        <div
          ref={itemsRefs.second}
          className="relative col-span-1 h-[calc(100vh-70px)] origin-bottom"
        >
          <div className="bg-blue/10 absolute top-0 left-0 h-[35px] w-full" />
          <div
            ref={titleRefs.second}
            className="bg-blue pl-x-default flex h-[35px] w-full items-center gap-5 text-white xl:gap-10 xl:pl-10"
          >
            <span>/2</span>
            <p className="p3-medium">{processus[1].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="pl-x-default relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 pr-5 text-white xl:pl-[97px]">
            <BackgroundLines className="left-1/2 z-10 -translate-x-1/2" isDark={true} />
            <div ref={textRefs.second}>
              <p className="p3-medium pb-6">{processus[1].duration[isFrench ? 'fr' : 'en']}</p>
              <p className="p3-regular text-white/70">
                {processus[1].description[isFrench ? 'fr' : 'en']}
              </p>
            </div>
          </div>
        </div>
        <div
          ref={itemsRefs.third}
          className="relative col-span-2 h-[calc(100vh-105px)] origin-bottom"
        >
          <div className="bg-blue/10 absolute top-0 left-0 h-[35px] w-full" />
          <div
            ref={titleRefs.third}
            className="bg-blue pl-x-default flex h-[35px] w-full items-center gap-5 text-white xl:gap-10 xl:pl-10"
          >
            <span>/3</span>
            <p className="p3-medium">{processus[2].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="pr-x-default pl-x-default relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 text-white xl:pl-[98px]">
            <BackgroundLines className="right-0! left-auto z-20" isDark={true} />
            <div ref={textRefs.third}>
              <p className="p3-medium pb-6">{processus[2].duration[isFrench ? 'fr' : 'en']}</p>
              <p className="p3-regular text-white/70">
                {processus[2].description[isFrench ? 'fr' : 'en']}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollerDesktop;
