import Link from 'next/link';

const Socials = ({ socials }: { socials: { href: string; text: string }[] }) => {
  return (
    <nav className="pt-y-default text-right">
      <ul className="flex flex-col items-end gap-4 overflow-hidden">
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
    </nav>
  );
};

export default Socials;
