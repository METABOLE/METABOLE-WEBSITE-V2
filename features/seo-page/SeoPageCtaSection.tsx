import RichTextSeo from '@/components/ui/rich-text-seo';
import { SeoPageCtaFinal } from '@/types';

interface Props {
  cta: SeoPageCtaFinal;
  isFrench: boolean;
}

const SeoPageCtaSection = ({ cta, isFrench }: Props) => {
  const text = cta.text ? (isFrench ? cta.text.fr : cta.text.en) : null;
  const label = cta.buttonLabel ? (isFrench ? cta.buttonLabel.fr : cta.buttonLabel.en) : null;

  return (
    <section>
      {text && <RichTextSeo value={text} />}
      {label && cta.href && <a href={cta.href}>{label}</a>}
    </section>
  );
};

export default SeoPageCtaSection;
