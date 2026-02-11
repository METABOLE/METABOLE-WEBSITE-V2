import { getStaticPathsForLang } from '@/constants';
import Expertise from '@/features/home/expertise';
import Hero from '@/features/home/hero';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchExpertise } from '@/services/expertise.service';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export default function Home({ expertise }: InferGetStaticPropsType<typeof getStaticProps>) {
  const expertiseData = useSanityData(expertise);
  return (
    <>
      <Head>
        <title>Metabole - Creative Studio | Metabole STUDIO</title>
        <link href="https://metabole.studio/fr" rel="canonical" />
        <meta content="https://metabole.studio/fr" property="og:url" />
      </Head>
      <Hero />
      <Expertise expertise={expertiseData.data} />
    </>
  );
}

export async function getStaticPaths() {
  return getStaticPathsForLang();
}

export const getStaticProps = async (context: {
  draftMode?: boolean;
  params?: { lang: string };
}) => {
  const expertise = await fetchExpertise(context);

  return {
    props: {
      expertise,
      draftMode: expertise.draftMode,
    },
  };
};
