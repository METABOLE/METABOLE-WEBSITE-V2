import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';

const Hero = () => {
  const { isFrench } = useLanguage();
  return (
    <section className="px-x-default py-y-double-default relative grid h-screen w-screen grid-cols-12 items-center gap-5">
      <Typography
        className="h2 text-blue col-span-8 col-start-2 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2"
        variant="h1"
      >
        {isFrench
          ? 'Si on a créé Metabole, c’est pour travailler dans le studio créatif que l’on voulait rejoindre.'
          : "If we created Metabole, it's to work in the creative studio we wanted to join."}
      </Typography>
      <Typography className="h3 col-span-8 -col-end-2 lg:col-span-6 lg:-col-end-2" variant="h2">
        {isFrench
          ? 'Exigent sans être jamais être distant, toujours créatif, tourné vers l’avenir, et surtout, où l’on se sent bien.'
          : 'Demandant without being distant, always creative, turned towards the future, and above all, where one feels good.'}
      </Typography>
    </section>
  );
};

export default Hero;
