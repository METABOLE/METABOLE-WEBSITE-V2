import clsx from 'clsx';
import gsap from 'gsap';
import { LenisOptions } from 'lenis';
import ReactLenis, { LenisRef } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

const HorizontalSmoothScroll = ({
  id,
  children,
  className,
  options,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  options?: LenisOptions;
}) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const defaultOptions: LenisOptions = {
    autoRaf: options?.autoRaf ?? false,
    orientation: options?.orientation ?? 'horizontal',
    gestureOrientation: options?.gestureOrientation ?? 'horizontal',
    overscroll: options?.overscroll ?? true,
    lerp: options?.lerp ?? 0.2,
  };

  return (
    <>
      <ReactLenis
        ref={lenisRef}
        className={clsx('no-scrollbar overflow-scroll', className)}
        id={id}
        options={{
          ...defaultOptions,
          ...options,
        }}
      >
        {children}
      </ReactLenis>
    </>
  );
};

export default HorizontalSmoothScroll;
