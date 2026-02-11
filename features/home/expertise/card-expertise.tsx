import { urlFor } from '@/sanity/lib/image';
import { Expertise } from '@/types';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

const CardExpertise = ({ name, image }: Expertise) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!card || !text || !imageWrapper) return;

    let rafId: number;
    const update = () => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const viewportWidth = window.innerWidth;
      const progress = Math.max(0, Math.min(1, centerX / viewportWidth));

      const translateXPercent = (progress - 0.5) * 80;
      text.style.transform = `translate(-50%, -50%) translateX(${translateXPercent}%)`;

      const imageTranslateX = (1 - progress) * 50;
      imageWrapper.style.transform = `translate(-50%, 0) translateX(${imageTranslateX}px)`;
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex w-[clamp(200px,40vw,440px)] shrink-0 items-center justify-center overflow-hidden rounded-sm"
      style={{ aspectRatio: '4/3.5' }}
    >
      <div
        ref={imageWrapperRef}
        className="absolute top-0 left-1/2 h-full w-[calc(100%+100px)]"
        style={{ transform: 'translate(-50%, 0) translateX(0)' }}
      >
        <Image
          alt={name.fr}
          className="h-full w-full object-cover"
          height={1080}
          src={urlFor(image).url()}
          width={1080}
        />
      </div>
      <h3
        ref={textRef}
        className="h2 absolute top-1/2 left-1/2 z-10 text-center text-white"
        style={{ transform: 'translate(-50%, -50%) translateX(40%)' }}
      >
        {name.fr}
      </h3>
    </div>
  );
};

export default CardExpertise;
