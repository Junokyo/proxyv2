'use client';

import { useState } from 'react';
import { ContactDialog } from '@/components/contact/ContactDialog';

type RotatingPlanId =
  | '1gb'
  | '10gb'
  | '40gb'
  | '100gb'
  | '350gb'
  | '650gb'
  | '1000gb'
  | '3000gb'
  | 'custom';

interface RotatingPlan {
  id: RotatingPlanId;
  label: string; // text hiển thị trong card: 1 GB, 10 GB, ...
  gb?: number; // số GB, custom thì undefined
  pricePerGb?: number; // giá mỗi GB
  durationDays: number; // 30 Day
  mostPopular?: boolean;
}

// data mock – chỉnh giá lại theo BE nếu cần
const ROTATING_PLANS: RotatingPlan[] = [
  { id: '1gb', label: '1 GB', gb: 1, pricePerGb: 0.7, durationDays: 30 },
  { id: '10gb', label: '10 GB', gb: 10, pricePerGb: 0.6, durationDays: 30 },
  { id: '40gb', label: '40 GB', gb: 40, pricePerGb: 0.52, durationDays: 30 },
  { id: '100gb', label: '100 GB', gb: 100, pricePerGb: 0.48, durationDays: 30 },
  {
    id: '350gb',
    label: '350 GB',
    gb: 350,
    pricePerGb: 0.45,
    durationDays: 30,
    mostPopular: true,
  },
  { id: '650gb', label: '650 GB', gb: 650, pricePerGb: 0.43, durationDays: 30 },
  {
    id: '1000gb',
    label: '1000 GB',
    gb: 1000,
    pricePerGb: 0.4,
    durationDays: 30,
  },
  {
    id: '3000gb',
    label: '3000 GB',
    gb: 3000,
    pricePerGb: 0.38,
    durationDays: 30,
  },
  // custom: để user nhập riêng, ở đây chỉ render card
  { id: 'custom', label: 'Custom', durationDays: 30 },
];

export default function RotatingIspPurchasePlanSection() {
  const [selectedId, setSelectedId] = useState<RotatingPlanId>('350gb');
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const selectedPlan =
    ROTATING_PLANS.find((p) => p.id === selectedId) ?? ROTATING_PLANS[0];

  const subtotal =
    selectedPlan.gb && selectedPlan.pricePerGb
      ? selectedPlan.gb * selectedPlan.pricePerGb
      : 0;

  const handlePlanClick = (planId: RotatingPlanId) => {
    if (planId === 'custom') {
      setIsContactDialogOpen(true);
    } else {
      setSelectedId(planId);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold text-slate-900 md:text-lg">
            Rotating ISP proxies
          </h1>
          <p className="text-xs text-slate-500 md:text-sm">
            Choose the billing type that suits your use case and get started in
            minutes.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full space-y-6">
        {/* top: subscription + order summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT: subscription cards */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="mb-4 flex items-baseline gap-2 text-sm">
                <span className="font-semibold text-slate-900">
                  Subscription
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
                {ROTATING_PLANS.map((plan) => {
                  const isActive = plan.id === selectedId;
                  const isCustom = plan.id === 'custom';
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handlePlanClick(plan.id)}
                      className={[
                        'relative flex h-24 flex-col items-center justify-center rounded-xl border text-sm font-medium transition',
                        isActive && !isCustom
                          ? 'border-indigo-500 bg-indigo-50/60 shadow-[0_0_0_1px_rgba(79,70,229,0.4)] text-indigo-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600',
                      ].join(' ')}
                    >
                      {/* Badge MOST POPULAR */}
                      {plan.mostPopular && (
                        <span className="absolute -top-3 rounded-full bg-rose-500 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          Most popular
                        </span>
                      )}

                      <span className="text-base font-semibold">
                        {plan.label}
                      </span>
                      {!isCustom && plan.pricePerGb && (
                        <span className="mt-1 text-xs font-normal text-slate-500">
                          ${plan.pricePerGb.toFixed(2)}/GB
                        </span>
                      )}
                      {isCustom && (
                        <span className="mt-1 text-xs font-normal text-slate-400">
                          Enter custom quota later
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium text-slate-900">
                    ISP Proxies
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity</span>
                  <span className="font-medium text-slate-900">
                    {selectedPlan.gb
                      ? `${selectedPlan.gb.toLocaleString()} GB`
                      : 'Custom'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-medium text-slate-900">
                    {selectedPlan.durationDays} Day
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Price per GB</span>
                  <span className="font-medium text-slate-900">
                    {selectedPlan.pricePerGb
                      ? `$${selectedPlan.pricePerGb.toFixed(2)}`
                      : '--'}
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    {selectedPlan.gb ? `$${subtotal.toFixed(2)}` : '--'}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 text-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-semibold text-slate-900">
                    {selectedPlan.gb ? `$${subtotal.toFixed(2)}` : '--'}
                  </span>
                </div>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Order Now
                </button>
              </div>

              {/* payment methods mock */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">
                  We accept these payment methods:
                </p>
                <div className="flex gap-2 text-xs text-slate-500">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>AMEX</span>
                  <span>…</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom features */}
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-900">
              Features you can use with each plan
            </span>
            <span className="text-xs text-slate-400">Restricted Websites</span>
          </div>

          <div className="grid gap-x-8 gap-y-2 text-xs text-slate-600 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>Premium ISP providers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>195 popular locations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>Super high success rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>Unlimited subaccounts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>500 whitelists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✔</span>
              <span>Unlimited threads and concurrent sessions</span>
            </div>
          </div>
        </div>
      </div>
      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </div>
  );
}
