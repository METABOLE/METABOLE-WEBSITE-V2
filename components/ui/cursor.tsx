import { useTouchDevice } from '@/hooks/useTouchDevice';
import { CURSOR_TYPE, useCursor } from '@/providers/cursor.provider';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconArrow, IconCross } from './icons';

const Cursor = () => {
  const isTouchDevice = useTouchDevice();
  const { cursor, setCursor } = useCursor();

  if (isTouchDevice) return null;

  const { contextSafe } = useGSAP();
  const pathname = usePathname();
  const wrapperPointerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickDownRef = useRef<HTMLAudioElement | null>(null);
  const clickUpSoundRef = useRef<HTMLAudioElement | null>(null);

  const [isActive, setIsActive] = useState(false);

  const isPointerStyle =
    cursor.variant === CURSOR_TYPE.POINTER || cursor.variant === CURSOR_TYPE.SEE_MORE;
  const isPlayer = cursor.variant === CURSOR_TYPE.PLAYER;
  const isNext = cursor.variant === CURSOR_TYPE.NEXT;
  const isPrevious = cursor.variant === CURSOR_TYPE.PREVIOUS;

  useEffect(() => {
    clickDownRef.current = new Audio('/sounds/clickDown.mp3');
    clickUpSoundRef.current = new Audio('/sounds/clickDown.mp3');
    // hoverSoundRef.current = new Audio('/sounds/hover.mp3');
    clickDownRef.current.volume = 0.6;
    clickUpSoundRef.current.volume = 0.4;
    // hoverSoundRef.current.volume = 0.2;
  }, []);

  const cursorStateHandlers = {
    changeToSeeMore: useCallback(() => setCursor(CURSOR_TYPE.SEE_MORE), [setCursor]),
    changeToButton: useCallback(() => setCursor(CURSOR_TYPE.POINTER), [setCursor]),
    changeToDefault: useCallback(() => setCursor(CURSOR_TYPE.DEFAULT), [setCursor]),
    changeToNext: useCallback(() => setCursor(CURSOR_TYPE.NEXT), [setCursor]),
    changeToPrevious: useCallback(() => setCursor(CURSOR_TYPE.PREVIOUS), [setCursor]),
  };

  const playClickDownSound = () => {
    if (!clickDownRef.current) return;
    clickDownRef.current.currentTime = 0;
    clickDownRef.current.play();
  };

  const playClickUpSound = () => {
    if (!clickUpSoundRef.current) return;
    clickUpSoundRef.current.currentTime = 0;
    clickUpSoundRef.current.play();
  };

  const playHoverSound = () => {
    if (!hoverSoundRef.current) return;
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play();
  };

  const cursorHandlers = {
    moveCursor: contextSafe((e: MouseEvent) => {
      if (!pointerRef.current || !wrapperPointerRef.current) return;
      pointerRef.current.style.opacity = '1';
      wrapperPointerRef.current.style.opacity = '1';
      gsap.to(pointerRef.current, {
        duration: 0.3,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
      gsap.to(wrapperPointerRef.current, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
      });
    }),
    handleMouseDown: useCallback(() => {
      setIsActive(true);
      playClickDownSound();
    }, []),
    handleMouseUp: useCallback(() => {
      setIsActive(false);
      playClickUpSound();
    }, []),
  };

  const manageCursorEvents = useCallback(
    (event: 'addEventListener' | 'removeEventListener') => {
      const elements = {
        seeMore: document.querySelectorAll('.custom-cursor-see-more'),
        button: document.querySelectorAll('.cursor-pointer'),
        next: document.querySelectorAll('.custom-cursor-next'),
        previous: document.querySelectorAll('.custom-cursor-previous'),
      };

      Object.entries({
        seeMore: cursorStateHandlers.changeToSeeMore,
        button: cursorStateHandlers.changeToButton,
        next: cursorStateHandlers.changeToNext,
        previous: cursorStateHandlers.changeToPrevious,
      }).forEach(([key, handler]) => {
        elements[key as keyof typeof elements].forEach((el) => {
          el[event]('mouseover', handler);
          el[event]('mouseleave', cursorStateHandlers.changeToDefault);

          if (key === 'button') {
            el[event]('mouseenter', playHoverSound);
          }
        });
      });
    },
    [cursorStateHandlers],
  );

  useEffect(() => {
    observerRef.current = new MutationObserver(() => {
      manageCursorEvents('removeEventListener');
      manageCursorEvents('addEventListener');
    });

    const { moveCursor, handleMouseDown, handleMouseUp } = cursorHandlers;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    manageCursorEvents('addEventListener');
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      manageCursorEvents('removeEventListener');
      observerRef.current?.disconnect();
    };
  }, [cursorHandlers, manageCursorEvents]);

  useEffect(() => {
    setTimeout(() => setCursor(CURSOR_TYPE.DEFAULT), 500);
  }, [pathname, setCursor]);

  const showCross = !isPointerStyle && !isPlayer && !isNext && !isPrevious;
  const showPause = isPlayer && cursor.isPlaying;
  const showPlay = isPlayer && !cursor.isPlaying;
  const showNext = isNext;
  const showPrev = isPrevious;

  return (
    <>
      <div
        ref={wrapperPointerRef}
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-9999 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0',
          !isPlayer && !isNext && !isPrevious && 'mix-blend-difference',
        )}
      >
        <div
          className={clsx(
            'border-yellow h-16 w-16 origin-center rounded-full border transition-[transform,scale,background-color] duration-300 ease-out',
            isPlayer && 'scale-120 border-none bg-black',
            (isNext || isPrevious) && 'bg-yellow scale-80 border-none',
            isPlayer && isActive && 'scale-100!',
            isPointerStyle && 'bg-yellow scale-50',
            isActive && 'scale-75',
          )}
        />
      </div>
      <div
        ref={pointerRef}
        className={clsx(
          'text-yellow pointer-events-none fixed top-0 left-0 z-9999 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0',
          !isPlayer && 'mix-blend-difference',
        )}
      >
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-center items-center justify-center text-sm font-medium transition-transform duration-300 ease-out',
            showPause ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          PAUSE
        </p>
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-center items-center justify-center text-sm font-medium transition-transform duration-300 ease-out',
            showPlay ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          PLAY
        </p>
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-left items-center justify-center text-sm font-medium transition-transform duration-300 ease-out',
            showNext ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          <IconArrow className="fill-yellow h-3 w-3 rotate-90" />
        </p>
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-right items-center justify-center text-sm font-medium transition-transform duration-300 ease-out',
            showPrev ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          <IconArrow className="fill-yellow h-3 w-3 -rotate-90" />
        </p>
        <IconCross
          className={clsx(
            'fill-yellow absolute origin-center transition-transform duration-300 ease-out',
            showCross ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        />
      </div>
    </>
  );
};

export default Cursor;
