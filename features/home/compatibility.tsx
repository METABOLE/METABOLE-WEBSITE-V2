import BackgroundLines from '@/components/layout/background-lines';
import ScrollingContainer from '@/components/shared/scrolling-container';
import Typography from '@/components/ui/typography';
import { Compatibility } from '@/types';
import CardCompatibility from './compatibility/card-compatibility';
import { useLanguage } from '@/providers/language.provider';

const CompatibilityComponent = ({ compatibility }: { compatibility: Compatibility[] }) => {
  const { isFrench } = useLanguage();

  return (
    <section className="pt-y-default pb-y-double-default sticky bg-white">
      <BackgroundLines />
      <div className="px-x-default flex flex-col gap-5 md:grid md:grid-cols-12 md:gap-5">
        <Typography className="h2 col-span-5" variant="h2">
          {isFrench
            ? 'Ne changez rien, on s’occupe de tout.'
            : 'Don’t change a thing, we’ll handle it all.'}
        </Typography>
        <Typography
          className="p3-regular col-span-4 -col-end-2 max-w-sm md:max-w-max md:-translate-x-5"
          variant="p"
        >
          {isFrench
            ? 'Les technologies qu’on utilise sont compatibles avec tous vos supports pour se rapprocher au plus près de vos besoins.'
            : 'The technologies we use are compatible with all your supports to get as close as possible to your needs.'}
        </Typography>
      </div>
      <ScrollingContainer className="pt-y-default" scrollSpeed={20}>
        <div className="flex h-full pb-5">
          {compatibility.map((compatibility) => (
            <CardCompatibility key={compatibility.slug.current} {...compatibility} />
          ))}
        </div>
      </ScrollingContainer>
    </section>
  );
};

export default CompatibilityComponent;
