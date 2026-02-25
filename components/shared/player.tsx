import { CURSOR_TYPE, useCursor } from '@/providers/cursor.provider';
import { useLanguage } from '@/providers/language.provider';
import { clsx } from 'clsx';
import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export type PlayerProps = {
  src?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
  showControls?: boolean;
  ariaLabel?: string;
  children?: ReactNode;
};

export type PlayerHandle = {
  play: () => void;
  load: () => void;
};

const Player = forwardRef<PlayerHandle, PlayerProps>(function Player(
  {
    src,
    poster,
    autoPlay = false,
    loop = false,
    muted = true,
    playsInline = true,
    className,
    preload = 'metadata',
    showControls = true,
    ariaLabel = 'Vidéo',
    children,
  },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isOverPlayerRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const { setCursor } = useCursor();
  const { isFrench } = useLanguage();

  const useSrcAttr = src != null && !children;

  useEffect(() => {
    if (isOverPlayerRef.current && showControls) {
      setCursor(CURSOR_TYPE.PLAYER, { isPlaying });
    }
  }, [isPlaying, setCursor, showControls]);

  const handleMouseEnter = useCallback(() => {
    isOverPlayerRef.current = true;
    if (showControls) {
      setCursor(CURSOR_TYPE.PLAYER, { isPlaying });
    }
  }, [showControls, isPlaying, setCursor]);

  const handleMouseLeave = useCallback(() => {
    isOverPlayerRef.current = false;
    setCursor(CURSOR_TYPE.DEFAULT);
  }, [setCursor]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      togglePlay(e);
    },
    [togglePlay],
  );

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        const video = videoRef.current;
        if (video) {
          video.play();
          setIsPlaying(true);
        }
      },
      load: () => {
        const video = videoRef.current;
        if (video) video.load();
      },
    }),
    [],
  );

  const playLabel = isFrench ? 'Lecture' : 'Play';
  const titleText = isPlaying ? 'Pause' : playLabel;

  return (
    <div
      className={clsx('relative flex flex-col', className)}
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        aria-label={ariaLabel}
        autoPlay={autoPlay}
        className="aspect-video w-full object-cover"
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        poster={poster}
        preload={preload}
        title={titleText}
        {...(useSrcAttr && { src })}
        onClick={handleVideoClick}
        onPause={handlePause}
        onPlay={handlePlay}
      >
        {children}
      </video>
    </div>
  );
});

export default Player;
