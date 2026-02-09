import BackgroundLines from '@/components/layout/background-lines';
import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import Showreel from '@/features/home/showreel';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import HeroScene from './hero-scene';
import Manifesto from './manifesto';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setIsLayoutDark } = useLayoutColor();

  useGSAP(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '50px bottom',
      end: 'bottom 50px',
      onEnter: () => setIsLayoutDark(true),
      onEnterBack: () => setIsLayoutDark(true),
      onLeave: () => setIsLayoutDark(false),
      onLeaveBack: () => setIsLayoutDark(false),
    });
  }, []);

  return (
    <section className="relative">
      <div className="absolute top-0 left-0 z-0 h-full w-screen" aria-hidden>
        <div className="sticky top-0 h-screen w-screen">
          <HeroScene />
        </div>
      </div>
      <BackgroundLines className="z-0" isDark={true} />
      <div className="relative z-10">
        <div className="gap-y-default px-x-default relative flex h-screen w-screen flex-col items-center justify-center text-center text-white">
          <h1 className="h1 font-safiro-regular! max-w-5xl">
            Le studio créatif premium des entreprises de demain.
          </h1>
          <p className="p3 max-w-5xl uppercase">
            Stratégie - Direction artistique - Développement web
          </p>
        </div>
        <Manifesto />
      </div>
      <div className="px-x-default sticky right-0 bottom-0 left-0 z-50 grid h-fit w-full grid-cols-12 items-center gap-5 pb-8 text-white">
        <Showreel />
        <p className="col-span-3 text-left text-sm!">Metabole® 2025</p>
        <div className="">
          <IconCross className="-translate-x-[5px] fill-white" />
        </div>
        <p className="col-span-4 text-center text-sm!">Paris | Rotterdam</p>
        <div className="flex justify-end">
          <IconCross className="translate-x-[5px] fill-white" />
        </div>
        <Time className="col-span-3 text-right text-sm!" isDark={true} />
      </div>
    </section>
  );
};

export default Hero;
