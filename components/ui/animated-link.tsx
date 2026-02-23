import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { forwardRef, HTMLAttributes, useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

interface BaseAnimatedLinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isDark?: boolean;
  isResizable?: boolean;
}

type LinkAnimatedLinkProps = BaseAnimatedLinkProps & {
  href: string;
  scroll?: boolean;
  target?: string;
};

type ButtonAnimatedLinkProps = BaseAnimatedLinkProps &
  Omit<HTMLAttributes<HTMLButtonElement>, keyof BaseAnimatedLinkProps> & {
    href?: never;
  };

type AnimatedLinkProps = LinkAnimatedLinkProps | ButtonAnimatedLinkProps;

const AnimatedLink = forwardRef<HTMLAnchorElement | HTMLButtonElement, AnimatedLinkProps>(
  ({ children, className, isDark = false, isResizable = false, onClick, ...props }, ref) => {
    const { contextSafe } = useGSAP();

    const [currentChild, setCurrentChild] = useState(children);
    const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const splitTextRef = useRef<SplitText | null>(null);
    const absoluteSplitTextRef = useRef<SplitText | null>(null);
    const timelineRef = useRef(gsap.timeline({ paused: true }));

    const cleanupSplitText = contextSafe(() => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
        splitTextRef.current = null;
      }
      if (absoluteSplitTextRef.current) {
        absoluteSplitTextRef.current.revert();
        absoluteSplitTextRef.current = null;
      }
      timelineRef.current?.clear();
    });

    const initSplitText = contextSafe(() => {
      if (!currentChildRef.current || !absoluteChildRef.current) return;

      cleanupSplitText();

      splitTextRef.current = new SplitText(currentChildRef.current, {
        type: 'lines',
        mask: 'lines',
      });
      absoluteSplitTextRef.current = new SplitText(absoluteChildRef.current, {
        type: 'lines',
        mask: 'lines',
      });

      gsap.set(splitTextRef.current.lines, { yPercent: 0 });
      gsap.set(absoluteSplitTextRef.current.lines, { yPercent: 110 });

      timelineRef.current
        .to(
          splitTextRef.current.lines,
          {
            yPercent: -110,
            duration: 0.2,
            stagger: 0.015,
            ease: 'power2.in',
          },
          '<',
        )
        .to(
          absoluteSplitTextRef.current.lines,
          {
            yPercent: 0,
            duration: 0.3,
            stagger: 0.015,
            ease: 'power2.out',
          },
          '<0.1',
        );
    });

    const showHoverAnimation = contextSafe(() => {
      if (!timelineRef.current) return;
      timelineRef.current.play();
    });

    const hideHoverAnimation = contextSafe(() => {
      if (!timelineRef.current) return;
      timelineRef.current.reverse();
    });

    useGSAP(() => {
      if (isResizable) cleanupSplitText();
      setCurrentChild(children);
    }, [children, isResizable]);

    useGSAP(() => {
      cleanupSplitText();
      initSplitText();
    }, [currentChild]);

    useGSAP(() => {
      if (!isResizable) return;

      const onResize = () => {
        cleanupSplitText();
        initSplitText();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, [isResizable]);

    const setRef = (el: HTMLAnchorElement | HTMLButtonElement | null) => {
      elementRef.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    const content = (
      <>
        <span
          ref={currentChildRef}
          className={clsx('relative z-10 transition-colors', isDark ? 'text-white' : 'text-black')}
        >
          {currentChild}
        </span>
        <span
          ref={absoluteChildRef}
          aria-hidden={true}
          className={clsx('absolute z-10 transition-colors', isDark ? 'text-yellow' : 'text-blue')}
        >
          {currentChild}
        </span>
      </>
    );

    const commonProps = {
      ref: setRef,
      className: clsx('relative flex cursor-pointer flex-col overflow-hidden', className),
      onClick,
      onMouseEnter: showHoverAnimation,
      onMouseLeave: hideHoverAnimation,
    };

    if ('href' in props && props.href != null) {
      const linkProps = props as LinkAnimatedLinkProps;
      return (
        <Link
          {...commonProps}
          href={linkProps.href}
          scroll={linkProps.scroll ?? false}
          target={linkProps.target}
        >
          {content}
        </Link>
      );
    }

    const buttonProps = props as ButtonAnimatedLinkProps;
    return (
      <button {...commonProps} type="button" {...buttonProps}>
        {content}
      </button>
    );
  },
);

AnimatedLink.displayName = 'AnimatedLink';

export default AnimatedLink;
