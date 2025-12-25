'use client';

import { useCallback, useState } from 'react';
import DepositForm from './DepositForm/DepositForm';
import DepositHistory from './DepositHistory/DepositHistory';

const TABS_DATA = [
  { value: 'deposit', label: 'Nạp tiền', color: '#f97316' },
  { value: 'history', label: 'Lịch sử nạp tiền', color: '#14b8a6' },
];

export default function DepositView() {
  const [currentTab, setCurrentTab] = useState('deposit');
  
  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-4">
          Nạp tiền vào tài khoản
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'pb-3 text-sm transition font-medium ' +
                (currentTab === tab.value
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-600">
        {currentTab === 'deposit' && (
          <DepositForm />
        )}
        {currentTab === 'history' && (
          <DepositHistory />
        )}
      </div>
    </div>
  );
}

