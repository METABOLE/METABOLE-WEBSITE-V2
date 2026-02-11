import { urlFor } from '@/sanity/lib/image';
import { Expertise } from '@/types';
import Image from 'next/image';

const CardExpertise = ({ name, image }: Expertise) => {
  return (
    <div className="relative flex h-full w-[clamp(200px,20vw,400px)] shrink-0 items-center justify-center overflow-hidden rounded-sm">
      <Image
        alt={name.fr}
        className="h-full w-full object-cover"
        height={1080}
        src={urlFor(image).url()}
        width={1080}
      />
      <h3 className="h2 absolute top-1/2 z-10 -translate-y-1/2 text-center text-white">
        {name.fr}
      </h3>
    </div>
  );
};

export default CardExpertise;
