import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useRef } from 'react';

const SLASH_FULL = 'polygon(6px 0%, calc(100% + 0px) 0%, calc(100% - 6px) 100%, 0% 100%)';

const Title = ({
  children,
  isDark,
  className,
}: {
  children: string;
  isDark: boolean;
  className?: string;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!titleRef.current || !overlayRef.current) return;

    gsap.to(overlayRef.current, {
      xPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <h2
      ref={titleRef}
      className={clsx(
        'p3 font-safiro-medium! relative inline-block h-fit w-fit pr-2 uppercase',
        isDark ? 'text-yellow' : 'text-blue',
        className,
      )}
    >
      <span>/{children}</span>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: SLASH_FULL }}>
        <span
          ref={overlayRef}
          className={clsx('absolute inset-0 h-full w-full', isDark ? 'bg-yellow' : 'bg-blue')}
          style={{ clipPath: SLASH_FULL }}
        />
      </div>
    </h2>
  );
};

export default Title;
