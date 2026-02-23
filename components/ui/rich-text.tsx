import clsx from 'clsx';
import { PortableText } from 'next-sanity';
import { forwardRef } from 'react';
import { TypedObject } from 'sanity';

interface RichTextProps {
  value: TypedObject[];
  className?: string;
}

const RichText = forwardRef<HTMLDivElement, RichTextProps>(({ value, className }, ref) => {
  return (
    <div ref={ref} className={clsx(className, 'space-y-6')}>
      <PortableText
        value={value}
        components={{
          block: {
            h5: ({ children }) => <h5 className="h5">{children}</h5>,
            normal: ({ children }) => <p className="p3 pt-10">{children}</p>,
          },
          marks: {
            link: ({ value, children }) => (
              <a
                className="cursor-pointer underline"
                href={value.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {children}
              </a>
            ),
          },
        }}
      />
    </div>
  );
});

export default RichText;
