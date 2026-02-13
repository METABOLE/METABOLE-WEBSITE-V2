import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';

const JoinUs = () => {
  const { isFrench } = useLanguage();
  return (
    <section className="py-y-default sticky z-90 bg-white">
      <BackgroundLines />
      <div className="px-x-default">
        <Title color="blue">{isFrench ? 'NOUS REJOINDRE' : 'JOIN US'}</Title>
        <div className="pt-y-half-default flex grid-cols-12 flex-col gap-5 md:grid">
          <Typography className="p2 md:col-span-7" variant="p">
            Les secteurs que l’on aime le plus :
          </Typography>
          <Typography className="p3 md:col-span-5" variant="p">
            Neque suscipit dui nisl iaculis in orci tristique mauris at. Semper diam mi ultrices sit
            gravida nisl ut nunc. Elementum donec rhoncus elit cras tellus nibh rhoncus tellus
            sapien.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
