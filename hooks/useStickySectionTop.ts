import { RefObject, useEffect, useState } from 'react';

export function useStickySectionTop(ref: RefObject<HTMLElement | null>): number {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    const update = () => {
      const { height } = el.getBoundingClientRect();
      setTop(Math.max(0, height - window.innerHeight));
    };

    update();

    const resizeObserver = new window.ResizeObserver(update);
    resizeObserver.observe(el);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return top;
}
