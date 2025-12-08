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
    <div className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-slate-900">{title}</h2>

        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
          Detailed statistics
          <span>›</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-slate-200" />

      {/* Range label */}
      <div className="mt-3 text-sm text-slate-600">{rangeLabel}</div>

      {/* Chart area */}
      <div className="mt-3 h-64 rounded-xl border border-slate-200 bg-white px-4 pt-4 pb-6 relative overflow-hidden">
        {/* Vertical lines (grid) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex h-full w-full justify-between">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="h-full border-l border-slate-100" />
            ))}
          </div>
          {/* Horizontal axis line (bottom) */}
          <div className="absolute bottom-8 left-0 right-0 border-t border-slate-100" />
        </div>

        {/* Center text */}
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-sm text-slate-500">No data to show</span>
        </div>

        {/* Bottom axis labels */}
        <div className="absolute bottom-1 left-0 right-0 px-2">
          <div className="flex justify-between text-[10px] text-slate-300">
            {DATES.map((d) => (
              <span key={d} className="truncate">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
