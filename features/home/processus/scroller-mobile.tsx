import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import { useIdleCallback } from '@/hooks/useIdleCallback';
import { useLanguage } from '@/providers/language.provider';
import { processus } from '@/services/processus.service';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

const ScrollerMobile = () => {
  const { isFrench } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titlesWrapperRef = useRef<HTMLDivElement>(null);
  const titleRefs = {
    first: useRef<HTMLDivElement>(null),
    second: useRef<HTMLDivElement>(null),
    third: useRef<HTMLDivElement>(null),
  };
  const textRefs = {
    first: useRef<HTMLDivElement>(null),
    second: useRef<HTMLDivElement>(null),
    third: useRef<HTMLDivElement>(null),
  };
  const splitTextRefs = {
    first: useRef<SplitText | null>(null),
    second: useRef<SplitText | null>(null),
    third: useRef<SplitText | null>(null),
  };

  const { contextSafe } = useGSAP();

  const setupAnimation = contextSafe(() => {
    const titleEls = [titleRefs.first.current, titleRefs.second.current, titleRefs.third.current];
    const textEls = [textRefs.first.current, textRefs.second.current, textRefs.third.current];
    if (!titleEls.every((el) => el != null) || !textEls.every((el) => el != null)) return;

    gsap.set(titleEls, { clipPath: 'inset(0 100% 0 0%)' });

    splitTextRefs.first.current = new SplitText(textRefs.first.current, {
      type: 'lines',
      linesClass: 'processus-line',
    });
    splitTextRefs.second.current = new SplitText(textRefs.second.current, {
      type: 'lines',
      linesClass: 'processus-line',
    });
    splitTextRefs.third.current = new SplitText(textRefs.third.current, {
      type: 'lines',
      linesClass: 'processus-line',
    });

    const allLines = [
      ...(splitTextRefs.first.current?.lines ?? []),
      ...(splitTextRefs.second.current?.lines ?? []),
      ...(splitTextRefs.third.current?.lines ?? []),
    ].filter((el): el is Element => el instanceof Element);
    if (allLines.length > 0) {
      gsap.set(allLines, { y: 24, opacity: 0 });
    }
  });

  const pinAnimation = contextSafe(() => {
    const totalHeight = titlesWrapperRef.current?.offsetHeight ?? 105;
    const lines1 = splitTextRefs.first.current?.lines ?? [];
    const lines2 = splitTextRefs.second.current?.lines ?? [];
    const lines3 = splitTextRefs.third.current?.lines ?? [];

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalHeight * 3}`,
          pin: true,
          scrub: true,
        },
        defaults: {
          ease: 'none',
        },
      })
      // Étape 1 : Stratégie
      .to(titleRefs.first.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        lines1,
        {
          y: 0,
          opacity: 1,
          ease: 'power1.out',
          duration: 0.5,
          stagger: 0.06,
        },
        '<',
      )
      .to(lines1, {
        opacity: 0,
        duration: 0.35,
      })
      // Étape 2 : Direction artistique
      .to(titleRefs.second.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        lines2,
        {
          y: 0,
          opacity: 1,
          ease: 'power1.out',
          duration: 0.5,
          stagger: 0.06,
        },
        '<',
      )
      .to(lines2, {
        opacity: 0,
        duration: 0.35,
      })
      // Étape 3 : Développement web
      .to(titleRefs.third.current, {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1,
      })
      .to(
        lines3,
        {
          y: 0,
          opacity: 1,
          ease: 'power1.out',
          duration: 0.5,
          stagger: 0.06,
        },
        '<',
      );
  });

  useIdleCallback(() => {
    setupAnimation();
    pinAnimation();
  });

  return (
    <section ref={sectionRef} className="sticky h-screen bg-white pt-[100px]">
      <BackgroundLines className="top-0" isDark={false} />
      <div className="pb-y-default px-x-default pt-y-default">
        <Title color="blue">PROCESSUS</Title>
      </div>
      <div ref={titlesWrapperRef} className="h-full space-y-px">
        <div className="relative h-[35px] w-full text-white">
          <div
            ref={titleRefs.first}
            className="bg-blue px-x-default flex h-full shrink-0 items-center gap-5"
          >
            <span>/1</span>
            <p className="p3-medium">{processus[0].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="bg-blue/10 absolute top-0 left-0 h-full w-full" />
        </div>
        <div className="relative h-[35px] w-full pt-px text-white">
          <div
            ref={titleRefs.second}
            className="bg-blue px-x-default flex h-full shrink-0 items-center gap-5"
          >
            <span>/2</span>
            <p className="p3-medium">{processus[1].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="bg-blue/10 absolute top-0 left-0 h-full w-full" />
        </div>
        <div className="relative h-[35px] w-full pt-px text-white">
          <div
            ref={titleRefs.third}
            className="bg-blue px-x-default flex h-full shrink-0 items-center gap-5"
          >
            <span>/3</span>
            <p className="p3-medium">{processus[2].title[isFrench ? 'fr' : 'en']}</p>
          </div>
          <div className="bg-blue/10 absolute top-0 left-0 h-full w-full" />
        </div>
        <div className="px-x-default relative h-full min-h-[50vh] bg-black pt-12 pb-20">
          <BackgroundLines className="right-0! left-auto z-20" isDark={true} />
          <div
            ref={textRefs.first}
            className="px-x-default absolute top-12 right-0 left-0 text-white"
          >
            <p className="p3-medium pb-2">{processus[0].duration[isFrench ? 'fr' : 'en']}</p>
            <p className="p3-regular text-white/70">
              {processus[0].description[isFrench ? 'fr' : 'en']}
            </p>
          </div>
          <div
            ref={textRefs.second}
            className="px-x-default absolute top-12 right-0 left-0 text-white"
          >
            <p className="p3-medium pb-2">{processus[1].duration[isFrench ? 'fr' : 'en']}</p>
            <p className="p3-regular text-white/70">
              {processus[1].description[isFrench ? 'fr' : 'en']}
            </p>
          </div>
          <div
            ref={textRefs.third}
            className="px-x-default absolute top-12 right-0 left-0 text-white"
          >
            <p className="p3-medium pb-2">{processus[2].duration[isFrench ? 'fr' : 'en']}</p>
            <p className="p3-regular text-white/70">
              {processus[2].description[isFrench ? 'fr' : 'en']}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollerMobile;
