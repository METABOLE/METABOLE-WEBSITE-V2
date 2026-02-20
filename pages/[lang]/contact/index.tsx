import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import Contact from '@/features/contact/contact';

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
      <Contact />
    </>
  );
};

export default Index;
