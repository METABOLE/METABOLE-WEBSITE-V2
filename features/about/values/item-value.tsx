import { IconCross } from '@/components/ui/icons';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, Value } from '@/types';
import gsap from 'gsap';
import { forwardRef, useRef, useState } from 'react';

const ItemValue = forwardRef<HTMLLIElement, { value: Value; isOpenable?: boolean }>(
  ({ value, isOpenable = true }, ref) => {
    const { isFrench } = useLanguage();
    const isMobile = useMatchMedia(BREAKPOINTS.MD);

    const [isOpen, setIsOpen] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
      if (!isMobile || !isOpenable || !wrapperRef.current || !descriptionRef.current) return;

      const targetHeight = isOpen ? 0 : descriptionRef.current.offsetHeight;
      gsap.to(wrapperRef.current, {
        height: targetHeight,
        duration: 0.45,
        ease: 'power2.inOut',
      });
      setIsOpen(!isOpen);
    };

    return (
      <li
        ref={ref}
        className="px-x-default group/item-value w-full bg-black text-white md:grid md:h-[clamp(10px,20vh,136px)] md:grid-cols-12 md:items-center md:gap-5"
        onClick={handleClick}
      >
        <div className="flex h-[clamp(10px,20vh,136px)] items-center gap-5 md:contents">
          <IconCross className="group-hover/item-value:fill-yellow shrink-0 fill-white duration-300 group-hover/item-value:rotate-180 group-hover/item-value:transition-[fill,rotate]" />
          <p className="h1 font-safiro-regular! group-hover/item-value:text-yellow col-span-10 transition-colors duration-300 md:col-span-6 xl:col-span-8">
            {value.name[isFrench ? 'fr' : 'en']}
          </p>
          <p className="p3-regular col-span-4 -translate-x-5 opacity-30 transition-opacity duration-300 group-hover/item-value:opacity-100 max-md:hidden xl:col-span-3">
            {value.description[isFrench ? 'fr' : 'en']}
          </p>
        </div>

        <div ref={wrapperRef} className="overflow-hidden md:hidden" style={{ height: 0 }}>
          <p ref={descriptionRef} className="p3-regular pb-5 opacity-60">
            {value.description[isFrench ? 'fr' : 'en']}
          </p>
        </div>
      </li>
    );
  },
);

export default ItemValue;
