import { useCallback, useState } from 'react';
import ProxiesView from './proxies/proxies-view';
import UniversalApiView from './universal-api/universal-api-view';

const TABS_DATA = [
  { value: 'proxies', label: 'Proxies', color: '#f97316' },
  { value: 'scraping', label: 'Scraping Solutions', color: '#14b8a6' },
];

export default function OverviewView() {
  const [currentTab, setCurrentTab] = useState('proxies');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-2 sm:px-5 max-w-full">
        {/* Tab group */}
        <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-1 py-1 w-full sm:w-auto overflow-x-auto max-w-full">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'rounded-xl px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition whitespace-nowrap ' +
                (currentTab === tab.value
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-transparent text-slate-500 hover:text-slate-900')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Free Trial pill */}
        {/* <span className="ml-3 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
          Free Trial
        </span> */}
      </div>

      {/* Nội dung tab */}
      <div className="mt-4 text-sm text-slate-600 w-full max-w-full overflow-x-hidden">
        {currentTab === 'proxies' && (
          <div className="bg-white p-3 sm:p-5 w-full max-w-full overflow-x-hidden">
            <ProxiesView />
          </div>
        )}
        {currentTab === 'scraping' && (
          <div className="bg-white p-3 sm:p-5 w-full max-w-full overflow-x-hidden">
            <UniversalApiView />
          </div>
        )}
      </div>
    </div>
  );
}
