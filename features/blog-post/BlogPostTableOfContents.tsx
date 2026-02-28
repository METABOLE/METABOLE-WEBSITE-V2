'use client';

import { Heading } from '@/lib/blog-headings';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  headings: Heading[];
  isFrench: boolean;
}

const BlogPostTableOfContents = ({ headings, isFrench }: Props) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label={isFrench ? 'Sommaire' : 'Table of contents'}
      className="border-blue/10 bg-blue/3 mt-y-half-default rounded-sm border p-6"
    >
      <p className="p2 text-blue mb-4 font-semibold">
        {isFrench ? '📋 Sommaire' : '📋 Table of contents'}
      </p>
      <ol className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={clsx(level === 3 && 'ml-4')}>
            <a
              href={`#${id}`}
              className={clsx(
                'p3 transition-colors duration-150 hover:underline',
                activeId === id ? 'text-blue font-semibold' : 'text-black/60',
              )}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActiveId(id);
                }
              }}
            >
              {level === 3 && <span className="mr-1 opacity-40">↳</span>}
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BlogPostTableOfContents;
