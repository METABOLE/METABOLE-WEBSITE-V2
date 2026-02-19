import Typography from '@/components/ui/typography';

const Hero = () => {
  return (
    <section className="px-x-default py-y-double-default relative grid h-screen w-screen grid-cols-12 items-center gap-5">
      <Typography
        className="h2 text-blue col-span-8 col-start-2 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-2"
        variant="h1"
      >
        Si on a créé Metabole, c’est pour travailler dans le studio créatif que l’on voulait
        rejoindre.
      </Typography>
      <Typography className="h3 col-span-8 -col-end-2 lg:col-span-6 lg:-col-end-2" variant="h2">
        Exigent sans être jamais être distant, toujours créatif, tourné vers l’avenir, et surtout,
        où l’on se sent bien.
      </Typography>
    </section>
  );
};

export default Hero;
