type ProxyCardProps = {
  title: string;
  price: string;
  unit: string;
};

/**
 * Proxy Tab Card component
 * Displays proxy type information in tab format
 */
export function ProxyTabCard({ title, price, unit }: ProxyCardProps) {
  return (
    <div className="w-full max-w-full flex items-center sm:flex-col justify-center sm:justify-start p-2 sm:p-3 sm:p-4 h-full min-h-[44px] sm:min-h-0 whitespace-nowrap sm:whitespace-normal overflow-hidden">
      {/* Mobile: display title only */}
      <div className="sm:hidden text-sm font-semibold text-slate-900 leading-snug px-2 truncate max-w-full">
        {title}
      </div>

      {/* Desktop: display full information */}
      <>
        {/* Icon box */}
        <div className="hidden sm:flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-md bg-blue-50">
          {/* icon tạm dùng emoji, sau bạn thay bằng SVG */}
          <span className="text-lg sm:text-xl text-blue-500">🌐</span>
        </div>

        {/* Title */}
        <div className="hidden sm:block mt-2 sm:mt-3 text-sm sm:text-base font-semibold leading-snug text-slate-900 break-words text-center px-1">
          {title}
        </div>

        {/* Price line */}
        <div className="hidden sm:block mt-1 text-xs sm:text-sm leading-snug text-slate-500 text-center px-1 break-words">
          From <span className="font-semibold text-slate-900">{price}</span>
          {unit}
        </div>
      </>
    </div>
  );
}
