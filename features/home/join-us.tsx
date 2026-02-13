import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { useLanguage } from '@/providers/language.provider';
import Image from 'next/image';

const JoinUs = () => {
  const { isFrench } = useLanguage();

  return (
    <section className="py-y-double-default sticky z-90 bg-white">
      <BackgroundLines />
      <div className="px-x-default">
        <Title color="blue">{isFrench ? 'NOUS REJOINDRE' : 'JOIN US'}</Title>
      </div>
      <div className="px-x-default px-x grid grid-cols-[1fr_0.31fr_1fr] gap-5">
        <div className="pt-y-default gap-y-default flex flex-col">
          <Typography className="h2" variant="h3">
            {isFrench ? (
              <>
                Pour <span className="text-blue">construire les marques de demain</span> avec nous,
                c’est par ici.
              </>
            ) : (
              <>
                To <span className="text-blue">build the brands of tomorrow</span> with us, it’s
                here.
              </>
            )}
          </Typography>
          <Image
            alt="Join Us"
            height={1000}
            src="/images/home/join-us/join-us-1.png"
            width={1000}
          />
        </div>
        <div className="gap-y-default -col-end-1 flex flex-col">
          <Image
            alt="Join Us"
            height={1000}
            src="/images/home/join-us/join-us-2.png"
            width={1000}
          />
          <div className="space-y-10">
            <Typography className="p3-regular" variant="h4">
              {isFrench
                ? 'Vous êtes à la fois créatif, ambitieux, stratégique et sympa. Venez, on s’écrit et on voit ce qu’on peut faire ensemble.'
                : 'You are both creative, ambitious, strategic and nice. Come, we write and see what we can do together.'}
            </Typography>
            <Button color="secondary" href="/contact">
              {isFrench ? 'Contactez-nous' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
