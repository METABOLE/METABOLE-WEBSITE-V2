import { LINKS } from '@/constants';
import { useMenu } from '@/hooks/menu/useMenu';
import { useLanguage } from '@/providers/language.provider';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { Data, ProjectType, TAG_TYPE } from '@/types';
import { clsx } from 'clsx';
import Link from 'next/link';
import Language from '../shared/language';
import NewsletterForm from '../shared/newsletter-form';
import Sound from '../shared/sound';
import Time from '../shared/time';
import AnimatedLink from '../ui/animated-link';
import Hint from '../ui/hint';
import { LogoFull } from '../ui/icons';
import Tag from '../ui/tag';
import CutoutWrapper from './cutout-wrapper';

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

const Menu = ({ projects, dataInfos }: { projects: ProjectType[]; dataInfos: Data[] }) => {
  const SLICED_PROJECTS = projects.slice(0, 6);
  const {
    refs: {
      logoRef,
      soundRef,
      headerRef,
      menuRef,
      wrapperButtonRef,
      contactMenuRef,
      buttonMenuRef,
      cutoutRef,
      linksRef,
      titleProjectsRef,
      projectTagsRefs,
      newsletterFormRef,
      socialsRef,
      infosRef,
    },
    isMenuOpen,
    openMenu,
    closeMenu,
  } = useMenu();

  const [data] = dataInfos;
  const { email, location, socials } = data;
  const { isFrench, getInternalPath } = useLanguage();
  const { isLayoutDark } = useLayoutColor();

  return (
    <>
      <Hint containerId="hint-newsletter-menu" isDark={false} isLeft={true}>
        {isFrench ? (
          <p>
            On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du contenu
            utile !
          </p>
        ) : (
          <p>
            We don't spam: <strong>1 email every 3 months</strong>, with news and useful content!
          </p>
        )}
      </Hint>
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
              className="p3 whitespace-nowrap"
              href={getInternalPath('/contact')}
              isDark={isLayoutDark}
              scroll={false}
              onClick={closeMenu}
            >
              CONTACT
            </AnimatedLink>
            <AnimatedLink
              ref={buttonMenuRef}
              className="p3 whitespace-nowrap"
              isDark={isLayoutDark}
              onClick={isMenuOpen ? closeMenu : openMenu}
            >
              {TEXT_BUTTON[isFrench ? 'fr' : 'en'][isMenuOpen ? 'close' : 'open']}
            </AnimatedLink>
          </div>
        </div>
      </header>
      <CutoutWrapper ref={cutoutRef}>
        <div
          ref={menuRef}
          className="px-x-default py-y-default gap-y-default bg-menu/0 flex h-full w-full flex-col justify-between"
        >
          <div />
          <div className="grid grid-cols-10 gap-5">
            <nav className="col-span-4">
              <ul ref={linksRef} className="flex flex-col gap-5">
                {LINKS.map((link) => (
                  <li key={link.href} className="translate-y-10 scale-y-0">
                    <AnimatedLink
                      className="h2 link hover:text-blue cursor-pointer text-black/70"
                      href={getInternalPath(link.href)}
                      scroll={false}
                      onClick={closeMenu}
                    >
                      {link.text[isFrench ? 'fr' : 'en']}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="col-span-3">
              {SLICED_PROJECTS.length > 0 && (
                <ul className="flex flex-col gap-2.5">
                  <li className="overflow-hidden">
                    <Link
                      ref={titleProjectsRef}
                      className="h3 inline-block cursor-pointer text-black/70"
                      href={getInternalPath('/projects')}
                      scroll={false}
                    >
                      {isFrench ? 'Projets' : 'Projects'}
                    </Link>
                  </li>
                  {SLICED_PROJECTS.map((link, index) => (
                    <li key={link.name + index}>
                      <Tag
                        ref={(el) => {
                          if (el) projectTagsRefs.current[index] = el;
                        }}
                        className="cursor-pointer"
                        href={link.name}
                        type={TAG_TYPE.WHTIE}
                      >
                        {link.name}
                      </Tag>
                    </li>
                  ))}
                  <li>
                    <Tag
                      ref={(el) => {
                        if (el) {
                          const next = [...projectTagsRefs.current];
                          next[SLICED_PROJECTS.length + 1] = el;
                          projectTagsRefs.current = next;
                        }
                      }}
                      className="cursor-pointer"
                      href="/projects"
                      type={TAG_TYPE.WHTIE}
                    >
                      {isFrench ? 'Et plus' : 'And more'} ...
                    </Tag>
                  </li>
                </ul>
              )}
            </nav>
            <div className="col-span-3">
              <NewsletterForm
                ref={newsletterFormRef}
                animate={true}
                hintId="hint-newsletter-menu"
                isDark={true}
              />
              <nav className="pt-y-default text-right">
                <ul ref={socialsRef} className="flex flex-col items-end gap-4 overflow-hidden">
                  <li className="p3 text-black">Socials</li>
                  {socials.map((link, index) => (
                    <li key={link.href + index}>
                      <Link
                        className="p3 inline-block cursor-pointer text-black/30 transition-[translate,color] hover:-translate-x-2 hover:text-black"
                        href={link.href}
                        scroll={false}
                        target="_blank"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div
            ref={infosRef}
            className="flex w-full items-center justify-between gap-5 overflow-y-hidden whitespace-nowrap xl:grid xl:grid-cols-6"
          >
            <p>Metabole® 2025</p>
            <p className="hidden lg:block">{location}</p>
            <Time isDark={false} />
            <a className="col-span-2 cursor-pointer" href={'mailto:' + email}>
              {email}
            </a>
            <div className="flex justify-end xl:w-full">
              <Language onClick={closeMenu} />
            </div>
          </div>
        </div>
      </CutoutWrapper>
    </>
  );
};

export default Menu;
