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
          normal: ({ children }) => <p>{children}</p>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          h4: ({ children }) => <h4>{children}</h4>,
        },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
          number: ({ children }) => <li>{children}</li>,
        },
        marks: {
          strong: ({ children }) => <strong>{children}</strong>,
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
