import Title from '@/components/shared/title';
import { IconCross } from '@/components/ui/icons';
import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';
import { Data } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import CardNumbers from './numbers/card-numbers';

const Numbers = ({ data, totalAwards }: { data: Data; totalAwards: number }) => {
  const sectionRef = useRef(null);

  const [values, setValues] = useState({
    awards: 0,
    countries: 0,
    projects: 0,
  });

  const { countriesCount, projectsCount } = data;

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const scrollAnimation = contextSafe(() => {
    const counterObjectNumber = { value: 0 };
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
      .to(counterObjectNumber, {
        value: totalAwards,
        onUpdate: () => {
          setValues((prev) => ({ ...prev, awards: Math.floor(counterObjectNumber.value) }));
        },
      })
      .to(counterObjectNumber, {
        value: countriesCount,
        onUpdate: () => {
          setValues((prev) => ({ ...prev, countries: Math.floor(counterObjectNumber.value) }));
        },
      })
      .to(counterObjectNumber, {
        value: projectsCount,
        onUpdate: () => {
          setValues((prev) => ({ ...prev, projects: Math.floor(counterObjectNumber.value) }));
        },
      });
  });

  useGSAP(() => {
    scrollAnimation();
  }, []);

  return (
    <section ref={sectionRef} className="px-x-default py-y-double-default">
      <div className="pb-y-default gap-y-default-half flex flex-col sm:grid sm:grid-cols-12 sm:gap-5">
        <Title className="col-span-3" color="blue">
          {isFrench ? 'CHIFFRES' : 'NUMBERS'}
        </Title>
        <Typography
          className="p3 col-span-6 lg:col-span-4 lg:-col-end-2 lg:-translate-x-5"
          variant="p"
        >
          {isFrench
            ? 'Travailler avec Metabole, c’est surtout savoir que l’on va faire du bon travail ensemble avec des clients qui nous ressemblent. Ambitieux et bienveillants. Leur satisfaction est notre premier objectif.'
            : 'Working with Metabole is mostly knowing that we will do good work together with clients who are like us. Ambitious and welcoming. Their satisfaction is our first objective.'}
        </Typography>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="hidden md:block" />
        <div className="xs:flex-row relative col-span-12 flex w-full flex-col md:col-span-10">
          <IconCross className="fill-blue absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
          <IconCross className="fill-blue xs:top-auto xs:bottom-0 xs:left-0 xs:-translate-x-1/2 xs:translate-y-1/2 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
          <CardNumbers name="Awards" numbers={values.awards} />
          <CardNumbers name={isFrench ? 'Pays' : 'Countries'} numbers={values.countries} />
          <CardNumbers name={isFrench ? 'Projets' : 'Projects'} numbers={values.projects} />
        </div>
        <div className="hidden md:block" />
      </div>
    </section>
  );
};

export default Numbers;
