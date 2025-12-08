import { Plan } from './PurchasePlanSection';

interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isActive,
  onSelect,
}) => {
  const perDayOriginal =
    plan.id === '1d' ? plan.originalPrice : Math.round(plan.originalPrice / 30);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-full min-h-[220px] w-full flex-col justify-between rounded-2xl border bg-white px-4 pb-4 pt-3 text-left text-sm shadow-sm transition
      ${
        isActive
          ? 'border-red-400 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* TOP: badge + info + price */}
      <div>
        {/* badge */}
        <div className="flex justify-center">
          <span className="rounded-b-md bg-rose-50 px-3 py-1 text-[10px] font-semibold text-rose-500 whitespace-nowrap">
            {plan.discountLabel}
          </span>
        </div>

        {/* label */}
        <div className="mt-4 text-xs font-medium text-slate-700 md:text-sm">
          {plan.label}
        </div>

        {/* price */}
        <div className="mt-3 space-y-1">
          <div className="text-[11px] text-slate-400 line-through whitespace-nowrap">
            ${plan.originalPrice}
          </div>

          <div
            className={`text-2xl font-semibold md:text-3xl ${
              isActive ? 'text-red-500' : 'text-slate-900'
            }`}
          >
            ${plan.price}
          </div>

          <div className="text-[11px] text-slate-500 whitespace-nowrap">
            <span className="mr-1 line-through text-slate-400">
              ${perDayOriginal}/Day
            </span>
            {plan.perDayText}
          </div>
        </div>
      </div>

      {/* BOTTOM: bandwidth */}
      <div className="mt-4">
        <div className="text-[11px] text-slate-600">Bandwidth:</div>
        <div className="mt-2">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
            <span>200Mbps</span>
            <span className="text-[10px] text-slate-400">▼</span>
          </div>
        </div>
      </div>
    </button>
  );
};
