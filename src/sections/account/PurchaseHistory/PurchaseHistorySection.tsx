import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const tabs = [
  'Residential Proxies',
  'Unlimited Proxies',
  'ISP Proxies',
  'Datacenter Proxies',
  'Rotating ISP Proxies',
  'YouTube Downloader',
  'Universal Scraping API',
];

const pageSizeOptions = [10, 20, 50];

const PurchaseHistorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[] = []; // chưa có data -> no order yet

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* TABS */}
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex min-w-full gap-1">
          {tabs.map((label, idx) => {
            const active = idx === activeTab;
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setPage(1);
                }}
                className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-xs sm:text-sm font-medium
                  ${
                    active
                      ? 'bg-white text-blue-600 shadow-[0_-1px_0_0_#ffffff] border border-b-transparent border-slate-200'
                      : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT CARD (filter + table + pagination) */}
      <div className="mt-1 rounded-2xl border border-slate-100 bg-white">
        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          {/* Search order number */}
          <div className="flex h-9 w-full max-w-xs items-center rounded-lg border border-slate-200 bg-slate-50 pl-3 text-xs text-slate-600 focus-within:border-blue-400">
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Order number..."
              className="h-full w-full bg-transparent pr-2 text-xs outline-none"
            />
            <button
              type="button"
              className="flex h-full w-9 items-center justify-center rounded-r-lg border-l border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
            >
              <Icon icon="mdi:magnify" className="h-4 w-4" />
            </button>
          </div>

          {/* Date range + Not Credited */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-500 hover:border-blue-400"
            >
              <span>Start date - End date</span>
              <Icon
                icon="mdi:calendar-blank-outline"
                className="h-4 w-4 text-slate-400"
              />
            </button>

            <button
              type="button"
              className="h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 hover:border-blue-500"
            >
              Not Credited?
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Traffic</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Order Amount</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Denial Reason</th>
                <th className="px-4 py-3">Payment time</th>
                <th className="px-4 py-3">Invoice</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-16 text-center text-xs text-slate-500 sm:text-sm"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                        <Icon
                          icon="mdi:robot-confused-outline"
                          className="h-10 w-10 text-slate-300"
                        />
                      </div>
                      <span>No order yet</span>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 1 ? 'bg-slate-50/50' : ''}
                  >
                    {/* điền cell thật ở đây khi có data */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM BORDER */}
        <div className="mt-4 h-px w-full bg-slate-100" />

        {/* PAGINATION */}
        <div className="flex items-center justify-end gap-4 px-4 py-3 text-xs text-slate-600">
          {/* page size */}
          <div className="flex items-center gap-1">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}/page
                </option>
              ))}
            </select>
          </div>

          {/* pager */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-slate-400 ${
                page === 1
                  ? 'cursor-not-allowed border-slate-100 bg-slate-50'
                  : 'border-slate-200 bg-white hover:border-blue-400 hover:text-blue-500'
              }`}
            >
              <Icon icon="mdi:chevron-left" className="h-4 w-4" />
            </button>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-600">
              {page}
            </span>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:border-blue-400 hover:text-blue-500"
            >
              <Icon icon="mdi:chevron-right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistorySection;
