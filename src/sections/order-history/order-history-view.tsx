'use client';

import { useCallback, useState } from 'react';
import DepositHistory from './DepositHistory/DepositHistory';
import OrderHistory from './OrderHistory/OrderHistory';
import TransactionHistory from './TransactionHistory/TransactionHistory';

const TABS_DATA = [
  { value: 'orders', label: 'Lịch sử đơn hàng', color: '#14b8a6' },
  { value: 'transactions', label: 'Lịch sử giao dịch', color: '#f97316' },
  // { value: 'deposits', label: 'Lịch sử nạp tiền', color: '#8b5cf6' },
];

export default function OrderHistoryView() {
  const [currentTab, setCurrentTab] = useState('transactions');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-4">
          Lịch sử đơn hàng
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
        {currentTab === 'transactions' && <TransactionHistory />}
        {currentTab === 'orders' && <OrderHistory />}
        {currentTab === 'deposits' && <DepositHistory />}
      </div>
    </div>
  );
}
