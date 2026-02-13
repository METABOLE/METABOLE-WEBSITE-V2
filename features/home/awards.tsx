import SafeNumberFlow from '@/components/shared/safe-number-flow';
import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';
import { AwardsData } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import CategoryAward from './awards/category-award';

const AwardsComponent = ({ awards }: { awards: AwardsData[] | null }) => {
  const { isFrench } = useLanguage();
  const list = Array.isArray(awards) ? awards : [];
  if (!list.length) return null;

  const sectionRef = useRef(null);
  const [value, setValue] = useState(0);

  const totalAwards = list.reduce(
    (acc, award) =>
      acc + award.categories.reduce((acc, category) => acc + parseInt(category.number), 0),
    0,
  );

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
          setValue(Math.floor(counterObjectNumber.value));
        },
      });
  });

  useGSAP(() => {
    scrollAnimation();
  }, []);

  return (
    <section ref={sectionRef} className="py-y-default text-white">
      <div className="px-x-default">
        <div className="flex flex-col gap-5 md:grid md:grid-cols-12">
          <Title className="col-span-3" color="yellow">
            AWARDS
          </Title>
          <Typography className="p3-regular col-span-4" variant="p">
            Neque suscipit dui nisl iaculis in orci tristique mauris at. Semper diam mi ultrices sit
            gravida nisl ut nunc. Elementum donec rhoncus elit cras tellus nibh rhoncus tellus
            sapien.
          </Typography>
          <div className="flex w-full justify-end md:col-span-2 md:-col-end-1">
            <SafeNumberFlow
              className="font-safiro-regular p1 text-yellow total-awards-number-flow text-right"
              format={{ minimumIntegerDigits: totalAwards.toString().length }}
              locales={isFrench ? 'fr-FR' : 'en-US'}
              prefix="Total awards : "
              trend={-1}
              value={value}
            />
          </div>
        </div>
        <div className="md:pt-y-default relative px-px">
          {list.map((award) => (
            <CategoryAward key={award.name} {...award} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsComponent;
