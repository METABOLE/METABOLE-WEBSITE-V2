import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

const RevealText = ({
  children,
  className,
  variant = 'p',
}: {
  children: string;
  className?: string;
  variant?: 'p' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}) => {
  const textRef = useRef(null);

  const { contextSafe } = useGSAP();
  const revealAnimation = contextSafe(() => {
    if (!textRef.current) return;

    const splitText = new SplitText(textRef.current, {
      type: 'lines',
      mask: 'lines',
    });

    gsap.set(splitText.lines, { y: 100 });

    gsap.to(splitText.lines, {
      y: 0,
      duration: 1.6,
      ease: 'power4.inOut',
      stagger: 0.07,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  const Tag = variant;

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
};

export default RevealText;
