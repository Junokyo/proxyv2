type ProxyPlanCardProps = {
  title?: string;
};

export function ProxyPlanCard({
  title = 'Residential Proxies',
}: ProxyPlanCardProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row gap-6">
      {/* LEFT: info block */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            {/* icon tạm thời, sau thay bằng SVG */}
            <span className="text-2xl">🏠</span>
          </div>

          <div>
            <div className="text-[18px] font-semibold text-slate-900">
              {title}
            </div>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Discover over 200M+ ethically sourced residential IPs for seamless
              human-like crawling. Access local public data effortlessly and
              without barriers.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-8">
          {/* Remaining traffic */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                <span className="text-indigo-500 text-lg">📈</span>
              </div>
              <span className="text-sm text-slate-500">Remaining traffic</span>
            </div>

            <div className="text-2xl font-semibold text-slate-900">
              0.00{' '}
              <span className="text-sm font-semibold text-slate-500">GB</span>
            </div>
          </div>

          {/* Expiration time */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                <span className="text-indigo-500 text-lg">⏱️</span>
              </div>
              <span className="text-sm text-slate-500">Expiration time</span>
            </div>

            <div className="text-2xl font-semibold text-slate-900">--</div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-6 border-t border-slate-200 pt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <button className="hover:text-slate-900">
              Automatic renewal <span className="ml-1">›</span>
            </button>
            <button className="hover:text-slate-900">
              Alert settings <span className="ml-1">›</span>
            </button>
            <button className="hover:text-slate-900">
              Documentation <span className="ml-1">↗</span>
            </button>
          </div>

          <button className="inline-flex items-center justify-center rounded-md border border-indigo-500 px-5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
            Start using
          </button>
        </div>
      </div>

      {/* RIGHT: price block */}
      <div className="w-full lg:max-w-xs rounded-2xl bg-gradient-to-b from-indigo-600 to-blue-700 p-5 text-white flex flex-col justify-between">
        {/* Price header */}
        <div>
          <div className="rounded-xl bg-indigo-700/60 p-4">
            <div className="text-xs uppercase tracking-wide text-indigo-100/90">
              Starts from
            </div>
            <div className="mt-1 flex items-end gap-1">
              <span className="text-3xl font-bold">$0.65</span>
              <span className="text-sm font-medium text-indigo-100">/GB</span>
            </div>

            <div className="mt-3 inline-flex items-center rounded-full bg-yellow-300 px-3 py-[3px] text-[11px] font-semibold text-slate-900">
              83% OFF
            </div>
          </div>

          {/* Features */}
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-emerald-300">✓</span>
              <span>HTTP/HTTPS/SOCKS5 protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-emerald-300">✓</span>
              <span>Unused GBs roll over</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-emerald-300">✓</span>
              <span>99.9% fast response time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px] text-emerald-300">✓</span>
              <span>Country and city-level targeting</span>
            </li>
          </ul>
        </div>

        {/* CTA button */}
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white/95 px-4 py-2 text-sm font-semibold text-indigo-700 shadow hover:bg-white">
          <span className="text-base">🛒</span>
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
