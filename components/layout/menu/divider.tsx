import clsx from 'clsx';

const Divider = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('px-x-default grid', className)}>
      <div className="menu-item-scale-x h-px w-full bg-white/30" />
    </div>
  );
};

export default Divider;
