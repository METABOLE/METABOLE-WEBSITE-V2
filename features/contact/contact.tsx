import FullWidthTypo from '@/components/shared/full-width-typo';
import { BREAKPOINTS, Data } from '@/types';
import ContactForm from './contact-form';
import Scroller from './scroller';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import Footer from '../shared/footer';

const Contact = ({ data, totalAwards }: { data: Data; totalAwards: number }) => {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);
  return (
    <div className="px-x-default relative grid h-fit w-screen grid-cols-12 gap-5 sm:h-screen">
      {isTablet ? null : <Scroller />}
      <div className="py-y-double-default col-span-12 flex w-full flex-col items-center sm:col-span-10 sm:-col-end-2 md:col-span-4 md:-col-end-2 md:w-[calc(100%+20px)] md:-translate-x-5">
        <FullWidthTypo className="font-safiro-regular text-blue">CONTACT</FullWidthTypo>
        <ContactForm className="w-full shrink-0" />
      </div>
      <Footer
        className="absolute!"
        isDark={false}
        location={data.location}
        totalAwards={totalAwards}
      />
    </div>
  );
};

export default Contact;
