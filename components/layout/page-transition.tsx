import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS } from '@/types';
import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

const ease = [0.72, 0, 0.3, 0.99] as const;

const expandVariants: Variants = {
  initial: {
    scaleY: 1,
    transformOrigin: 'top',
  },
  enter: (i: number) => ({
    scaleY: 0,
    transition: {
      duration: 1,
      delay: 0.04 * i,
      ease,
      transformOrigin: 'top',
    },
    transitionEnd: {
      scaleY: 0,
      transformOrigin: 'bottom',
    },
  }),
  exit: (i: number) => ({
    scaleY: 1,
    transition: {
      duration: 1,
      delay: 0.04 * i,
      ease,
    },
  }),
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const { isLoading } = usePerformance();
  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const [columnsNumber, setColumnsNumber] = useState(12);

  const getColumnsNumber = () => {
    // if (isMobile) return 4;
    // if (isTablet) return 6;
    return 12;
  };

  useEffect(() => {
    setColumnsNumber(getColumnsNumber());
  }, [isMobile, isTablet]);

  return (
    <>
      <div
        className="px-x-default pointer-events-none fixed inset-0 z-910 grid h-screen w-screen gap-5"
        style={{
          gridTemplateColumns: `repeat(${columnsNumber}, 1fr)`,
        }}
      >
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="w-x-default absolute left-0 col-span-1 h-full bg-black"
          custom={1}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative col-span-1 hidden h-full w-[calc(100%+20px)] border-l border-l-[#E4E4FF]/10 bg-black sm:block"
          custom={2}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative col-span-3 h-full w-[calc(100%+20px)] border-l border-l-[#E4E4FF]/10 bg-black sm:col-span-2"
          custom={3}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative col-span-2 hidden h-full w-[calc(100%+20px)] border-l border-l-[#E4E4FF]/10 bg-black sm:block"
          custom={4}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative col-span-6 h-full w-full border-r border-l border-r-[#E4E4FF]/10 border-l-[#E4E4FF]/10 bg-black sm:col-span-2"
          custom={5}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative z-10 col-span-2 hidden h-full w-full -translate-x-5 border-r border-r-[#E4E4FF]/10 bg-black sm:block sm:w-[calc(100%+20px)]"
          custom={6}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative z-0 col-span-3 h-full w-[calc(100%+20px)] -translate-x-5 border-r border-r-[#E4E4FF]/10 bg-black sm:col-span-2"
          custom={7}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="relative col-span-1 hidden h-full w-[calc(100%+20px)] -translate-x-5 border-r border-r-[#E4E4FF]/10 bg-black sm:block"
          custom={8}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        <motion.div
          animate={isLoading ? 'initial' : 'enter'}
          className="w-x-default absolute right-0 col-span-1 h-full bg-black"
          custom={9}
          exit="exit"
          initial="initial"
          variants={expandVariants}
        />
        {/* {[...Array(columnsNumber)].map((_, i) => (
        ))} */}
      </div>
      {children}
    </>
  );
}
