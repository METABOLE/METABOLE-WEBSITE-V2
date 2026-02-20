import { useMenu } from '@/hooks/menu/useMenu';
import { useLanguage } from '@/providers/language.provider';
import { Data, ProjectType } from '@/types';
import NewsletterForm from '../shared/newsletter-form';
import Hint from '../ui/hint';
import CutoutWrapper from './cutout-wrapper';
import Divider from './menu/divider';
import Header from './menu/header';
import Infos from './menu/infos';
import Links from './menu/links';
import Projects from './menu/projects';
import Socials from './menu/socials';

const Menu = ({ projects, dataInfos }: { projects: ProjectType[]; dataInfos: Data[] }) => {
  const {
    refs: {
      logoRef,
      soundRef,
      headerRef,
      menuRef,
      wrapperButtonRef,
      contactMenuRef,
      cutoutRef,
      newsletterFormRef,
      infosRef,
    },
    isMenuOpen,
    openMenu,
    closeMenu,
  } = useMenu();

  const data = dataInfos?.[0];
  const { isFrench, getInternalPath } = useLanguage();

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
      <Header
        closeMenu={closeMenu}
        contactMenuRef={contactMenuRef}
        headerRef={headerRef}
        isMenuOpen={isMenuOpen}
        logoRef={logoRef}
        openMenu={openMenu}
        soundRef={soundRef}
        wrapperButtonRef={wrapperButtonRef}
      />
      <CutoutWrapper ref={cutoutRef}>
        <div
          ref={menuRef}
          className="py-y-default gap-y-default bg-menu/0 flex h-full w-full flex-col justify-between"
        >
          <div />
          <Divider className="hide-on-small-height hidden md:block" />
          <div className="px-x-default flex flex-col justify-between gap-5 sm:flex-row md:grid md:grid-cols-10">
            <Links closeMenu={closeMenu} />
            <Projects
              className="col-span-3 hidden md:block"
              getInternalPath={getInternalPath}
              isFrench={isFrench}
              projects={projects}
            />
            <div className="hide-on-small-height col-span-3">
              <NewsletterForm
                ref={newsletterFormRef}
                animate={true}
                className="hidden md:block"
                hintId="hint-newsletter-menu"
                isDark={true}
              />
              {data?.socials && (
                <Socials className="md:items-end md:text-right" socials={data.socials} />
              )}
            </div>
          </div>
          <Divider className="hide-on-small-height hidden md:block" />
          {data && (
            <Infos
              closeMenu={closeMenu}
              email={data.email}
              infosRef={infosRef}
              location={data.location}
            />
          )}
        </div>
      </CutoutWrapper>
    </>
  );
};

export default Menu;
