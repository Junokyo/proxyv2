import { useCallback, useState } from 'react';
import { ServerListTable } from './server-list-table';
import { ServerMonitoringCard } from './server-monitoring';

type ServerListCardProps = {
  onBuyServer?: () => void;
};

const TABS_DATA = [
  { value: 'sl', label: 'Server List', color: '#f97316' },
  { value: 'sm', label: 'Server monitoring', color: '#14b8a6' },
];

export function ServerListCard({}: ServerListCardProps) {
  const [currentTab, setCurrentTab] = useState('sl');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-6 text-sm">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'pb-2 text-sm transition font-medium ' +
                (currentTab === tab.value
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View more */}
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
          View more
          <span>›</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200 mt-2" />

      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'sl' && (
          <div className="bg-white p-5">
            <ServerListTable data={[]} />
          </div>
        )}
        {currentTab === 'sm' && <ServerMonitoringCard />}
      </div>
    </div>
  );
}
