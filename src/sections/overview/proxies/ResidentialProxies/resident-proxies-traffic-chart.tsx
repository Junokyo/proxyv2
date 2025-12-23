type TrafficChartCardProps = {
  title?: string;
  rangeLabel?: string;
};

const DATES = [
  '2025-11-23 16:42',
  '2025-11-19 16:42',
  '2025-11-15 16:42',
  '2025-11-11 16:42',
  '2025-11-07 16:42',
  '2025-11-03 16:42',
  '2025-10-30 16:42',
  '2025-10-26 16:42',
];

export function ResidentProxiesTrafficChartCard({
  title = 'Total traffic',
  rangeLabel = 'Last 30 days:',
}: TrafficChartCardProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30 p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md">
            <span className="text-xl sm:text-2xl">📈</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{rangeLabel}</p>
          </div>
        </div>

        <button className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-amber-100 hover:bg-amber-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-amber-700 transition-all border border-amber-300">
          <span>View Details</span>
          <span className="text-base">→</span>
        </button>
      </div>

      {/* Chart area */}
      <div className="relative mt-4 h-64 sm:h-72 rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-white to-yellow-50/30 px-3 sm:px-4 pt-4 pb-10 sm:pb-12 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex h-full w-full justify-between px-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-full border-l border-amber-100/50" />
            ))}
          </div>
          {/* Horizontal axis line (bottom) */}
          <div className="absolute bottom-10 sm:bottom-12 left-0 right-0 border-t-2 border-amber-200" />
        </div>

        {/* Center empty state with better design */}
        <div className="flex h-full flex-col items-center justify-center relative z-10">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 mb-4 border-2 border-amber-200">
            <span className="text-3xl sm:text-4xl">📊</span>
          </div>
          <span className="text-sm sm:text-base font-semibold text-slate-600 mb-1">No Data Available</span>
          <span className="text-xs sm:text-sm text-slate-500">Start using proxies to see traffic statistics</span>
        </div>

        {/* Bottom axis labels - responsive */}
        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 px-2 sm:px-3">
          <div className="hidden sm:flex justify-between text-[10px] text-slate-400 font-medium">
            {DATES.map((d) => (
              <span key={d} className="truncate max-w-[80px]">
                {d}
              </span>
            ))}
          </div>
          {/* Mobile: show fewer dates */}
          <div className="flex sm:hidden justify-between text-[9px] text-slate-400 font-medium">
            {DATES.filter((_, idx) => idx % 2 === 0).map((d) => (
              <span key={d} className="truncate max-w-[60px]">
                {d.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Peak Usage</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0 GB</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Average</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0 GB</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Total</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0 GB</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Remaining</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0 GB</div>
        </div>
      </div>
    </div>
  );
}
