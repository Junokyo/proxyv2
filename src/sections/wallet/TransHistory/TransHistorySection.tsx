import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const TransHistorySection: React.FC = () => {
  const [proxyType, setProxyType] = useState('all');
  const [orderNumber, setOrderNumber] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = []; // chưa có data

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* FILTER BAR */}
      <div className="mb-4 flex flex-wrap gap-3">
        {/* Select proxy type */}
        <select
          value={proxyType}
          onChange={(e) => setProxyType(e.target.value)}
          className="h-9 min-w-[120px] rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 outline-none"
        >
          <option value="all">All Proxy</option>
          <option value="residential">Residential Proxies</option>
          <option value="isp">ISP Proxies</option>
          <option value="datacenter">Datacenter Proxies</option>
          <option value="rotating">Rotating ISP Proxies</option>
        </select>

        {/* Date range */}
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
            placeholder="Order number..."
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
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Invoice</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
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
                  {/* fill data ở đây nếu có */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* bottom border */}
      <div className="mt-4 h-px w-full bg-slate-100" />
    </div>
  );
};

export default TransHistorySection;
