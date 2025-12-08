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
    <div className="w-full">
      <div className="inline-flex items-center pl-5">
        {/* Tab group */}
        <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-1 py-1">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'rounded-xl px-5 py-2 text-sm font-semibold transition ' +
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
      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'proxies' && (
          <div className="bg-white p-5">
            <ProxiesView />
          </div>
        )}
        {currentTab === 'scraping' && (
          <div className="bg-white p-5">
            <UniversalApiView />
          </div>
        )}
      </div>
    </div>
  );
}
