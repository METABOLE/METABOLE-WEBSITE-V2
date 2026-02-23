import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import Hero from '@/features/home/hero';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchAwards } from '@/services/awards.service';
import { fetchDataInfos } from '@/services/data.service';
import { InferGetStaticPropsType } from 'next';

export default function Home({ awards, data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const awardsData = useSanityData(awards);
  const dataInfosData = useSanityData(data);
  const { location } = dataInfosData.data;
  const totalAwards = awardsData.data.reduce(
    (acc, award) =>
      acc + award.categories.reduce((acc, category) => acc + parseInt(category.number), 0),
    0,
  );

  return (
    <>
      <SEO
        descriptionEn={META.description.en}
        descriptionFr={META.description.fr}
        noindex={true}
        title={META.title}
        url={META.url}
      />
      <Hero location={location} totalAwards={totalAwards} />
    </>
  );
}

export const getStaticProps = async (context: {
  draftMode?: boolean;
  params?: { lang: string };
}) => {
  const awards = await fetchAwards(context);
  const data = await fetchDataInfos(context);

  return {
    props: {
      awards,
      data,
      draftMode: awards.draftMode,
    },
  };
};
