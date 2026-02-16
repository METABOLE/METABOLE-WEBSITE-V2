import BackgroundLines from '@/components/layout/background-lines';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Baseline from './hero/baseline';
import Footer from './hero/footer';
import Scene from './hero/scene';
import Manifesto from './hero/manifesto';
import { useStickySectionTop } from '@/hooks/useStickySectionTop';

const Hero = ({ totalAwards }: { totalAwards: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setIsLayoutDark } = useLayoutColor();

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

  const stickyTop = useStickySectionTop(sectionRef);

  useGSAP(() => {
    changeLayoutColor();
  }, []);

  return (
    <section ref={sectionRef} className="sticky" style={{ top: `-${stickyTop}px` }}>
      <Scene />
      <BackgroundLines className="z-0" isDark={true} />
      <Baseline />
      <Manifesto />
      <Footer totalAwards={totalAwards} />
    </section>
  );
};

export default Hero;
