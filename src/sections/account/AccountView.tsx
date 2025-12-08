'use client';

import { useCallback, useState } from 'react';
import GeneralSection from './General/GeneralSection';
import IdentityAuthenticationSection from './IdentityAuthentication/IdentityAuthenticationSection';
import PurchaseHistorySection from './PurchaseHistory/PurchaseHistorySection';
import SecuritySection from './Sercurity/SercuritySection';

const TABS_DATA = [
  { value: 'General', label: 'General', color: '#f97316' },
  { value: 'Security', label: 'Security', color: '#14b8a6' },
  { value: 'PurchaseHistory', label: 'Purchase History', color: '#14b8a6' },
  {
    value: 'IdentityAuthentication',
    label: 'Identity Authentication  ',
    color: '#14b8a6',
  },
];

export default function AccountView() {
  const [currentTab, setCurrentTab] = useState('General');
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      <div className="inline-flex items-center pl-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-slate-900">
            Metronic wallet
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
        {currentTab === 'General' && (
          <div className="bg-white p-5">
            <GeneralSection />
          </div>
        )}
        {currentTab === 'Security' && (
          <div className=" p-5">
            <SecuritySection />
          </div>
        )}
        {currentTab === 'PurchaseHistory' && (
          <div className=" p-5">
            <PurchaseHistorySection />{' '}
          </div>
        )}
        {currentTab === 'IdentityAuthentication' && (
          <div className=" p-5">
            <IdentityAuthenticationSection />
          </div>
        )}
      </div>
    </div>
  );
}
