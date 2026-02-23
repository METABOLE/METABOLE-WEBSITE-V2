import { COLORS } from '@/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface FloatingHaloProps {
  className?: string;
  from?: string;
  to?: string;
  size?: string;
}

const FloatingHalo = forwardRef<HTMLDivElement, FloatingHaloProps>(
  ({ className, size = '100vw', from = COLORS.BLUE, to = COLORS.WHITE, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={clsx('pointer-events-none absolute', className)}>
        <div
          style={{
            background: `radial-gradient(circle, ${from} 0%, ${to} 70%)`,
            // contain: 'paint',
            width: size,
            height: size,
          }}
        />
      </div>
    );
  },
);

export default FloatingHalo;
