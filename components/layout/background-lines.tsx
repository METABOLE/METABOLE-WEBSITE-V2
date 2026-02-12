import clsx from 'clsx';

const BackgroundLines = ({
  isDark = false,
  className,
}: {
  isDark?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'px-x-default pointer-events-none absolute inset-0 -z-10 grid h-full w-screen grid-cols-12 gap-5',
        className,
      )}
      aria-hidden
    >
      <div className="relative w-full">
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-2 w-full">
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-2 w-full">
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-1 w-full">
        <div
          className={clsx(
            'absolute top-0 bottom-0 left-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-1 w-full">
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-2 w-full">
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative col-span-2 w-full">
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
      <div className="relative w-full">
        <div
          className={clsx(
            'absolute top-0 right-0 bottom-0 w-px',
            isDark ? 'bg-[#E4E4FF]/10' : 'bg-blue/10',
          )}
        />
      </div>
    </div>
  );
};

export default BackgroundLines;
