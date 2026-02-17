import { useLanguage } from '@/providers/language.provider';
import { urlFor } from '@/sanity/lib/image';
import { Team } from '@/types';
import Image from 'next/image';
import { useRef } from 'react';

const CardTeam = ({ label, name, photo, role }: Omit<Team, 'slug'>) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  // const scrollAnimation = contextSafe(() => {
  //   gsap.to(cardRef.current, {
  //     scale: 0,
  //     opacity: 0,
  //     ease: 'none',
  //     scrollTrigger: {
  //       horizontal: true,
  //       markers: true,
  //       start: 'right left',
  //       end: 'left right',
  //     },
  //   });
  // });

  // useGSAP(() => {
  //   scrollAnimation();
  // }, []);

  return (
    <div ref={cardRef} className="sticky left-0 shrink-0">
      <Image
        alt={name}
        className="aspect-3/4 w-[23vw] object-cover"
        height={1920}
        src={urlFor(photo).url()}
        width={1080}
      />
      <h3 className="p2 text-blue pt-5 uppercase">/{name}</h3>
      {role?.[isFrench ? 'fr' : 'en'] && (
        <p className="p3-medium pt-2">{role[isFrench ? 'fr' : 'en']}</p>
      )}
      {label && <span className="p3 text-black/30 lowercase">{label}</span>}
    </div>
  );
};

export default CardTeam;
