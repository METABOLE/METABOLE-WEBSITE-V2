import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import Typography from '@/components/ui/typography';
import { Service } from '@/types';
import ItemService from './service/item-service';
import { useLanguage } from '@/providers/language.provider';

const ServiceComponent = ({ services }: { services: Service[] }) => {
  const { isFrench } = useLanguage();
  return (
    <section className="py-y-default sticky z-90 bg-white">
      <BackgroundLines />
      <div className="px-x-default flex flex-col gap-5 md:grid md:grid-cols-12">
        <Title className="col-span-3" color="blue">
          SERVICES
        </Title>
        <Typography className="p3 col-span-5" variant="p">
          {isFrench
            ? 'De la stratégie à la mise en ligne, nous concevons des expériences digitales complètes, utiles et durables.'
            : 'From strategy to launch, we design complete digital experiences that are useful and built to last.'}
        </Typography>
      </div>
      <div className="px-x-default pt-y-default flex flex-col gap-5">
        {services.map((service, index) => (
          <ItemService key={`${service.title.fr}-${service.title.en}`} {...service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServiceComponent;
