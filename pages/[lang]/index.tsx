import Hero from '@/features/home/hero';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Metabole - Creative Studio | Metabole STUDIO</title>
        <link href="https://metabole.studio/fr" rel="canonical" />
        <meta content="https://metabole.studio/fr" property="og:url" />
      </Head>
      <Hero />
    </>
  );
}
