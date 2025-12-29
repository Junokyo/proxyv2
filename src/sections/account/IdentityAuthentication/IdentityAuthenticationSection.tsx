import React from 'react';
import { Icon } from '@iconify/react';

const IdentityAuthenticationSection: React.FC = () => {
  return (
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      {/* What is identity authentication? */}
      <section className="mb-6">
        <h2 className="text-sm md:text-base font-semibold text-slate-900">
          What is identity authentication?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 md:max-w-4xl">
          Authentication is a process designed to verify a user&apos;s identity,
          ensuring that only legitimate users can access the Services by
          submitting a valid ID and automatically reviewing it for authenticity.
          We promote trust and build a good reputation through authentication,
          creating a safer and more reliable online environment.
        </p>
        <div className="mt-4 h-px w-full bg-slate-100" />
      </section>

      {/* Start identity authentication */}
      <section className="mb-8">
        <h3 className="mb-4 text-sm md:text-base font-semibold text-slate-900">
          Start identity authentication
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Personal */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4 md:p-5">
            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Icon
                  icon="mdi:account-badge-outline"
                  className="h-6 w-6 text-blue-500"
                />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">
              Personal Authentication
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Applicable to individual users. Personal information such as ID
              cards must be provided.
            </p>
            <button className="mt-4 md:mt-6 w-full sm:w-auto rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600">
              Start personal authentication
            </button>
          </div>

          {/* Enterprise */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4 md:p-5">
            <div className="mb-4 md:mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                <Icon
                  icon="mdi:office-building-outline"
                  className="h-6 w-6 text-indigo-500"
                />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-slate-900">
              Enterprise Authentication
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Applicable to businesses or organizations. Business licenses and
              other documents must be provided to verify the legitimacy and
              operating qualifications of the business, ensuring a secure
              business environment.
            </p>
            <button className="mt-4 md:mt-6 w-full sm:w-auto rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600">
              Start enterprise authentication
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h3 className="text-sm md:text-base font-semibold text-slate-900">
          What are the benefits of completing identity authentication?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 md:max-w-3xl">
          After completing the identity authentication, you can use the full
          functions of LunaProxy:
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Benefit 1 */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Icon
                icon="mdi:lock-open-variant"
                className="h-6 w-6 text-blue-600"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              Remove the banned domain name
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Icon
                icon="mdi:shield-check-outline"
                className="h-6 w-6 text-indigo-600"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              Reduce the risk of abuse
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Icon icon="mdi:lan" className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              ISP proxy extraction usage
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="rounded-lg md:rounded-xl lg:rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
              <Icon icon="mdi:paypal" className="h-6 w-6 text-sky-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900">
              Use PayPal to pay
            </p>
          </div>
        </div>

        <p className="mt-3 text-[11px] sm:text-xs text-rose-500">
          * You need to complete identity verification before you can apply to
          unblock access to the domain name
        </p>
      </section>
    </div>
  );
};

export default IdentityAuthenticationSection;
