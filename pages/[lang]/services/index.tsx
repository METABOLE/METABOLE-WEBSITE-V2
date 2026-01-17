import Hero from '@/features/services/Hero';
import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Timeline from '@/features/shared/timeline/Timeline';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import Head from 'next/head';

export default function Services() {
  return (
    <>
      <Head>
        <title>Metabole - Creative Studio | Metabole STUDIO</title>
        <link href="https://metabole.studio/fr/services" rel="canonical" />
        <meta content="https://metabole.studio/fr/services" property="og:url" />
      </Head>
      <Hero />
      <Expertise isPageServices={true} />
      <Timeline />
      <Us />
      <Faq />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: 'en' } }, { params: { lang: 'fr' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const projects = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}
