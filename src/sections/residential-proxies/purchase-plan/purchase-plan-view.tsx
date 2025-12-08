import { useState } from 'react';
import Iconify from '@/components/iconify';
import { OrderSummary } from './order-sumary';
import { PurchasePlanLeft, PurchasePlansSummary } from './purchase-plan-left';

export const PurchasePlanView = () => {
  const [summary, setSummary] = useState<PurchasePlansSummary | null>(null);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)] items-start">
      {/* LEFT: Plans + features */}
      <div className="space-y-5">
        <PurchasePlanLeft onChangeSummary={setSummary} />
      </div>

      {/* RIGHT: Order summary */}
      <div className="space-y-4">
        <OrderSummary
          productName="Residential Proxies"
          trafficGb={summary?.trafficGb}
          planLabel={summary?.selectedPlan.label}
          pricePerGb={summary?.pricePerGb}
          subtotal={summary?.subtotal}
          discount={summary?.discount}
          discountPercent={summary?.discountPercent}
          total={summary?.total}
        />

        {/* Optional: nhỏ nhỏ note */}
        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-[11px] text-amber-800">
          <div className="flex items-start gap-2">
            <Iconify icon="mdi:information-outline" width={16} />
            <p>
              For very large orders or custom plans, you can contact sales to
              negotiate dedicated pricing and payment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
