import SEO from '@/components/ui/SEO';
import { META } from '@/constants';
import Contact from '@/features/contact/contact';
import { useLayoutColor } from '@/providers/layout-color.provider';
import { useEffect } from 'react';

const Index = () => {
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
      <Contact />
    </>
  );
};

export default Index;
