import clsx from 'clsx';
import { forwardRef, useLayoutEffect, useRef } from 'react';

interface FullWidthTypoProps {
  children: React.ReactNode;
  className?: string;
}

const FullWidthTypo = forwardRef<HTMLDivElement, FullWidthTypoProps>(
  ({ children, className }, ref) => {
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const text = textRef.current;
      if (!text) return;

      const adjustSize = () => {
        const container = text.parentElement;
        if (!container) return;

        text.style.fontSize = '';
        const baseFontSize = parseFloat(window.getComputedStyle(text).fontSize);
        const ratio = container.offsetWidth / text.scrollWidth;

        text.style.fontSize = `${baseFontSize * ratio}px`;
      };

      const rafId = requestAnimationFrame(() => {
        adjustSize();
      });

      const resizeObserver = new window.ResizeObserver(adjustSize);
      resizeObserver.observe(text.parentElement!);

      return () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
      };
    }, [children]);

    return (
      <div
        ref={ref}
        className={clsx('flex w-full items-center justify-center overflow-hidden', className)}
      >
        <div ref={textRef} className="font-bebas-neue leading-normal whitespace-nowrap">
          {children}
        </div>
      </div>
    );
  },
);

export default FullWidthTypo;
