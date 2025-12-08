'use client';

import { useCallback, useState } from 'react';
import AutoRenewSection from './AutomaticRenewal/AutomaticRenewalSection';
import TopUpPage from './Balance/BalanceTopUp';
import ExchangeSection from './Exchange/ExchangeSection';
import RechargeRecordSection from './RechargeRecord/RechargeRecordSection';
import TransHistorySection from './TransHistory/TransHistorySection';

const TABS_DATA = [
  { value: 'BalanceRecharge', label: 'Balance Recharge', color: '#f97316' },
  { value: 'RedemptionPackage', label: 'Redemption Package', color: '#14b8a6' },
  //   { value: 'GenerateCDK', label: 'Generate CDK', color: '#14b8a6' },
  { value: 'AutomaticRenewal', label: 'Automatic Renewal ', color: '#14b8a6' },
  { value: 'RechargeRecord', label: 'Recharge Record ', color: '#14b8a6' },
  {
    value: 'WalletTransactionHistory',
    label: 'Wallet Transaction History ',
    color: '#14b8a6',
  },
];

export default function WalletView() {
  const [currentTab, setCurrentTab] = useState('BalanceRecharge');
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
        {currentTab === 'BalanceRecharge' && (
          <div className="bg-white p-5">
            <TopUpPage />
          </div>
        )}
        {currentTab === 'RedemptionPackage' && (
          <div className=" p-5">
            <ExchangeSection />
          </div>
        )}
        {currentTab === 'AutomaticRenewal' && (
          <div className=" p-5">
            <AutoRenewSection />
          </div>
        )}
        {currentTab === 'RechargeRecord' && (
          <div className=" p-5">
            <RechargeRecordSection />
          </div>
        )}
        {currentTab === 'WalletTransactionHistory' && (
          <div className=" p-5">
            <TransHistorySection />
          </div>
        )}
      </div>
    </div>
  );
}
