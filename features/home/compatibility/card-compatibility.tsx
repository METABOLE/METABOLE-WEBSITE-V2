import { IconCross } from '@/components/ui/icons';
import { urlFor } from '@/sanity/lib/image';
import { Compatibility } from '@/types';
import Image from 'next/image';

const CardCompatibility = ({ name, image }: Compatibility) => {
  return (
    <>
      <div
        className="group/card-compatibility relative flex w-[clamp(180px,20vw,220px)] shrink-0 flex-col items-center justify-center"
        style={{ aspectRatio: '4/3.5' }}
      >
        <IconCross className="fill-blue absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <IconCross className="fill-blue absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        <div className="h-15 w-14">
          <Image
            alt={name}
            className="ease-power4-in-out h-full w-full scale-130 object-contain opacity-60 transition-[opacity,scale] duration-800 group-hover/card-compatibility:scale-100 group-hover/card-compatibility:opacity-100"
            height={1080}
            src={urlFor(image).url()}
            width={1080}
          />
        </div>
        <div className="ease-power4-in-out absolute inset-0 scale-0 bg-black/5 transition-transform duration-800 group-hover/card-compatibility:scale-100" />
        <div className="absolute translate-y-14 overflow-hidden">
          <p className="p3-medium ease-power4-in-out translate-y-5 transition-transform duration-800 group-hover/card-compatibility:translate-y-0">
            {name}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardCompatibility;
