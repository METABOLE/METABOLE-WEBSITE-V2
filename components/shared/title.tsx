import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ReactNode, useRef } from 'react';

const SLASH_FULL = 'polygon(6px 0%, calc(100% + 0px) 0%, calc(100% - 6px) 100%, 0% 100%)';

const Title = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: 'blue' | 'yellow' | 'black';
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
      style={{ color: color ? `var(--color-${color})` : 'inherit' }}
      className={clsx(
        'p3 font-safiro-medium! relative inline-block h-fit w-fit pr-2 uppercase',
        className,
      )}
    >
      <span>/{children}</span>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: SLASH_FULL }}>
        <span
          ref={overlayRef}
          className={clsx('absolute inset-0 h-full w-full', color ? `bg-${color}` : 'bg-yellow')}
          style={{
            clipPath: SLASH_FULL,
            backgroundColor: color ? `var(--color-${color})` : 'inherit',
          }}
        />
      </div>
    </h2>
  );
};

export default Title;
