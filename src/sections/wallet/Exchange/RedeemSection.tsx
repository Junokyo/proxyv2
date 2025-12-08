// RedeemSection.tsx
import React, { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';

export type PlanKey = 'residential' | 'rotating' | 'isp' | 'datacenter';

interface RedeemSectionProps {
  selectedPlan: PlanKey;
  onChangePlan: (plan: PlanKey) => void;
}

const PLAN_CONFIG: Record<
  PlanKey,
  {
    title: string;
    subLabel: string;
    unitPrice: number; // để tính tiền button Exchange
    unitText: string;
    redeemTitle: string;
  }
> = {
  residential: {
    title: 'Residential Proxies',
    subLabel: '$0.77/GB',
    unitPrice: 0.77,
    unitText: 'GB ($0.77/GB)',
    redeemTitle: 'Redeem Residential Proxies',
  },
  rotating: {
    title: 'Rotating ISP Proxies',
    subLabel: '$0.4/GB',
    unitPrice: 0.4,
    unitText: 'GB ($0.4/GB)',
    redeemTitle: 'Redeem Rotating ISP Proxies',
  },
  isp: {
    title: 'ISP Proxies',
    subLabel: '$0.17/IP/Day',
    unitPrice: 0.17 * 30, // ví dụ 1 gói 30 ngày
    unitText: '30 Days ($0.17/IP/Day)',
    redeemTitle: 'Redeem ISP Proxies',
  },
  datacenter: {
    title: 'Datacenter Proxies',
    subLabel: '$0.11/IP/Day',
    unitPrice: 0.11 * 30,
    unitText: '30 Days ($0.11/IP/Day)',
    redeemTitle: 'Redeem Datacenter Proxies',
  },
};

const tabs: { key: PlanKey }[] = [
  { key: 'residential' },
  { key: 'rotating' },
  { key: 'isp' },
  { key: 'datacenter' },
];

const RedeemSection: React.FC<RedeemSectionProps> = ({
  selectedPlan,
  onChangePlan,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const currentPlan = PLAN_CONFIG[selectedPlan];

  const exchangeAmount = useMemo(
    () => (quantity > 0 ? quantity * currentPlan.unitPrice : 0),
    [quantity, currentPlan.unitPrice],
  );

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
      {/* TABS PLAN */}
      <div className="grid gap-3 md:grid-cols-4">
        {tabs.map(({ key }) => {
          const plan = PLAN_CONFIG[key];
          const active = key === selectedPlan;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChangePlan(key)}
              className={`flex flex-col rounded-xl border px-4 py-3 text-left text-sm transition
                ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full border ${
                    active
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                <span className="font-medium">{plan.title}</span>
              </div>
              <span className="mt-1 text-xs text-slate-500">
                {plan.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTENT REDEEM */}
      <div className="mt-2 flex gap-5">
        {/* Current Balance */}
        <div className="w-[260px] flex-shrink-0 flex flex-col justify-between rounded-lg border border-blue-100 bg-white px-8 py-6">
          <div>
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Icon
                icon="mdi:wallet-outline"
                className="h-6 w-6 text-blue-500"
              />
            </div>
            <p className="text-sm text-slate-500">Current Balance</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">$0</p>
          </div>

          <button className="mt-6 w-full rounded-lg border border-blue-500 bg-white px-4 py-2.5 text-sm font-semibold text-blue-500 hover:bg-blue-50">
            Recharge
          </button>
        </div>

        {/* Redeem panel */}
        <div className="flex-1 flex flex-col rounded-lg border border-slate-200 bg-white px-8 py-6">
          {/* header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50/60">
              <Icon icon="mdi:reload" className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {currentPlan.redeemTitle}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Directly exchange your wallet for your package, all packages can
                enjoy the lowest unit price and can be used immediately after
                exchange.
              </p>
            </div>
          </div>

          <div className="mb-4 h-px w-full bg-slate-200" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* input + price */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded border border-slate-300 bg-white px-3">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 border-none bg-transparent py-2 text-sm text-slate-700 outline-none"
                />
                <span className="ml-2 border-l border-slate-200 pl-2 text-xs text-slate-600">
                  {currentPlan.unitText}
                </span>
              </div>

              <span className="text-sm text-slate-500">
                ({currentPlan.unitText ?? '$0.77/GB'})
              </span>
            </div>

            {/* buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
              >
                ${exchangeAmount.toFixed(2)} Exchange
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-400"
              >
                Get proxy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemSection;
