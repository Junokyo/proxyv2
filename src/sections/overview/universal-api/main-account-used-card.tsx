const DATES = [
  '2025-10-25',
  '2025-10-28',
  '2025-10-31',
  '2025-11-03',
  '2025-11-06',
  '2025-11-09',
  '2025-11-12',
  '2025-11-15',
  '2025-11-18',
  '2025-11-21',
  '2025-11-24',
];

export default function MainAccountUsedCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30 p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md">
          <span className="text-xl sm:text-2xl">📊</span>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold text-slate-900">
            Main Account Used
          </div>
          <div className="text-sm text-slate-600">
            Last 30 days: <span className="font-bold text-amber-600">0</span>{' '}
            Results
          </div>
        </div>
      </div>

      {/* Chart area with better mobile responsiveness */}
      <div className="relative h-64 sm:h-72 rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-white to-yellow-50/30 overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute left-2 sm:left-3 top-4 bottom-10 sm:bottom-12 flex flex-col justify-between text-xs font-medium text-slate-500">
          <span>1</span>
          <span>0</span>
        </div>

        {/* Grid & line */}
        <div className="absolute left-8 sm:left-10 right-4 sm:right-6 top-4 bottom-10 sm:bottom-12">
          {/* Vertical grid lines */}
          <div className="flex h-full w-full justify-between">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="h-full border-l border-amber-100/50" />
            ))}
          </div>

          {/* Baseline */}
          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-amber-200" />
        </div>

        {/* Enhanced empty state */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="rounded-2xl bg-white border-2 border-amber-200 px-4 sm:px-5 py-3 sm:py-4 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500"></div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">2025-11-01</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-600">Usage:</span>
              <span className="text-base sm:text-lg font-bold text-amber-600">0 Results</span>
            </div>
          </div>
        </div>

        {/* X-axis labels - responsive */}
        <div className="absolute bottom-2 sm:bottom-3 left-8 sm:left-10 right-4 sm:right-6">
          {/* Desktop: show all dates */}
          <div className="hidden sm:flex justify-between text-[10px] text-slate-400 font-medium">
            {DATES.map((d) => (
              <span key={d} className="truncate max-w-[70px]">
                {d}
              </span>
            ))}
          </div>
          {/* Mobile: show fewer dates */}
          <div className="flex sm:hidden justify-between text-[9px] text-slate-400 font-medium">
            {DATES.filter((_, idx) => idx % 2 === 0).map((d) => (
              <span key={d} className="truncate">
                {d.split('-').slice(1).join('-')}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats summary at bottom */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Total Results</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0</div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Success Rate</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">0%</div>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-amber-200">
          <div className="text-xs text-slate-600 mb-1">Avg Response</div>
          <div className="text-lg sm:text-xl font-bold text-amber-600">--</div>
        </div>
      </div>
    </div>
  );
}
