import Expertise from '@/features/shared/expertise/Expertise';
import Faq from '@/features/shared/Faq';
import Hero from '@/features/team/Hero';
import Inspiration from '@/features/team/Inspiration';
import Us from '@/features/team/Us';
import { fetchProjects } from '@/services/projects.service';
import Head from 'next/head';

export default function Services() {
  return (
    <>
      <Head>
        <title>Metabole - Creative Studio | Metabole STUDIO</title>
        <link href="https://metabole.studio/fr/team" rel="canonical" />
        <meta content="https://metabole.studio/fr/team" property="og:url" />
      </Head>
      <Hero />
      <Inspiration />
      <Us isPageTeam />
      <Expertise />
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
