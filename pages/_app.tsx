import PageTransition from '@/components/layout/page-transition';
import ScreenLoader from '@/components/layout/screen-loader';
import SanityVisualEditing from '@/components/sanity/sanity-visual-editing';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useScroll } from '@/hooks/useScroll';
import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import { fetchDataInfos } from '@/services/data.service';
import { fetchProjects } from '@/services/projects.service';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { Data, ProjectType, SanityProps } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { NextPage } from 'next';
import type { AppContext, AppProps } from 'next/app';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomAppProps extends AppProps {
  Component: NextPageWithLayout;
  globalProps: {
    projects: SanityProps<ProjectType[]>;
    dataInfos: SanityProps<Data[]>;
    draftMode: boolean;
  };
}

function App({ Component, pageProps, globalProps }: CustomAppProps) {
  const pathname = usePathname();
  const isScreenLoader = useIsScreenLoader();
  const { isDev } = useEnvironment();
  const { resetScroll } = useScroll();
  const [resolvedGlobalProps, setResolvedGlobalProps] = useState(globalProps);
  const { draftMode } = resolvedGlobalProps;

  // When globalProps are empty (e.g. client-side nav to 404), fetch from API so layout always has data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasData =
      (resolvedGlobalProps.dataInfos.initial?.data?.length ?? 0) > 0 &&
      (resolvedGlobalProps.projects.initial?.data?.length ?? 0) > 0;
    if (hasData) return;
    window
      .fetch('/api/global-data')
      .then((res) => res.json())
      .then((data) => setResolvedGlobalProps(data))
      .catch(console.error);
  }, []);

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout dataInfos={resolvedGlobalProps.dataInfos} projects={resolvedGlobalProps.projects}>
        {page}
      </Layout>
    ));

  const handdlePageChange = () => {
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView();
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && !('attachInternals' in HTMLElement.prototype)) {
  //     import('element-internals-polyfill');
  //   }
  // }, []);

  useEffect(() => {
    resetScroll(isScreenLoader && !isDev);
  }, [isScreenLoader, isDev, resetScroll]);

  return (
    <>
      {pathname.includes('/studio') ? (
        <Component {...pageProps} />
      ) : (
        <AppProvider>
          {getLayout(
            <>
              {isScreenLoader && !isDev && <ScreenLoader />}
              <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                  handdlePageChange();
                  requestAnimationFrame(() => {
                    setTimeout(() => {
                      ScrollTrigger.refresh();
                    }, 300);
                  });
                }}
              >
                <PageTransition key={pathname}>
                  <Component {...pageProps} />
                </PageTransition>
              </AnimatePresence>
            </>,
          )}
        </AppProvider>
      )}
      {draftMode && <SanityVisualEditing />}
    </>
  );
}

App.getInitialProps = async (context: AppContext) => {
  if (!context.ctx.req) {
    return {
      globalProps: {
        projects: {
          initial: { data: [] },
          draftMode: false,
        },
        dataInfos: {
          initial: { data: [] },
          draftMode: false,
        },
        draftMode: false,
      },
    };
  }

  const draftMode = !!(
    context.ctx.req.headers.cookie?.includes('__prerender_bypass') ||
    context.ctx.req.headers.cookie?.includes('__next_preview_data')
  );

  const projects = await fetchProjects({ draftMode });
  const dataInfos = await fetchDataInfos({ draftMode });

  return {
    globalProps: {
      projects,
      dataInfos,
      draftMode: projects.draftMode || dataInfos.draftMode || draftMode,
    },
  };
};

export default App;
