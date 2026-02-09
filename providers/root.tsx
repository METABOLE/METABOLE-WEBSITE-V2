import Cursor from '@/components/ui/cursor';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactNode } from 'react';
import { CursorProvider } from './cursor.provider';
import { LanguageProvider } from './language.provider';
import { LayoutColorProvider } from './layout-color.provider';
import { QueryProvider } from './query.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { SoundProvider } from './sound.provider';
import { PerformanceProvider } from './performance.provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <CursorProvider>
        <Cursor />
        <SoundProvider>
          <PerformanceProvider>
            <LanguageProvider>
              <LayoutColorProvider>
                <SmoothScrollProvider>{children}</SmoothScrollProvider>
              </LayoutColorProvider>
            </LanguageProvider>
          </PerformanceProvider>
        </SoundProvider>
      </CursorProvider>
      <Analytics />
      <SpeedInsights />
    </QueryProvider>
  );
};
