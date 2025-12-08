import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const RechargeRecordSection: React.FC = () => {
  //   const [dateRange, setDateRange] = useState("");
  const [orderNumber, setOrderNumber] = useState('');

  // tạm chưa có data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = [];

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* FILTER ROW */}
      <div className="mb-4 flex flex-wrap gap-3">
        {/* Date range fake input */}
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-500 hover:border-blue-400"
        >
          <Icon icon="mdi:calendar-blank-outline" className="h-4 w-4" />
          <span>Starting time - End time</span>
        </button>

        {/* Order number + search */}
        <div className="flex h-9 flex-1 min-w-[180px] max-w-sm items-center rounded-lg border border-slate-200 bg-slate-50 pl-3 text-xs text-slate-600 focus-within:border-blue-400">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order Number..."
            className="h-full w-full bg-transparent pr-2 text-xs outline-none"
          />
          <button
            type="button"
            className="flex h-full w-10 items-center justify-center rounded-r-lg border-l border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <Icon icon="mdi:magnify" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
            <tr>
              <th className="px-4 py-3">Order Number</th>
              <th className="px-4 py-3">Payment Amount</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Denial Reason</th>
              <th className="px-4 py-3">Payment Time</th>
              <th className="px-4 py-3">Account Balance</th>
              <th className="px-4 py-3">Invoice</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                      <Icon
                        icon="mdi:robot-confused-outline"
                        className="h-8 w-8 text-slate-300"
                      />
                    </div>
                    <span>No order yet</span>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/40' : ''}>
                  {/* điền cell thật nếu có data */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* bottom border giống hình */}
      <div className="mt-4 h-px w-full bg-slate-100" />
    </div>
  );
};

export default RechargeRecordSection;
