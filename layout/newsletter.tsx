import FloatingHalo from '@/components/shared/floating-halo';
import Lottie from '@/components/shared/lottie';
import SEO from '@/components/ui/SEO';
import { useLanguage } from '@/providers/language.provider';
import Link from 'next/link';
import { ReactNode } from 'react';
import metaboleFull from '../public/lotties/metabole-full-yellow.json';
import BackgroundLines from '@/components/layout/background-lines';

interface NewsletterLayoutProps {
  children: ReactNode;
}

export default function NewsletterLayout({ children }: NewsletterLayoutProps) {
  const { getInternalPath, isFrench } = useLanguage();
  return (
    <>
      <SEO isFrench={isFrench} />
      <div className="fixed flex h-screen w-screen flex-col bg-black">
        <header className="px-x-default flex w-screen justify-center py-6">
          <Link className="cursor-pointer" href={getInternalPath('/')} scroll={false}>
            <Lottie animationData={metaboleFull} className="h-10" />
          </Link>
        </header>
        <main className="grow">{children}</main>
        <BackgroundLines isDark={true} />
        <FloatingHalo
          className="fixed! top-0 left-0 -z-10 opacity-30"
          from="#1b17ee"
          size="170vw"
          to="#141418"
        />
      </div>
    </>
  );
}
