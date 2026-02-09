import Title from '@/components/shared/title';
import ScrollingContainer from '@/components/ui/scrolling-container';
import Typography from '@/components/ui/typography';

const Expertise = () => {
  return (
    <section className="py-y-default px-x-default sticky top-0 z-[60] h-screen bg-white">
      <Title isDark={false}>EXPERTISE</Title>
      <div className="flex justify-between">
        <Typography className="p2" variant="p">
          Les secteurs que l’on aime le plus :
        </Typography>
        <Typography className="p3" variant="p">
          Neque suscipit dui nisl iaculis in orci tristique mauris at. Semper diam mi ultrices sit
          gravida nisl ut nunc. Elementum donec rhoncus elit cras tellus nibh rhoncus tellus sapien.
        </Typography>
      </div>

      <ScrollingContainer>
        <p></p>
      </ScrollingContainer>
    </section>
  );
};

export default Expertise;
