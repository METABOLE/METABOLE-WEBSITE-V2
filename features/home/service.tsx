import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';

const Service = () => {
  return (
    <section className="py-y-default sticky z-90 h-screen bg-white">
      <BackgroundLines />
      <div className="px-x-default flex flex-col gap-5 md:grid md:grid-cols-12">
        <Title className="col-span-3" isDark={false}>
          SERVICES
        </Title>
        <Typography className="p3 col-span-5" variant="p">
          Neque suscipit dui nisl iaculis in orci tristique mauris at. Semper diam mi ultrices sit
          gravida nisl ut nunc. Elementum donec rhoncus elit cras tellus nibh rhoncus tellus sapien.
        </Typography>
      </div>
    </section>
  );
};

export default Service;
