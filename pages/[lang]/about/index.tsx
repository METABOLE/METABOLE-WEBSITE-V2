import SEO from '@/components/ui/SEO';
import { getStaticPathsForLang } from '@/constants';
import Hero from '@/features/about/hero';
import Numbers from '@/features/about/numbers';
import Team from '@/features/about/team';
import Values from '@/features/about/values';
import { useSanityData } from '@/hooks/useSanityData';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { fetchAwards } from '@/services/awards.service';
import { fetchDataInfos } from '@/services/data.service';
import { fetchValues } from '@/services/values.service';
import { InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';

export default function Index({
  values,
  data,
  awards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const valuesData = useSanityData(values);
  const dataInfosData = useSanityData(data);
  const awardsData = useSanityData(awards);
  const totalAwards = awardsData.data.reduce(
    (acc, award) =>
      acc + award.categories.reduce((acc, category) => acc + parseInt(category.number), 0),
    0,
  );

  const { setIsLayoutDark } = useLayoutColor();

  useEffect(() => {
    setIsLayoutDark(false);
  }, []);

  return (
    <>
      <SEO
        descriptionEn="Metabole Studio is a creative agency specialized in design and web development. We create unique and innovative digital experiences."
        descriptionFr="Metabole Studio est une agence créative spécialisée dans le design et le développement web. Nous créons des expériences digitales uniques et innovantes."
        noindex={true}
        title="Metabole Studio - Agence de Design et Développement Web"
        url="https://metabole.studio"
      />
      <Hero />
      <Values values={valuesData.data} />
      <Numbers data={dataInfosData.data} totalAwards={totalAwards} />
      <Team />
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
  const values = await fetchValues(context);
  const data = await fetchDataInfos(context);
  const awards = await fetchAwards(context);

  return {
    props: {
      values,
      data,
      awards,
      draftMode: values.draftMode,
    },
  };
};
