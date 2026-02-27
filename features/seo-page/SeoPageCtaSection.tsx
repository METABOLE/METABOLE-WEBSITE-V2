import Button from '@/components/ui/button';
import RichTextSeo from '@/components/ui/rich-text-seo';
import { SeoPageCtaFinal } from '@/types';

interface Props {
  cta: SeoPageCtaFinal;
  isFrench: boolean;
}

const SeoPageCtaSection = ({ cta, isFrench }: Props) => {
  return (
    <section className="px-x-default pt-y-default mx-auto flex flex-col items-center justify-center text-center">
      {cta.text && <RichTextSeo value={cta.text[isFrench ? 'fr' : 'en']} />}
      {cta.buttonLabel && cta.href && (
        <Button color="secondary" href={cta.href}>
          {cta.buttonLabel[isFrench ? 'fr' : 'en']}
        </Button>
      )}
    </section>
  );
};

export default SeoPageCtaSection;
