import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useRef } from 'react';

const Typography = ({
  children,
  className,
  variant = 'p',
  start = 'top 85%',
  end = 'top 50%',
  markers = false,
  scrub = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  start?: string;
  end?: string;
  scrub?: boolean;
  markers?: boolean;
}) => {
  const textRef = useRef(null);

  const { performanceLevel } = usePerformance();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!textRef.current) return;

    const splitText = new SplitText(textRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    gsap.set(splitText.lines, { yPercent: 120 });

    gsap.to(splitText.lines, {
      yPercent: 0,
      duration: 1.6,
      ease: 'power4.inOut',
      stagger: 0.07,
      scrollTrigger: {
        trigger: textRef.current,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers,
        toggleActions: 'play none none reverse',
      },
    });
  });

  useGSAP(() => {
    if (performanceLevel === PERFORMANCE_LEVEL.LOW) return;
    revealAnimation();
  }, []);

  const Tag = variant;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default Typography;
