// CommonPricingPage.tsx
import React from 'react';

export type PlanVariant = 'standard' | 'featured' | 'dark';

export interface PricingPlan {
  id: string;
  title: string;
  subTitle?: string; // ví dụ "500 GB", "Free trial"
  badge?: string; // "Popular", "Save 50%"
  oldPriceText?: string; // "$0.15", "$300"
  priceMain: string; // "$0.12", "$1.12"
  priceSuffix?: string; // "/GB", "/1K results"
  billedText?: string; // "$60 Billed monthly"
  ctaLabel: string; // "Order Now", "Start Free Trial"
  variant?: PlanVariant; // "featured" | "dark" | "standard"
}

export interface BottomSectionConfig {
  title: string;
  description?: string;
  buttonLabel?: string; // nếu cần nút "Contact us"
  buttonOnClick?: () => void;
  featuresColumns: string[][]; // mảng 2D: mỗi phần tử là 1 cột list
}

interface CommonPricingPageProps {
  title: string;
  subTitle: string;
  plans: PricingPlan[];
  bottomSection: BottomSectionConfig;
  paymentText?: string;
}

const CommonPricingPage: React.FC<CommonPricingPageProps> = ({
  title,
  subTitle,
  plans,
  bottomSection,
  paymentText = 'We accept these payment methods:',
}) => {
  return (
    <div className="w-full bg-slate-50 py-10 px-4 sm:px-6 lg:px-12">
      {/* heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
          {subTitle}
        </p>
      </div>

      {/* plans */}
      <div className="flex justify-center">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {plans.map((plan) => {
            const variant = plan.variant ?? 'standard';

            const baseCard =
              'flex flex-col rounded-2xl border shadow-sm min-w-[220px]';

            const variantClass =
              variant === 'dark'
                ? 'border-slate-900 bg-gradient-to-b from-slate-900 to-slate-800 text-white'
                : variant === 'featured'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-100 bg-white';

            const ctaClass =
              variant === 'dark'
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : variant === 'featured'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800';

            const priceColor =
              variant === 'dark'
                ? 'text-white'
                : variant === 'featured'
                  ? 'text-blue-600'
                  : 'text-slate-900';

            const oldPriceColor =
              variant === 'dark' ? 'text-slate-400' : 'text-slate-400';

            return (
              <div key={plan.id} className={`${baseCard} ${variantClass}`}>
                {/* content */}
                <div className="flex-1 px-6 pt-6 pb-4">
                  {plan.subTitle && (
                    <p className="text-xs text-slate-500 mb-1">
                      {plan.subTitle}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-sm font-semibold ${
                        variant === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.title}
                    </h3>
                    {plan.badge && (
                      <span className="ml-2 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-500">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="h-px w-full bg-slate-100/80 mb-4" />

                  {plan.oldPriceText && (
                    <p className={`line-through text-xs ${oldPriceColor} mb-1`}>
                      {plan.oldPriceText}
                    </p>
                  )}

                  <div className="mb-2 flex items-baseline gap-1">
                    <span
                      className={`text-2xl font-semibold leading-none ${priceColor}`}
                    >
                      {plan.priceMain}
                    </span>
                    {plan.priceSuffix && (
                      <span
                        className={`text-xs font-medium ${
                          variant === 'dark'
                            ? 'text-slate-200'
                            : 'text-slate-500'
                        }`}
                      >
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>

                  {plan.billedText && (
                    <p
                      className={`text-[11px] ${
                        variant === 'dark' ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.billedText}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`w-full rounded-b-2xl px-6 py-3 text-xs font-semibold ${ctaClass}`}
                >
                  {plan.ctaLabel} →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* bottom benefits / enterprise */}
      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-5xl rounded-2xl border border-slate-100 bg-white px-6 py-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* left */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                {bottomSection.title}
              </h3>
              {bottomSection.description && (
                <p className="text-xs sm:text-sm text-slate-600">
                  {bottomSection.description}
                </p>
              )}
              {bottomSection.buttonLabel && (
                <button
                  onClick={bottomSection.buttonOnClick}
                  className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
                >
                  {bottomSection.buttonLabel}
                </button>
              )}
            </div>

            {/* right – feature columns */}
            <div className="grid gap-4 sm:grid-cols-2">
              {bottomSection.featuresColumns.map((col, idx) => (
                <ul key={idx} className="space-y-2 text-xs sm:text-sm">
                  {col.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[3px] h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* payment methods */}
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-3xl rounded-xl border border-slate-100 bg-white px-4 py-3 text-xs sm:text-sm text-slate-600 flex items-center justify-between">
          <span>{paymentText}</span>
          {/* chỗ này cậu có thể thay bằng icon thực */}
          <div className="flex items-center gap-2 text-slate-400 text-[10px] sm:text-xs">
            VISA • MasterCard • AmEx • JCB • PayPal
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPricingPage;
