import SEO from '@/components/ui/SEO';
import { getStaticPathsForLang, META } from '@/constants';
import Contact from '@/features/contact/contact';
import { useSanityData } from '@/hooks/useSanityData';
import { fetchAwards } from '@/services/awards.service';
import { fetchDataInfos } from '@/services/data.service';
import { InferGetStaticPropsType } from 'next';

const Index = ({ awards, data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const awardsData = useSanityData(awards);
  const dataInfosData = useSanityData(data);

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
      <Contact data={dataInfosData.data} totalAwards={totalAwards} />
    </>
  );
};

export async function getStaticPaths() {
  return getStaticPathsForLang();
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

export default Index;
