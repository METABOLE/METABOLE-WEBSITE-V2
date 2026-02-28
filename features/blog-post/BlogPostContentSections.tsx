import RichTextSeo from '@/components/ui/rich-text-seo';
import {
  BlogPostSection,
  BlogPostSectionContenu,
  BlogPostSectionRelatedProjects,
  BlogPostSectionStatQuote,
  BlogPostSectionTipBox,
} from '@/types';
import React from 'react';

const ContenuBlock = ({
  section,
  isFrench,
}: {
  section: BlogPostSectionContenu;
  isFrench: boolean;
}) => {
  const content = isFrench ? section.content.fr : section.content.en;
  return (
    <section>
      <RichTextSeo value={content} withAnchors />
    </section>
  );
};

const TipBoxBlock = ({
  section,
  isFrench,
}: {
  section: BlogPostSectionTipBox;
  isFrench: boolean;
}) => {
  const lang = isFrench ? 'fr' : 'en';
  const label = section.label?.[lang] ?? (isFrench ? 'Conseil' : 'Tip');
  const content = isFrench ? section.content.fr : section.content.en;

  return (
    <section>
      <div className="bg-linear-to-b from-[#000019] to-[#000049] p-8">
        <p className="p3 text-yellow mb-3 font-semibold tracking-wide uppercase">{label}</p>
        <div className="text-white">
          <RichTextSeo value={content} />
        </div>
      </div>
    </section>
  );
};

const StatQuoteBlock = ({
  section,
  isFrench,
}: {
  section: BlogPostSectionStatQuote;
  isFrench: boolean;
}) => {
  const lang = isFrench ? 'fr' : 'en';

  return (
    <section>
      <blockquote className="bg-linear-to-b from-[#000019] to-[#000049] p-8">
        <p className="p2 font-safiro-regular-italic text-white italic">{section.quote[lang]}</p>
        {section.source && (
          <footer className="mt-6">
            <p className="font-safiro-regular! text-sm! text-white">
              {isFrench ? 'Nom de la source :' : 'Source name :'} {section.source}
            </p>
            {section.sourceUrl && (
              <p className="text-yellow font-safiro-regular! text-sm! underline underline-offset-2">
                <a href={section.sourceUrl} rel="noopener noreferrer" target="_blank">
                  {isFrench ? 'Lien vers la source' : 'Link to the source'}
                </a>
              </p>
            )}
          </footer>
        )}
      </blockquote>
    </section>
  );
};

const RelatedProjectsBlock = ({
  section,
  isFrench,
}: {
  section: BlogPostSectionRelatedProjects;
  isFrench: boolean;
}) => (
  <section>
    {section.intro && (
      <p className="p2 pb-y-half-default">{isFrench ? section.intro.fr : section.intro.en}</p>
    )}
    <ul>
      {section.projects?.map((project, i) => (
        <li key={project.slug?.current ?? i}>
          <a
            className="p3 text-blue underline underline-offset-2"
            href={`/${isFrench ? 'fr' : 'en'}/projects/${project.slug?.current}`}
          >
            {project.name}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

// ——— Dispatcher ———

interface Props {
  sections: BlogPostSection[];
  isFrench: boolean;
}

const BlogPostContentSections = ({ sections, isFrench }: Props) => (
  <>
    {sections.map((section) => {
      let block: React.ReactNode = null;

      switch (section._type) {
        case 'blogPostSectionContenu':
          block = <ContenuBlock isFrench={isFrench} section={section} />;
          break;
        case 'blogPostSectionTipBox':
          block = <TipBoxBlock isFrench={isFrench} section={section} />;
          break;
        case 'blogPostSectionStatQuote':
          block = <StatQuoteBlock isFrench={isFrench} section={section} />;
          break;
        case 'blogPostSectionRelatedProjects':
          block = <RelatedProjectsBlock isFrench={isFrench} section={section} />;
          break;
        default:
          return null;
      }

      return (
        <div key={section._key} className="pt-y-default">
          {block}
        </div>
      );
    })}
  </>
);

export default BlogPostContentSections;
