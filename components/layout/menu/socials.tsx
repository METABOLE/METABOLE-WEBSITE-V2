import clsx from 'clsx';
import Link from 'next/link';

const Socials = ({
  socials,
  className,
}: {
  socials: { href: string; text: string }[];
  className?: string;
}) => {
  return (
    <ul className={clsx('pt-y-default flex flex-col gap-4 overflow-hidden', className)}>
      <li className="p3-medium overflow-hidden text-black uppercase">
        <span className="menu-item-translate inline-block">Socials</span>
      </li>
      {socials.map((link, index) => (
        <li key={link.href + index} className="overflow-hidden">
          <Link
            className="p3-medium menu-item-translate inline-block cursor-pointer text-black/30 uppercase transition-[translate,color] hover:-translate-x-2 hover:text-black"
            href={link.href}
            scroll={false}
            target="_blank"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
