import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import ScrollingContainer from '@/components/ui/scrolling-container';
import Typography from '@/components/ui/typography';
import { Expertise } from '@/types';
import CardExpertise from './expertise/card-expertise';

const ExpertiseComponent = ({ expertise }: { expertise: Expertise[] }) => {
  return (
    <section className="py-y-default sticky top-0 z-90 h-screen bg-white">
      <BackgroundLines />
      <div className="px-x-default">
        <Title isDark={false}>EXPERTISE</Title>
        <div className="pt-y-half-default grid grid-cols-12 gap-5">
          <Typography className="p2 col-span-7" variant="p">
            Les secteurs que l’on aime le plus :
          </Typography>
          <Typography className="p3 col-span-5" variant="p">
            Neque suscipit dui nisl iaculis in orci tristique mauris at. Semper diam mi ultrices sit
            gravida nisl ut nunc. Elementum donec rhoncus elit cras tellus nibh rhoncus tellus
            sapien.
          </Typography>
        </div>
      </div>

      <ScrollingContainer className="pt-y-default">
        <div className="flex h-full gap-5 pl-5">
          {expertise.map((expertise) => (
            <CardExpertise key={expertise.slug.current} {...expertise} />
          ))}
        </div>
      </ScrollingContainer>
    </section>
  );
};

export default ExpertiseComponent;
