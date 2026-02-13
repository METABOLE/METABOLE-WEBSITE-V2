import BackgroundLines from '@/components/layout/background-lines';
import Button from '@/components/ui/button';
import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import SceneLight from './hero/scene-light';

gsap.registerPlugin(ScrollTrigger);

const FinalCta = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

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
    setupScrollProgress();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-x-default py-y-default sticky z-90 flex h-screen flex-col items-center justify-center bg-white text-black"
    >
      <SceneLight scrollProgressRef={scrollProgressRef} />
      <BackgroundLines />
      <h2 className="font-safiro-regular! flex flex-col gap-2 text-[clamp(38px,5vw,96px)]!">
        <span className="inline-block text-left opacity-0">
          {isFrench ? 'Transformez' : 'Transform'}
        </span>
        <span className="inline-block text-left opacity-0">{isFrench ? 'votre' : 'your'}</span>
        <span className="inline-block text-right opacity-0">
          {isFrench ? 'entreprise' : 'company'}
        </span>
        <span className="inline-block text-center opacity-0">
          {isFrench ? "aujourd'hui" : 'today'}
        </span>
      </h2>
      <Button
        className="bottom-y-double-default absolute"
        color="secondary"
        href={getInternalPath('/contact')}
      >
        {isFrench ? 'Contactez-nous' : 'Contact us'}
      </Button>
    </section>
  );
};

export default FinalCta;
