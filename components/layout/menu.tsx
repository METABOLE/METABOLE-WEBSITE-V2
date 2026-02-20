import { useMenu } from '@/hooks/menu/useMenu';
import { useLanguage } from '@/providers/language.provider';
import { useLayoutColor } from '@/providers/layout-color.provider';
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
      <Header
        closeMenu={closeMenu}
        contactMenuRef={contactMenuRef}
        headerRef={headerRef}
        isLayoutDark={isLayoutDark}
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
          <Divider />
          <div className="px-x-default grid grid-cols-10 gap-5">
            <Links closeMenu={closeMenu} />
            <Projects getInternalPath={getInternalPath} isFrench={isFrench} projects={projects} />
            <div className="col-span-3">
              <NewsletterForm
                ref={newsletterFormRef}
                animate={true}
                hintId="hint-newsletter-menu"
                isDark={true}
              />
              {data?.socials && <Socials socials={data.socials} />}
            </div>
          </div>
          <Divider />
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
