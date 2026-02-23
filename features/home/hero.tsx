import BackgroundLines from '@/components/layout/background-lines';
import { useStickySectionTop } from '@/hooks/useStickySectionTop';
import { useRef } from 'react';
import Baseline from './hero/baseline';
import Footer from './hero/footer';
import Manifesto from './hero/manifesto';
import Scene from './hero/scene';

const Hero = ({ totalAwards, location }: { totalAwards: number; location: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stickyTop = useStickySectionTop(sectionRef);

  return (
    <section ref={sectionRef} className="sticky" style={{ top: `-${stickyTop}px` }}>
      <Scene />
      <BackgroundLines className="z-0" isDark={true} />
      <Baseline />
      <Manifesto />
      <Footer location={location} totalAwards={totalAwards} />
    </section>
  );
};

export default Hero;
