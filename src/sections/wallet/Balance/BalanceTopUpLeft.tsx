// TopUpLeft.tsx
import React from 'react';
import { Icon } from '@iconify/react';

interface TopUpLeftProps {
  amount: number;
  onChangeAmount: (value: number) => void;
}

const quickAmounts = [50, 200, 800, 1500, 3000];

export const TopUpLeft: React.FC<TopUpLeftProps> = ({
  amount,
  onChangeAmount,
}) => {
  const handleChange = (value: number) => {
    if (value < 0) return;
    onChangeAmount(value);
  };

  return (
    <div className="space-y-6">
      {/* Card Current Balance + Amount */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Current Balance */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Icon
                icon="mdi:wallet-outline"
                className="h-6 w-6 text-blue-500"
              />
            </div>
            <div>
              <p className="text-sm text-slate-500">Current Balance</p>
              <p className="text-lg font-semibold text-slate-900">$0</p>
            </div>
          </div>

          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            Exchange
          </button>
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Amount</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleChange(amount - 50)}
              className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xl text-slate-500 hover:bg-slate-50"
            >
              -
            </button>

            <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
              <span className="text-2xl font-semibold text-slate-800">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => handleChange(Number(e.target.value || 0))}
                className="w-36 border-none bg-transparent text-3xl font-semibold text-slate-900 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => handleChange(amount + 50)}
              className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-xl text-slate-500 hover:bg-slate-50"
            >
              +
            </button>
          </div>

          {/* quick buttons */}
          <div className="mt-3 flex flex-wrap gap-3">
            {quickAmounts.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => handleChange(v)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600"
              >
                +${v}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Icon icon="mdi:information-outline" className="h-4 w-4" />
            <span>Minimum amount is 1000 USD</span>
          </div>
        </div>
      </div>

      {/* Balance Conversion Ratio */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-slate-800">
          Balance Conversion Ratio
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Exchange plans</th>
                <th className="px-4 py-3 font-medium">Unit price</th>
                <th className="px-4 py-3 font-medium">Original unit price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-3">Residential Proxies</td>
                <td className="px-4 py-3">$0.77/GB</td>
                <td className="px-4 py-3">$3.3/GB</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Rotating ISP Proxies</td>
                <td className="px-4 py-3">$0.4/GB</td>
                <td className="px-4 py-3">$3.85/GB</td>
              </tr>
              <tr>
                <td className="px-4 py-3">ISP Proxies</td>
                <td className="px-4 py-3">$0.17/IP/Day</td>
                <td className="px-4 py-3">$0.22/IP/Day</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Datacenter Proxies</td>
                <td className="px-4 py-3">$0.11/IP/Day</td>
                <td className="px-4 py-3">$0.13/IP/Day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
