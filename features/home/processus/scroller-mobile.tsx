import BackgroundLines from '@/components/layout/background-lines';
import Title from '@/components/shared/title';

const ScrollerMobile = () => {
  return (
    <section className="sticky h-screen bg-white pt-[100px]">
      <BackgroundLines className="top-0" isDark={false} />
      <div className="pb-y-default px-x-default pt-y-default">
        <Title color="blue">PROCESSUS</Title>
      </div>
    </section>
  );
};

export default ScrollerMobile;
