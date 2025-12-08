'use client';

import { useCallback, useState } from 'react';
import VidPurchasePlaneSection from './PurchasePlan/VidPurchasePlaneSection';
import VidRequestConfig from './RequestConfig/VidRequestConfig';

const TABS_DATA = [
  { value: 'PurchasePlan', label: 'Purchase Plan', color: '#f97316' },
  {
    value: 'RequestConfiguration',
    label: 'RequestConfiguration',
    color: '#14b8a6',
  },
  // { value: 'RunningList', label: 'Running-list', color: '#14b8a6' },
];

export default function VideoDownloaderSection() {
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
            Video Data API
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
            <VidPurchasePlaneSection />
          </div>
        )}
        {currentTab === 'RequestConfiguration' && (
          <div className=" p-5">
            {' '}
            <VidRequestConfig />
          </div>
        )}
        {currentTab === 'RunningList' && (
          <div className=" p-5">{/* <ApiSettingView /> */}</div>
        )}
      </div>
    </div>
  );
}
