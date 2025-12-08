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
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="text-sm font-semibold text-slate-900">
        Main Account Used
      </div>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-slate-200" />

      {/* Last 30 days */}
      <div className="mt-3 text-sm text-slate-600">
        Last 30 days: <span className="font-semibold text-slate-900">0</span>{' '}
        Results
      </div>

      {/* Chart area */}
      <div className="mt-3 relative h-64 rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-[11px] text-slate-400">
          <span>1</span>
          <span>0</span>
        </div>

        {/* Grid & line */}
        <div className="absolute inset-x-6 inset-y-4">
          {/* Vertical grid lines */}
          <div className="flex h-full w-full justify-between">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="h-full border-l border-slate-100" />
            ))}
          </div>

          {/* Baseline */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200" />
        </div>

        {/* Fake tooltip ở giữa (Usage: 0 Results) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-md bg-white/95 px-3 py-2 shadow text-[11px] text-slate-700">
            <div className="font-medium text-slate-800">2025-11-01</div>
            <div className="mt-1 flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-indigo-400" />
              <span>Usage : 0 Results</span>
            </div>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-1 left-8 right-4">
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
