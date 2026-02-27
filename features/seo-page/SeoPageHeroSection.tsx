import { SeoPageBreadcrumbItem, SeoPageHero } from '@/types';
import Footer from '../shared/footer';
import BackgroundLines from '@/components/layout/background-lines';
import Breadcrumb from '@/components/ui/breadcrumb';
import Button from '@/components/ui/button';

interface Props {
  hero: SeoPageHero;
  isFrench: boolean;
  location: string;
  breadcrumbItems?: SeoPageBreadcrumbItem[];
  totalAwards: number;
}

const SeoPageHeroSection = ({ hero, breadcrumbItems, isFrench, location, totalAwards }: Props) => {
  return (
    <section className="sticky top-0 flex min-h-screen flex-col justify-between bg-linear-to-b from-[#000019] to-[#000049] pt-[calc(100px+var(--y-half-default))] text-white">
      <BackgroundLines className="z-0" isDark={true} />
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb className="px-x-default col-span-12" items={breadcrumbItems} />
      )}
      <div className="px-x-default gap-y-y-default grid h-full grid-cols-12 gap-x-5">
        <h1 className="col-span-10 col-start-2">{hero.h1[isFrench ? 'fr' : 'en']}</h1>
        <div className="col-span-4 col-start-6">
          <p className="pb-y-half-default">{hero.tagline[isFrench ? 'fr' : 'en']}</p>
          <Button color="secondary" href={hero.ctaHref}>
            {hero.ctaLabel[isFrench ? 'fr' : 'en']}
          </Button>
        </div>
      </div>
      <Footer isDark={true} location={location} totalAwards={totalAwards} />
    </section>
  );
};

export default SeoPageHeroSection;
