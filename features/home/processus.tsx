import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const Processus = () => {
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

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const setupAnimation = contextSafe(() => {
    gsap.set([itemsRefs.first.current, itemsRefs.second.current, itemsRefs.third.current], {
      scaleY: 0,
    });
    gsap.set([titleRefs.first.current, titleRefs.second.current, titleRefs.third.current], {
      clipPath: 'inset(0 100% 0 0%)',
    });
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
      })
      .to(titleRefs.second.current, {
        clipPath: 'inset(0 0% 0 0%)',
      })
      .to(titleRefs.third.current, {
        clipPath: 'inset(0 0% 0 0%)',
      });
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

  useGSAP(() => {
    pinAnimation();
    scrubAnimationEnter();
    scrubAnimationExit();
    setupAnimation();
  }, []);

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
            className="bg-blue pl-x-default flex h-[35px] w-full items-center gap-10 text-white"
          >
            <span>/1</span>
            <p className="p3-medium">{isFrench ? 'STRATÉGIE' : 'STRATEGY'}</p>
          </div>
          <div className="relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 pr-5 pl-[calc(var(--x-default)+54px)] text-white">
            <BackgroundLines className="z-10" isDark={true} />
            <p className="p3-medium pb-6">2 SEM - 3 SEM</p>
            <p className="p3-regular text-white/70">
              Non urna at amet suscipit adipiscing bibendum et elit quis. Arcu tellus pulvinar quis
              tortor fermentum consequat. Pellentesque commodo faucibus egestas facilisi feugiat.
            </p>
          </div>
        </div>
        <div
          ref={itemsRefs.second}
          className="relative col-span-1 h-[calc(100vh-70px)] origin-bottom"
        >
          <div className="bg-blue/10 absolute top-0 left-0 h-[35px] w-full" />
          <div
            ref={titleRefs.second}
            className="bg-blue flex h-[35px] w-full items-center gap-10 pl-10 text-white"
          >
            <span>/2</span>
            <p className="p3-medium">{isFrench ? 'DIRECTION ARTISTIQUE' : 'ARTISTIC DIRECTION'}</p>
          </div>
          <div className="relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 pr-5 pl-[97px] text-white">
            <BackgroundLines className="left-1/2 z-10 -translate-x-1/2" isDark={true} />
            <p className="p3-medium pb-6">3 SEM - 3 SEM</p>
            <p className="p3-regular text-white/70">
              Non urna at amet suscipit adipiscing bibendum et elit quis. Arcu tellus pulvinar quis
              tortor fermentum consequat. Pellentesque commodo faucibus egestas facilisi feugiat.
            </p>
          </div>
        </div>
        <div
          ref={itemsRefs.third}
          className="relative col-span-2 h-[calc(100vh-105px)] origin-bottom"
        >
          <div className="bg-blue/10 absolute top-0 left-0 h-[35px] w-full" />
          <div
            ref={titleRefs.third}
            className="bg-blue flex h-[35px] w-full items-center gap-10 pl-10 text-white"
          >
            <span>/3</span>
            <p className="p3-medium">{isFrench ? 'DÉVELOPPEMENT WEB' : 'WEB DEVELOPMENT'}</p>
          </div>
          <div className="pr-x-default relative h-[calc(100vh+500px)] w-full overflow-hidden bg-black pt-20 pl-[98px] text-white">
            <BackgroundLines className="right-0! left-auto z-20" isDark={true} />
            <p className="p3-medium pb-6">2 SEM - 3 SEM</p>
            <p className="p3-regular text-white/70">
              Non urna at amet suscipit adipiscing bibendum et elit quis. Arcu tellus pulvinar quis
              tortor fermentum consequat. Pellentesque commodo faucibus egestas facilisi feugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Processus;
