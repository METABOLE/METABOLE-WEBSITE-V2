import Sound from '@/components/shared/sound';
import AnimatedLink from '@/components/ui/animated-link';
import { LogoFull } from '@/components/ui/icons';
import { useLanguage } from '@/providers/language.provider';
import clsx from 'clsx';
import Link from 'next/link';
import { RefObject } from 'react';

const TEXT_BUTTON = {
  fr: {
    open: 'MENU',
    close: 'FERMER',
  },
  en: {
    open: 'MENU',
    close: 'CLOSE',
  },
};

const Header = ({
  headerRef,
  logoRef,
  wrapperButtonRef,
  closeMenu,
  soundRef,
  isLayoutDark,
  contactMenuRef,
  isMenuOpen,
  openMenu,
}: {
  headerRef: RefObject<HTMLHeadElement | null>;
  logoRef: RefObject<HTMLAnchorElement | null>;
  wrapperButtonRef: RefObject<HTMLDivElement | null>;
  soundRef: RefObject<HTMLButtonElement | null>;
  isLayoutDark: boolean;
  contactMenuRef: RefObject<HTMLAnchorElement | null>;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}) => {
  const { isFrench, getInternalPath } = useLanguage();
  return (
    <header ref={headerRef} className="px-x-default fixed z-900 w-full">
      <div className="flex items-center justify-between py-8">
        <Link
          ref={logoRef}
          aria-label="Logo"
          className="cursor-pointer"
          href={getInternalPath('/')}
          scroll={false}
          onClick={closeMenu}
        >
          <LogoFull
            className={clsx(
              'h-auto w-24 transition-colors',
              isLayoutDark ? 'fill-white' : 'fill-black',
            )}
          />
        </Link>
        <div ref={wrapperButtonRef} className="flex items-center gap-10">
          <Sound ref={soundRef} className="shrink-0" isDark={isLayoutDark} />
          <AnimatedLink
            ref={contactMenuRef}
            className="p3-medium overflow-hidden whitespace-nowrap"
            href={getInternalPath('/contact')}
            isDark={isLayoutDark}
            scroll={false}
            onClick={closeMenu}
          >
            CONTACT
          </AnimatedLink>
          <AnimatedLink
            className="p3-medium whitespace-nowrap"
            isDark={isLayoutDark}
            isResizable
            onClick={isMenuOpen ? closeMenu : openMenu}
          >
            {TEXT_BUTTON[isFrench ? 'fr' : 'en'][isMenuOpen ? 'close' : 'open']}
          </AnimatedLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
