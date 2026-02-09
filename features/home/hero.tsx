import BackgroundLines from '@/components/layout/background-lines';
import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import Showreel from '@/features/home/showreel';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
    <>
      <div
        ref={sectionRef}
        className="gap-y-default px-x-default relative flex h-screen w-screen flex-col items-center justify-center text-center text-white"
      >
        <BackgroundLines className="z-0" isDark={true} />
        <Image
          alt="Metabole"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          height={1920}
          src="/images/home/hero.png"
          width={1920}
        />
        <h1 className="h1 font-safiro-regular! max-w-5xl">
          Le studio créatif premium des entreprises de demain.
        </h1>
        <p className="p3 max-w-5xl uppercase">
          Stratégie - Direction artistique - Développement web
        </p>
        <Showreel />
        <div className="px-x-default absolute bottom-0 left-0 z-50 grid w-full grid-cols-12 items-center justify-between gap-5 pb-8">
          <p className="col-span-3 text-left text-sm!">Metabole® 2025</p>
          <div className="">
            <IconCross className="-translate-x-[5px] fill-white" />
          </div>
          <p className="col-span-4 text-sm!">Paris | Rotterdam</p>
          <div className="flex justify-end">
            <IconCross className="translate-x-[5px] fill-white" />
          </div>
          <Time className="col-span-3 text-right text-sm!" isDark={true} />
        </div>
      </div>
    </>
  );
};

export default Hero;
