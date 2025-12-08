import { useState } from 'react';
import { CustomPlanCard } from './CustomPlanCard';
import { FeaturesSection } from './FeatureSection';
import { OrderSummaryCard } from './OrderSummary';
import { PlanCard } from './PlanCard';

type PlanId = '1d' | '7d' | '30d' | '60d';

export interface Plan {
  id: PlanId;
  label: string; // 1Day / 7Day ...
  originalPrice: number;
  price: number;
  discountLabel: string; // 20%OFF, 10%+Extra 100 OFF...
  perDayText: string; // $248/Day
}

const PLANS: Plan[] = [
  {
    id: '1d',
    label: '1Day',
    originalPrice: 310,
    price: 248,
    discountLabel: '20%OFF',
    perDayText: '$248/Day',
  },
  {
    id: '7d',
    label: '7Day',
    originalPrice: 990,
    price: 792,
    discountLabel: '20%OFF',
    perDayText: '$113/Day',
  },
  {
    id: '30d',
    label: '30Day',
    originalPrice: 2530,
    price: 2177,
    discountLabel: '10%+Extra $100 OFF',
    perDayText: '$73/Day',
  },
  {
    id: '60d',
    label: '60Day',
    originalPrice: 4750,
    price: 4175,
    discountLabel: '10%+Extra $100 OFF',
    perDayText: '$70/Day',
  },
];

export default function PurchasePlanSection() {
  const [selectedId, setSelectedId] = useState<PlanId>('30d');
  const selectedPlan = PLANS.find((p) => p.id === selectedId)!;
  return (
    <div className="w-full flex flex-col  gap-2">
      {/* <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
        <ProxyIntroCard
          icon={<Iconify icon="solar:infinity-outline" />}
          title="Unlimited Proxies"
          description="Take advantage of unlimited data for seamless browsing and crawling."
        />
      </div> */}
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
                <span className="text-xs text-rose-500">
                  (Unlimited traffic)
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {PLANS.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isActive={plan.id === selectedId}
                    onSelect={() => setSelectedId(plan.id)}
                  />
                ))}
                <CustomPlanCard />
              </div>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div>
            <OrderSummaryCard selectedPlan={selectedPlan} />
          </div>
        </div>

        {/* bottom features */}
        <FeaturesSection />
      </div>
    </div>
  );
}
