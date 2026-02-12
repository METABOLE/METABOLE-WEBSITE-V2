import SafeNumberFlow from '@/components/shared/safe-number-flow';
import { AwardCategory } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useRef, useState } from 'react';

type ScaleOrigin = 'top' | 'bottom';

const ItemAward = ({ award, name, number }: AwardCategory & { award: string }) => {
  const itemRef = useRef<React.ComponentRef<'li'>>(null);
  const [value, setValue] = useState(0);
  const [scaleOrigin, setScaleOrigin] = useState<ScaleOrigin>('top');

  const { contextSafe } = useGSAP();

  const updateScaleOrigin = (clientY: number) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    setScaleOrigin(clientY < midY ? 'top' : 'bottom');
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    updateScaleOrigin(e.clientY);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    updateScaleOrigin(e.clientY);
  };

  const scrollAnimation = contextSafe(() => {
    const counterObjectNumber = { value: 0 };
    gsap
      .timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
      .to(counterObjectNumber, {
        value: parseInt(number),
        onUpdate: () => {
          setValue(Math.floor(counterObjectNumber.value));
        },
      });
  });

  useGSAP(() => {
    scrollAnimation();
  }, []);

  return (
    <li
      ref={itemRef}
      className="group/item-award relative grid h-[66px] w-full grid-cols-12 items-center gap-5 bg-black"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <span className="p3-medium col-span-3 pl-5 text-white opacity-30 duration-300 group-hover/item-award:opacity-100">
        {name}
      </span>
      <span className="p3-medium col-span-4 text-white uppercase opacity-30 duration-300 group-hover/item-award:opacity-100">
        {award}
      </span>
      <SafeNumberFlow
        className="p3-medium -col-end-1 pr-5 text-right text-white"
        prefix="x"
        value={value}
      />
      <div
        className={clsx(
          'absolute top-0 right-0 h-full w-full scale-y-0 bg-[#E4E4FF]/5 transition-transform duration-300 group-hover/item-award:scale-y-100',
          scaleOrigin === 'top' ? 'origin-top' : 'origin-bottom',
        )}
      />
      <div className="absolute bottom-0 left-0 h-px w-full bg-[#E4E4FF]/10" />
    </li>
  );
};

export default ItemAward;
