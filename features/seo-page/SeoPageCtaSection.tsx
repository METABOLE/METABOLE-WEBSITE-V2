import Button from '@/components/ui/button';
import { SeoPageCtaFinal } from '@/types';

interface Props {
  cta: SeoPageCtaFinal;
  isFrench: boolean;
}

const SeoPageCtaSection = ({ cta, isFrench }: Props) => {
  return (
    <section className="px-x-default pt-y-default mx-auto flex flex-col items-center justify-center text-center">
      {cta.text && (
        <p className="h2 pb-y-half-default max-w-6xl">{cta.text[isFrench ? 'fr' : 'en']}</p>
      )}
      {cta.buttonLabel && cta.href && (
        <Button color="primary" href={cta.href}>
          {cta.buttonLabel[isFrench ? 'fr' : 'en']}
        </Button>
      )}
    </section>
  );
};

export default SeoPageCtaSection;
