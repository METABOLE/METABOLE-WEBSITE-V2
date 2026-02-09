import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';

const Manifesto = () => {
  return (
    <section className="py-y-double-default px-x-default grid h-screen grid-cols-12 items-center gap-5 text-left text-white">
      <div className="col-span-10 col-start-2 max-w-5xl">
        <Title isDark={true}>MANIFESTO</Title>
        <Typography className="h2 pt-y-half-default" variant="p">
          Notre approche à la fois stratégique et créative part de vos enjeux pour construire
          ensemble des identités uniques, premiums et créatives.
        </Typography>
      </div>
    </section>
  );
};

export default Manifesto;
