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
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      {/* TABS - Mobile: Dropdown, Desktop: Horizontal tabs */}
      <div className="mb-4">
        {/* Mobile: Dropdown selector */}
        <div className="lg:hidden">
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(Number(e.target.value));
              setPage(1);
            }}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-blue-500"
          >
            {tabs.map((label, idx) => (
              <option key={label} value={idx}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop: Horizontal tabs */}
        <div className="hidden overflow-x-auto lg:block">
          <div className="inline-flex gap-1">
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
                  className={`whitespace-nowrap rounded-t-lg px-4 py-2 text-sm font-medium transition-colors
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
      </div>

      {/* CONTENT CARD (filter + table + pagination) */}
      <div className="mt-1 rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-white">
        {/* FILTER BAR */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
          {/* Search order number */}
          <div className="flex min-h-[40px] w-full items-center rounded-lg border border-slate-200 bg-slate-50 pl-3 text-sm text-slate-600 transition-colors focus-within:border-blue-400 sm:max-w-xs">
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Order number..."
              className="h-full w-full bg-transparent pr-2 text-sm outline-none"
            />
            <button
              type="button"
              className="flex min-h-[40px] w-10 shrink-0 items-center justify-center rounded-r-lg border-l border-slate-200 text-slate-500 transition-colors active:bg-blue-50 hover:bg-blue-50 hover:text-blue-600"
            >
              <Icon icon="mdi:magnify" className="h-4 w-4" />
            </button>
          </div>

          {/* Date range + Not Credited */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 transition-colors active:bg-blue-50 hover:border-blue-400 sm:flex-initial"
            >
              <span className="truncate text-xs sm:text-sm">Start date - End date</span>
              <Icon
                icon="mdi:calendar-blank-outline"
                className="h-4 w-4 shrink-0 text-slate-400"
              />
            </button>

            <button
              type="button"
              className="min-h-[40px] flex-1 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 transition-colors active:bg-blue-50 hover:border-blue-500 sm:flex-initial sm:text-sm"
            >
              Not Credited?
            </button>
          </div>
        </div>

        {/* TABLE - Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium text-slate-500">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment Date</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Traffic</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Denial Reason</th>
                <th className="px-4 py-3">Invoice</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-16 text-center text-sm text-slate-500"
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
                rows.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">
                        {row.orderNumber || row.orderId || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[200px] truncate text-slate-700">
                        {row.name || row.product || tabs[activeTab] || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {row.orderAmount || row.amount || '-'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {row.status && (
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            row.status === 'Completed' || row.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                              : row.status === 'Pending' || row.status === 'pending'
                                ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                                : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                          }`}
                        >
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.paymentTime || row.date || '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.paymentMethod || '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.traffic || '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.period || '-'}
                    </td>
                    <td className="px-4 py-3">
                      {row.denialReason ? (
                        <div className="max-w-[150px] truncate text-xs text-rose-600">
                          {row.denialReason}
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Icon
                          icon="mdi:file-document-outline"
                          className="h-3.5 w-3.5"
                        />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE/TABLET CARD VIEW */}
        <div className="block space-y-3 p-3 lg:hidden sm:p-4">
          {rows.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 sm:text-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                  <Icon
                    icon="mdi:robot-confused-outline"
                    className="h-10 w-10 text-slate-300"
                  />
                </div>
                <span>No order yet</span>
              </div>
            </div>
          ) : (
            rows.map((row: any, idx: number) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow active:shadow-md"
              >
                {/* Header: Status & Order Number */}
                <div className="mb-3 flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                      Order Number
                    </div>
                    <div className="break-words text-sm font-semibold text-slate-900 sm:text-base">
                      {row.orderNumber || row.orderId || '-'}
                    </div>
                  </div>
                  {row.status && (
                    <div className="shrink-0">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium sm:text-xs ${
                          row.status === 'Completed' || row.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                            : row.status === 'Pending' || row.status === 'pending'
                              ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                              : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Key Data: Service, Amount, Date */}
                <div className="space-y-2.5">
                  {/* Service */}
                  <div>
                    <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                      Service
                    </div>
                    <div className="break-words text-sm font-medium text-slate-900 sm:text-base">
                      {row.name || row.product || tabs[activeTab] || '-'}
                    </div>
                  </div>

                  {/* Amount & Date - Side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                        Amount
                      </div>
                      <div className="break-words text-sm font-semibold text-slate-900 sm:text-base">
                        {row.orderAmount || row.amount || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                        Payment Date
                      </div>
                      <div className="break-words text-sm font-medium text-slate-700 sm:text-base">
                        {row.paymentTime || row.date || '-'}
                      </div>
                    </div>
                  </div>

                  {/* Additional Details - Collapsible style */}
                  {(row.traffic || row.period || row.paymentMethod || row.denialReason) && (
                    <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      {row.paymentMethod && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Payment Method</span>
                          <span className="break-words text-right font-medium text-slate-900">
                            {row.paymentMethod}
                          </span>
                        </div>
                      )}
                      {row.traffic && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Traffic</span>
                          <span className="break-words text-right font-medium text-slate-900">
                            {row.traffic}
                          </span>
                        </div>
                      )}
                      {row.period && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Period</span>
                          <span className="break-words text-right font-medium text-slate-900">
                            {row.period}
                          </span>
                        </div>
                      )}
                      {row.denialReason && (
                        <div>
                          <div className="mb-0.5 text-[10px] font-medium text-rose-500 sm:text-xs">
                            Denial Reason
                          </div>
                          <div className="break-words text-xs font-medium text-rose-600 sm:text-sm">
                            {row.denialReason}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Invoice Button - Touch friendly */}
                  <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      className="flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors active:bg-blue-50 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 sm:px-5"
                    >
                      <Icon icon="mdi:file-document-outline" className="h-4 w-4 shrink-0" />
                      <span>View Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOTTOM BORDER */}
        <div className="mt-4 h-px w-full bg-slate-100" />

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 px-3 py-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-4">
          {/* page size */}
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <span className="text-sm text-slate-500 sm:hidden">Items per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="min-h-[36px] rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition-colors focus:border-blue-500"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}/page
                </option>
              ))}
            </select>
          </div>

          {/* pager */}
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <button
              type="button"
              disabled={page === 1}
              className={`flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full border text-slate-400 transition-colors active:bg-blue-50 ${
                page === 1
                  ? 'cursor-not-allowed border-slate-100 bg-slate-50'
                  : 'border-slate-200 bg-white hover:border-blue-400 hover:text-blue-500'
              }`}
            >
              <Icon icon="mdi:chevron-left" className="h-4 w-4" />
            </button>

            <span className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-600">
              {page}
            </span>

            <button
              type="button"
              className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors active:bg-blue-50 hover:border-blue-400 hover:text-blue-500"
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
