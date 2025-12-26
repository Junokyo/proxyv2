// ConversionPanel.tsx
import React, { useMemo, useState } from 'react';
import Iconify from '@/components/iconify/iconify';

export type PlanKey = 'residential' | 'rotating' | 'isp' | 'datacenter';

interface ConversionPanelProps {
  selectedPlan: PlanKey;
  onChangePlan: (plan: PlanKey) => void;
}

const PLAN_CONFIG: Record<
  PlanKey,
  {
    title: string;
    subLabel: string;
    unitPrice: number;
    unitText: string;
    conversionTitle: string;
    icon: string;
  }
> = {
  residential: {
    title: 'Residential Proxies',
    subLabel: '$0.77/GB',
    unitPrice: 0.77,
    unitText: 'GB',
    conversionTitle: 'Qui Đổi Residential Proxies',
    icon: 'mdi:home-city-outline',
  },
  rotating: {
    title: 'Rotating ISP Proxies',
    subLabel: '$0.4/GB',
    unitPrice: 0.4,
    unitText: 'GB',
    conversionTitle: 'Qui Đổi Rotating ISP Proxies',
    icon: 'mdi:cached',
  },
  isp: {
    title: 'ISP Proxies',
    subLabel: '$0.17/IP/Ngày',
    unitPrice: 0.17 * 30, // 1 gói 30 ngày
    unitText: 'IP (30 Ngày)',
    conversionTitle: 'Qui Đổi ISP Proxies',
    icon: 'mdi:server-network',
  },
  datacenter: {
    title: 'Datacenter Proxies',
    subLabel: '$0.11/IP/Ngày',
    unitPrice: 0.11 * 30,
    unitText: 'IP (30 Ngày)',
    conversionTitle: 'Qui Đổi Datacenter Proxies',
    icon: 'mdi:database',
  },
};

// Các gói dung lượng mẫu
const PRESET_PACKAGES = [
  { value: 5, label: '5GB' },
  { value: 10, label: '10GB' },
  { value: 45, label: '45GB' },
  { value: 120, label: '120GB' },
  { value: 280, label: '280GB' },
  { value: 1000, label: '1000GB' },
  { value: 2000, label: '2000GB' },
  { value: 3000, label: '3000GB' },
  { value: 5000, label: '5000GB' },
];

const tabs: { key: PlanKey }[] = [
  { key: 'residential' },
  { key: 'rotating' },
  { key: 'isp' },
  { key: 'datacenter' },
];

const ConversionPanel: React.FC<ConversionPanelProps> = ({
  selectedPlan,
  onChangePlan,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const currentPlan = PLAN_CONFIG[selectedPlan];

  const exchangeAmount = useMemo(
    () => (quantity > 0 ? quantity * currentPlan.unitPrice : 0),
    [quantity, currentPlan.unitPrice],
  );

  // Xử lý click vào gói preset
  const handlePresetClick = (value: number) => {
    setQuantity(value);
    setIsCustom(false);
  };

  // Xử lý chuyển sang chế độ tùy chỉnh
  const handleCustomClick = () => {
    setIsCustom(true);
    setQuantity(1);
  };

  // Giả định số dư hiện tại
  const currentBalance = 1250.5;

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
      {/* TABS CHỌN GÓI */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {tabs.map(({ key }) => {
          const plan = PLAN_CONFIG[key];
          const active = key === selectedPlan;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChangePlan(key)}
              className={`flex flex-col rounded-xl border px-4 py-3 text-left text-sm transition
                ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    active
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <Iconify icon={plan.icon} width={18} className="flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm">{plan.title}</span>
              </div>
              <span className="mt-1 ml-6 text-xs text-slate-500">
                {plan.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* PHẦN QUI ĐỔI CHÍNH */}
      <div className="mt-4 flex flex-col lg:flex-row gap-5">
        {/* Số dư hiện tại */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col justify-between rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-6">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
              <Iconify
                icon="mdi:wallet-outline"
                width={24}
                className="text-white"
              />
            </div>
            <p className="text-sm font-medium text-slate-600">Số Dư Hiện Tại</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              ${currentBalance.toFixed(2)}
            </p>
          </div>

          <button 
            onClick={() => window.location.href = '/deposit'}
            className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition shadow-sm flex items-center justify-center gap-2"
          >
            <Iconify icon="mdi:plus-circle-outline" width={18} />
            Nạp Tiền
          </button>
        </div>

        {/* Panel qui đổi */}
        <div className="flex-1 flex flex-col rounded-lg border border-slate-200 bg-white px-6 py-6">
          {/* header */}
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
              <Iconify icon="mdi:swap-horizontal" width={24} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-slate-900">
                {currentPlan.conversionTitle}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Qui đổi trực tiếp từ ví sang gói proxy, tất cả các gói đều được hưởng 
                giá tốt nhất và có thể sử dụng ngay sau khi qui đổi thành công.
              </p>
            </div>
          </div>

          <div className="mb-4 h-px w-full bg-slate-200" />

          {/* Chọn dung lượng */}
          <div className="mb-4">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Chọn Dung Lượng Qui Đổi
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {/* Nút Custom */}
              <button
                type="button"
                onClick={handleCustomClick}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  isCustom
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                }`}
              >
                <Iconify icon="mdi:pencil-outline" width={14} className="inline mr-1" />
                Tùy Chỉnh
              </button>
              
              {/* Các gói preset */}
              {PRESET_PACKAGES.map((pkg) => (
                <button
                  key={pkg.value}
                  type="button"
                  onClick={() => handlePresetClick(pkg.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    !isCustom && quantity === pkg.value
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {pkg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input tùy chỉnh và tính toán */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 rounded-lg p-4">
            {/* Input số lượng */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Math.max(1, Number(e.target.value) || 1));
                    setIsCustom(true);
                  }}
                  className="w-20 border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                />
                <span className="ml-2 border-l border-slate-200 pl-3 text-xs text-slate-600">
                  {currentPlan.unitText}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Iconify icon="mdi:information-outline" width={16} />
                <span>Đơn giá: {currentPlan.subLabel}</span>
              </div>
            </div>

            {/* Tổng tiền và nút hành động */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col items-end justify-center px-4 py-2 bg-white rounded-lg border border-slate-200">
                <span className="text-xs text-slate-500">Tổng chi phí</span>
                <span className="text-lg font-bold text-slate-900">
                  ${exchangeAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition shadow-sm flex items-center justify-center gap-2"
              >
                <Iconify icon="mdi:check-circle-outline" width={18} />
                Qui Đổi Ngay
              </button>
            </div>
          </div>

          {/* Nút mua gói proxy */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                // Chuyển đến trang proxy tương ứng
                const routes: Record<PlanKey, string> = {
                  residential: '/residential-proxies',
                  rotating: '/rotating-isp',
                  isp: '/residential-proxies',
                  datacenter: '/residential-proxies',
                };
                window.location.href = routes[selectedPlan];
              }}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center gap-2"
            >
              <Iconify icon="mdi:shopping-outline" width={18} />
              Mua Gói {currentPlan.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionPanel;

