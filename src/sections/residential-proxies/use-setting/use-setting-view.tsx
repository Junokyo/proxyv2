import { useCallback, useState } from 'react';
import UserView from './user-view';
import WhitelistView from './whitelist-view';

const TABS_DATA = [
  { value: 'pass', label: 'User & Pass', color: '#f97316' },
  { value: 'whitelist', label: 'Whitelist', color: '#14b8a6' },
];

export default function UseSettingView() {
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

        {/* Free Trial pill */}
        {/* <span className="ml-3 rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold text-emerald-600">
          Free Trial
        </span> */}
      </div>

      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'pass' && (
          <div className="bg-white p-5">
            <UserView />
          </div>
        )}
        {currentTab === 'whitelist' && (
          <div className="bg-white p-5">
            <WhitelistView />
          </div>
        )}
      </div>
    </div>
  );
}
