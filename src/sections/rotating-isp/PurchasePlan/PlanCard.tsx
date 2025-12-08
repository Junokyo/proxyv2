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
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-full flex-col rounded-2xl border bg-white px-6 pb-6 pt-3 text-left shadow-sm transition
      ${
        isActive
          ? 'border-red-400 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* badge */}
      <div className="flex justify-center">
        <span className="rounded-b-md bg-rose-50 px-4 py-1 text-[11px] font-semibold text-rose-500">
          {plan.discountLabel}
        </span>
      </div>

      <div className="mt-4 text-sm font-medium text-slate-700">
        {plan.label}
      </div>

      {/* price */}
      <div className="mt-4 space-y-1">
        <div className="text-xs text-slate-400 line-through">
          ${plan.originalPrice}
        </div>
        <div
          className={`text-3xl font-semibold ${
            isActive ? 'text-red-500' : 'text-slate-900'
          }`}
        >
          ${plan.price}
        </div>
        <div className="text-xs text-slate-500">
          <span className="line-through mr-1 text-slate-400">
            ${Math.round(plan.originalPrice / (plan.id === '1d' ? 1 : 30))}
            /Day
          </span>
          {plan.perDayText}
        </div>
      </div>

      {/* bandwidth */}
      <div className="mt-6 text-xs text-slate-600">Bandwidth:</div>
      <div className="mt-2">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
          <span>200Mbps</span>
          <span className="text-slate-400 text-[10px]">▼</span>
        </div>
      </div>
    </button>
  );
};
