import clsx from 'clsx';
import { IconChevron } from './icons';

const Breadcrumb = ({
  items,
  className,
}: {
  items: { name: string; url: string }[];
  className?: string;
}) => {
  return (
    <ul className={clsx('flex items-center gap-4', className)}>
      {items.map((item, index) => (
        <>
          <li key={item.url}>
            <a href={item.url}>{item.name}</a>
          </li>
          {index < items.length - 1 && (
            <IconChevron className="h-2 w-2 rotate-180 stroke-white/30" />
          )}
        </>
      ))}
    </ul>
  );
};

export default Breadcrumb;
