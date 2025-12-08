import { Plan } from './PurchasePlanSection';

export interface OrderSummaryCardProps {
  selectedPlan: Plan;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  selectedPlan,
}) => {
  // demo discount giống hình (cứng)
  const subtotal = 2530;
  const discount = -253;
  const extra = -100;
  const total = 2177;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">Order Summary</h3>

      <div className="mt-4 space-y-1 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Unlimited Proxies</span>
          <span className="font-medium">Unlimited</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{selectedPlan.label.replace('Day', ' Day')}</span>
        </div>
        <div className="flex justify-between">
          <span>Bandwidth</span>
          <span>200Mbps</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-rose-500">
          <span>Discount (-10%)</span>
          <span>{discount}$</span>
        </div>
        <div className="flex justify-between text-rose-500">
          <span>Double discount offer</span>
          <span>{extra}$</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-900">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <button className="mt-4 w-full rounded-xl bg-blue-500 py-2.5 text-xs font-semibold text-white hover:bg-blue-600">
        Order Now →
      </button>

      {/* payment icons placeholder */}
      <div className="mt-4 text-center text-[10px] text-slate-400">
        We accept these payment methods:
        <div className="mt-2 flex justify-center gap-3 text-lg">
          <span>💳</span>
          <span>💳</span>
          <span>💳</span>
        </div>
      </div>
    </div>
  );
};
