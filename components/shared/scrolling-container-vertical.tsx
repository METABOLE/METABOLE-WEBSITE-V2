import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ReactNode, RefObject, useRef } from 'react';

const ScrollingContainerVertical = ({
  children,
  scrollSpeed = 10,
  direction = 'up',
  className = '',
}: {
  children: ReactNode;
  scrollSpeed?: number;
  direction?: 'up' | 'down';
  className?: string;
}) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const infiniteAnimationRef = useRef<gsap.core.Tween[]>([]);

  const { contextSafe } = useGSAP();

  const yInfinite = direction === 'up' ? '-100%' : '100%';
  const yScrub = direction === 'up' ? -400 : 400;

  const animateInfinite = (element: RefObject<HTMLDivElement | null>) => {
    if (!element.current) return;

    const tween = gsap.to(element.current.children, {
      y: yInfinite,
      duration: scrollSpeed,
      repeat: -1,
      ease: 'none',
      paused: false,
    });

    infiniteAnimationRef.current.push(tween);
  };

  const controlScroll = contextSafe((action: 'play' | 'pause') => {
    infiniteAnimationRef.current.forEach((animation) => {
      gsap.to(animation, {
        timeScale: action === 'play' ? 1 : 0,
        duration: 1,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  });

  const animateScroll = contextSafe(() => {
    if (!scrollContainer.current) return;

    gsap.to(scrollContainer.current, {
      y: yScrub,
      ease: 'none',
      scrollTrigger: {
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    infiniteAnimationRef.current.forEach((t) => t.kill());
    infiniteAnimationRef.current = [];

    requestAnimationFrame(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        animateInfinite(scrollContainer);
        if (useTouchDevice()) return;
        animateScroll();
      }, 50);
    });
  }, [scrollSpeed, direction]);

  return (
    <div className={clsx('h-screen overflow-hidden', className)}>
      <div
        ref={scrollContainer}
        className="flex h-full w-full flex-col items-center justify-center"
        onMouseLeave={() => controlScroll('play')}
        onMouseOver={() => controlScroll('pause')}
      >
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex h-fit w-full shrink-0">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollingContainerVertical;
