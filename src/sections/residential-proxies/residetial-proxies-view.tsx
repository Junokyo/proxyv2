'use client';

import { useCallback, useState } from 'react';
import ApiSettingView from './api-example/api-example-view';
import { PurchasePlanView } from './purchase-plan/purchase-plan-view';
import UsageRecordView from './usage-record/usage-record-view';
import UseSettingView from './use-setting/use-setting-view';

const TABS_DATA = [
  { value: 'PurchasePlan', label: 'Purchase Plan', color: '#f97316' },
  { value: 'UseSettings', label: 'Use Settings', color: '#14b8a6' },
  { value: 'APIExample', label: 'API Example', color: '#14b8a6' },
  { value: 'UsageRecord', label: 'Usage Record ', color: '#14b8a6' },
  // { value: 'Statistics', label: 'Statistics ', color: '#14b8a6' },
];

export default function ResidentialProxiesView() {
  const [currentTab, setCurrentTab] = useState('PurchasePlan');
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      <div className="inline-flex items-center pl-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-slate-900">
            Residential Proxies
          </h1>

          {/* Divider */}
          <div className="h-px w-full bg-slate-200 mt-2" />

          <p className="flex items-center gap-6 text-sm">
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
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'PurchasePlan' && (
          <div className="bg-white p-5">
            <PurchasePlanView />
          </div>
        )}
        {currentTab === 'UseSettings' && (
          <div className=" p-5">
            <UseSettingView />
          </div>
        )}
        {currentTab === 'APIExample' && (
          <div className=" p-5">
            <ApiSettingView />
          </div>
        )}
        {currentTab === 'UsageRecord' && (
          <div className=" p-5">
            <UsageRecordView />
          </div>
        )}
        {currentTab === 'Statistics' && <div className=" p-5">Statistics</div>}
      </div>
    </div>
  );
}
