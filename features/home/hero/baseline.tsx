import Typography from '@/components/ui/typography';

const Baseline = () => {
  return (
    <div className="gap-y-default px-x-default relative flex h-screen w-screen flex-col items-center justify-center text-center text-white">
      <Typography className="h1 font-safiro-regular! max-w-5xl" variant="h1">
        Le studio créatif premium des entreprises de demain.
      </Typography>
      <Typography className="p3-medium max-w-5xl tracking-[-0.03em] uppercase" variant="p">
        Stratégie - Direction artistique - Développement web
      </Typography>
    </div>
  );
};

export default Baseline;
