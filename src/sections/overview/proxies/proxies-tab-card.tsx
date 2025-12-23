type ProxyCardProps = {
  title: string;
  price: string;
  unit: string;
};

export function ProxyTabCard({ title, price, unit }: ProxyCardProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-4 lg:p-3.5 xl:p-3 min-h-[100px] sm:min-h-[130px] lg:min-h-[125px] transition-all duration-300">
      {/* Icon box with gradient */}
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg flex-shrink-0 mb-2.5 group-hover:scale-110 transition-transform duration-300">
        <span className="text-lg sm:text-xl">🌐</span>
      </div>

      {/* Title - Always visible, responsive text size */}
      <div className="text-center flex-1 flex items-center justify-center">
        <div className="text-sm sm:text-sm lg:text-[13px] font-bold leading-tight text-slate-900 break-words px-1">
          {title}
        </div>
      </div>

      {/* Price line - Always visible on all devices */}
      <div className="mt-2 text-center">
        <div className="text-[11px] sm:text-xs text-slate-600 mb-0.5">
          Starting at
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-base sm:text-lg lg:text-base font-bold text-amber-600">{price}</span>
          <span className="text-[10px] sm:text-xs text-slate-500">{unit}</span>
        </div>
      </div>
    </div>
  );
}
