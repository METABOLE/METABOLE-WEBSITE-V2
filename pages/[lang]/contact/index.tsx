import SEO from '@/components/ui/SEO';
import Contact from '@/features/contact/contact';

const Index = () => {
  return (
    <>
      <SEO
        descriptionEn="Metabole Studio is a creative agency specialized in design and web development. We create unique and innovative digital experiences."
        descriptionFr="Metabole Studio est une agence créative spécialisée dans le design et le développement web. Nous créons des expériences digitales uniques et innovantes."
        noindex={true}
        title="Metabole Studio - Agence de Design et Développement Web"
        url="https://metabole.studio"
      />
      <Contact />
    </>
  );
};

export default Index;
