import Iconify from '@/components/iconify';
import { ProxyPlanCardProps } from './interface/proxy-card-plan.interface';

export function ProxyPlanCard({
  title,
  description,
  icon,
  stats,
  links = ['Automatic renewal', 'Alert settings', 'Documentation'],
  primaryButtonLabel = 'Start using',
  pricePanel,
}: ProxyPlanCardProps) {
  const {
    price,
    unit,
    badgeText,
    fromText = 'Starts from',
    features,
    buttonLabel = 'Buy Now',
  } = pricePanel;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row gap-6">
      {/* LEFT: info block */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Iconify icon={icon ?? ''} className="text-2xl text-blue-500" />
          </div>

          <div>
            <div className="text-[18px] font-semibold text-slate-900">
              {title}
            </div>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              {description}
            </p>
          </div>
        </div>

        {/* Stats */}
        {stats?.length > 0 && (
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {stat.icon && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                      <Iconify
                        icon={stat.icon}
                        className="text-indigo-500 text-lg"
                      />
                    </div>
                  )}
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>

                <div className="text-xl font-semibold text-slate-900">
                  {stat.value}{' '}
                  {stat.unit && (
                    <span className="text-xs font-semibold text-slate-500">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom actions */}
        <div className="mt-4 border-t border-slate-200 pt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {links.map((link) => (
              <button key={link} className="hover:text-slate-900">
                {link}{' '}
                <span className="ml-1">
                  {link === 'Documentation' ? '↗' : '›'}
                </span>
              </button>
            ))}
          </div>

          <button className="inline-flex items-center justify-center rounded-md border border-indigo-500 px-5 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
            {primaryButtonLabel}
          </button>
        </div>
      </div>

      {/* RIGHT: price block */}
      <div className="w-full lg:max-w-xs rounded-2xl bg-gradient-to-b from-indigo-600 to-blue-700 p-5 text-white flex flex-col justify-between">
        <div>
          <div className="rounded-xl bg-indigo-700/60 p-4">
            <div className="text-xs uppercase tracking-wide text-indigo-100/90">
              {fromText}
            </div>
            <div className="mt-1 flex items-end gap-1">
              <span className="text-3xl font-bold">${price}</span>
              <span className="text-sm font-medium text-indigo-100">
                {unit}
              </span>
            </div>

            {badgeText && (
              <div className="mt-3 inline-flex items-center rounded-full bg-yellow-300 px-3 py-[3px] text-[11px] font-semibold text-slate-900">
                {badgeText}
              </div>
            )}
          </div>

          {/* Features */}
          <ul className="mt-4 space-y-2 text-sm">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Iconify
                  icon="mdi:check"
                  className="text-emerald-300 text-base"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white/95 px-4 py-2 text-sm font-semibold text-indigo-700 shadow hover:bg-white">
          <Iconify icon="mdi:cart" className="text-base" />
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}
