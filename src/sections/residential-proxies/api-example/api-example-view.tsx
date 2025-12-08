import { useCallback, useState } from 'react';
import UserPassSection from './user-pass-section';
import WhitelistSection from './whitelist-section';

const TABS_DATA = [
  { value: 'pass', label: 'User & Pass', color: '#f97316' },
  { value: 'whitelist', label: 'Whitelist', color: '#14b8a6' },
];

export default function ApiSettingView() {
  const [currentTab, setCurrentTab] = useState('pass');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);
  return (
    <div className="w-full ">
      {/* Header + Tabs */}
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
      </div>

      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'pass' && (
          <div className="bg-white p-5">
            <UserPassSection />
          </div>
        )}
        {currentTab === 'whitelist' && (
          <div className="bg-white p-5">
            <WhitelistSection />
          </div>
        )}
      </div>
    </div>
  );
}
