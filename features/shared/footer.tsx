import SafeNumberFlow from '@/components/shared/safe-number-flow';
import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import { useEffect, useState } from 'react';
import Showreel from '../home/hero/showreel';
import { BREAKPOINTS } from '@/types';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import clsx from 'clsx';

const Footer = ({
  totalAwards,
  location,
  isDark,
  hasShowreel = false,
  className,
}: {
  totalAwards: number;
  location: string;
  isDark: boolean;
  hasShowreel?: boolean;
  className?: string;
}) => {
  const [value, setValue] = useState(0);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);

  useEffect(() => {
    setTimeout(() => {
      setValue(totalAwards);
    }, 1000);
  }, []);

  return (
    <div
      className={clsx(
        'px-x-default sticky right-0 bottom-0 left-0 z-50 flex h-fit w-full grid-cols-3 items-center justify-between gap-5 pb-8 sm:grid md:grid-cols-12',
        isDark ? 'text-white' : 'text-black',
        className,
      )}
    >
      {hasShowreel && <Showreel />}
      <SafeNumberFlow
        className="text-left text-sm! md:col-span-3"
        prefix={isTablet ? 'Awards(' : 'Award winning studio ('}
        suffix="+)"
        value={value}
      />
      <div className="hidden md:block">
        <IconCross className={clsx('-translate-x-[5px]', isDark ? 'fill-white' : 'fill-black')} />
      </div>
      <p className="font-safiro-medium! text-center text-sm! md:col-span-4">{location}</p>
      <div className="hidden justify-end md:flex">
        <IconCross className={clsx('translate-x-[5px]', isDark ? 'fill-white' : 'fill-black')} />
      </div>
      <Time className="hidden text-right text-sm! sm:block md:col-span-3" isDark={true} />
    </div>
  );
};

export default Footer;
