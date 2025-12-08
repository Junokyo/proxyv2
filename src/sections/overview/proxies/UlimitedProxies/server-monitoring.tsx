import { Icon } from '@iconify/react';

type MonitoringMetricCardProps = {
  title: string;
};

function MonitoringMetricCard({ title }: MonitoringMetricCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="text-sm font-medium text-slate-800">{title}</div>

      <div className="mt-3 h-52 rounded-lg border border-slate-200 bg-white px-4 pt-4 pb-6 relative overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="flex h-full w-full justify-between">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-full border-l border-slate-100" />
            ))}
          </div>
          <div className="absolute bottom-6 left-0 right-0 border-t border-slate-100" />
        </div>

        {/* Center text */}
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-slate-500">No data to show</span>
        </div>
      </div>
    </div>
  );
}

export function ServerMonitoringCard() {
  return (
    <div className="w-full  p-1 ">
      {/* Filter row */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {/* Server select */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Server:</span>
            <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 min-w-[160px]">
              <span className="truncate">All servers</span>
              <Icon
                icon="mdi:chevron-down"
                className="text-slate-400 text-base"
              />
            </div>
          </div>

          {/* Period range */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Period:</span>
            <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 min-w-[210px]">
              <span className="truncate">2025-10-26 - 2025-11-25</span>
              <Icon
                icon="mdi:calendar-outline"
                className="text-slate-400 text-base"
              />
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
          <Icon icon="mdi:refresh" className="text-sm" />
          Refresh
        </button>
      </div>

      {/* Charts row */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <MonitoringMetricCard title="Network - External outbound bandwidth (Mbps)" />
        <MonitoringMetricCard title="Network - Number of TCP connections (Count)" />
        <MonitoringMetricCard title="CPU - Usage rate (%)" />
        <MonitoringMetricCard title="RAM - Usage rate (%)" />
      </div>
    </div>
  );
}
