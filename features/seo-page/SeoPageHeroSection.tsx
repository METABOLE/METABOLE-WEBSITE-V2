import RichTextSeo from '@/components/ui/rich-text-seo';
import { SeoPageHero } from '@/types';

interface Props {
  hero: SeoPageHero;
  isFrench: boolean;
}

const SeoPageHeroSection = ({ hero, isFrench }: Props) => {
  const h1 = isFrench ? hero.h1.fr : hero.h1.en;
  const tagline = isFrench ? hero.tagline.fr : hero.tagline.en;
  const ctaLabel = isFrench ? hero.ctaLabel.fr : hero.ctaLabel.en;

  return (
    <section>
      <h1>{h1}</h1>
      <p>{tagline}</p>
      <a href={hero.ctaHref}>{ctaLabel}</a>
    </section>
  );
};

export default SeoPageHeroSection;
