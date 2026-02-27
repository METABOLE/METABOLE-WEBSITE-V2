import RichTextSeo from '@/components/ui/rich-text-seo';
import { SeoPageIntro } from '@/types';

interface Props {
  intro: SeoPageIntro;
  isFrench: boolean;
}

const SeoPageIntroSection = ({ intro, isFrench }: Props) => {
  const content = isFrench ? intro.content.fr : intro.content.en;

  return (
    <section className="px-x-default pt-y-default">
      <RichTextSeo value={content} />
    </section>
  );
};

export default SeoPageIntroSection;
