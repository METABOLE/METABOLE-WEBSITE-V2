import SafeNumberFlow from '@/components/shared/safe-number-flow';
import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import { useEffect, useState } from 'react';

const Footer = ({ totalAwards, location }: { totalAwards: number; location: string }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setValue(totalAwards);
    }, 1000);
  }, []);

  return (
    <div className="px-x-default absolute right-0 bottom-0 left-0 z-90 grid h-fit w-full grid-cols-3 items-center gap-5 pb-8 text-black md:grid-cols-12">
      <SafeNumberFlow
        className="text-left text-sm! md:col-span-3"
        prefix="Award winning studio ("
        suffix="+)"
        value={value}
      />
      <div className="hidden md:block">
        <IconCross className="-translate-x-[5px] fill-black" />
      </div>
      <p className="font-safiro-medium! text-center text-sm! md:col-span-4">{location}</p>
      <div className="hidden justify-end md:flex">
        <IconCross className="translate-x-[5px] fill-black" />
      </div>
      <Time className="text-right text-sm! md:col-span-3" isDark={false} />
    </div>
  );
};

export default Footer;
