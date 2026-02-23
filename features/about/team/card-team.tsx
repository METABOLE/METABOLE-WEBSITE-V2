import { useLanguage } from '@/providers/language.provider';
import { urlFor } from '@/sanity/lib/image';
import { Team } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const SCALE_DOWN_DISTANCE = 600;
const SCALE_MIN = 0.65;

const CardTeam = ({ label, name, photo, role }: Omit<Team, 'slug'>) => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stickyStartScrollRef = useRef<number | null>(null);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();
  const lenis = useLenis();

  const setTextProgress = contextSafe((el: HTMLDivElement | null, progress: number) => {
    if (!el) return;
    gsap.set(el, { opacity: 1 - progress, y: -progress * 80 });
  });

  const updateScale = contextSafe(() => {
    const stickyEl = stickyRef.current;
    const scaleEl = scaleRef.current;
    if (!stickyEl || !scaleEl || !lenis?.rootElement) return;

    const { rootElement: root, scroll } = lenis;
    const stickyRect = stickyEl.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const isSticky = stickyRect.left <= rootRect.left + 2;

    if (isSticky) {
      if (stickyStartScrollRef.current === null) {
        stickyStartScrollRef.current = scroll;
      }
      const scrollPast = scroll - stickyStartScrollRef.current;
      const progress = Math.min(scrollPast / SCALE_DOWN_DISTANCE, 1);
      const scale = 1 - progress * (1 - SCALE_MIN);
      gsap.set(scaleEl, { scale, transformOrigin: 'left center' });
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: progress });

      setTextProgress(labelRef.current, progress);
      setTextProgress(roleRef.current, progress);
      setTextProgress(nameRef.current, progress);
    } else {
      stickyStartScrollRef.current = null;
      gsap.set(scaleEl, { scale: 1, transformOrigin: 'left center' });
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0 });
      setTextProgress(labelRef.current, 0);
      setTextProgress(roleRef.current, 0);
      setTextProgress(nameRef.current, 0);
    }
  });

  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', updateScale);
    updateScale();
    return () => lenis.off('scroll', updateScale);
  }, [lenis, updateScale]);

  return (
    <div ref={stickyRef} className="sticky left-0 h-fit w-[clamp(240px,30vw,400px)] shrink-0">
      <div ref={scaleRef} className="relative w-full origin-left">
        <div className="relative">
          <Image
            alt={name}
            className="aspect-3/4 w-full object-cover"
            height={1920}
            src={urlFor(photo).url()}
            width={1080}
          />
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: 0 }}
            aria-hidden
          />
        </div>
        <div className="pt-5">
          <div className="overflow-hidden">
            <div ref={nameRef} className="relative">
              <h3 className="p2 text-blue uppercase">/{name}</h3>
            </div>
          </div>
          {role?.[isFrench ? 'fr' : 'en'] ? (
            <div className="overflow-hidden pt-2">
              <div ref={roleRef} className="relative">
                <p className="p3-medium">{role[isFrench ? 'fr' : 'en']}</p>
              </div>
            </div>
          ) : null}
          {label ? (
            <div className="overflow-hidden">
              <div ref={labelRef} className="relative">
                <span className="p3 text-black/30 lowercase">{label}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardTeam;
