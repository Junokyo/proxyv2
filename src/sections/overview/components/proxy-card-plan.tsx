import Iconify from '@/components/iconify';

import { ProxyPlanCardProps } from './interface/proxy-card-plan.interface';

/**
 * Proxy Plan Card component
 * Displays proxy plan information with pricing and features
 */
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
    <div className="w-full max-w-full rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30 p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row gap-6 sm:gap-8 overflow-hidden">
      {/* LEFT: info block */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-5 min-w-0">
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute -left-4 sm:-left-6 lg:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-orange-500 rounded-full"></div>
          
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Icon with enhanced design */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
              <Iconify
                icon={icon ?? ''}
                className="text-2xl sm:text-3xl text-white"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 break-words mb-2">
                {title}
              </div>
              <p className="text-sm sm:text-base text-slate-600 break-words leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats with modern card design */}
        {stats?.length > 0 && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="flex flex-col gap-3 p-4 rounded-2xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {stat.icon && (
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-amber-50 flex-shrink-0">
                      <Iconify
                        icon={stat.icon}
                        className="text-amber-600 text-lg sm:text-xl"
                      />
                    </div>
                  )}
                  <span className="text-xs sm:text-sm text-slate-600 font-medium">
                    {stat.label}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm font-semibold text-slate-500 ml-1">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom actions with modern styling */}
        <div className="mt-auto pt-5 border-t-2 border-amber-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm text-slate-600">
            {links.map((link) => (
              <button
                key={link}
                className="flex items-center gap-1 hover:text-amber-600 transition-colors font-medium whitespace-nowrap group"
              >
                <span>{link}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  {link === 'Documentation' ? '↗' : '→'}
                </span>
              </button>
            ))}
          </div>

          <button className="inline-flex items-center justify-center rounded-xl border-2 border-amber-500 bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg">
            {primaryButtonLabel}
          </button>
        </div>
      </div>

      {/* RIGHT: price block with modern gradient */}
      <div className="w-full lg:w-auto lg:max-w-sm lg:flex-shrink-0 rounded-2xl bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 p-5 sm:p-6 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="rounded-2xl bg-white/15 backdrop-blur-sm p-4 sm:p-5 border border-white/20">
            <div className="text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
              {fromText}
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl sm:text-5xl font-bold">${price}</span>
              <span className="text-base sm:text-lg font-medium text-white/90">
                {unit}
              </span>
            </div>

            {badgeText && (
              <div className="inline-flex items-center rounded-full bg-white px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-600 shadow-lg animate-pulse">
                ⚡ {badgeText}
              </div>
            )}
          </div>

          {/* Features with checkmarks */}
          <ul className="mt-5 sm:mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-400 flex items-center justify-center mt-0.5">
                  <Iconify
                    icon="mdi:check-bold"
                    className="text-white text-sm"
                  />
                </div>
                <span className="leading-relaxed break-words text-sm sm:text-base font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button with modern design */}
        <button className="relative z-10 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-bold text-amber-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
          <Iconify icon="solar:cart-large-2-bold" className="text-lg sm:text-xl group-hover:animate-bounce" />
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}
