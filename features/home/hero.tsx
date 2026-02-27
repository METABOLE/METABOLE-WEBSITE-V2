import BackgroundLines from '@/components/layout/background-lines';
import { useStickySectionTop } from '@/hooks/useStickySectionTop';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import Baseline from './hero/baseline';
import Footer from '../shared/footer';
import Manifesto from './hero/manifesto';

const Scene = dynamic(() => import('./hero/scene'), { ssr: false });

const Hero = ({ totalAwards, location }: { totalAwards: number; location: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stickyTop = useStickySectionTop(sectionRef);

  return (
    <section ref={sectionRef} className="sticky" style={{ top: `-${stickyTop}px` }}>
      <Scene />
      <BackgroundLines className="z-0" isDark={true} />
      <Baseline />
      <Manifesto />
      <Footer hasShowreel={true} isDark={true} location={location} totalAwards={totalAwards} />
    </section>
  );
};

export default Hero;
