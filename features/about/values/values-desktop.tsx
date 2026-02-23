import Title from '@/components/shared/title';
import { useLanguage } from '@/providers/language.provider';
import { Value } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import ItemValue from './item-value';

const ValuesDesktop = ({ values }: { values: Value[] }) => {
  const sectionRef = useRef(null);
  const itemsRefs = useRef<HTMLDivElement[] | HTMLLIElement[]>([]);

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const setupAnimation = contextSafe(() => {
    itemsRefs.current.forEach((item) => {
      gsap.set(item, { xPercent: 100 });
    });
  });

  const pinAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: true,
        },
      })
      .to(itemsRefs.current, {
        xPercent: 0,
        ease: 'power1.inOut',
        duration: 1,
        stagger: 0.1,
      });
  });

  useGSAP(() => {
    setupAnimation();
    pinAnimation();
  }, []);

  return (
    <section ref={sectionRef} className="space-y-px overflow-hidden pt-[100px]">
      <div
        ref={(el) => {
          if (el) {
            itemsRefs.current[0] = el;
          }
        }}
        className="px-x-default flex h-[clamp(10px,20vh,136px)] items-center bg-black"
      >
        <Title color="yellow">{isFrench ? 'VALEURS' : 'VALUES'}</Title>
      </div>
      <ul className="flex flex-col gap-y-px">
        {values.map((value, index) => (
          <ItemValue
            key={value.name.fr}
            ref={(el) => {
              if (el) {
                itemsRefs.current[index + 1] = el;
              }
            }}
            value={value}
          />
        ))}
      </ul>
      <div
        ref={(el) => {
          if (el) {
            itemsRefs.current[itemsRefs.current.length] = el;
          }
        }}
        className="px-x-default flex h-[clamp(10px,20vh,136px)] items-center bg-black"
      />
    </section>
  );
};

export default ValuesDesktop;
