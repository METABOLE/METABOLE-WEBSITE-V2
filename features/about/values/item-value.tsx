import { IconCross } from '@/components/ui/icons';
import { useLanguage } from '@/providers/language.provider';
import { Value } from '@/types';
import { forwardRef } from 'react';

const ItemValue = forwardRef<HTMLLIElement, { value: Value }>(({ value }, ref) => {
  const { isFrench } = useLanguage();

  return (
    <li
      ref={ref}
      className="px-x-default group/item-value item-center grid h-[clamp(10px,20vh,136px)] w-full grid-cols-12 items-center gap-5 bg-black text-white"
    >
      <IconCross className="group-hover/item-value:fill-yellow fill-white duration-300 group-hover/item-value:rotate-180 group-hover/item-value:transition-[fill,rotate]" />
      <p className="h1 font-safiro-regular! hover-clip hover-clip-yellow col-span-6 group-hover/item-value:bg-position-[0%_100%] xl:col-span-8">
        {value.name[isFrench ? 'fr' : 'en']}
      </p>
      <p className="p3-regular col-span-4 -translate-x-5 opacity-30 transition-opacity duration-300 group-hover/item-value:opacity-100 xl:col-span-3">
        {value.description[isFrench ? 'fr' : 'en']}
      </p>
    </li>
  );
});

export default ItemValue;
