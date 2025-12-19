import React, { useState } from 'react';
import { useKC } from '@/auth/providers/keycloak.provider';
import { AvatarInput } from '@/partials/common/avatar-input';
import AccountSettingsSection from './AccountSettingSection';

const GeneralSection: React.FC = () => {
  const { user } = useKC();
  const [autoRenew, setAutoRenew] = useState(true);

  // TODO: Thay các giá trị mock này bằng dữ liệu thực từ API khi có
  const createdAt = '2024-01-01 10:00';
  const status: 'Active' | 'Suspended' = 'Active';

  const bandwidthUsed = '120 GB';
  const bandwidthTotal = '500 GB';
  const proxiesActive = 12;
  const currentPlan = 'Residential Proxies - Basic';
  const planExpireAt = '2025-12-31';

  const billingPlan = currentPlan;
  const renewAt = '2025-01-15';

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'User';

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-2">
          {/* Left column: Account info + status */}
          <div className="col-span-1">
            <div className="grid gap-5 lg:gap-7.5">
              {/* Personal info (summary) */}
              <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Personal info
                  </h2>
                </div>

                {/* Avatar + Basic info */}
                <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <AvatarInput />
                  <div className="space-y-1 text-sm text-slate-700">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Name</span>
                      <span className="font-medium text-slate-900">
                        {displayName}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">Email</span>
                      <span className="truncate font-medium text-slate-900 max-w-[220px] sm:max-w-xs">
                        {user?.email ?? '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extra condensed rows giống table summary */}
                <div className="space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">User ID</span>
                    <span className="font-medium text-slate-900">
                      {user?.id ?? '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Basic settings kiểu AccountUserProfile.BasicSettings */}
              <AccountSettingsSection />

              {/* Trạng thái tài khoản */}
              <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Account status
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                        : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Created at</span>
                    <span className="font-medium text-slate-900">
                      {createdAt}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Current status</span>
                    <span className="font-medium text-slate-900">
                      {status === 'Active' ? 'Account is active' : 'Suspended'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Usage summary + Billing/Subscription */}
          <div className="col-span-1">
            <div className="grid gap-5 lg:gap-7.5">
              {/* Thống kê sử dụng (summary, không chart) */}
              <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-slate-900">
                  Usage summary
                </h2>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">
                      Bandwidth used / remaining
                    </span>
                    <span className="font-medium text-slate-900">
                      {bandwidthUsed} / {bandwidthTotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Active proxies</span>
                    <span className="font-medium text-slate-900">
                      {proxiesActive}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Current plan</span>
                    <span className="font-medium text-slate-900">
                      {currentPlan}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Expire at</span>
                    <span className="font-medium text-slate-900">
                      {planExpireAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Billing / Subscription */}
              <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Billing &amp; Subscription
                  </h2>

                  {/* Auto-renew switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoRenew}
                    onClick={() => setAutoRenew((v) => !v)}
                    className={`flex h-6 w-11 items-center rounded-full transition ${
                      autoRenew ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
                        autoRenew ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Current plan</span>
                    <span className="font-medium text-slate-900">
                      {billingPlan}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Next renewal date</span>
                    <span className="font-medium text-slate-900">
                      {renewAt}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Auto-renew</span>
                    <span className="font-medium text-slate-900">
                      {autoRenew ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
