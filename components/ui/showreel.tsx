import { useScroll } from '@/hooks/useScroll';
import { clsx } from 'clsx';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type AnchorRect = { left: number; top: number; width: number; height: number };

const Showreel = () => {
  const { lockScroll, unlockScroll } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const [expandTarget, setExpandTarget] = useState<'anchor' | 'center'>('anchor');
  // const [isPlaying, setIsPlaying] = useState(true);

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
      setIsExpanded(false);
      setAnchorRect(null);
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

  // const togglePlay = useCallback((e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   const video = videoRef.current;
  //   if (!video) return;
  //   if (video.paused) {
  //     video.play();
  //     setIsPlaying(true);
  //   } else {
  //     video.pause();
  //     setIsPlaying(false);
  //   }
  // }, []);

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

  return (
    <>
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
          'ease-power4-in-out z-40 origin-center cursor-pointer overflow-hidden rounded-lg transition-[left,top,width,height] duration-1000',
          !isFixed && 'bottom-y-default right-x-default absolute w-[170px]',
        )}
        onClick={toggleExpanded}
        onKeyDown={(e) => e.key === 'Enter' && toggleExpanded()}
        onTransitionEnd={handleTransitionEnd}
      >
        <video
          ref={videoRef}
          aria-label="Showreel Metabole"
          className="aspect-video w-full object-cover"
          preload="auto"
          src="/videos/showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          // onPause={() => setIsPlaying(false)}
          // onPlay={() => setIsPlaying(true)}
        />

        <div
          className={clsx(
            'p3 absolute inset-0 flex items-center justify-center bg-black/70 text-white transition-opacity select-none',
            isExpanded ? 'opacity-0' : 'opacity-100',
          )}
        >
          <p>SHOWREEL</p>
        </div>

        {/* <div
          className={clsx(
            'absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-black/70 px-3 py-2 text-white transition-opacity duration-200',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-xs tracking-wider uppercase hover:underline"
            type="button"
            onClick={togglePlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Showreel;
