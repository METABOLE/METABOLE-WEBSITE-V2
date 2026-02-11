import Time from '@/components/shared/time';
import { IconCross } from '@/components/ui/icons';
import Showreel from './showreel';

const Footer = () => {
  return (
    <div className="px-x-default sticky right-0 bottom-0 left-0 z-50 grid h-fit w-full grid-cols-12 items-center gap-5 pb-8 text-white">
      <Showreel />
      <p className="col-span-3 text-left text-sm!">Metabole® 2025</p>
      <div className="">
        <IconCross className="-translate-x-[5px] fill-white" />
      </div>
      <p className="col-span-4 text-center text-sm!">Paris | Rotterdam</p>
      <div className="flex justify-end">
        <IconCross className="translate-x-[5px] fill-white" />
      </div>
      <Time className="col-span-3 text-right text-sm!" isDark={true} />
    </div>
  );
};

export default Footer;
