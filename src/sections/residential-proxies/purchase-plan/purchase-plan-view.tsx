import { useState } from 'react';
import Iconify from '@/components/iconify';
import { OrderSummary } from './order-sumary';
import { PurchasePlanLeft, PurchasePlansSummary } from './purchase-plan-left';

export const PurchasePlanView = () => {
  const [summary, setSummary] = useState<PurchasePlansSummary | null>(null);
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)] items-start">
      {/* Main Content */}
      <div className="min-w-0">
        <PurchasePlanLeft onChangeSummary={setSummary} />
      </div>

      {/* Sidebar */}
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

        {/* Note card */}
        <div className="rounded-xl border-0 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-[12px] text-amber-700 dark:text-amber-400 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-2">
            <Iconify icon="mdi:information-outline" width={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              For very large orders or custom plans, you can contact sales to
              negotiate dedicated pricing and payment options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
