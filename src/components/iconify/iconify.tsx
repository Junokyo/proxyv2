import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

export type IconifyProps = IconifyIcon | string;

interface Props {
  icon: IconifyProps;
  width?: number;
  title?: string;
  className?: string;
}

const Iconify = forwardRef<HTMLElement, Props>(
  ({ icon, width = 20, title, className, ...other }, ref) => {
    return (
      <span
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className="relative inline-flex items-center justify-center group"
        {...other}
      >
        {/* Iconify icon */}
        <Icon icon={icon} width={width} height={width} className={className} />

        {/* Tooltip (Tailwind version) */}
        {title && (
          <span
            className="
              invisible opacity-0 group-hover:visible group-hover:opacity-100
              absolute left-1/2 -translate-x-1/2 -top-8 
              whitespace-nowrap text-xs px-2 py-1 rounded-md 
              bg-slate-800 text-white shadow transition-all
            "
          >
            {title}
          </span>
        )}
      </span>
    );
  },
);

export default Iconify;
