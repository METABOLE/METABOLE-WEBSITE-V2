import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { clsx } from 'clsx';
import Link from 'next/link';
import { ComponentProps, forwardRef, HTMLAttributes, ReactNode } from 'react';

interface BaseTagProps {
  children: ReactNode;
  type?: 'white';
  className?: string;
}

type DivTagProps = BaseTagProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseTagProps> & {
    href?: never;
    target?: never;
  };

interface LinkTagProps extends BaseTagProps {
  href: string;
  target?: string;
}

type TagProps = DivTagProps | LinkTagProps;

type DynamicElementProps = {
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
} & ComponentProps<'div'>;

const DynamicElement = ({ href, ...props }: DynamicElementProps) => {
  const Component = href ? Link : 'div';
  return <Component {...(props as LinkTagProps)} {...(href && { href })} />;
};

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ children, type = 'white', href, target, className, ...props }, ref) => {
    return (
      <DynamicElement
        ref={ref}
        className={clsx(
          'label inline-block w-fit origin-left overflow-hidden rounded-sm uppercase backdrop-blur-xl transition-colors',
          type === 'white' && 'bg-white/70 text-black hover:bg-white',
          className,
        )}
        {...props}
        href={href}
        target={target}
        onMouseMove={(e) => useMagnet(e, 0.8)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <span
          className="flex h-full w-full origin-left items-center px-3 py-2 whitespace-nowrap"
          onMouseMove={(e) => useMagnet(e, 0.4)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          {children}
        </span>
      </DynamicElement>
    );
  },
);

export default Tag;
