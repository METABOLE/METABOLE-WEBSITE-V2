import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import ScrollingContainer from '@/components/shared/scrolling-container';
import Typography from '@/components/ui/typography';
import { Expertise } from '@/types';
import CardExpertise from './expertise/card-expertise';
import { useLanguage } from '@/providers/language.provider';

const ExpertiseComponent = ({ expertise }: { expertise: Expertise[] }) => {
  const { isFrench } = useLanguage();
  return (
    <section className="py-y-default sticky z-90 bg-white">
      <BackgroundLines />
      <div className="px-x-default">
        <Title color="blue">EXPERTISE</Title>
        <div className="pt-y-half-default flex grid-cols-12 flex-col gap-5 md:grid">
          <Typography className="p2 md:col-span-7" variant="p">
            {isFrench ? 'Les secteurs que l’on aime le plus :' : 'The sectors we love the most:'}
          </Typography>
          <Typography className="p3 md:col-span-5" variant="p">
            {isFrench
              ? 'Nous accompagnons des marques et des entreprises issues de secteurs variés, avec des besoins et des enjeux différents.'
              : 'We work with brands and companies from diverse industries, each with their own challenges and goals.'}
          </Typography>
        </div>
      </div>
      <ScrollingContainer className="pt-y-default" scrollSpeed={20}>
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
