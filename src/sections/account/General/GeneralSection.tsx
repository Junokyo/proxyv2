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
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 lg:grid-cols-2">
        {/* Left column: Account info + status */}
        <div className="col-span-1 space-y-4 md:space-y-5 lg:space-y-6">
          {/* Personal info (summary) */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-3 shadow-sm sm:p-4 md:p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 md:text-base">
              Personal info
            </h2>

            {/* Avatar + Basic info - Compact layout */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
              <div className="shrink-0">
                <AvatarInput />
              </div>
              <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-2">
                <div>
                  <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                    Name
                  </div>
                  <div className="text-sm font-medium text-slate-900 break-words sm:text-base">
                    {displayName}
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                    Email
                  </div>
                  <div className="text-sm font-medium text-slate-900 break-words sm:text-base md:truncate md:max-w-xs">
                    {user?.email ?? '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* User ID - Compact row */}
            <div className="border-t border-slate-100 pt-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
                  User ID
                </span>
                <span className="break-all text-right text-xs font-medium text-slate-900 sm:text-sm">
                  {user?.id ?? '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Basic settings kiểu AccountUserProfile.BasicSettings */}
          <AccountSettingsSection />

          {/* Trạng thái tài khoản */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Account status
              </h2>
              <span
                className={`inline-flex items-center self-start rounded-full px-2.5 py-0.5 text-xs font-medium sm:self-auto ${
                  status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                    : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                }`}
              >
                {status}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Created at
                </span>
                <span className="break-words text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {createdAt}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Current status
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {status === 'Active' ? 'Account is active' : 'Suspended'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Usage summary + Billing/Subscription */}
        <div className="col-span-1 space-y-4 md:space-y-5 lg:space-y-6">
          {/* Thống kê sử dụng (summary, không chart) */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
            <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900">
              Usage summary
            </h2>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Bandwidth used / remaining
                </span>
                <span className="whitespace-nowrap text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {bandwidthUsed} / {bandwidthTotal}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Active proxies
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {proxiesActive}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Current plan
                </span>
                <span className="break-words text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {currentPlan}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Expire at
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {planExpireAt}
                </span>
              </div>
            </div>
          </div>

          {/* Billing / Subscription */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Billing &amp; Subscription
              </h2>

              {/* Auto-renew switch */}
              <button
                type="button"
                role="switch"
                aria-checked={autoRenew}
                onClick={() => setAutoRenew((v) => !v)}
                className={`flex h-6 w-11 shrink-0 self-start items-center rounded-full transition sm:self-auto ${
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
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Current plan
                </span>
                <span className="break-words text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {billingPlan}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Next renewal date
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {renewAt}
                </span>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Auto-renew
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {autoRenew ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
