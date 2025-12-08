// ExchangeDetailsTable.tsx
import React from 'react';
import { Icon } from '@iconify/react';
import { PlanKey } from './RedeemSection';

interface ExchangeDetailsTableProps {
  selectedPlan: PlanKey;
}

const PLAN_LABEL: Record<PlanKey, string> = {
  residential: 'Residential Proxies',
  rotating: 'Rotating ISP Proxies',
  isp: 'ISP Proxies',
  datacenter: 'Datacenter Proxies',
};

const ExchangeDetailsTable: React.FC<ExchangeDetailsTableProps> = ({
  selectedPlan,
}) => {
  // ở đây tạm để data rỗng -> show empty state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = [];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Exchange Details</p>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-400">
          <Icon icon="mdi:download" className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Filter row */}
      <div className="mb-4 flex flex-wrap gap-3">
        {/* Plan select (fake) */}
        <div className="relative">
          <select
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none"
            defaultValue={selectedPlan}
          >
            {Object.entries(PLAN_LABEL).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Date range fake input */}
        <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-500">
          <Icon icon="mdi:calendar-blank-outline" className="h-4 w-4" />
          Starting time - End time
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" className="h-4 w-4 accent-blue-500" />
              </th>
              <th className="px-4 py-3 font-medium">Plan type</th>
              <th className="px-4 py-3 font-medium">Exchange amount (GB)</th>
              <th className="px-4 py-3 font-medium">Deduct the balance</th>
              <th className="px-4 py-3 font-medium">Redeem time</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-16 text-center text-sm text-slate-500"
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
              data.map((row, idx) => (
                <tr key={idx}>{/* TODO: đổ data thật nếu cần */}</tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeDetailsTable;
