import Title from '@/components/shared/title';
import { IconCross } from '@/components/ui/icons';
import { Service } from '@/types';

const ItemService = ({ title, description, servicesList, index }: Service & { index: number }) => {
  return (
    <div className="pt-y-half-default grid grid-cols-12 gap-5">
      <Title className="p3-medium col-span-1" color="black">
        {index + 1}
      </Title>
      <div className="col-span-2 flex h-fit items-center gap-1">
        <IconCross className="fill-blue shrink-0" />
        <p className="p3-medium uppercase">{title}</p>
      </div>
      <p className="p3-regular col-span-4 max-w-xs">{description}</p>
      <div className="col-span-5">
        {servicesList.map((service) => (
          <p
            key={service}
            className="font-safiro-regular! text-[clamp(24px,2vw,36px)]! tracking-[-0.03em]"
          >
            {service}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ItemService;
