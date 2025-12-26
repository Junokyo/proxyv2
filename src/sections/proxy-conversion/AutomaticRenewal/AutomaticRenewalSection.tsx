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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header + toggle */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
            <Iconify icon="mdi:autorenew" width={24} className="text-green-600" />
          </div>
          <div>
            <span className="text-base font-semibold text-slate-900 block">
              Gia Hạn Tự Động
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Tự động gia hạn gói proxy khi sắp hết hạn hoặc dung lượng
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={autoRenew}
          onClick={() => setAutoRenew((v) => !v)}
          className={`flex h-7 w-14 items-center rounded-full transition shadow-sm
            ${autoRenew ? 'bg-green-500' : 'bg-slate-300'}`}
        >
          <span
            className={`h-6 w-6 transform rounded-full bg-white shadow transition 
              ${autoRenew ? 'translate-x-7' : 'translate-x-0.5'}`}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="mb-5 h-px w-full bg-slate-200" />

      {/* Tabs */}
      <div className="mb-5">
        <p className="mb-3 text-sm font-semibold text-slate-700">Chọn Loại Gói</p>
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full gap-2 pb-2">
            {PLANS.map((plan) => {
              const active = plan.key === activePlan;
              return (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setActivePlan(plan.key)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium transition flex items-center gap-2
                    ${
                      active
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Iconify icon={plan.icon} width={16} />
                  {plan.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
        <span className="font-medium text-slate-700">Thời hạn:</span>
        <div className="relative">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-700 outline-none hover:border-blue-400 transition appearance-none cursor-pointer"
          >
            <option value="30">30 Ngày</option>
            <option value="60">60 Ngày</option>
            <option value="90">90 Ngày</option>
            <option value="180">180 Ngày</option>
            <option value="365">365 Ngày</option>
          </select>
          <Iconify 
            icon="mdi:chevron-down" 
            width={16} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="w-12 px-4 py-3" />
              <th className="px-4 py-3 font-medium">Dung Lượng</th>
              <th className="px-4 py-3 font-medium">Đơn Giá</th>
              <th className="px-4 py-3 font-medium">Tổng Tiền</th>
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
                <td className="px-4 py-3 align-middle">
                  <input
                    type="radio"
                    name="traffic"
                    checked={selectedTraffic === row.id}
                    onChange={() => setSelectedTraffic(row.id)}
                    className="h-4 w-4 accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 align-middle">
                  <span className={`${row.id === 'custom' ? 'font-semibold text-blue-600' : ''}`}>
                    {row.label}
                  </span>
                </td>
                <td className="px-4 py-3 align-middle">
                  {row.unitPrice}
                </td>
                <td className="px-4 py-3 align-middle font-medium">
                  {row.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional settings */}
      <div className="mt-6 space-y-4 rounded-lg bg-slate-50 p-4">
        <div className="flex items-start gap-2">
          <Iconify icon="mdi:cog-outline" width={18} className="text-slate-500 mt-0.5" />
          <span className="font-semibold text-sm text-slate-800">
            Cài Đặt Bổ Sung:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-700">
          <span>Tự động gia hạn khi còn</span>
          <input
            type="number"
            min={0}
            value={leftGb}
            onChange={(e) => setLeftGb(e.target.value)}
            className="h-9 w-16 rounded-lg border border-slate-300 bg-white px-2 text-sm text-center font-medium outline-none focus:border-blue-400 transition"
          />
          <span>
            GB. <span className="text-slate-500">(Ví sẽ tự động thêm dung lượng khi còn ít dung lượng, ngay cả trước ngày hết hạn)</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-700">
          <span>Tự động gia hạn trước</span>
          <input
            type="number"
            min={0}
            value={beforeDays}
            onChange={(e) => setBeforeDays(e.target.value)}
            className="h-9 w-16 rounded-lg border border-slate-300 bg-white px-2 text-sm text-center font-medium outline-none focus:border-blue-400 transition"
          />
          <span>
            ngày trước khi hết hạn. <span className="text-slate-500">(Mặc định hệ thống sẽ gia hạn trước 1 ngày)</span>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition shadow-sm flex items-center gap-2">
          <Iconify icon="mdi:content-save-outline" width={18} />
          Lưu Cài Đặt
        </button>
        <button className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-2">
          <Iconify icon="mdi:restart" width={18} />
          Khôi Phục Mặc Định
        </button>
      </div>

      {/* Info box */}
      <div className="mt-6 flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-100">
        <Iconify icon="mdi:information-outline" width={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-blue-900">
          <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
          <ul className="space-y-1 text-blue-800 list-disc list-inside">
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

