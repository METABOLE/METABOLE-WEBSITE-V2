import SEO from '@/components/ui/SEO';
import Projects from '@/features/projects/projects';
import { getStaticPathsForLang, META } from '@/constants';

const Index = () => {
  return (
    <>
      <SEO
        descriptionEn={META.description.en}
        descriptionFr={META.description.fr}
        noindex={true}
        title={META.title}
        url={META.url}
      />
      <Projects />
    </>
  );
};

export async function getStaticPaths() {
  return getStaticPathsForLang();
}

export default Index;
