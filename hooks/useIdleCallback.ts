import { useEffect, useRef } from 'react';

/**
 * `useIdleCallback` — Defers a callback to browser idle time.
 *
 * ## When to use
 * Use this hook for **non-critical setup work** that reads or mutates the DOM
 * and would otherwise cause a forced reflow on the main thread during page load:
 *
 * - GSAP / SplitText initialisation (SplitText reads `offsetWidth` / `clientHeight`)
 * - ScrollTrigger setup for below-the-fold elements
 * - Any heavy computation that doesn't need to run before first paint
 *
 * ## When NOT to use
 * - Work that must be synchronous with the render (use `useLayoutEffect` instead)
 * - Animations that must play immediately on mount with no perceived delay
 * - Anything the user can interact with before the idle callback fires
 *
 * ## How it works
 * 1. Schedules `callback` via `requestIdleCallback` (browsers give it a free slot
 *    between frames when no urgent work is pending).
 * 2. Falls back to `setTimeout(fn, 50)` for Safari < 16.4 which lacks
 *    `requestIdleCallback`.
 * 3. Automatically cancels the pending job if the component unmounts before it fires.
 *
 * ## Example
 * ```tsx
 * const { contextSafe } = useGSAP();
 *
 * const setupAnimation = contextSafe(() => {
 *   const split = new SplitText(ref.current, { type: 'lines', mask: 'lines' });
 *   gsap.set(split.lines, { yPercent: 120 });
 * });
 *
 * useIdleCallback(setupAnimation);
 * ```
 *
 * @param callback  Function to run during browser idle time. Should be stable
 *                  (wrap with `useCallback` / `contextSafe` to avoid re-scheduling
 *                  on every render).
 * @param timeout   Max ms to wait before forcing execution even if the browser is
 *                  still busy. Defaults to `500`.
 */
export function useIdleCallback(callback: () => void, timeout = 500): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const run = () => callbackRef.current();

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(run, { timeout });
      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(run, 50);
    return () => clearTimeout(id);
  }, [timeout]);
}
