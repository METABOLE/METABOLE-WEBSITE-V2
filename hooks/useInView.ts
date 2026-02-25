import { type RefObject, useEffect, useRef, useState } from 'react';

export type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  /**
   * Stop observing after the first intersection.
   * Ideal for lazy loading — zero overhead once triggered.
   */
  once?: boolean;
};

type Registry = {
  observer: IntersectionObserver;
  callbacks: Map<Element, (entry: IntersectionObserverEntry) => void>;
};

/**
 * Module-level cache: one IntersectionObserver instance per unique set of options.
 * All components sharing the same options reuse the same observer → minimal GC pressure.
 */
const observerCache = new Map<string, Registry>();

function getRegistry(init: IntersectionObserverInit): Registry {
  const key = `${init.rootMargin ?? '0px'}|${JSON.stringify(init.threshold ?? 0)}`;

  if (observerCache.has(key)) return observerCache.get(key)!;

  const callbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      callbacks.get(entry.target)?.(entry);
    }
  }, init);

  observerCache.set(key, { observer, callbacks });
  return observerCache.get(key)!;
}

export function useInView<T extends Element = Element>(
  options: UseInViewOptions = {},
): { ref: RefObject<T | null>; inView: boolean } {
  const { rootMargin = '0px', threshold = 0, once = false } = options;

  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { observer, callbacks } = getRegistry({ rootMargin, threshold });

    const onIntersect = (entry: IntersectionObserverEntry) => {
      const visible = entry.isIntersecting;
      setInView(visible);
      if (visible && once) {
        observer.unobserve(el);
        callbacks.delete(el);
      }
    };

    callbacks.set(el, onIntersect);
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
