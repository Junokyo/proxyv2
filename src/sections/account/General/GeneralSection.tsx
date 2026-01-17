import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useKC } from '@/auth/providers/keycloak.provider';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useUser } from '@/graphql/hooks/users/use-users';
import AccountSettingsSection from './AccountSettingSection';

// Format số tiền VNĐ
const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

// Mock data cho proxy packages (sau này sẽ thay bằng API)
const MOCK_PROXY_PACKAGES = [
  {
    id: '1',
    name: 'Residential Proxies',
    type: 'residential',
    bandwidth: '120 GB',
    totalBandwidth: '500 GB',
    usagePercent: 24,
    expireAt: '2025-12-31',
    status: 'active',
    icon: 'mdi:earth',
    color: 'blue',
  },
  {
    id: '2',
    name: 'Datacenter Proxies',
    type: 'datacenter',
    bandwidth: '45 GB',
    totalBandwidth: '100 GB',
    usagePercent: 45,
    expireAt: '2025-06-30',
    status: 'active',
    icon: 'mdi:server',
    color: 'purple',
  },
  {
    id: '3',
    name: 'Mobile Proxies',
    type: 'mobile',
    bandwidth: '8 GB',
    totalBandwidth: '50 GB',
    usagePercent: 16,
    expireAt: '2025-03-15',
    status: 'expiring',
    icon: 'mdi:cellphone',
    color: 'orange',
  },
];

const GeneralSection: React.FC = () => {
  const { user } = useKC();
  const navigate = useNavigate();
  const [autoRenew, setAutoRenew] = useState(true);

  // Fetch user data with balance
  const { data: userData, loading: userLoading } = useUser(user?.id ?? '', !user?.id);
  const userBalance = userData?.user?.balance ?? 0;

  // TODO: Thay các giá trị mock này bằng dữ liệu thực từ API khi có
  const createdAt = '2024-01-01 10:00';
  const status: 'Active' | 'Suspended' = 'Active';

  const totalBandwidthUsed = 173; // GB
  const totalBandwidthLimit = 650; // GB
  const bandwidthPercent = Math.round((totalBandwidthUsed / totalBandwidthLimit) * 100);
  const proxiesActive = 12;
  const totalRequests = '1.2M';
  const successRate = '99.8%';

  const billingPlan = 'Premium Package';
  const renewAt = '2025-01-15';

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'User';

  return (
    <div className="w-full">
      {/* Top Stats Cards - 4 columns */}
      <div className="mb-4 md:mb-5 lg:mb-6 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {/* Total Traffic Used */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Icon icon="mdi:chart-line-variant" className="h-5 w-5 text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Total Traffic Used</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {totalBandwidthUsed.toFixed(2)} <span className="text-sm font-medium text-slate-400">GB</span>
            </p>
          </div>
        </div>

        {/* Traffic Available */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50">
            <Icon icon="mdi:database" className="h-5 w-5 text-teal-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Traffic Available</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {(totalBandwidthLimit - totalBandwidthUsed).toFixed(2)} <span className="text-sm font-medium text-slate-400">GB</span>
            </p>
          </div>
        </div>

        {/* Active Sub-accounts */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50">
            <Icon icon="mdi:account-group" className="h-5 w-5 text-orange-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Active Sub-accounts</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">{proxiesActive}</p>
          </div>
        </div>

        {/* Số dư */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-50">
            <Icon icon="mdi:wallet" className="h-5 w-5 text-violet-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Số dư</p>
            <p className="mt-0.5 text-lg font-bold text-slate-900">
              {userLoading ? (
                <span className="inline-block h-5 w-20 animate-pulse rounded bg-slate-100" />
              ) : (
                <>{formatVND(userBalance)}<span className="text-sm font-medium text-slate-400">₫</span></>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 lg:grid-cols-2">
        {/* Left column: Account info + status */}
        <div className="col-span-1 space-y-4 md:space-y-5 lg:space-y-6">
          {/* Personal info (summary) */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-3 shadow-sm sm:p-4 md:p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-900 md:text-base">
              Thông tin cá nhân
            </h2>

            {/* Avatar + Basic info - Compact layout */}
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
              <div className="shrink-0">
                <AvatarInput />
              </div>
              <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-2">
                <div>
                  <div className="mb-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                    Tên
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

          {/* Basic settings */}
          <AccountSettingsSection />

          {/* Trạng thái tài khoản */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Trạng thái tài khoản
              </h2>
              <span
                className={`inline-flex items-center self-start rounded-full px-2.5 py-0.5 text-xs font-medium sm:self-auto ${
                  status === 'Active'
                    ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                    : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100'
                }`}
              >
                {status === 'Active' ? 'Đang hoạt động' : 'Tạm ngưng'}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Ngày tạo
                </span>
                <span className="break-words text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {createdAt}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs sm:text-sm text-slate-500">
                  Trạng thái hiện tại
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-900 sm:text-right">
                  {status === 'Active' ? 'Tài khoản đang hoạt động' : 'Tạm ngưng'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Proxy Packages + Billing */}
        <div className="col-span-1 space-y-4 md:space-y-5 lg:space-y-6">
          {/* Proxy Packages */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6 border border-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                  <Icon icon="mdi:package-variant" className="h-4 w-4 text-slate-600" />
                </div>
                <h2 className="text-sm md:text-base font-semibold text-slate-900">
                  Các gói Proxy
                </h2>
              </div>
              <button
                onClick={() => navigate('/residential-proxies')}
                className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                <Icon icon="mdi:plus" className="h-3.5 w-3.5" />
                Mua thêm
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_PROXY_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-xl border p-4 transition-colors cursor-pointer ${
                    pkg.status === 'expiring'
                      ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          pkg.color === 'blue'
                            ? 'bg-blue-100 text-blue-600'
                            : pkg.color === 'purple'
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        <Icon icon={pkg.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{pkg.name}</p>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                          <Icon icon="mdi:calendar-clock" className="h-3.5 w-3.5" />
                          <span>Hết hạn: {pkg.expireAt}</span>
                        </div>
                      </div>
                    </div>
                    {pkg.status === 'expiring' && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-medium text-white">
                        <Icon icon="mdi:alert-circle" className="h-3 w-3" />
                        Sắp hết hạn
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Đã dùng: <span className="font-medium text-slate-700">{pkg.bandwidth}</span> / {pkg.totalBandwidth}
                      </span>
                      <span className={`font-semibold ${
                        pkg.usagePercent > 80
                          ? 'text-red-500'
                          : pkg.usagePercent > 50
                            ? 'text-amber-500'
                            : 'text-slate-600'
                      }`}>
                        {pkg.usagePercent}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          pkg.color === 'blue'
                            ? 'bg-blue-500'
                            : pkg.color === 'purple'
                              ? 'bg-purple-500'
                              : 'bg-orange-500'
                        }`}
                        style={{ width: `${pkg.usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing / Subscription */}
          <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6 border border-slate-100">
            {/* Header with icon */}
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                <Icon icon="mdi:credit-card-outline" className="h-4 w-4 text-slate-600" />
              </div>
              <h2 className="text-sm md:text-base font-semibold text-slate-900">
                Thanh toán & Gói dịch vụ
              </h2>
            </div>

            {/* Auto-renew toggle */}
            <div className={`mb-4 rounded-lg p-3 transition-colors ${
              autoRenew
                ? 'bg-emerald-50 border border-emerald-100'
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Icon
                    icon={autoRenew ? "mdi:refresh-auto" : "mdi:refresh"}
                    className={`h-5 w-5 ${autoRenew ? 'text-emerald-600' : 'text-slate-400'}`}
                  />
                  <div>
                    <p className={`text-xs font-medium ${autoRenew ? 'text-emerald-700' : 'text-slate-600'}`}>
                      Tự động gia hạn
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {autoRenew ? 'Gói dịch vụ sẽ tự động gia hạn' : 'Gia hạn thủ công khi hết hạn'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoRenew}
                  onClick={() => setAutoRenew((v) => !v)}
                  className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                    autoRenew ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      autoRenew ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs sm:text-sm text-slate-500">Gói hiện tại</span>
                <span className="text-xs sm:text-sm font-medium text-slate-900">
                  {billingPlan}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs sm:text-sm text-slate-500">Ngày gia hạn tiếp theo</span>
                <span className="text-xs sm:text-sm font-medium text-slate-900">
                  {renewAt}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-xs sm:text-sm text-slate-500">Trạng thái</span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Đang hoạt động
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigate('/billing')}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Xem chi tiết thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
