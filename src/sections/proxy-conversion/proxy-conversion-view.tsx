'use client';

import { useCallback, useState } from 'react';
import AutomaticRenewalSection from './AutomaticRenewal/AutomaticRenewalSection';
import BalanceHistorySection from './BalanceHistory/BalanceHistorySection';
import ConversionSection from './Conversion/ConversionSection';

const TABS_DATA = [
  { value: 'conversion', label: 'Qui Đổi Gói', color: '#f97316' },
  { value: 'autoRenewal', label: 'Gia Hạn Tự Động', color: '#14b8a6' },
  { value: 'balanceHistory', label: 'Biến Động Số Dư', color: '#8b5cf6' },
];

export default function ProxyConversionView() {
  const [currentTab, setCurrentTab] = useState('conversion');
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full min-w-0">
      <div className="px-3 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-slate-900">
            Qui Đổi Proxy
          </h1>

          {/* Divider */}
          <div className="h-px w-full bg-slate-200 mt-2" />

          {/* Responsive Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Chọn chức năng:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-6">
              {TABS_DATA.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleChangeTab(tab.value)}
                  className={
                    'pb-2 text-xs sm:text-sm transition font-medium whitespace-nowrap ' +
                    (currentTab === tab.value
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent')
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'conversion' && (
          <div className="px-3 sm:px-5 lg:px-6">
            <ConversionSection />
          </div>
        )}
        {currentTab === 'autoRenewal' && (
          <div className="px-3 sm:px-5 lg:px-6">
            <AutomaticRenewalSection />
          </div>
        )}
        {currentTab === 'balanceHistory' && (
          <div className="px-3 sm:px-5 lg:px-6">
            <BalanceHistorySection />
          </div>
        )}
      </div>
    </div>
  );
}
