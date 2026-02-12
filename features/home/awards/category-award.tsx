import { AwardsData } from '@/types';
import ItemAward from './item-award';

const CategoryAward = ({ name, categories }: AwardsData) => {
  return (
    <div className="pt-10">
      <p className="p3-medium pb-5 text-white uppercase">{name}</p>
      <ul className="relative">
        <div className="absolute top-0 left-0 z-10 h-px w-full bg-[#E4E4FF]/10" />
        {categories.map((category) => (
          <ItemAward key={category.name} award={name} {...category} />
        ))}
      </ul>
    </div>
  );
};

export default CategoryAward;
