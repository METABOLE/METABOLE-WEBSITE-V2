import Player, { type PlayerHandle } from '@/components/ui/player';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useScroll } from '@/hooks/useScroll';
import { useShortcut } from '@/hooks/useShortcut';
import { clsx } from 'clsx';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type AnchorRect = { left: number; top: number; width: number; height: number };

const SHOWREEL_VIDEO_SRC = '/videos/showreel.mp4';

const Showreel = () => {
  const { lockScroll, unlockScroll } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerHandle>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const [expandTarget, setExpandTarget] = useState<'anchor' | 'center'>('anchor');

  const open = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setAnchorRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setExpandTarget('anchor');
    setIsClosing(false);
    setIsExpanded(true);
  }, []);

  const isClosingRef = useRef(false);

  const close = useCallback(() => {
    const placeholder = placeholderRef.current;
    if (placeholder) {
      const rect = placeholder.getBoundingClientRect();
      setAnchorRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
    isClosingRef.current = true;
    setIsClosing(true);
    setExpandTarget('anchor');
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget) return;
      const prop = e.propertyName;
      if (prop !== 'left' && prop !== 'width') return;
      if (!isClosingRef.current) return;
      if (expandTarget !== 'anchor') return;
      isClosingRef.current = false;
      setIsClosing(false);
      setIsExpanded(false);
      setAnchorRect(null);
      playerRef.current?.play();
    },
    [expandTarget],
  );

  useEffect(() => {
    if (isExpanded) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isExpanded, lockScroll, unlockScroll]);

  useLayoutEffect(() => {
    if (!isExpanded || expandTarget !== 'anchor' || isClosingRef.current) return;
    const id = requestAnimationFrame(() => setExpandTarget('center'));
    return () => cancelAnimationFrame(id);
  }, [isExpanded, expandTarget]);

  const toggleExpanded = useCallback(() => {
    if (isExpanded) close();
    else open();
  }, [isExpanded, open, close]);

  useShortcut('Escape', () => isExpanded && toggleExpanded());
  useClickOutside(containerRef, () => isExpanded && toggleExpanded());

  const isFixed = isExpanded && anchorRect !== null;
  const style = (() => {
    if (!isFixed) return undefined;
    if (expandTarget === 'anchor' && anchorRect) {
      return {
        position: 'fixed' as const,
        left: anchorRect.left,
        top: anchorRect.top,
        width: anchorRect.width,
        height: anchorRect.height,
      };
    }
    return {
      position: 'fixed' as const,
      left: '10vw',
      top: 'calc(50vh - 22.5vw)',
      width: '80vw',
      height: '45vw',
    };
  })();

  const backdropVisible = isExpanded && !isClosing;

  return (
    <>
      <div
        className={clsx(
          'ease-power4-in-out fixed inset-0 z-100 bg-black/20 backdrop-blur-3xl transition-opacity duration-1000',
          backdropVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden
      />
      {isExpanded && (
        <div
          ref={placeholderRef}
          className="bottom-y-default right-x-default pointer-events-none absolute z-0 aspect-video w-[170px] opacity-0"
          aria-hidden
        />
      )}
      <div
        ref={containerRef}
        aria-label="Showreel"
        role="button"
        style={style}
        tabIndex={0}
        className={clsx(
          'ease-power4-in-out z-120 origin-center overflow-hidden rounded-lg transition-[left,top,width,height] duration-1000',
          !isFixed && 'bottom-y-default right-x-default absolute w-[170px]',
        )}
        onClick={() => !isExpanded && open()}
        onKeyDown={(e) => e.key === 'Enter' && toggleExpanded()}
        onTransitionEnd={handleTransitionEnd}
      >
        <Player
          ref={playerRef}
          ariaLabel="Showreel Metabole"
          showControls={isExpanded}
          src={SHOWREEL_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
        />

        {!isExpanded && <div className="absolute inset-0 z-10 cursor-pointer" aria-hidden />}

        <div
          className={clsx(
            'p3 pointer-events-none absolute inset-0 flex items-center justify-center bg-black/70 text-white transition-opacity duration-300 select-none',
            isExpanded ? 'opacity-0' : 'opacity-100',
          )}
        >
          <p
            className={clsx(
              'ease-power4-in-out transition-transform duration-300',
              isExpanded ? 'scale-0' : 'scale-100',
            )}
          >
            SHOWREEL
          </p>
        </div>
      </div>
    </>
  );
};

export default Showreel;
