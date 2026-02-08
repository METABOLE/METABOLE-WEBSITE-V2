'use client';

import { clsx } from 'clsx';
import { useCallback, useRef, useState } from 'react';

const Showreel = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

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

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  return (
    <div
      aria-label="Showreel"
      role="button"
      tabIndex={0}
      className={clsx(
        'bottom-y-default right-x-default absolute z-40 w-[170px] cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 ease-out',
        isExpanded && 'scale-105',
      )}
      onClick={toggleExpanded}
      onKeyDown={(e) => e.key === 'Enter' && toggleExpanded()}
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
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <p className="p3 absolute top-1/2 left-1/2 -translate-1/2 text-white">SHOWREEL</p>

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
        <button
          className="text-xs tracking-wider uppercase hover:underline"
          type="button"
          onClick={toggleMute}
        >
          {isMuted ? 'Son' : 'Mute'}
        </button>
      </div> */}
    </div>
  );
};

export default Showreel;
