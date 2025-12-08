import React, { useEffect, useMemo, useState } from 'react';

export type PlanType = 'fixed' | 'adjustable' | 'custom';

export interface Plan {
  id: string;
  label: string; // "5 GB", "1000 GB", "Custom"...
  gb?: number;
  type: PlanType;
  savingsLabel?: string;
  highlighted?: boolean;
  popular?: boolean;

  // pricing
  pricePerGb: number; // giá đã giảm (hiển thị "Price per GB")
  basePricePerGb?: number; // giá gốc /GB (để tính subtotal)
  discountPercent?: number; // 0.76 = 76% OFF
}

export interface PurchasePlansSummary {
  selectedPlan: Plan;
  trafficGb: number;
  pricePerGb: number;
  basePricePerGb: number;
  discountPercent: number;
  subtotal: number;
  discount: number;
  total: number;
}

interface PurchasePlansProps {
  onChangeSummary?: (summary: PurchasePlansSummary) => void;
  defaultPlanId?: string; // optional override default '1000'
}

const PLANS: Plan[] = [
  {
    id: '5',
    label: '5 GB',
    gb: 5,
    type: 'fixed',
    savingsLabel: 'Save 39%+10% Off',
    pricePerGb: 2.0,
    basePricePerGb: 3.3,
    discountPercent: 0.39,
  },
  {
    id: '10',
    label: '10 GB',
    gb: 10,
    type: 'fixed',
    savingsLabel: 'Save 45%+10% Off',
    pricePerGb: 1.9,
    basePricePerGb: 3.4,
    discountPercent: 0.45,
  },
  {
    id: '45',
    label: '45 GB',
    gb: 45,
    type: 'fixed',
    savingsLabel: 'Save 54%+10% Off',
    pricePerGb: 1.7,
    basePricePerGb: 3.6,
    discountPercent: 0.54,
  },
  {
    id: '120',
    label: '120 GB',
    gb: 120,
    type: 'fixed',
    savingsLabel: 'Save 60%+10% Off',
    popular: true,
    pricePerGb: 1.5,
    basePricePerGb: 3.7,
    discountPercent: 0.6,
  },
  {
    id: '280',
    label: '280 GB',
    gb: 280,
    type: 'fixed',
    savingsLabel: 'Save 66%+10% Off',
    pricePerGb: 1.3,
    basePricePerGb: 3.8,
    discountPercent: 0.66,
  },

  // 1000GB giống hình: 3.3$/GB gốc, 0.77$/GB sau giảm ~76%
  {
    id: '1000',
    label: '1000 GB',
    gb: 1000,
    type: 'fixed',
    savingsLabel: 'Save 76%',
    highlighted: true,
    pricePerGb: 0.77,
    basePricePerGb: 3.3,
    discountPercent: 0.76,
  },
  {
    id: '2000',
    label: '2000 GB',
    gb: 2000,
    type: 'fixed',
    savingsLabel: 'Save 71%',
    pricePerGb: 0.7,
    basePricePerGb: 2.4,
    discountPercent: 0.71,
  },
  {
    id: '3000',
    label: '3000 GB',
    gb: 3000,
    type: 'adjustable',
    savingsLabel: 'Save 78%',
    pricePerGb: 0.65,
    basePricePerGb: 3.0,
    discountPercent: 0.78,
  },
  {
    id: '5000',
    label: '5000 GB',
    gb: 5000,
    type: 'adjustable',
    savingsLabel: 'Save 80%',
    pricePerGb: 0.6,
    basePricePerGb: 3.0,
    discountPercent: 0.8,
  },
  {
    id: 'custom',
    label: 'Custom',
    type: 'custom',
    pricePerGb: 2,
    basePricePerGb: 2,
    discountPercent: 0,
  },
];

const FEATURES_LEFT = ['Unused GBs roll over', 'HTTP(S)/SOCKS5 support'];

const FEATURES_RIGHT = [
  'IP persistence for 90 minutes',
  '99.9% fast response time',
  'No charge for invalid IPs',
  '24/7 dedicated support',
];

export const PurchasePlanLeft: React.FC<PurchasePlansProps> = ({
  onChangeSummary,
  defaultPlanId = '1000',
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultPlanId);
  const [adjustableValues, setAdjustableValues] = useState<
    Record<string, number>
  >({
    '3000': 3000,
    '5000': 5000,
  });

  // GB cho custom plan
  const [customGb, setCustomGb] = useState<number>(100);

  const selectedPlan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlanId)!,
    [selectedPlanId],
  );

  const trafficGb = useMemo(() => {
    if (selectedPlan.type === 'adjustable') {
      return adjustableValues[selectedPlan.id] ?? selectedPlan.gb ?? 0;
    }
    if (selectedPlan.type === 'custom') {
      return customGb || 0;
    }
    return selectedPlan.gb ?? 0;
  }, [selectedPlan, adjustableValues, customGb]);

  const pricePerGb = selectedPlan.pricePerGb;
  const basePricePerGb = selectedPlan.basePricePerGb ?? pricePerGb;
  const discountPercent = selectedPlan.discountPercent ?? 0;

  const subtotal = trafficGb * basePricePerGb;
  const discount = subtotal * discountPercent;
  const total = subtotal - discount;

  useEffect(() => {
    if (!onChangeSummary) return;

    onChangeSummary({
      selectedPlan,
      trafficGb,
      pricePerGb,
      basePricePerGb,
      discountPercent,
      subtotal,
      discount,
      total,
    });
  }, [
    onChangeSummary,
    selectedPlan,
    trafficGb,
    pricePerGb,
    basePricePerGb,
    discountPercent,
    subtotal,
    discount,
    total,
  ]);

  const handleSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleAdjust = (planId: string, delta: number) => {
    setAdjustableValues((prev) => {
      const current = prev[planId] ?? 0;
      const next = Math.max(0, current + delta * 500); // tăng/giảm 500GB
      return { ...prev, [planId]: next };
    });
  };

  const renderPlanLabel = (plan: Plan) => {
    if (plan.type === 'adjustable') {
      const value = adjustableValues[plan.id] ?? plan.gb ?? 0;
      return (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAdjust(plan.id, -1);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs hover:bg-gray-100"
          >
            −
          </button>
          <span className="text-2xl font-semibold text-slate-900">
            {value.toLocaleString()} GB
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAdjust(plan.id, 1);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs hover:bg-gray-100"
          >
            +
          </button>
        </div>
      );
    }

    if (plan.type === 'custom') {
      return (
        <div className="flex items-center justify-center gap-1">
          <input
            type="number"
            min={1}
            value={customGb}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              const v = Math.max(1, Number(e.target.value) || 1);
              setCustomGb(v);
            }}
            className="w-16 rounded border border-slate-300 bg-transparent px-1 py-1 text-center text-sm text-slate-900 outline-none"
          />
          <span className="text-xl font-semibold text-slate-900">GB</span>
        </div>
      );
    }

    // fixed plan
    return (
      <span className="text-2xl font-semibold text-slate-900">
        {plan.gb ? `${plan.gb} GB` : plan.label}
      </span>
    );
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-semibold">Residential Proxies</h2>
        <p className="text-sm text-slate-500">
          Each residential IP is a real mobile or desktop device that can be
          pinpointed to a certain physical location. Residential proxy networks
          are extremely effective and are not susceptible to blocks and
          captchas.
        </p>
      </div>

      {/* Subscription title */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-semibold">Subscription</span>
        <span className="rounded-[999px] bg-red-500 px-3 py-0.5 text-xs font-semibold text-white">
          Extra 10% Off
        </span>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isHighlighted = plan.highlighted;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => handleSelect(plan.id)}
              className={[
                'group relative flex flex-col items-center justify-center rounded-md border bg-white px-3 py-4 text-center transition-all',
                isSelected
                  ? 'border-red-500 shadow-[0_0_0_1px_rgba(248,113,113,0.35)]'
                  : 'border-slate-200 hover:border-red-300 hover:bg-red-50/20',
                !isSelected && isHighlighted ? 'bg-red-50/40' : '',
              ].join(' ')}
            >
              {plan.savingsLabel && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[999px] border border-red-200 bg-red-50 px-2.5 py-0.5 text-[10px] font-semibold text-red-500  whitespace-nowrap  tracking-wide ">
                  {plan.savingsLabel}
                </span>
              )}

              {/* GB / adjustable / custom */}
              {renderPlanLabel(plan)}

              {/* dòng giá: giá cũ gạch + giá mới (hover mới hiện nếu chưa chọn) */}
              {(plan.basePricePerGb || plan.pricePerGb) && (
                <div
                  className={[
                    'mt-1 flex items-center justify-center text-[11px] transition-opacity',
                    isSelected
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100',
                  ].join(' ')}
                >
                  {plan.basePricePerGb &&
                    plan.basePricePerGb !== plan.pricePerGb && (
                      <span className="mr-1 text-slate-300 line-through">
                        ${plan.basePricePerGb.toFixed(2)}/GB
                      </span>
                    )}
                  <span className="text-slate-600">
                    ${plan.pricePerGb.toFixed(2)}/GB
                  </span>
                </div>
              )}

              {plan.popular && (
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-red-500">
                  Most popular
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Features */}
      <div className="mt-6 border-top border-slate-200 pt-4">
        <div className="grid gap-3 md:grid-cols-2">
          <ul className="space-y-2 text-sm">
            {FEATURES_LEFT.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                  ✓
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm">
            {FEATURES_RIGHT.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                  ✓
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
