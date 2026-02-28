import { slugify } from '@/lib/blog-headings';
import { PortableText } from 'next-sanity';
import { PortableTextBlock } from 'sanity';

interface RichTextSeoProps {
  value: PortableTextBlock[];
  /** Ajoute des id d'ancre sur les H2/H3 pour le sommaire */
  withAnchors?: boolean;
}

function getChildrenText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getChildrenText).join('');
  return '';
}

/** Renderer PortableText adapté au blockContentSeo : H2, H3, H4, listes, liens. */
const RichTextSeo = ({ value, withAnchors }: RichTextSeoProps) => {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="not-last:pb-y-half-default max-w-3xl">{children}</p>
          ),
          h2: ({ children }) => {
            const id = withAnchors ? slugify(getChildrenText(children)) : undefined;
            return (
              <h2 className="h2 not-last:pb-y-half-default text-blue scroll-mt-[100px]" id={id}>
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = withAnchors ? slugify(getChildrenText(children)) : undefined;
            return (
              <h3 className="h3 not-last:pb-y-half-default scroll-mt-[100px]" id={id}>
                {children}
              </h3>
            );
          },
          h4: ({ children }) => <h4 className="h4 not-last:pb-y-half-default">{children}</h4>,
        },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li className="">{children}</li>,
          number: ({ children }) => <li className="">{children}</li>,
        },
        marks: {
          strong: ({ children }) => <strong className="text-blue">{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          link: ({ value: mark, children }) => (
            <a href={mark?.href} rel="noopener noreferrer">
              {children}
            </a>
          ),
        },
      }}
    />
  );
};

export default RichTextSeo;
