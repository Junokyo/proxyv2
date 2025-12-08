type ProxyCardProps = {
  title: string;
  price: string;
  unit: string;
};

export function ProxyTabCard({ title, price, unit }: ProxyCardProps) {
  return (
    <div className="inline-flex flex-col min-w-[200px] p-4">
      {/* Icon box */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
        {/* icon tạm dùng emoji, sau bạn thay bằng SVG */}
        <span className="text-xl text-blue-500">🌐</span>
      </div>

      {/* Title */}
      <div className="mt-3 text-[16px] font-semibold leading-snug text-slate-900">
        {title}
      </div>

      {/* Price line */}
      <div className="mt-1 text-sm leading-snug text-slate-500">
        From <span className="font-semibold text-slate-900">{price}</span>
        {unit}
      </div>
    </div>
  );
}
