'use client';

import { useCallback, useState } from 'react';
import GeneralSection from './General/GeneralSection';
import IdentityAuthenticationSection from './IdentityAuthentication/IdentityAuthenticationSection';
import SecuritySection from './Sercurity/SercuritySection';

const TABS_DATA = [
  { value: 'General', label: 'Tổng quan', color: '#f97316' },
  { value: 'Security', label: 'Bảo mật', color: '#14b8a6' },
  {
    value: 'IdentityAuthentication',
    label: 'Xác thực danh tính',
    color: '#14b8a6',
  },
];

export default function AccountView() {
  const [currentTab, setCurrentTab] = useState('General');
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="w-full px-3 sm:px-4 md:px-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-base sm:text-lg font-semibold text-slate-900">
            User account
          </h1>

          {/* Divider */}
          <div className="h-px w-full bg-slate-200 mt-2" />

          {/* Tabs - Mobile: scrollable, Desktop: horizontal */}
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <div className="flex items-center gap-3 sm:gap-6 min-w-max sm:min-w-0">
              {TABS_DATA.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleChangeTab(tab.value)}
                  className={
                    'whitespace-nowrap pb-2 text-xs sm:text-sm transition font-medium ' +
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

      {/* Content */}
      <div className="mt-4 px-3 sm:px-4 md:px-5">
        {currentTab === 'General' && <GeneralSection />}
        {currentTab === 'Security' && <SecuritySection />}
        {currentTab === 'IdentityAuthentication' && (
          <IdentityAuthenticationSection />
        )}
      </div>
    </div>
  );
}
