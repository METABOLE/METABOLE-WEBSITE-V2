import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { forwardRef, HTMLAttributes, useRef } from 'react';

gsap.registerPlugin(SplitText);

interface BaseAnimatedLinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isDark?: boolean;
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
  ({ children, className, isDark = false, onClick, ...props }, ref) => {
    const { contextSafe } = useGSAP();

    const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const timelineRef = useRef(gsap.timeline({ paused: true }));

    const initSplitText = contextSafe(() => {
      if (!currentChildRef.current || !absoluteChildRef.current) return;

      const splitText = new SplitText(currentChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });
      const absoluteSplitText = new SplitText(absoluteChildRef.current, {
        type: 'chars',
        mask: 'chars',
      });

      gsap.set(splitText.chars, { yPercent: 0 });
      gsap.set(absoluteSplitText.chars, { yPercent: 110 });

      timelineRef.current
        .to(
          splitText.chars,
          {
            yPercent: -110,
            duration: 0.2,
            stagger: 0.015,
            ease: 'power2.in',
          },
          '<',
        )
        .to(
          absoluteSplitText.chars,
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
      initSplitText();
    }, [children]);

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
          {children}
        </span>
        <span
          ref={absoluteChildRef}
          aria-hidden={true}
          className={clsx('absolute z-10 transition-colors', isDark ? 'text-yellow' : 'text-blue')}
        >
          {children}
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
