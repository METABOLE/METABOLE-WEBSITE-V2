import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useSound } from '@/providers/sound.provider';
import { COLORS } from '@/types';
import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';
import Wave, { WaveHandles } from '../ui/wave';

const Sound = forwardRef<HTMLButtonElement, { className?: string }>(({ className }, ref) => {
  const animatedWaveRef = useRef<WaveHandles>(null);
  const { isSoundOn, toggleSound, initializeAudio } = useSound();
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    animatedWaveRef.current?.[isSoundOn ? 'play' : 'pause']();

    if (!isTouchDevice) {
      const handleFirstClick = () => {
        initializeAudio();
        document.removeEventListener('click', handleFirstClick);
      };
      document.addEventListener('click', handleFirstClick);
      return () => document.removeEventListener('click', handleFirstClick);
    }
  }, [isSoundOn]);

  return (
    <button
      ref={ref}
      aria-label="Toggle sound"
      className={clsx('flex h-fit w-6 cursor-pointer items-center justify-center', className)}
      onClick={toggleSound}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={useResetMagnet}
    >
      <div
        className="flex h-full w-full items-center justify-center"
        onMouseMove={(e) => useMagnet(e, 0.4)}
        onMouseOut={useResetMagnet}
      >
        <Wave ref={animatedWaveRef} color={COLORS.WHITE} />
      </div>
    </button>
  );
});

export default Sound;
