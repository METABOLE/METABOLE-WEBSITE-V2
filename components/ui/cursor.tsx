import { useTouchDevice } from '@/hooks/useTouchDevice';
import { CURSOR_TYPE, useCursor } from '@/providers/cursor.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IconCross } from './icons';

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
      };

      Object.entries({
        seeMore: cursorStateHandlers.changeToSeeMore,
        button: cursorStateHandlers.changeToButton,
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

  const showCross = !isPointerStyle && !isPlayer;
  const showPlay = isPlayer && !cursor.isPlaying;
  const showPause = isPlayer && cursor.isPlaying;

  return (
    <>
      <div
        ref={wrapperPointerRef}
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-[9999] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0',
          !isPlayer && 'mix-blend-difference',
        )}
      >
        <div
          className={clsx(
            'border-yellow h-16 w-16 origin-center rounded-full border-[1px] transition-[transform,scale,background-color] duration-300 ease-out',
            isPlayer && 'scale-120 border-none bg-black',
            isPlayer && isActive && 'scale-100!',
            isPointerStyle && 'bg-yellow scale-50',
            isActive && 'scale-75',
          )}
        />
      </div>
      <div
        ref={pointerRef}
        className={clsx(
          'text-yellow pointer-events-none fixed top-0 left-0 z-[9999] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0',
          !isPlayer && 'mix-blend-difference',
        )}
      >
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-center items-center justify-center transition-transform duration-300 ease-out',
            showPause ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          PAUSE
        </p>
        <p
          className={clsx(
            'absolute flex h-14 w-14 origin-center items-center justify-center transition-transform duration-300 ease-out',
            showPlay ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        >
          PLAY
        </p>
        <IconCross
          color={COLORS.YELLOW}
          className={clsx(
            'absolute origin-center transition-transform duration-300 ease-out',
            showCross ? 'scale-100' : 'pointer-events-none scale-0',
          )}
        />
      </div>
    </>
  );
};

export default Cursor;
