import BackgroundLines from '@/components/layout/background-lines';
import Button from '@/components/ui/button';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { usePerformance } from '@/providers/performance.provider';

const SceneLight = dynamic(() => import('../home/hero/scene-light'), { ssr: false });
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import Image from 'next/image';
import clsx from 'clsx';

const FinalCta = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  const { performanceLevel } = usePerformance();
  const { isFrench, getInternalPath } = useLanguage();
  const { contextSafe } = useGSAP();

  const setupScrollProgress = contextSafe(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.create({
      end: 'bottom top',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
      start: 'top bottom',
      trigger: sectionRef.current,
    });
  });

  useGSAP(() => {
    if (performanceLevel === PERFORMANCE_LEVEL.LOW) return;
    setupScrollProgress();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-x-default py-y-default sticky z-90 flex h-screen flex-col items-center justify-center bg-white text-black"
    >
      <div className="bg-blue/10 absolute top-0 h-px w-full"></div>

      {performanceLevel === PERFORMANCE_LEVEL.HIGH ? (
        <SceneLight scrollProgressRef={scrollProgressRef} />
      ) : (
        <Image
          alt="Scene Light"
          className="absolute top-1/2 left-1/2 z-0 mx-auto h-auto w-[clamp(200px,20vw,400px)] -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
          height={1000}
          src="/images/shared/final-cta/scene-light.png"
          width={1000}
        />
      )}
      <BackgroundLines />
      <h2 className="font-safiro-regular! flex w-full flex-col gap-2 text-[clamp(38px,5vw,96px)]!">
        <span
          className={clsx(
            'inline-block translate-x-1/4 text-left',
            performanceLevel === PERFORMANCE_LEVEL.LOW ? 'opacity-100' : 'opacity-0',
          )}
        >
          {isFrench ? 'Transformez' : 'Transform'}
        </span>
        <span
          className={clsx(
            'inline-block text-left',
            performanceLevel === PERFORMANCE_LEVEL.LOW ? 'opacity-100' : 'opacity-0',
          )}
        >
          {isFrench ? 'votre' : 'your'}
        </span>
        <span
          className={clsx(
            'inline-block text-right',
            performanceLevel === PERFORMANCE_LEVEL.LOW ? 'opacity-100' : 'opacity-0',
          )}
        >
          {isFrench ? 'entreprise' : 'company'}
        </span>
        <span
          className={clsx(
            'inline-block text-center',
            performanceLevel === PERFORMANCE_LEVEL.LOW ? 'opacity-100' : 'opacity-0',
          )}
        >
          {isFrench ? "aujourd'hui" : 'today'}
        </span>
      </h2>
      <Button className="bottom-y-double-default absolute" href={getInternalPath('/contact')}>
        {isFrench ? 'Contactez-nous' : 'Contact us'}
      </Button>
    </section>
  );
};

export default FinalCta;
