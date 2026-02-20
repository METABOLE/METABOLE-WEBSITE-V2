import FullWidthTypo from '@/components/shared/full-width-typo';
import ContactForm from './contact-form';

const Contact = () => {
  return (
    <div className="px-x-default relative grid h-screen w-screen grid-cols-12 gap-5">
      <div className="relative col-span-5">
        <div className="bg-red/10 absolute top-0 -right-5 h-full w-[calc(100%+var(--x-default)+20px)]"></div>
      </div>
      <div className="py-y-double-default col-span-4 -col-end-2 flex w-[calc(100%+20px)] -translate-x-5 flex-col items-center">
        <FullWidthTypo className="font-safiro-regular text-blue">CONTACT</FullWidthTypo>
        <ContactForm className="w-full shrink-0" />
      </div>
    </div>
  );
};

export default Contact;
