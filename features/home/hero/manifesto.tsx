import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';

const Manifesto = () => {
  const { isFrench } = useLanguage();

  return (
    <section className="py-y-double-default px-x-default grid h-screen grid-cols-12 items-center gap-5 text-left text-white">
      <div className="col-span-10 max-w-5xl sm:col-start-2">
        <Title color="yellow">MANIFESTO</Title>
        <Typography
          className="h2 pt-y-half-default"
          end="top top"
          scrub={true}
          start={`"top bottom+=${window.innerHeight * 0.5}"`}
          variant="p"
        >
          {isFrench
            ? 'Notre approche à la fois stratégique et créative part de vos enjeux pour construire ensemble des identités uniques, premiums et créatives.'
            : 'Our approach, both strategic and creative, starts with your challenges to build unique, premium, and creative identities together.'}
        </Typography>
      </div>
    </section>
  );
};

export default Manifesto;
