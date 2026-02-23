import { useEffect, useState, RefObject } from 'react';
import { useTouchDevice } from '@/hooks/useTouchDevice';

export interface Position {
  x: number;
  y: number;
}

export interface UseMousePositionOptions {
  listenTouch?: boolean;
}

const getCenter = (): Position => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
};

export const useMousePosition = (
  containerRefOrOptions?:
    | RefObject<HTMLElement | null>
    | { containerRef?: RefObject<HTMLElement | null>; options?: UseMousePositionOptions },
  optionsArg?: UseMousePositionOptions,
) => {
  const isConfigObject =
    typeof containerRefOrOptions === 'object' &&
    containerRefOrOptions !== null &&
    ('containerRef' in containerRefOrOptions || 'options' in containerRefOrOptions);
  const { containerRef, options } = isConfigObject
    ? {
        containerRef: (containerRefOrOptions as { containerRef?: RefObject<HTMLElement | null> })
          .containerRef,
        options: (containerRefOrOptions as { options?: UseMousePositionOptions }).options,
      }
    : {
        containerRef: containerRefOrOptions as RefObject<HTMLElement | null> | undefined,
        options: optionsArg,
      };

  const isTouch = useTouchDevice();
  const [mousePosition, setMousePosition] = useState<Position>(getCenter);

  useEffect(() => {
    let cachedRect: DOMRect | null = null;
    const useTouch = options?.listenTouch ?? isTouch ?? false;
    setMousePosition(getCenter());

    const updateCachedRect = () => {
      if (containerRef?.current) {
        cachedRect = containerRef.current.getBoundingClientRect();
      }
    };

    const toPosition = (clientX: number, clientY: number): Position => {
      if (containerRef?.current && cachedRect) {
        return {
          x: clientX - cachedRect.left,
          y: clientY - cachedRect.top,
        };
      }
      return { x: clientX, y: clientY };
    };

    updateCachedRect();
    const touchElement = containerRef?.current ?? window;

    const handleMouseMove = (event: Event) => {
      const e = event as MouseEvent;
      setMousePosition(toPosition(e.clientX, e.clientY));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateCachedRect);
    window.addEventListener('scroll', updateCachedRect);

    let cleanup: () => void;

    if (useTouch) {
      const handleTouchStart = (event: Event) => {
        const e = event as TouchEvent;
        const [touch] = e.touches;
        if (touch) {
          setMousePosition(toPosition(touch.clientX, touch.clientY));
        }
      };

      const handleTouchMove = (event: Event) => {
        const e = event as TouchEvent;
        const [touch] = e.touches;
        if (touch) {
          setMousePosition(toPosition(touch.clientX, touch.clientY));
        }
      };

      touchElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      touchElement.addEventListener('touchmove', handleTouchMove, { passive: true });

      cleanup = () => {
        touchElement.removeEventListener('touchstart', handleTouchStart);
        touchElement.removeEventListener('touchmove', handleTouchMove);
      };
    } else {
      cleanup = () => {};
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCachedRect);
      window.removeEventListener('scroll', updateCachedRect);
      cleanup();
    };
  }, [containerRef, options?.listenTouch, isTouch]);

  return { mousePosition };
};
