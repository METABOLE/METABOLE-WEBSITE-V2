import { useShortcut } from '@/hooks/useShortcut';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import type { AnimatedNewsletterFormRef } from '@/components/shared/newsletter-form';
import type { AnimatedTagRef } from '@/components/ui/tag';
import type { AnimatedCutoutWrapperRef } from '@/components/layout/cutout-wrapper';
import { useLayoutColor } from '@/providers/layout-color.provider';

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const soundRef = useRef(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef(null);
  const wrapperButtonRef = useRef(null);
  const contactMenuRef = useRef(null);
  const buttonMenuRef = useRef(null);
  const cutoutRef = useRef<AnimatedCutoutWrapperRef>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const titleProjectsRef = useRef(null);
  const projectTagsRefs = useRef<AnimatedTagRef[]>([]);
  const newsletterFormRef = useRef<AnimatedNewsletterFormRef>(null);
  const socialsRef = useRef<HTMLUListElement>(null);
  const infosRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const { setIsLayoutDark } = useLayoutColor();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!logoRef.current || !soundRef.current || !contactMenuRef.current || !buttonMenuRef.current)
      return;

    gsap.set([logoRef.current, soundRef.current, contactMenuRef.current, buttonMenuRef.current], {
      y: -100,
      scale: 0.7,
    });

    gsap
      .timeline({
        delay: 1.4,
      })
      .to([logoRef.current, soundRef.current, contactMenuRef.current, buttonMenuRef.current], {
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.05,
        y: 0,
        scale: 1,
      });
  });

  const openMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !socialsRef.current ||
      !headerRef.current ||
      !infosRef.current
    )
      return;

    setIsLayoutDark(false);

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current.children, titleProjectsRef.current], {
        scaleY: 0,
        y: 40,
        xPercent: 0,
      })
      .set(socialsRef.current.children, {
        xPercent: 100,
      })
      .set(linksRef.current, {
        overflow: 'visible',
      })
      .set(socialsRef.current, {
        overflow: 'hidden',
      })
      .set(infosRef.current.children, {
        y: 40,
      })
      .set(menuRef.current, { opacity: 1 })
      .addLabel('hide-button')
      .to(
        wrapperButtonRef.current,
        { width: 44, gap: 0, duration: 0.4, ease: 'power2.inOut' },
        'hide-button',
      )
      .addLabel('show-mask')
      .to(
        menuRef.current,
        { backdropFilter: 'blur(10px)', backgroundColor: COLORS.MENU, duration: 0.8 },
        'show-mask',
      )
      .add(() => cutoutRef.current?.openCutoutWrapper(), 'show-mask')
      .to(
        headerRef.current,
        {
          top: 32,
          paddingBlock: gsap.utils.clamp(20, 8 * window.innerHeight * 0.01, 100),
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
      .to(
        headerRef.current.children,
        {
          paddingInline: gsap.utils.clamp(20, 8 * window.innerWidth * 0.01, 40),
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
      // .addLabel('show-menu')
      .add(() => setIsMenuOpen(true))
      .to(
        linksRef.current.children,
        {
          scaleY: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
        },
        '-=0.3',
      )
      .to(
        wrapperButtonRef.current,
        { width: 'auto', gap: 16, duration: 0.3, ease: 'power2.inOut' },
        '-=0.4',
      )
      // .addLabel('show-projects')
      .to(
        titleProjectsRef.current,
        {
          scaleY: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=1.3',
      )
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.1, () => ref.play());
        });
      }, '-=1')
      // .addLabel('show-form')
      .add(() => {
        newsletterFormRef.current?.play();
      }, '-=0.6')
      .to(
        socialsRef.current.children,
        {
          xPercent: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.6',
      )
      .to(
        infosRef.current.children,
        {
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=1',
      );
  });

  const closeMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !headerRef.current ||
      !socialsRef.current ||
      !infosRef.current
    )
      return;

    setIsLayoutDark(true);

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current, socialsRef.current], {
        overflow: 'hidden',
      })
      .addLabel('hide-button')
      .to(wrapperButtonRef.current, { width: 44, duration: 0.4 }, 'hide-button')
      .to(
        linksRef.current.children,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.05,
        },
        '<',
      )
      .to(
        socialsRef.current.children,
        {
          xPercent: 100,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.05, () => ref.reverse());
        });
      }, '<')
      .add(() => {
        newsletterFormRef.current?.reverse();
      }, '<')
      .to(
        infosRef.current.children,
        {
          y: 40,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .to(
        titleProjectsRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      )
      .add(() => cutoutRef.current?.closeCutoutWrapper(), '<')
      .to(
        headerRef.current.children,
        {
          paddingInline: 0,
          paddingBlock: 32,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        headerRef.current,
        {
          top: 0,
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        menuRef.current,
        {
          backdropFilter: 'blur(0px)',
          backgroundColor: COLORS.MENU_00,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .add(() => setIsMenuOpen(false), '<')
      .to(wrapperButtonRef.current, {
        width: 'auto',
        gap: 16,
        duration: 0.4,
        ease: 'power2.inOut',
      });
  });

  useShortcut('Escape', () => isMenuOpen && closeMenu());

  useGSAP(() => {
    revealAnimation();
  }, []);

  return {
    refs: {
      logoRef,
      soundRef,
      headerRef,
      menuRef,
      wrapperButtonRef,
      contactMenuRef,
      buttonMenuRef,
      cutoutRef,
      linksRef,
      titleProjectsRef,
      projectTagsRefs,
      newsletterFormRef,
      socialsRef,
      infosRef,
    },
    isMenuOpen,
    openMenu,
    closeMenu,
  };
}
