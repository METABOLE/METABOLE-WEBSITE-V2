import AnimatedLink from '@/components/ui/animated-link';
import { LINKS } from '@/constants/navigation.constant';
import { useLanguage } from '@/providers/language.provider';

const Links = ({ closeMenu }: { closeMenu: () => void }) => {
  const { isFrench, getInternalPath } = useLanguage();

  return (
    <nav className="col-span-4">
      <ul className="flex flex-col gap-5">
        {LINKS.map((link) => (
          <li key={link.href} className="overflow-hidden">
            <div className="menu-item-translate">
              <AnimatedLink
                className="h2 link hover:text-blue cursor-pointer text-black/70"
                href={getInternalPath(link.href)}
                scroll={false}
                onClick={closeMenu}
              >
                {link.text[isFrench ? 'fr' : 'en']}
              </AnimatedLink>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Links;
