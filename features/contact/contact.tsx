import FullWidthTypo from '@/components/shared/full-width-typo';
import { Data } from '@/types';
import ContactForm from './contact-form';
import Scroller from './scroller';
import Footer from './footer';

const Contact = ({ data, totalAwards }: { data: Data; totalAwards: number }) => {
  return (
    <div className="px-x-default relative grid h-screen w-screen grid-cols-12 gap-5">
      <Scroller />
      <div className="py-y-double-default col-span-4 -col-end-2 flex w-[calc(100%+20px)] -translate-x-5 flex-col items-center">
        <FullWidthTypo className="font-safiro-regular text-blue">CONTACT</FullWidthTypo>
        <ContactForm className="w-full shrink-0" />
      </div>
      <Footer location={data.location} totalAwards={totalAwards} />
    </div>
  );
};

export default Contact;
