import BackgroundLines from '@/components/layout/background-lines';
import { useStickySectionTop } from '@/hooks/useStickySectionTop';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Baseline from './hero/baseline';
import Footer from './hero/footer';
import Manifesto from './hero/manifesto';
import Scene from './hero/scene';

const Hero = ({ totalAwards, location }: { totalAwards: number; location: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setIsLayoutDark } = useLayoutColor();

  const stickyTop = useStickySectionTop(sectionRef);

  const changeLayoutColor = () => {
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
  };

  useGSAP(() => {
    changeLayoutColor();
  }, []);

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
