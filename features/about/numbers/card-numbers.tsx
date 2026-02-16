import SafeNumberFlow from '@/components/shared/safe-number-flow';
import { IconCross } from '@/components/ui/icons';

const CardNumbers = ({ name, numbers }: { name: string; numbers: number }) => {
  return (
    <>
      <div className="group/card-numbers xs:aspect-3/4 xs:h-auto relative flex aspect-auto h-30 max-h-[220px] w-full flex-col items-center justify-center md:aspect-4/3">
        <IconCross className="fill-blue xs:top-0 xs:right-0 xs:bottom-auto xs:left-auto xs:translate-x-1/2 xs:-translate-y-1/2 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <IconCross className="fill-blue absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
        <div className="flex h-15 w-14 items-center justify-center">
          <SafeNumberFlow className="h1 text-black" suffix="+" value={numbers} />
        </div>
        <div className="ease-power4-in-out absolute inset-0 scale-0 bg-black/4 transition-transform duration-800 group-hover/card-numbers:scale-100" />
        <div className="absolute translate-y-14 overflow-hidden">
          <p className="p3-medium ease-power4-in-out translate-y-5 uppercase transition-transform duration-800 group-hover/card-numbers:translate-y-0">
            {name}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardNumbers;
