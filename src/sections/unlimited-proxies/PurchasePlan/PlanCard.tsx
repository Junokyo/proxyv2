'use client';

import { cn } from '@/lib/utils';
import { Plan } from './PurchasePlanSection';

interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
  bandwidth: string;
  onBandwidthChange: (value: string) => void;
  bandwidthOptions: string[];
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isActive,
  onSelect,
  bandwidth,
  onBandwidthChange,
  bandwidthOptions,
}) => {
  const isHighlightBadge = plan.discountLabel.includes('Extra');

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex h-full min-h-[230px] w-full flex-col justify-between rounded-xl border bg-card px-4 pb-4 pt-3 text-left transition-all',
        isActive
          ? plan.isHighlighted
            ? 'border-primary shadow-md ring-1 ring-primary/20'
            : 'border-primary shadow-md'
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* TOP: Badge + Info + Price */}
      <div>
        {/* Discount Badge */}
        <div className="flex justify-center">
          <span
            className={cn(
              'rounded-b-md px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap',
              isHighlightBadge
                ? 'bg-primary/10 text-primary'
                : 'bg-primary/10 text-primary'
            )}
          >
            {plan.discountLabel}
          </span>
        </div>

        {/* Plan Label */}
        <div className="mt-4 text-sm font-medium text-foreground">{plan.label}</div>

        {/* Price Section */}
        <div className="mt-3 space-y-1">
          <div className="text-xs text-muted-foreground line-through">
            ${plan.originalPrice}
          </div>

          <div
            className={cn(
              'text-2xl font-bold',
              isActive && plan.isHighlighted ? 'text-primary' : 'text-foreground'
            )}
          >
            ${plan.price}
          </div>

          <div className="text-[11px] text-muted-foreground whitespace-nowrap">
            <span className="mr-1 line-through">${plan.perDayOriginal}/Day</span>
            <span className="text-foreground font-medium">${plan.perDayPrice}/Day</span>
          </div>
        </div>
      </div>

      {/* BOTTOM: Bandwidth Selector */}
      <div className="mt-4">
        <div className="text-[11px] text-muted-foreground mb-1.5">Bandwidth:</div>
        <select
          value={bandwidth}
          onChange={(e) => {
            e.stopPropagation();
            onBandwidthChange(e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {bandwidthOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </button>
  );
};
