import Language from '@/components/shared/language';
import Time from '@/components/shared/time';
import { RefObject } from 'react';

const Infos = ({
  infosRef,
  location,
  email,
  closeMenu,
}: {
  infosRef: RefObject<HTMLDivElement | null>;
  location: string;
  email: string;
  closeMenu: () => void;
}) => {
  return (
    <div
      ref={infosRef}
      className="px-x-default flex w-full shrink-0 items-center justify-between gap-5 overflow-y-hidden whitespace-nowrap xl:grid xl:grid-cols-6"
    >
      <div className="hidden overflow-hidden sm:block">
        <p className="p3-medium menu-item-translate text-black">Metabole® 2025</p>
      </div>
      <div className="hidden overflow-hidden lg:block">
        <p className="p3-medium menu-item-translate text-black">{location}</p>
      </div>
      <div className="hidden overflow-hidden sm:block">
        <Time className="menu-item-translate" isDark={false} />
      </div>
      <div className="col-span-2 overflow-hidden">
        <a
          className="p3-medium menu-item-translate inline-block cursor-pointer text-black"
          href={'mailto:' + email}
        >
          {email}
        </a>
      </div>
      <div className="flex justify-end overflow-hidden xl:w-full">
        <Language className="menu-item-translate" onClick={closeMenu} />
      </div>
    </div>
  );
};

export default Infos;
