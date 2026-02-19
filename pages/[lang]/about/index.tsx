import SEO from '@/components/ui/SEO';
import { getStaticPathsForLang, META } from '@/constants';
import Hero from '@/features/about/hero';
import Numbers from '@/features/about/numbers';
import Team from '@/features/about/team';
import Values from '@/features/about/values';
import FinalCta from '@/features/shared/final-cta';
import { useSanityData } from '@/hooks/useSanityData';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { fetchAwards } from '@/services/awards.service';
import { fetchDataInfos } from '@/services/data.service';
import { fetchTeam } from '@/services/team.service';
import { fetchValues } from '@/services/values.service';
import { InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';

export default function Index({
  values,
  data,
  awards,
  team,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const valuesData = useSanityData(values);
  const dataInfosData = useSanityData(data);
  const awardsData = useSanityData(awards);
  const teamData = useSanityData(team);

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
        descriptionEn={META.description.en}
        descriptionFr={META.description.fr}
        noindex={true}
        title={META.title}
        url={META.url}
      />
      <Hero />
      <Values values={valuesData.data} />
      <Numbers data={dataInfosData.data} totalAwards={totalAwards} />
      <Team team={teamData.data} />
      <FinalCta />
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
  const team = await fetchTeam(context);

  return {
    props: {
      values,
      data,
      awards,
      team,
      draftMode: values.draftMode,
    },
  };
};
