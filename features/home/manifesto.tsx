import RevealText from '@/components/shared/reveal-text';
import RevealTitle from '@/components/shared/reveal-title';

const Manifesto = () => {
  return (
    <section className="py-y-double-default px-x-default grid h-screen grid-cols-12 items-center gap-5 text-left text-white">
      <div className="col-span-10 col-start-2 max-w-5xl">
        <RevealTitle isDark={true}>MANIFESTO</RevealTitle>
        <RevealText className="h2 pt-y-half-default">
          Notre approche à la fois stratégique et créative part de vos enjeux pour construire
          ensemble des identités uniques, premiums et créatives.
        </RevealText>
      </div>
    </section>
  );
};

export default Manifesto;
