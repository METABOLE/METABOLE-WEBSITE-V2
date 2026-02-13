import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';

const Baseline = () => {
  const { isFrench } = useLanguage();
  return (
    <div className="gap-y-default px-x-default relative flex h-screen w-screen flex-col items-center justify-center text-center text-white">
      <Typography className="h1 font-safiro-regular! max-w-5xl" variant="h1">
        {isFrench
          ? 'Le studio créatif premium des entreprises de demain.'
          : "The premium creative studio of tomorrow's businesses."}
      </Typography>
      <Typography className="p3-medium max-w-5xl tracking-[-0.03em] uppercase" variant="p">
        {isFrench
          ? 'Stratégie - Direction artistique - Développement web'
          : 'Strategy - Visual Identity - Web Development'}
      </Typography>
    </div>
  );
};

export default Baseline;
