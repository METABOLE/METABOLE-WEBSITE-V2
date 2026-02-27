import RichTextSeo from '@/components/ui/rich-text-seo';
import React from 'react';
import {
  SeoPageSection,
  SeoPageSectionCadrage,
  SeoPageSectionContenu,
  SeoPageSectionFaq,
  SeoPageSectionInternalLinks,
  SeoPageSectionRelatedProjects,
  SeoPageSectionTestimonials,
} from '@/types';

const ContenuBlock = ({
  section,
  isFrench,
}: {
  section: SeoPageSectionContenu;
  isFrench: boolean;
}) => {
  const content = isFrench ? section.content.fr : section.content.en;
  return (
    <section>
      <RichTextSeo value={content} />
    </section>
  );
};

const TestimonialsBlock = ({
  section,
  isFrench,
}: {
  section: SeoPageSectionTestimonials;
  isFrench: boolean;
}) => (
  <section>
    {section.testimonials?.map((t) => (
      <article key={t.name}>
        <p>{isFrench ? t.testimony.fr : t.testimony.en}</p>
        <footer>
          <span>{t.name}</span>
          {' · '}
          <span>{isFrench ? t.role.fr : t.role.en}</span>
          {t.company && (
            <>
              {', '}
              <span>{t.company}</span>
            </>
          )}
        </footer>
      </article>
    ))}
  </section>
);

const RelatedProjectsBlock = ({
  section,
  isFrench,
}: {
  section: SeoPageSectionRelatedProjects;
  isFrench: boolean;
}) => (
  <section>
    {section.intro && <p>{isFrench ? section.intro.fr : section.intro.en}</p>}
    <ul>
      {section.projects?.map((project, i) => (
        <li key={project.slug?.current ?? i}>
          <a href={`/${isFrench ? 'fr' : 'en'}/projects/${project.slug?.current}`}>
            {project.name}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

const FaqBlock = ({ section, isFrench }: { section: SeoPageSectionFaq; isFrench: boolean }) => (
  <section>
    <h3 className="h3">
      {isFrench ? 'FAQ : Questions fréquentes' : 'FAQ : Frequently asked questions'}
    </h3>
    <dl>
      {section.items?.map((item) => (
        <div key={item._key}>
          <dt>{isFrench ? item.question.fr : item.question.en}</dt>
          <dd>
            <RichTextSeo value={isFrench ? item.answer.fr : item.answer.en} />
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

const InternalLinksBlock = ({
  section,
  isFrench,
}: {
  section: SeoPageSectionInternalLinks;
  isFrench: boolean;
}) => (
  <nav>
    <ul>
      {section.links?.map((link) => (
        <li key={link._key}>
          <a href={link.url}>{isFrench ? link.anchor.fr : link.anchor.en}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const CadrageBlock = ({
  section,
  isFrench,
}: {
  section: SeoPageSectionCadrage;
  isFrench: boolean;
}) => {
  const content = isFrench ? section.content.fr : section.content.en;
  return (
    <section>
      <RichTextSeo value={content} />
    </section>
  );
};

// ——— Dispatcher ———

interface Props {
  sections: SeoPageSection[];
  isFrench: boolean;
}

const SeoPageContentSections = ({ sections, isFrench }: Props) => (
  <>
    {sections.map((section, index) => {
      let block: React.ReactNode = null;

      switch (section._type) {
        case 'seoPageSectionContenu':
          block = <ContenuBlock isFrench={isFrench} section={section} />;
          break;
        case 'seoPageSectionTestimonials':
          block = <TestimonialsBlock isFrench={isFrench} section={section} />;
          break;
        case 'seoPageSectionRelatedProjects':
          block = <RelatedProjectsBlock isFrench={isFrench} section={section} />;
          break;
        case 'seoPageSectionFaq':
          block = <FaqBlock isFrench={isFrench} section={section} />;
          break;
        case 'seoPageSectionInternalLinks':
          block = <InternalLinksBlock isFrench={isFrench} section={section} />;
          break;
        case 'seoPageSectionCadrage':
          block = <CadrageBlock isFrench={isFrench} section={section} />;
          break;
        default:
          return null;
      }

      return (
        <div key={section._key} className="pt-y-default px-x-default gap-y-y-default flex flex-col">
          {block}
          {index < sections.length - 1 && <div className="bg-blue/20 h-px w-full" />}
        </div>
      );
    })}
  </>
);

export default SeoPageContentSections;
