import Title from '@/components/shared/title';
import ItemValue from './item-value';
import { Value } from '@/types';
import { useLanguage } from '@/providers/language.provider';

const ValuesMobile = ({ values }: { values: Value[] }) => {
  const { isFrench } = useLanguage();
  return (
    <>
      <section className="space-y-px overflow-hidden pt-[100px]">
        <div className="px-x-default flex h-[clamp(10px,20vh,136px)] items-center bg-black">
          <Title color="yellow">{isFrench ? 'VALEURS' : 'VALUES'}</Title>
        </div>
        <ul className="flex flex-col gap-y-px">
          {values.map((value) => (
            <ItemValue key={value.name.fr} value={value} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ValuesMobile;
