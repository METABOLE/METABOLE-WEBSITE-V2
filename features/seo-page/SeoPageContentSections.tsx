import RichTextSeo from '@/components/ui/rich-text-seo';
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
    {section.testimonials?.map((t, i) => (
      <article key={i}>
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
    {sections.map((section) => {
      switch (section._type) {
        case 'seoPageSectionContenu':
          return <ContenuBlock key={section._key} isFrench={isFrench} section={section} />;
        case 'seoPageSectionTestimonials':
          return <TestimonialsBlock key={section._key} isFrench={isFrench} section={section} />;
        case 'seoPageSectionRelatedProjects':
          return <RelatedProjectsBlock key={section._key} isFrench={isFrench} section={section} />;
        case 'seoPageSectionFaq':
          return <FaqBlock key={section._key} isFrench={isFrench} section={section} />;
        case 'seoPageSectionInternalLinks':
          return <InternalLinksBlock key={section._key} isFrench={isFrench} section={section} />;
        case 'seoPageSectionCadrage':
          return <CadrageBlock key={section._key} isFrench={isFrench} section={section} />;
        default:
          return null;
      }
    })}
  </>
);

export default SeoPageContentSections;
