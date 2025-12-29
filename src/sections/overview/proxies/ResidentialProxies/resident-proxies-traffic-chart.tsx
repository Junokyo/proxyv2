type TrafficChartCardProps = {
  title?: string;
  rangeLabel?: string;
};

// Date labels for traffic chart
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

// Sample traffic data in GB (8 data points corresponding to 8 dates)
const SAMPLE_TRAFFIC_DATA = [12.5, 18.3, 15.7, 22.1, 19.4, 25.8, 28.2, 21.6];

/**
 * Resident Proxies Traffic Chart Card component
 * Displays traffic usage statistics with chart visualization
 */
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
          
          {/* Horizontal grid lines */}
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="absolute left-0 right-0 border-t border-slate-100"
              style={{
                bottom: `${8 + (idx + 1) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-2 top-4 bottom-8 flex flex-col justify-between text-[10px] text-slate-400 pointer-events-none">
          <span>{Math.max(...SAMPLE_TRAFFIC_DATA).toFixed(1)} GB</span>
          <span>{(Math.max(...SAMPLE_TRAFFIC_DATA) * 0.75).toFixed(1)} GB</span>
          <span>{(Math.max(...SAMPLE_TRAFFIC_DATA) * 0.5).toFixed(1)} GB</span>
          <span>{(Math.max(...SAMPLE_TRAFFIC_DATA) * 0.25).toFixed(1)} GB</span>
          <span>0 GB</span>
        </div>

        {/* Chart SVG */}
        <div className="absolute inset-0 pt-4 pb-8 pl-8 pr-4">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Area fill */}
            <defs>
              <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Area path */}
            <path
              d={`M 0,${100 - (SAMPLE_TRAFFIC_DATA[0] / Math.max(...SAMPLE_TRAFFIC_DATA)) * 100} ${SAMPLE_TRAFFIC_DATA.map(
                (value, index) => {
                  const x = (index / (SAMPLE_TRAFFIC_DATA.length - 1)) * 100;
                  const y = 100 - (value / Math.max(...SAMPLE_TRAFFIC_DATA)) * 100;
                  return `L ${x},${y}`;
                }
              ).join(' ')} L 100,100 L 0,100 Z`}
              fill="url(#trafficGradient)"
            />
            
            {/* Line path */}
            <path
              d={`M 0,${100 - (SAMPLE_TRAFFIC_DATA[0] / Math.max(...SAMPLE_TRAFFIC_DATA)) * 100} ${SAMPLE_TRAFFIC_DATA.map(
                (value, index) => {
                  const x = (index / (SAMPLE_TRAFFIC_DATA.length - 1)) * 100;
                  const y = 100 - (value / Math.max(...SAMPLE_TRAFFIC_DATA)) * 100;
                  return `L ${x},${y}`;
                }
              ).join(' ')}`}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {SAMPLE_TRAFFIC_DATA.map((value, index) => {
              const x = (index / (SAMPLE_TRAFFIC_DATA.length - 1)) * 100;
              const y = 100 - (value / Math.max(...SAMPLE_TRAFFIC_DATA)) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#f97316"
                  stroke="white"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        {/* Bottom axis labels */}
        <div className="absolute bottom-1 left-0 right-0 px-2">
          <div className="flex w-full min-w-0 gap-1 text-[10px] text-slate-300">
            {DATES.map((d) => (
              <span key={d} className="flex-1 w-0 min-w-0 truncate text-center">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
