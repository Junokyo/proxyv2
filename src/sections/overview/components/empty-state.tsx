import Iconify from '@/components/iconify';

type EmptyStateProps = {
  icon: string; // icon chính, vd: "solar:document-linear"
  pinIcon?: string; // icon nhỏ góc dưới, vd: "mdi:pin"
  message: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

export function EmptyState({
  icon,
  pinIcon,
  message,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* Icon circle */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Iconify icon={icon} className="text-4xl text-blue-500" />

        {pinIcon && (
          <Iconify
            icon={pinIcon}
            className="absolute -bottom-1 right-4 text-xl text-blue-600"
          />
        )}
      </div>

      {/* Message */}
      <p className="mt-4 text-sm text-slate-500">{message}</p>

      {/* Button (optional) */}
      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Iconify icon="mdi:cart" className="text-base" />
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
