import type { AnimatedCutoutWrapperRef } from '@/components/layout/cutout-wrapper';
import type { AnimatedNewsletterFormRef } from '@/components/shared/newsletter-form';
import { useShortcut } from '@/hooks/useShortcut';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const soundRef = useRef(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wrapperButtonRef = useRef(null);
  const contactMenuRef = useRef(null);
  const cutoutRef = useRef<AnimatedCutoutWrapperRef>(null);
  const newsletterFormRef = useRef<AnimatedNewsletterFormRef>(null);
  const infosRef = useRef<HTMLDivElement>(null);
  const animRefs = {
    translate: useRef<NodeListOf<Element> | null>(null),
    scale: useRef<NodeListOf<Element> | null>(null),
    scaleX: useRef<NodeListOf<Element> | null>(null),
  };

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const { setIsLayoutDark } = useLayoutColor();
  const { contextSafe } = useGSAP();

  const setupMenu = contextSafe(() => {
    animRefs.translate.current = menuRef.current?.querySelectorAll('.menu-item-translate') || null;
    animRefs.scale.current = menuRef.current?.querySelectorAll('.menu-item-scale') || null;
    animRefs.scaleX.current = menuRef.current?.querySelectorAll('.menu-item-scale-x') || null;

    gsap.set(animRefs.translate.current, {
      yPercent: 130,
      rotate: 6,
      transformOrigin: 'bottom left',
    });
    gsap.set(animRefs.scale.current, {
      scale: 0,
    });
    gsap.set(animRefs.scaleX.current, {
      scaleX: 0,
      transformOrigin: 'left center',
    });
  });

  const killMenu = contextSafe(() => {
    gsap.killTweensOf(animRefs.translate.current);
    gsap.killTweensOf(animRefs.scale.current);
    gsap.killTweensOf(animRefs.scaleX.current);
  });

  const openMenu = contextSafe(() => {
    timelineRef.current?.kill();
    setupMenu();
    killMenu();
    setIsMenuOpen(true);

    timelineRef.current = gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: 'power4.inOut',
        },
      })
      .to(
        contactMenuRef.current,
        {
          duration: 0.4,
          width: 0,
        },
        '<',
      )
      .to(
        wrapperButtonRef.current,
        {
          duration: 0.4,
          gap: 20,
        },
        '<',
      )
      .set(menuRef.current, { opacity: 1 })
      .to(
        menuRef.current,
        {
          backdropFilter: 'blur(64px)',
          backgroundColor: '#e3e3ffd1',
        },
        '<',
      )
      .add(() => {
        cutoutRef.current?.openCutoutWrapper();
      }, '<')
      .to(
        headerRef.current,
        {
          top: 32,
          paddingTop: gsap.utils.clamp(20, 8 * window.innerHeight * 0.01, 100),
        },
        '<',
      )
      .to(
        headerRef.current?.children || [],
        {
          paddingInline: gsap.utils.clamp(20, 4 * window.innerWidth * 0.01, 40),
          paddingBlock: 0,
        },
        '<',
      )
      .add(() => setIsLayoutDark(false), '<+=0.4')
      .add(() => {
        newsletterFormRef.current?.play();
      }, '<')
      .to(
        animRefs.translate.current,
        {
          yPercent: 0,
          rotate: 0,
          stagger: 0.05,
        },
        '<',
      )
      .to(
        animRefs.scale.current,
        {
          scale: 1,
          stagger: 0.05,
        },
        '<',
      )
      .to(
        animRefs.scaleX.current,
        {
          scaleX: 1,
          stagger: 0.05,
        },
        '<',
      );
  });

  const closeMenu = contextSafe(() => {
    timelineRef.current?.kill();
    killMenu();
    setIsMenuOpen(false);

    timelineRef.current = gsap
      .timeline({
        defaults: {
          duration: 0.8,
          ease: 'power4.inOut',
        },
      })
      .add(() => {
        newsletterFormRef.current?.reverse();
      }, '<')
      .to(
        animRefs.scaleX.current,
        {
          scaleX: 0,
          stagger: 0.05,
        },
        '<',
      )
      .to(animRefs.translate.current, {
        yPercent: 130,
        rotate: 6,
      })
      .to(
        animRefs.scale.current,
        {
          scale: 0,
        },
        '<',
      )
      .add(() => {
        setIsLayoutDark(true);
        cutoutRef.current?.closeCutoutWrapper();
      }, '<')
      .to(
        headerRef.current?.children || [],
        {
          paddingInline: 0,
          paddingBlock: 32,
        },
        '<',
      )
      .to(
        headerRef.current,
        {
          top: 0,
          paddingBlock: 0,
        },
        '<',
      )
      .to(
        menuRef.current,
        {
          backdropFilter: 'blur(0px)',
          backgroundColor: COLORS.MENU_00,
        },
        '<',
      )
      .to(contactMenuRef.current, {
        width: 'auto',
        gap: 0,
      });
  });

  useShortcut('Escape', () => isMenuOpen && closeMenu());

  // useGSAP(() => {
  //   const onResize = () => setupMenu();
  //   window.addEventListener('resize', onResize);
  //   return () => window.removeEventListener('resize', onResize);
  // }, []);

  return {
    refs: {
      logoRef,
      soundRef,
      headerRef,
      menuRef,
      wrapperButtonRef,
      contactMenuRef,
      cutoutRef,
      newsletterFormRef,
      infosRef,
    },
    isMenuOpen,
    openMenu,
    closeMenu,
  };
}
