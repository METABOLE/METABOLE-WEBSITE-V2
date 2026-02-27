import { PortableText } from 'next-sanity';
import { PortableTextBlock } from 'sanity';

interface RichTextSeoProps {
  value: PortableTextBlock[];
}

/** Renderer PortableText adapté au blockContentSeo : H2, H3, H4, listes, liens. */
const RichTextSeo = ({ value }: RichTextSeoProps) => {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="not-last:pb-y-half-default max-w-3xl">{children}</p>
          ),
          h2: ({ children }) => (
            <h2 className="h2 not-last:pb-y-half-default text-blue">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="h3 not-last:pb-y-half-default">{children}</h3>,
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
