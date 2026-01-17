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
    <div className="rounded-xl border-0 bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mb-4 text-[15px] font-semibold text-foreground">
        Order Summary
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Product</span>
          <span className="font-medium text-foreground">{productName ?? '—'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Traffic</span>
          <span className="font-medium text-foreground">{trafficLabel}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Price per GB</span>
          <span className="font-medium text-foreground">${formatMoney(pricePerGb)}</span>
        </div>

        <div className="mt-3 space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">${formatMoney(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-emerald-600">
            <span>Discount ({discountText} off)</span>
            <span>- ${formatMoney(discount)}</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-3 text-foreground font-bold text-base">
            <span>Total</span>
            <span>${formatMoney(total)}</span>
          </div>
        </div>

        <button className="mt-4 w-full h-10 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
          <Iconify icon="mdi:cart" width={16} />
          Order now
        </button>
      </div>

      <div className="mt-5 text-[11px] text-muted-foreground space-y-2">
        <div className="font-medium text-foreground">
          We accept these payment methods
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <div className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-1">
            <Iconify icon="logos:visa" width={18} />
            <span>Visa</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-1">
            <Iconify icon="logos:mastercard" width={18} />
            <span>MC</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-1">
            <Iconify icon="logos:paypal" width={18} />
            <span>PayPal</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-1">
            <Iconify icon="mdi:currency-btc" width={16} />
            <span>Crypto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
