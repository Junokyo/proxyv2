import React, { useState } from 'react';

type PlanKey = 'residential' | 'unlimited' | 'isp' | 'datacenter' | 'rotating';

const PLANS: { key: PlanKey; label: string }[] = [
  { key: 'residential', label: 'Residential Proxies' },
  { key: 'unlimited', label: 'Unlimited Proxies' },
  { key: 'isp', label: 'ISP Proxies' },
  { key: 'datacenter', label: 'Datacenter Proxies' },
  { key: 'rotating', label: 'Rotating ISP Proxies' },
];

const TRAFFIC_OPTIONS = [
  {
    id: 'custom',
    label: '+ Custom Traffic',
    unitPrice: '--',
    totalPrice: '--',
  },
  { id: '5', label: '5GB', unitPrice: '$0.77/GB', totalPrice: '$3.85' },
  { id: '10', label: '10GB', unitPrice: '$0.77/GB', totalPrice: '$7.7' },
  { id: '45', label: '45GB', unitPrice: '$0.77/GB', totalPrice: '$34.65' },
  { id: '120', label: '120GB', unitPrice: '$0.77/GB', totalPrice: '$92.4' },
  { id: '280', label: '280GB', unitPrice: '$0.77/GB', totalPrice: '$215.6' },
  { id: '1000', label: '1000GB', unitPrice: '$0.77/GB', totalPrice: '$770' },
  { id: '2000', label: '2000GB', unitPrice: '$0.77/GB', totalPrice: '$1540' },
  { id: '3000', label: '3000GB', unitPrice: '$0.77/GB', totalPrice: '$2310' },
  { id: '5000', label: '5000GB', unitPrice: '$0.77/GB', totalPrice: '$3850' },
];

const AutoRenewSection: React.FC = () => {
  const [autoRenew, setAutoRenew] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanKey>('residential');
  const [duration, setDuration] = useState('30');
  const [selectedTraffic, setSelectedTraffic] = useState<string>('5');
  const [leftGb, setLeftGb] = useState('1');
  const [beforeDays, setBeforeDays] = useState('1');

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header + toggle */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900">
          Automatic Renewal
        </span>

        <button
          type="button"
          role="switch"
          aria-checked={autoRenew}
          onClick={() => setAutoRenew((v) => !v)}
          className={`flex h-6 w-11 items-center rounded-full transition 
            ${autoRenew ? 'bg-blue-500' : 'bg-slate-300'}`}
        >
          <span
            className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition 
              ${autoRenew ? 'translate-x-5' : 'translate-x-0.5'}`}
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex min-w-full gap-1 border-b border-slate-200">
          {PLANS.map((plan) => {
            const active = plan.key === activePlan;
            return (
              <button
                key={plan.key}
                type="button"
                onClick={() => setActivePlan(plan.key)}
                className={`whitespace-nowrap border-b-2 px-4 py-2 text-xs sm:text-sm
                  ${
                    active
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-transparent text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {plan.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
        <span className="text-slate-600">Duration:</span>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none"
        >
          <option value="30">30 Days</option>
          <option value="60">60 Days</option>
          <option value="90">90 Days</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="w-10 px-3 py-2" />
              <th className="px-3 py-2 font-medium">Traffic</th>
              <th className="px-3 py-2 font-medium">Unit-Price</th>
              <th className="px-3 py-2 font-medium">Total Price</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {TRAFFIC_OPTIONS.map((row, idx) => (
              <tr
                key={row.id}
                className={idx % 2 === 1 ? 'bg-slate-50/60' : ''}
              >
                <td className="px-3 py-2 align-middle">
                  <input
                    type="radio"
                    name="traffic"
                    checked={selectedTraffic === row.id}
                    onChange={() => setSelectedTraffic(row.id)}
                    className="h-4 w-4 accent-blue-500"
                  />
                </td>
                <td className="px-3 py-2 align-middle text-xs sm:text-sm">
                  {row.label}
                </td>
                <td className="px-3 py-2 align-middle text-xs sm:text-sm">
                  {row.unitPrice}
                </td>
                <td className="px-3 py-2 align-middle text-xs sm:text-sm">
                  {row.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional settings */}
      <div className="mt-5 space-y-3 text-[11px] sm:text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-800">
            Additional Settings:
          </span>
          <span>Auto-renew when</span>
          <input
            type="number"
            min={0}
            value={leftGb}
            onChange={(e) => setLeftGb(e.target.value)}
            className="h-7 w-14 rounded border border-slate-200 bg-white px-2 text-xs outline-none"
          />
          <span>
            GB left. (Wallet will add traffic for you in time even before the
            expiration date)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span>Auto-renew</span>
          <input
            type="number"
            min={0}
            value={beforeDays}
            onChange={(e) => setBeforeDays(e.target.value)}
            className="h-7 w-14 rounded border border-slate-200 bg-white px-2 text-xs outline-none"
          />
          <span>
            days before expiration. (Luna wallet renews it 1 day before the
            expiration date by default)
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-lg bg-blue-500 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-600 sm:text-sm">
          Save
        </button>
        <button className="rounded-lg border border-slate-200 px-5 py-2 text-xs font-medium text-slate-700 hover:border-blue-400 sm:text-sm">
          Back to Default
        </button>
      </div>
    </div>
  );
};

export default AutoRenewSection;
