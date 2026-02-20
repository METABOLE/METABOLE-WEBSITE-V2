import ScrollingContainerVertical from '@/components/shared/scrolling-container-vertical';
import clsx from 'clsx';

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
          <ScrollingContainerVertical scrollSpeed={30}>
            <div className="pt-y-default gap-y-default grid h-screen w-full grid-rows-3">
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
            </div>
          </ScrollingContainerVertical>
        </div>
        <div className="col-span-2 h-full w-full">
          <ScrollingContainerVertical direction="down" scrollSpeed={25}>
            <div className="pt-y-default gap-y-default grid h-screen w-full grid-rows-3">
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
            </div>
          </ScrollingContainerVertical>
        </div>
        <div className="col-span-2 h-full w-full">
          <ScrollingContainerVertical scrollSpeed={40}>
            <div className="pt-y-default gap-y-default grid h-screen w-full grid-rows-3">
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
              <div className="h-full w-full shrink-0 bg-[#D5D7EB]"></div>
            </div>
          </ScrollingContainerVertical>
        </div>
      </div>
    </div>
  );
};

export default Scroller;
