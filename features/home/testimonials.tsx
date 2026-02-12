import BackgroundLines from '@/components/layout/background-lines';
import SafeNumberFlow from '@/components/shared/safe-number-flow';
import Title from '@/components/shared/title';
import { IconArrow } from '@/components/ui/icons';
import { Testimonial } from '@/types';
import { useEffect, useState } from 'react';
import ItemTestimonial from './testimonials/item-testimonial';

const PROGRESS_DURATION_MS = 8000;

const TestimonialsComponent = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % testimonials.length);
    }, PROGRESS_DURATION_MS);
    return () => clearInterval(id);
  }, [testimonials.length]);

  useEffect(() => {
    setProgress(0);
    let cancelled = false;
    const start = Date.now();
    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / PROGRESS_DURATION_MS) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [currentIndex]);

  const handlePrevious = () => {
    if (testimonials.length <= 1) return;
    const next = currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(next);
  };

  const handleNext = () => {
    if (testimonials.length <= 1) return;
    const next = currentIndex + 1 >= testimonials.length ? 0 : currentIndex + 1;
    setCurrentIndex(next);
  };

  if (!testimonials.length) return null;

  return (
    <section className="py-y-default sticky z-90 bg-black">
      <BackgroundLines isDark={true} />
      <div className="px-x-default grid grid-cols-12 items-center gap-5">
        <Title className="col-span-3" color="yellow">
          TESTIMONIALS
        </Title>
        <div className="p3-regular col-span-2 col-start-8 flex items-center justify-center gap-4 text-white">
          <button aria-label="Témoignage précédent" type="button" onClick={handlePrevious}>
            <IconArrow className="-rotate-90 cursor-pointer fill-white opacity-70 transition-[scale,opacity] hover:scale-120 hover:opacity-100" />
          </button>
          <SafeNumberFlow
            format={{ minimumIntegerDigits: 3, useGrouping: false }}
            value={currentIndex + 1}
          />
          <span>/</span>
          <SafeNumberFlow
            format={{ minimumIntegerDigits: 3, useGrouping: false }}
            value={testimonials.length}
          />
          <button aria-label="Témoignage suivant" type="button" onClick={handleNext}>
            <IconArrow className="rotate-90 cursor-pointer fill-white opacity-70 transition-[scale,opacity] hover:scale-120 hover:opacity-100" />
          </button>
        </div>
        <div className="col-span-3 -col-end-1 h-px w-[calc(100%+20px)] -translate-x-5 bg-white/30">
          <div
            className="h-full w-full origin-left bg-white"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>
      </div>

      <div className="px-x-default pt-y-default">
        <div className="relative grid grid-cols-12 gap-5">
          {testimonials.map((testimonial, i) => (
            <ItemTestimonial key={testimonial._id} isActive={i === currentIndex} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsComponent;
