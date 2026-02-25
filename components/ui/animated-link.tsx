import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { ComponentProps, forwardRef, HTMLAttributes, ReactNode, useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

interface BaseAnimatedLinkProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isResizable?: boolean;
  onClick?: () => void;
}

type DivAnimatedLinkProps = BaseAnimatedLinkProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseAnimatedLinkProps> & {
    href?: never;
    target?: never;
  };

interface LinkAnimatedLinkProps extends BaseAnimatedLinkProps {
  href: string;
  target?: string;
  scroll?: boolean;
}

type AnimatedLinkProps = DivAnimatedLinkProps | LinkAnimatedLinkProps;

type DynamicElementProps = {
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  scroll?: boolean;
} & ComponentProps<'div'>;

const DynamicElement = ({ href, disabled, scroll = false, ...props }: DynamicElementProps) => {
  const Component = href && !disabled ? Link : 'button';
  return (
    <Component {...(props as LinkAnimatedLinkProps)} {...(href && !disabled && { href, scroll })} />
  );
};

const AnimatedLink = forwardRef<HTMLDivElement, AnimatedLinkProps>(
  ({ children, href, target, className, disabled = false, isResizable = false, ...props }, ref) => {
    const { contextSafe } = useGSAP();
    const { isLoading, performanceLevel } = usePerformance();
    const buttonRef = useRef(null);
    const hiddenButtonRef = useRef<HTMLDivElement>(null);
    const textRef = useRef(null);
    const currentChildRef = useRef(null);
    const absoluteChildRef = useRef(null);
    const [currentChild, setCurrentChild] = useState(children);

    const resizeButton = contextSafe(() => {
      if (!isResizable || currentChild === children) return;

      const widthHiddenButton = hiddenButtonRef.current?.getBoundingClientRect();
      const targetWidth = widthHiddenButton?.width;

      gsap
        .timeline()
        .to(textRef.current, {
          width: targetWidth,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(
          textRef.current,
          {
            y: -50,
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          },
          '<',
        )
        .add(() => {
          setCurrentChild(children);
        })
        .set(textRef.current, {
          y: 50,
          opacity: 0,
        })
        .to(
          textRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.15,
            ease: 'power2.out',
          },
          '<',
        );
    });

    useGSAP(() => {
      if (!isResizable || isLoading) return;
      setCurrentChild(children);
      resizeButton();
    }, [children, isResizable, isLoading]);

    if (performanceLevel === PERFORMANCE_LEVEL.LOW) {
      return (
        <DynamicElement
          ref={ref}
          className={clsx(
            'w-fit cursor-pointer overflow-hidden uppercase transition-colors duration-200',
            disabled ? 'cursor-default! opacity-70' : 'cursor-pointer',
            className,
          )}
          {...props}
          disabled={disabled}
          href={href}
          target={target}
        >
          <div className="whitespace-nowrap">{children}</div>
        </DynamicElement>
      );
    }

    return (
      <>
        <DynamicElement
          ref={ref}
          className={clsx(
            'group/animated-link w-fit cursor-pointer overflow-hidden uppercase',
            disabled ? 'cursor-none! opacity-70' : 'cursor-pointer',
            className,
          )}
          {...props}
          disabled={disabled}
          href={href}
          target={target}
          onMouseMove={(e) => useMagnet(e, 0.8)}
          onMouseOut={(e) => useResetMagnet(e)}
        >
          <div
            ref={buttonRef}
            className="z-20 flex h-full w-full items-center uppercase"
            onMouseMove={(e) => useMagnet(e, 0.4)}
            onMouseOut={(e) => useResetMagnet(e)}
          >
            <div
              ref={textRef}
              className="relative flex w-fit items-center justify-center overflow-hidden whitespace-nowrap"
            >
              <span
                ref={currentChildRef}
                className={clsx(
                  !disabled &&
                    'ease-power4-in-out duration-500 group-hover/animated-link:-translate-y-full',
                )}
              >
                {isResizable ? currentChild : children}
              </span>
              <span
                ref={absoluteChildRef}
                aria-hidden={true}
                className={clsx(
                  'absolute translate-y-full',
                  !disabled &&
                    'ease-power4-in-out duration-500 group-hover/animated-link:translate-y-0',
                )}
              >
                {isResizable ? currentChild : children}
              </span>
            </div>
          </div>
        </DynamicElement>
        {isResizable && (
          <div
            ref={hiddenButtonRef}
            className={clsx(
              'pointer-events-none invisible fixed top-0 left-0 -z-10 h-full whitespace-nowrap uppercase opacity-0',
              className,
            )}
          >
            {children}
          </div>
        )}
      </>
    );
  },
);

export default AnimatedLink;
