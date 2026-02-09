import BackgroundLines from '@/components/layout/background-lines';
import Burger from '@/components/layout/burger';
import Footer from '@/components/layout/footer';
import GradientBlur from '@/components/layout/gradient-blur';
import Menu from '@/components/layout/menu';
import ScrollBar from '@/components/layout/scroll-bar';
import PerformanceIndicator from '@/components/ui/performance-indicator';
import SEO from '@/components/ui/SEO';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useFontReady } from '@/hooks/useFontReady';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useSanityData } from '@/hooks/useSanityData';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, ProjectType, SanityProps } from '@/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Layout = ({
  projects,
  children,
}: {
  projects: SanityProps<ProjectType[]>;
  children: ReactNode;
}) => {
  const { isFrench } = useLanguage();
  const router = useRouter();
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  const isMobile = useMatchMedia(BREAKPOINTS.SM);
  const { performanceLevel } = usePerformance();
  const { isDev } = useEnvironment();
  const { isLoading } = usePerformance();
  const isFontReady = useFontReady();
  const projectsData = useSanityData(projects);
  const isHomePage = router.asPath === '/en' || router.asPath === '/fr';

  return (
    <>
      <SEO isFrench={isFrench} isHomePage={isHomePage} />

      <main className="min-h-screen w-screen md:pb-[300px]">
        {isLoading || !isFontReady ? (
          <div className="fixed z-[950] h-screen w-screen bg-black" />
        ) : (
          <>
            <BackgroundLines className="fixed" />
            {isTablet ? <Burger /> : <Menu projects={projectsData.data} />}
            {children}
            {performanceLevel === PERFORMANCE_LEVEL.HIGH && (
              <>
                <GradientBlur blurHeight="100px" intensity={0.2} orientation="top" />
                <GradientBlur blurHeight="100px" intensity={0.1} orientation="bottom" />
              </>
            )}
            {!isMobile && <ScrollBar />}
            {isDev && <PerformanceIndicator />}
          </>
        )}
      </main>
      {isFontReady && <Footer />}
    </>
  );
};

export default Layout;
