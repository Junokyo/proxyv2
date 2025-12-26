'use client';

import { useCallback, useState } from 'react';
import ConversionSection from './Conversion/ConversionSection';
import AutomaticRenewalSection from './AutomaticRenewal/AutomaticRenewalSection';
import RechargeRecordSection from './RechargeRecord/RechargeRecordSection';

const TABS_DATA = [
  { value: 'conversion', label: 'Qui Đổi Gói', color: '#f97316' },
  { value: 'autoRenewal', label: 'Gia Hạn Tự Động', color: '#14b8a6' },
  { value: 'rechargeRecord', label: 'Lịch Sử Nạp Tiền', color: '#14b8a6' },
];

export default function ProxyConversionView() {
  const [currentTab, setCurrentTab] = useState('conversion');
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      <div className="inline-flex items-center pl-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-slate-900">
            Qui Đổi Proxy
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
        {currentTab === 'conversion' && (
          <div className="p-5">
            <ConversionSection />
          </div>
        )}
        {currentTab === 'autoRenewal' && (
          <div className="p-5">
            <AutomaticRenewalSection />
          </div>
        )}
        {currentTab === 'rechargeRecord' && (
          <div className="p-5">
            <RechargeRecordSection />
          </div>
        )}
      </div>
    </div>
  );
}

