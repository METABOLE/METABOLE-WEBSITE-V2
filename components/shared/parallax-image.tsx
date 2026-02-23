import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ReactNode, useRef } from 'react';

interface ParallaxImageProps {
  className?: string;
  parallaxOffset?: number;
  scrollStart?: string;
  scrollEnd?: string;
  aspectRatio?: string;
  children?: ReactNode;
}

const ParallaxImage = ({
  className,
  parallaxOffset = -50,
  scrollStart = 'top bottom',
  scrollEnd = 'bottom top-=600px',
  aspectRatio = 'aspect-square',
  children,
}: ParallaxImageProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();
  const { performanceLevel } = usePerformance();

  const parallaxAnimation = contextSafe(() => {
    if (!imageWrapperRef.current || !containerRef.current) return;

    gsap.fromTo(
      imageWrapperRef.current,
      {
        y: parallaxOffset,
      },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          trigger: containerRef.current,
        },
      },
    );
  });

  useGSAP(() => {
    if (performanceLevel === PERFORMANCE_LEVEL.LOW) return;
    parallaxAnimation();
  }, [parallaxOffset, scrollStart, scrollEnd]);

  const wrapperHeight = `calc(100% + ${Math.abs(parallaxOffset)}px)`;

  return (
    <div ref={containerRef} className={clsx('overflow-hidden', className, aspectRatio)}>
      <div
        ref={imageWrapperRef}
        className="h-full"
        style={performanceLevel === PERFORMANCE_LEVEL.HIGH ? { height: wrapperHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxImage;
