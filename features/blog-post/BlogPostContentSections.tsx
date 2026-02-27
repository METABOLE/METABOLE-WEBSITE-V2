import RichTextSeo from '@/components/ui/rich-text-seo';
import { IconCross } from '@/components/ui/icons';
import {
  BlogPostSection,
  BlogPostSectionContenu,
  BlogPostSectionFaq,
  BlogPostSectionRelatedProjects,
  BlogPostSectionStatQuote,
  BlogPostSectionTipBox,
} from '@/types';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

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
      <RichTextSeo value={content} />
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
      <div className="border-blue bg-blue/5 rounded-sm border-l-4 p-6">
        <p className="p3 text-blue mb-3 font-semibold tracking-wide uppercase">💡 {label}</p>
        <RichTextSeo value={content} />
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
      <blockquote className="border-blue/20 border-l-4 pl-6">
        <p className="h3 text-blue/80 italic">{section.quote[lang]}</p>
        {section.source && (
          <footer className="p3 mt-3 text-black/50">
            {section.sourceUrl ? (
              <a
                className="underline underline-offset-2"
                href={section.sourceUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                — {section.source}
              </a>
            ) : (
              <span>— {section.source}</span>
            )}
          </footer>
        )}
      </blockquote>
    </section>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <dt>
        <button
          aria-expanded={open}
          className="border-blue/10 flex h-[60px] w-full cursor-pointer items-center border-t"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            aria-hidden="true"
            className="hidden w-[60px] items-center justify-center sm:flex"
            style={{
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <IconCross className={clsx('h-3.5 w-3.5', open ? 'fill-blue' : 'fill-black')} />
          </span>
          <span className={clsx('p2', open ? 'text-blue' : 'text-black')}>{question}</span>
        </button>
      </dt>
      <dd
        className="p3 overflow-hidden transition-all duration-300 sm:pl-[60px]"
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight ?? 9999}px` : '0px',
        }}
      >
        <div ref={contentRef} className="pb-[18px]">
          {answer}
        </div>
      </dd>
    </div>
  );
};

const FaqBlock = ({ section, isFrench }: { section: BlogPostSectionFaq; isFrench: boolean }) => (
  <section>
    <h3 className="h3 pb-y-half-default">
      {isFrench ? 'FAQ : Questions fréquentes' : 'FAQ : Frequently asked questions'}
    </h3>
    <dl className="border-blue/10 border-b">
      {section.items?.map((item) => (
        <FaqItem
          key={item._key}
          answer={<RichTextSeo value={isFrench ? item.answer.fr : item.answer.en} />}
          question={isFrench ? item.question.fr : item.question.en}
        />
      ))}
    </dl>
  </section>
);

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
    {sections.map((section, index) => {
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
        case 'blogPostSectionFaq':
          block = <FaqBlock isFrench={isFrench} section={section} />;
          break;
        case 'blogPostSectionRelatedProjects':
          block = <RelatedProjectsBlock isFrench={isFrench} section={section} />;
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

export default BlogPostContentSections;
