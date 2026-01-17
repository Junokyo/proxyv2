'use client';

import React, { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrderSummary } from '@/sections/residential-proxies/purchase-plan/order-sumary';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

// Speed Plans
const SPEED_PLANS = [
  { value: 'standard', label: 'Standard', speed: 10, icon: 'mdi:speedometer-slow' },
  { value: 'advanced', label: 'Advanced', speed: 25, icon: 'mdi:speedometer-medium' },
  { value: 'premium', label: 'Premium', speed: 50, icon: 'mdi:speedometer' },
];

// Duration Options
const DURATION_OPTIONS = [
  { value: 1, label: '1 Day', discount: null, icon: 'mdi:calendar-today' },
  { value: 7, label: '7 Days', discount: '10%', icon: 'mdi:calendar-week' },
  { value: 30, label: '30 Days', discount: '25%', icon: 'mdi:calendar-month' },
];

// Rotation Plans with pricing
const ROTATION_PLANS = [
  {
    id: 'rotate-5min',
    title: '5 Minutes',
    rotationTime: '5 min',
    popular: false,
    pricing: {
      1: { standard: 0.22, advanced: 0.32, premium: 0.42 },
      7: { standard: 1.40, advanced: 2.00, premium: 2.65 },
      30: { standard: 5.00, advanced: 7.20, premium: 9.45 },
    },
  },
  {
    id: 'rotate-2min',
    title: '2 Minutes',
    rotationTime: '2 min',
    popular: true,
    pricing: {
      1: { standard: 0.24, advanced: 0.34, premium: 0.44 },
      7: { standard: 1.50, advanced: 2.15, premium: 2.80 },
      30: { standard: 5.40, advanced: 7.65, premium: 9.90 },
    },
  },
  {
    id: 'rotate-1min',
    title: '1 Minute',
    rotationTime: '1 min',
    popular: false,
    pricing: {
      1: { standard: 0.26, advanced: 0.36, premium: 0.46 },
      7: { standard: 1.65, advanced: 2.30, premium: 2.90 },
      30: { standard: 5.85, advanced: 8.10, premium: 10.35 },
    },
  },
  {
    id: 'rotate-30sec',
    title: '30 Seconds',
    rotationTime: '30s',
    popular: false,
    pricing: {
      1: { standard: 0.28, advanced: 0.38, premium: 0.48 },
      7: { standard: 1.75, advanced: 2.40, premium: 3.05 },
      30: { standard: 6.30, advanced: 8.55, premium: 10.80 },
    },
  },
];

interface PlanCardProps {
  plan: (typeof ROTATION_PLANS)[0];
  duration: number;
  speedPlan: string;
  speedLimit: number;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  duration,
  speedPlan,
  speedLimit,
  isSelected,
  onSelect,
}) => {
  const price =
    plan.pricing[duration as keyof typeof plan.pricing][
      speedPlan as keyof (typeof plan.pricing)[1]
    ];

  return (
    <div
      onClick={onSelect}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-200',
        isSelected
          ? 'border-primary shadow-md shadow-primary/10'
          : 'border-border hover:border-primary/40 hover:shadow-sm',
        plan.popular && !isSelected && 'border-primary/30'
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -right-8 top-3 rotate-45 bg-primary px-10 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          Popular
        </div>
      )}

      {/* Card Content */}
      <div className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          {/* Selection Radio */}
          <div
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
              isSelected
                ? 'border-primary bg-primary'
                : 'border-muted-foreground/25 group-hover:border-primary/50'
            )}
          >
            {isSelected && <Iconify icon="mdi:check" width={12} className="text-primary-foreground" />}
          </div>

          <div>
            <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5">
              <Iconify icon="mdi:timer-outline" width={11} className="text-primary" />
              <span className="text-[10px] font-semibold text-primary">{plan.rotationTime}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{plan.title}</h3>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-lg text-muted-foreground">$</span>
            <span className="text-3xl font-bold text-foreground">{price.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            per {duration === 1 ? 'day' : `${duration} days`}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Iconify icon="mdi:check-circle" width={16} className="text-emerald-500" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{speedLimit}</span> Mbps Speed
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Iconify icon="mdi:check-circle" width={16} className="text-emerald-500" />
            <span className="text-muted-foreground">HTTP/HTTPS Support</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Iconify icon="mdi:check-circle" width={16} className="text-emerald-500" />
            <span className="text-muted-foreground">Unlimited Connections</span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="border-t border-border bg-muted/30 px-5 py-3">
        {isSelected ? (
          <Button
            size="sm"
            className="w-full bg-primary text-primary-foreground"
          >
            <Iconify icon="mdi:check" width={16} className="mr-1.5" />
            Selected
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
          >
            Select Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export const PurchasePlanView: React.FC = () => {
  const [speedPlan, setSpeedPlan] = useState('premium');
  const [duration, setDuration] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('rotate-2min');

  const currentSpeedPlan = SPEED_PLANS.find((p) => p.value === speedPlan);
  const selectedPlanData = ROTATION_PLANS.find((p) => p.id === selectedPlan);

  // Calculate pricing
  const price = selectedPlanData
    ? selectedPlanData.pricing[duration as 1 | 7 | 30][speedPlan as 'standard' | 'advanced' | 'premium']
    : 0;

  // Get discount percent based on duration
  const getDiscountPercent = () => {
    const opt = DURATION_OPTIONS.find((d) => d.value === duration);
    if (!opt?.discount) return 0;
    return parseInt(opt.discount) / 100;
  };

  const discountPercent = getDiscountPercent();
  const basePrice = discountPercent > 0 ? price / (1 - discountPercent) : price;
  const discount = basePrice - price;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)] items-start">
      {/* Main Content */}
      <div className="min-w-0 space-y-6">
        {/* Configuration Panel */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            {/* Speed Plan */}
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Iconify icon="mdi:speedometer" width={14} className="text-primary" />
                Speed:
              </label>
              <div className="flex flex-wrap gap-2">
                {SPEED_PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    onClick={() => setSpeedPlan(plan.value)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all',
                      speedPlan === plan.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                    )}
                  >
                    <span className="font-medium">{plan.label}</span>
                    <span className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                      speedPlan === plan.value ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                    )}>
                      {plan.speed}Mbps
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden h-6 w-px bg-border sm:block" />

            {/* Duration */}
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Iconify icon="mdi:calendar-clock" width={14} className="text-primary" />
                Duration:
              </label>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDuration(opt.value)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all',
                      duration === opt.value
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {opt.discount && (
                      <span className={cn(
                        'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                        duration === opt.value ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      )}>
                        -{opt.discount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Select Rotation Interval</h2>
            <p className="text-sm text-muted-foreground">
              Choose how often your IP address rotates
            </p>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full bg-muted/70 px-3 py-1.5 text-xs sm:flex">
            <Iconify icon="mdi:lightbulb-outline" width={14} className="text-amber-500" />
            <span className="text-muted-foreground">Faster rotation = Better anonymity</span>
          </div>
        </div>

        {/* Plan Cards Carousel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {ROTATION_PLANS.map((plan) => (
              <CarouselItem key={plan.id} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                <PlanCard
                  plan={plan}
                  duration={duration}
                  speedPlan={speedPlan}
                  speedLimit={currentSpeedPlan?.speed || 10}
                  isSelected={selectedPlan === plan.id}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <OrderSummary
          productName="Rotating Proxies"
          trafficGb={undefined}
          planLabel={selectedPlanData ? `${selectedPlanData.title} (${currentSpeedPlan?.speed}Mbps, ${DURATION_OPTIONS.find((d) => d.value === duration)?.label})` : undefined}
          pricePerGb={undefined}
          subtotal={basePrice}
          discount={discount}
          discountPercent={discountPercent}
          total={price}
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

export default PurchasePlanView;
