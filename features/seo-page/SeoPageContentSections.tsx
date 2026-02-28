import HorizontalSmoothScroll from '@/components/shared/horizontal-smooth-scroll';
import { IconCross } from '@/components/ui/icons';
import RichTextSeo from '@/components/ui/rich-text-seo';
import SeoPageTestimonialItem from '@/features/seo-page/SeoPageTestimonialItem';
import {
  SeoPageSection,
  SeoPageSectionContenu,
  SeoPageSectionFaq,
  SeoPageSectionRelatedProjects,
  SeoPageSectionTestimonials,
} from '@/types';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

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
    <h3 className="h3 pb-y-half-default">
      {isFrench ? 'Ils nous ont fait confiance' : 'They trusted us'}
    </h3>
    <HorizontalSmoothScroll>
      <div className="flex gap-5">
        {section.testimonials?.map((t) => (
          <SeoPageTestimonialItem key={t.name} isFrench={isFrench} testimonial={t} />
        ))}
      </div>
    </HorizontalSmoothScroll>
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

const FaqBlock = ({ section, isFrench }: { section: SeoPageSectionFaq; isFrench: boolean }) => (
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
