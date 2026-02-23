import { useLenis } from 'lenis/react';
import { useCallback, useEffect, useState } from 'react';

const globalScrollState = {
  isLocked: false,
  listeners: new Set<() => void>(),
};

const notifyListeners = () => {
  globalScrollState.listeners.forEach((listener) => listener());
};

const updateScrollState = (isLocked: boolean) => {
  globalScrollState.isLocked = isLocked;
  notifyListeners();
};

export const useScroll = () => {
  const [isLocked, setIsLocked] = useState(globalScrollState.isLocked);
  const lenis = useLenis();
  const isReady = !!lenis;

  useEffect(() => {
    const listener = () => setIsLocked(globalScrollState.isLocked);
    globalScrollState.listeners.add(listener);
    return () => {
      globalScrollState.listeners.delete(listener);
    };
  }, []);

  const lockScroll = useCallback(() => {
    if (!lenis) return;
    lenis.stop();
    updateScrollState(true);
  }, [lenis]);

  const unlockScroll = useCallback(() => {
    if (!lenis) return;
    lenis.start();
    updateScrollState(false);
  }, [lenis]);

  const resetScroll = useCallback(
    (shouldLock: boolean) => {
      if (!lenis) return;
      if (shouldLock) {
        lenis.scrollTo(0, { immediate: true });
        lenis.stop();
        updateScrollState(true);
      } else {
        lenis.start();
        updateScrollState(false);
      }
    },
    [lenis],
  );

  return {
    isLocked,
    isReady,
    lockScroll,
    unlockScroll,
    resetScroll,
  };
};
