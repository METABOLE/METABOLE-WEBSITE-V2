import Title from '@/components/shared/title';
import { IconCross } from '@/components/ui/icons';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { Service } from '@/types';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

const getAdvance = (progress: number, i: number, n: number) => {
  const raw = n > 1 ? 1 - Math.abs(progress - i / (n - 1)) : 1;
  return Math.pow(Math.max(0, raw), 2);
};

const isInRect = (x: number, y: number, rect: DOMRect) =>
  x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

const ItemService = ({ title, description, servicesList, index }: Service & { index: number }) => {
  const isTouchDevice = useTouchDevice();
  const rowRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(false);
  const lenis = useLenis();

  const apply = (clientY: number) => {
    const row = rowRef.current;
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const n = servicesList.length;
    const items = itemsRef.current.filter(Boolean) as HTMLParagraphElement[];
    const opts = { duration: 0.6, ease: 'power2.out' };
    items.forEach((el, i) => {
      const advance = getAdvance(progress, i, n);
      gsap.to(el, {
        x: advance * 32,
        opacity: 0.1 + (1 - 0.1) * advance,
        ...opts,
      });
    });
  };

  const reset = () => {
    isActiveRef.current = false;
    const items = itemsRef.current.filter(Boolean) as HTMLParagraphElement[];
    if (items.length) {
      gsap.to(items, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    }
  };

  const onPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    isActiveRef.current = true;
    mouseRef.current = { x: e.clientX, y: e.clientY };
    apply(e.clientY);
  };

  useEffect(() => {
    if (isTouchDevice) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      const row = rowRef.current;
      const { x, y } = mouseRef.current;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      if (isInRect(x, y, rect)) {
        isActiveRef.current = true;
        apply(y);
      } else if (isActiveRef.current) reset();
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    lenis?.on('scroll', onScroll);
    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      lenis?.off('scroll', onScroll);
    };
  }, [lenis, servicesList.length]);

  return (
    <div
      ref={rowRef}
      className="pt-y-half-default grid grid-cols-12 gap-5"
      onMouseEnter={isTouchDevice ? undefined : onPointer}
      onMouseLeave={isTouchDevice ? undefined : reset}
      onMouseMove={isTouchDevice ? undefined : onPointer}
    >
      <Title className="p3-medium col-span-2 sm:col-span-1" color="black">
        {index + 1}
      </Title>
      <div className="col-span-10 flex h-fit items-center justify-end gap-1 sm:col-span-4 sm:justify-start md:col-span-6 lg:col-span-2">
        <IconCross className="fill-blue shrink-0" />
        <p className="p3-medium uppercase">{title}</p>
      </div>
      <p className="p3-regular col-span-4 hidden max-w-xs sm:block">{description}</p>
      <div className="col-span-12 lg:col-span-5 lg:-translate-x-5">
        {servicesList.map((service, i) => (
          <p
            key={service}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="font-safiro-regular! text-[clamp(20px,2vw,36px)]! leading-tight! will-change-transform sm:tracking-[-0.03em]"
          >
            {service}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ItemService;
