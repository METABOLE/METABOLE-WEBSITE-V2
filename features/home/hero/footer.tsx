import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import Showreel from './showreel';
import SafeNumberFlow from '@/components/shared/safe-number-flow';
import { useEffect, useState } from 'react';

const Footer = ({ totalAwards }: { totalAwards: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setValue(totalAwards);
    }, 1000);
  }, []);

  return (
    <div className="px-x-default sticky right-0 bottom-0 left-0 z-50 grid h-fit w-full grid-cols-3 items-center gap-5 pb-8 text-white md:grid-cols-12">
      <Showreel />
      <SafeNumberFlow
        className="text-left text-sm! md:col-span-3"
        prefix="Award winning studio ("
        suffix="+)"
        value={value}
      />
      <div className="hidden md:block">
        <IconCross className="-translate-x-[5px] fill-white" />
      </div>
      <p className="text-center text-sm! md:col-span-4">Paris | Rotterdam</p>
      <div className="hidden justify-end md:flex">
        <IconCross className="translate-x-[5px] fill-white" />
      </div>
      <Time className="text-right text-sm! md:col-span-3" isDark={true} />
    </div>
  );
};

export default Footer;
