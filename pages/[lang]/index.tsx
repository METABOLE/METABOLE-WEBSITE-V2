import { getStaticPathsForLang } from '@/constants';
import Expertise from '@/features/home/expertise';
import Hero from '@/features/home/hero';
import Service from '@/features/home/service';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchExpertise } from '@/services/expertise.service';
import { fetchServices } from '@/services/service.service';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

export default function Home({
  expertise,
  services,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const expertiseData = useSanityData(expertise);
  const servicesData = useSanityData(services);

  return (
    <>
      <Head>
        <title>Metabole - Creative Studio | Metabole STUDIO</title>
        <link href="https://metabole.studio/fr" rel="canonical" />
        <meta content="https://metabole.studio/fr" property="og:url" />
      </Head>
      <Hero />
      <Expertise expertise={expertiseData.data} />
      <Service services={servicesData.data} />
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
  const services = await fetchServices(context);

  return {
    props: {
      expertise,
      services,
      draftMode: expertise.draftMode,
    },
  };
};
