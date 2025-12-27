import React, { useState } from 'react';
import Iconify from '@/components/iconify/iconify';

type PlanKey = 'residential' | 'unlimited' | 'isp' | 'datacenter' | 'rotating';

const PLANS: { key: PlanKey; label: string; icon: string }[] = [
  { key: 'residential', label: 'Residential Proxies', icon: 'mdi:home-city-outline' },
  { key: 'unlimited', label: 'Unlimited Proxies', icon: 'mdi:infinity' },
  { key: 'rotating', label: 'Rotating ISP Proxies', icon: 'mdi:cached' },
  { key: 'isp', label: 'ISP Proxies', icon: 'mdi:server-network' },
  { key: 'datacenter', label: 'Datacenter Proxies', icon: 'mdi:database' },
];

const TRAFFIC_OPTIONS = [
  {
    id: 'custom',
    label: '+ Tùy Chỉnh Dung Lượng',
    unitPrice: '--',
    totalPrice: '--',
  },
  { id: '5', label: '5GB', unitPrice: '$0.77/GB', totalPrice: '$3.85' },
  { id: '10', label: '10GB', unitPrice: '$0.77/GB', totalPrice: '$7.7' },
  { id: '45', label: '45GB', unitPrice: '$0.77/GB', totalPrice: '$34.65' },
  { id: '120', label: '120GB', unitPrice: '$0.77/GB', totalPrice: '$92.4' },
  { id: '280', label: '280GB', unitPrice: '$0.77/GB', totalPrice: '$215.6' },
  { id: '1000', label: '1000GB', unitPrice: '$0.77/GB', totalPrice: '$770' },
  { id: '2000', label: '2000GB', unitPrice: '$0.77/GB', totalPrice: '$1540' },
  { id: '3000', label: '3000GB', unitPrice: '$0.77/GB', totalPrice: '$2310' },
  { id: '5000', label: '5000GB', unitPrice: '$0.77/GB', totalPrice: '$3850' },
];

const AutomaticRenewalSection: React.FC = () => {
  const [autoRenew, setAutoRenew] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanKey>('residential');
  const [duration, setDuration] = useState('30');
  const [selectedTraffic, setSelectedTraffic] = useState<string>('5');
  const [leftGb, setLeftGb] = useState('1');
  const [beforeDays, setBeforeDays] = useState('1');

  return (
    <div className="w-full rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-sm max-w-full overflow-hidden">
      {/* Header + toggle */}
      <div className="mb-3 sm:mb-4 md:mb-6 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-green-50 flex-shrink-0">
              <Iconify icon="mdi:autorenew" width={18} className="text-green-600 sm:w-5 lg:w-6" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-semibold text-slate-900 block">
                Gia Hạn Tự Động
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5 sm:mt-1">
                Tự động gia hạn gói proxy khi sắp hết
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs sm:text-sm text-slate-600 sm:hidden">
              {autoRenew ? 'Bật' : 'Tắt'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={autoRenew}
              onClick={() => setAutoRenew((v) => !v)}
              className={`flex h-6 sm:h-7 w-11 sm:w-12 lg:w-14 items-center rounded-full transition shadow-sm
                ${autoRenew ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <span
                className={`h-5 sm:h-6 w-5 sm:w-6 transform rounded-full bg-white shadow transition
                  ${autoRenew ? 'translate-x-5 sm:translate-x-6 lg:translate-x-7' : 'translate-x-0.5'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-4 sm:mb-5 h-px w-full bg-slate-200" />

      {/* Tabs */}
      <div className="mb-3 sm:mb-4 md:mb-5">
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold text-slate-700">Chọn Loại Gói</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {PLANS.map((plan) => {
            const active = plan.key === activePlan;
            return (
              <button
                key={plan.key}
                type="button"
                onClick={() => setActivePlan(plan.key)}
                className={`whitespace-nowrap rounded-lg px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-[10px] sm:text-xs font-medium transition flex items-center justify-center gap-1 sm:gap-1.5 min-w-0
                  ${
                    active
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <Iconify icon={plan.icon} width={12} className="sm:w-3.5 flex-shrink-0" />
                <span className="truncate text-[10px] sm:text-xs">{plan.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className="font-medium text-slate-700 whitespace-nowrap">Thời hạn:</span>
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full sm:w-auto h-9 sm:h-10 rounded-lg border border-slate-200 bg-white pl-2 sm:pl-3 pr-8 sm:pr-10 text-xs sm:text-sm text-slate-700 outline-none hover:border-blue-400 transition appearance-none cursor-pointer"
          >
            <option value="30">30 Ngày</option>
            <option value="60">60 Ngày</option>
            <option value="90">90 Ngày</option>
            <option value="180">180 Ngày</option>
            <option value="365">365 Ngày</option>
          </select>
          <Iconify
            icon="mdi:chevron-down"
            width={12}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none sm:w-3.5"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-100 -mx-2 sm:-mx-1">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="w-6 sm:w-8 px-1 sm:px-2 py-1.5 sm:py-2" />
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 font-medium whitespace-nowrap min-w-[70px] sm:min-w-[80px] text-[10px] sm:text-xs">Dung Lượng</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 font-medium whitespace-nowrap min-w-[60px] sm:min-w-[70px] text-[10px] sm:text-xs">Đơn Giá</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 font-medium whitespace-nowrap min-w-[60px] sm:min-w-[70px] text-[10px] sm:text-xs">Tổng Tiền</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 divide-y divide-slate-100">
            {TRAFFIC_OPTIONS.map((row, idx) => (
              <tr
                key={row.id}
                className={`hover:bg-slate-50 transition ${
                  selectedTraffic === row.id ? 'bg-blue-50/30' : ''
                }`}
              >
                <td className="px-1 sm:px-2 py-1.5 sm:py-2 align-middle">
                  <input
                    type="radio"
                    name="traffic"
                    checked={selectedTraffic === row.id}
                    onChange={() => setSelectedTraffic(row.id)}
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5 accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-1 sm:px-2 py-1.5 sm:py-2 align-middle">
                  <span className={`text-[9px] sm:text-xs lg:text-sm ${row.id === 'custom' ? 'font-semibold text-blue-600' : ''}`}>
                    {row.label}
                  </span>
                </td>
                <td className="px-1 sm:px-2 py-1.5 sm:py-2 align-middle text-[9px] sm:text-xs lg:text-sm">
                  {row.unitPrice}
                </td>
                <td className="px-1 sm:px-2 py-1.5 sm:py-2 align-middle font-medium text-[9px] sm:text-xs lg:text-sm">
                  {row.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional settings */}
      <div className="mt-3 sm:mt-4 md:mt-6 space-y-3 sm:space-y-4 rounded-lg bg-slate-50 p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <Iconify icon="mdi:cog-outline" width={14} className="text-slate-500 mt-0.5 flex-shrink-0 sm:w-4" />
          <span className="font-semibold text-xs sm:text-sm text-slate-800">
            Cài Đặt Bổ Sung:
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
            <span className="whitespace-nowrap">Tự động gia hạn khi còn</span>
            <input
              type="number"
              min={0}
              value={leftGb}
              onChange={(e) => setLeftGb(e.target.value)}
              className="h-8 sm:h-9 w-14 sm:w-16 rounded-lg border border-slate-300 bg-white px-2 text-xs sm:text-sm text-center font-medium outline-none focus:border-blue-400 transition"
            />
            <span className="flex-1 text-[10px] sm:text-xs">
              GB. <span className="text-slate-500">(Ví sẽ tự động thêm dung lượng khi còn ít)</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700">
            <span className="whitespace-nowrap">Tự động gia hạn trước</span>
            <input
              type="number"
              min={0}
              value={beforeDays}
              onChange={(e) => setBeforeDays(e.target.value)}
              className="h-8 sm:h-9 w-14 sm:w-16 rounded-lg border border-slate-300 bg-white px-2 text-xs sm:text-sm text-center font-medium outline-none focus:border-blue-400 transition"
            />
            <span className="flex-1 text-[10px] sm:text-xs">
              ngày trước khi hết hạn. <span className="text-slate-500">(Mặc định 1 ngày)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition shadow-sm flex items-center justify-center gap-1.5 sm:gap-2">
          <Iconify icon="mdi:content-save-outline" width={14} className="sm:w-4" />
          Lưu Cài Đặt
        </button>
        <button className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center gap-1.5 sm:gap-2">
          <Iconify icon="mdi:restart" width={14} className="sm:w-4" />
          Khôi Phục Mặc Định
        </button>
      </div>

      {/* Info box */}
      <div className="mt-3 sm:mt-4 md:mt-6 flex items-start gap-2 sm:gap-3 rounded-lg bg-blue-50 p-3 sm:p-4 border border-blue-100">
        <Iconify icon="mdi:information-outline" width={16} className="text-blue-600 flex-shrink-0 mt-0.5 sm:w-[18px]" />
        <div className="text-xs sm:text-sm text-blue-900 min-w-0">
          <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
          <ul className="space-y-0.5 sm:space-y-1 text-blue-800 list-disc list-inside text-[10px] sm:text-xs">
            <li>Đảm bảo số dư trong ví đủ để tự động gia hạn</li>
            <li>Hệ thống sẽ gửi thông báo trước khi thực hiện gia hạn</li>
            <li>Bạn có thể tắt tính năng này bất cứ lúc nào</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutomaticRenewalSection;

