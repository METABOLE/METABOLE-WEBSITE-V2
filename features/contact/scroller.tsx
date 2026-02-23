import ScrollingContainerVertical from '@/components/shared/scrolling-container-vertical';
import clsx from 'clsx';
import Image from 'next/image';

const Scroller = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'px-x-default fixed top-0 left-0 hidden h-full w-screen grid-cols-12 gap-5 md:grid',
        className,
      )}
    >
      <div
        className="relative col-span-5 grid h-full w-[calc(100%+var(--x-default)+20px)] -translate-x-(--x-default)"
        style={{
          gridTemplateColumns: 'var(--x-default) repeat(5, 1fr)',
          boxShadow:
            'inset 4rem 0 6rem -1rem rgb(20 20 24 / 0.1), inset -4rem 0 6rem -1rem rgb(20 20 24 / 0.1)',
        }}
      >
        <div className="col-span-2 h-full w-full">
          <ScrollingContainerVertical scrollSpeed={45}>
            <div className="grid h-[200vh] w-full grid-rows-7 pt-[20vh]">
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-1.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-1.mp4"
                autoPlay
                loop
                muted
              />
              <div className=""></div>
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-2.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-2.mp4"
                autoPlay
                loop
                muted
              />
            </div>
          </ScrollingContainerVertical>
        </div>
        <div className="col-span-2 h-full w-full">
          <ScrollingContainerVertical direction="down" scrollSpeed={35}>
            <div className="grid h-[200vh] w-full grid-rows-7 pt-[20vh]">
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-3.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-3.mp4"
                autoPlay
                loop
                muted
              />
              <div className=""></div>
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-4.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-4.mp4"
                autoPlay
                loop
                muted
              />
            </div>
          </ScrollingContainerVertical>
        </div>
        <div className="col-span-2 h-full w-full">
          <ScrollingContainerVertical scrollSpeed={40}>
            <div className="grid h-[200vh] w-full shrink-0 grid-rows-7 overflow-hidden pt-[20vh]">
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-5.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-5.mp4"
                autoPlay
                loop
                muted
              />
              <div className=""></div>
              <Image
                alt="Scroller"
                className="h-full w-full object-cover"
                height={1080}
                src="/images/contact/lifestyle-6.jpg"
                width={1080}
              />
              <div className=""></div>
              <video
                className="h-full w-full object-cover"
                src="/images/contact/lifestyle-6.mp4"
                autoPlay
                loop
                muted
              />
            </div>
          </ScrollingContainerVertical>
        </div>
      </div>
    </div>
  );
};

export default Scroller;
