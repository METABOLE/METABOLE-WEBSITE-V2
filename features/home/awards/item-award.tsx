import SafeNumberFlow from '@/components/shared/safe-number-flow';
import { AwardCategory } from '@/types';
import { stripInvisibleChars } from '@/utils/format.utils';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrambleTextPlugin);

type ScaleOrigin = 'top' | 'bottom';

const ItemAward = ({ award, name, number }: AwardCategory & { award: string }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const awardRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [scaleOrigin, setScaleOrigin] = useState<ScaleOrigin>('top');

  const nameClean = stripInvisibleChars(name);
  const awardClean = stripInvisibleChars(award);

  const { contextSafe } = useGSAP();

  const updateScaleOrigin = (clientY: number) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    setScaleOrigin(clientY < midY ? 'top' : 'bottom');
  };

  const scrambleAnimation = contextSafe((nameText: string, awardText: string) => {
    if (!nameRef.current || !awardRef.current) return;

    gsap.killTweensOf([nameRef.current, awardRef.current]);
    gsap.to(nameRef.current, {
      duration: 0.8,
      scrambleText: {
        chars: nameText.toLowerCase(),
        text: nameText,
        tweenLength: false,
      },
    });
    gsap.to(awardRef.current, {
      duration: 0.8,
      scrambleText: {
        chars: awardText.toUpperCase(),
        text: awardText,
        tweenLength: false,
      },
    });
  });

  const handlePointerEnter = (e: React.PointerEvent) => {
    updateScaleOrigin(e.clientY);
    scrambleAnimation(nameClean, awardClean);
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
      className="group/item-award relative grid h-[66px] w-full grid-cols-12 items-center gap-5 backdrop-blur-2xl"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <span
        ref={nameRef}
        className="p3-medium col-span-3 pl-5 text-white opacity-30 duration-300 group-hover/item-award:opacity-100"
      >
        {nameClean}
      </span>
      <span
        ref={awardRef}
        className="p3-medium col-span-4 text-white uppercase opacity-30 duration-300 group-hover/item-award:opacity-100"
      >
        {awardClean}
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
