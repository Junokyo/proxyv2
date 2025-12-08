import Iconify from '@/components/iconify';

type OrderSummaryProps = {
  productName?: string;
  trafficGb?: number;
  planLabel?: string;
  pricePerGb?: number;
  subtotal?: number;
  discount?: number;
  discountPercent?: number; // 0.76 = 76%
  total?: number;
};

function formatMoney(value?: number) {
  return (value ?? 0).toFixed(2);
}

export function OrderSummary({
  productName,
  trafficGb,
  planLabel,
  pricePerGb,
  subtotal,
  discount,
  discountPercent,
  total,
}: OrderSummaryProps) {
  // nếu trafficGb có → hiển thị "xxx GB", còn không thì lấy label
  const trafficLabel = trafficGb
    ? `${trafficGb.toLocaleString()} GB`
    : (planLabel ?? '—');

  const discountText = `${Math.round((discountPercent ?? 0) * 100)}%`;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 text-sm font-semibold text-slate-900">
        Order Summary
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span>Product</span>
          <span className="font-medium">{productName ?? '—'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Traffic</span>
          <span className="font-medium">{trafficLabel}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Price per GB</span>
          <span className="font-medium">${formatMoney(pricePerGb)}</span>
        </div>

        <div className="mt-2 space-y-1 border-t border-slate-200 pt-2">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium">${formatMoney(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-emerald-600">
            <span>Discount ({discountText} off)</span>
            <span>- ${formatMoney(discount)}</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-dashed border-slate-200 pt-1 text-slate-900 font-semibold">
            <span>Total</span>
            <span>${formatMoney(total)}</span>
          </div>
        </div>

        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          <Iconify icon="mdi:cart" width={16} />
          Order now
        </button>
      </div>

      <div className="mt-4 text-[11px] text-slate-500 space-y-2">
        <div className="font-medium text-slate-700">
          We accept these payment methods
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
            <Iconify icon="logos:visa" width={20} />
            <span>Visa</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
            <Iconify icon="logos:mastercard" width={20} />
            <span>Mastercard</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
            <Iconify icon="logos:paypal" width={20} />
            <span>PayPal</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
            <Iconify icon="mdi:currency-btc" width={18} />
            <span>Crypto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
