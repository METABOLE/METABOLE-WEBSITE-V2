import BackgroundLines from '@/components/layout/background-lines';
import FloatingHalo from '@/components/shared/floating-halo';
import { getStaticPathsForLang } from '@/constants';
import Awards from '@/features/home/awards';
import Compatibility from '@/features/home/compatibility';
import Expertise from '@/features/home/expertise';
import Hero from '@/features/home/hero';
import JoinUs from '@/features/home/join-us';
import Service from '@/features/home/service';
import Testimonials from '@/features/home/testimonials';
import { useSanityData } from '@/hooks/useSanityData';
import { useStickySectionTop } from '@/hooks/useStickySectionTop';
import { fetchAwards } from '@/services/awards.service';
import { fetchCompatibility } from '@/services/compatibility.service';
import { fetchExpertise } from '@/services/expertise.service';
import { fetchServices } from '@/services/service.service';
import { fetchTestimonials } from '@/services/testimonials.service';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRef } from 'react';

export default function Home({
  expertise,
  services,
  compatibility,
  testimonials,
  awards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const expertiseData = useSanityData(expertise);
  const servicesData = useSanityData(services);
  const compatibilityData = useSanityData(compatibility);
  const testimonialsData = useSanityData(testimonials);
  const awardsData = useSanityData(awards);

  const blackSectionRef = useRef<HTMLDivElement>(null);
  const stickyTop = useStickySectionTop(blackSectionRef);

  return (
    <>
      <Head>
        <title>METABOLE - Creative Studio | METABOLE STUDIO</title>
        <link href="https://metabole.studio/fr" rel="canonical" />
        <meta content="https://metabole.studio/fr" property="og:url" />
      </Head>
      <Hero />
      <Expertise expertise={expertiseData.data} />
      <Service services={servicesData.data} />
      <Compatibility compatibility={compatibilityData.data} />
      <section
        ref={blackSectionRef}
        className="sticky z-90 overflow-hidden bg-black"
        style={{ top: `-${stickyTop}px` }}
      >
        <BackgroundLines isDark={true} />
        <FloatingHalo
          className="pointer-events-none right-0 bottom-0 z-10 translate-x-1/2 translate-y-1/2 opacity-30"
          from="#1B17EE"
          size="clamp(800px, 150vw, 2000px)"
          to="#141418"
        />
        <FloatingHalo
          className="pointer-events-none top-0 left-0 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
          from="#1B17EE"
          size="clamp(800px, 150vw, 2000px)"
          to="#141418"
        />
        <Testimonials testimonials={testimonialsData.data} />
        <Awards awards={awardsData.data} />
      </section>
      <JoinUs />
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
  const compatibility = await fetchCompatibility(context);
  const testimonials = await fetchTestimonials(context);
  const awards = await fetchAwards(context);

  return {
    props: {
      expertise,
      services,
      compatibility,
      testimonials,
      awards,
      draftMode: expertise.draftMode,
    },
  };
};
