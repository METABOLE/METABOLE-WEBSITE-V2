import { IconCross } from '@/components/ui/icons';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { urlFor } from '@/sanity/lib/image';
import { Compatibility } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';

const CardCompatibility = ({ name, image }: Compatibility) => {
  const isTouch = useTouchDevice();

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
            height={1080}
            src={urlFor(image).url()}
            width={1080}
            className={clsx(
              'h-full w-full object-contain opacity-60',
              !isTouch &&
                'ease-power4-in-out scale-130 transition-[opacity,scale] duration-800 group-hover/card-compatibility:scale-100 group-hover/card-compatibility:opacity-100',
            )}
          />
        </div>
        <div className="ease-power4-in-out absolute inset-0 scale-0 bg-black/4 transition-transform duration-800 group-hover/card-compatibility:scale-100" />
        <div className="absolute translate-y-14 overflow-hidden">
          <p
            className={clsx(
              'p3-medium',
              isTouch
                ? 'translate-y-0 opacity-60'
                : 'ease-power4-in-out translate-y-5 transition-transform duration-800 group-hover/card-compatibility:translate-y-0',
            )}
          >
            {name}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardCompatibility;
