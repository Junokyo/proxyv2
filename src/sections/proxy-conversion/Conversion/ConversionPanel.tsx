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
    <div className="space-y-3 sm:space-y-4 rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-sm max-w-full overflow-hidden">
      {/* TABS CHỌN GÓI */}
      <div className="grid gap-1.5 sm:gap-2 md:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {tabs.map(({ key }) => {
          const plan = PLAN_CONFIG[key];
          const active = key === selectedPlan;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChangePlan(key)}
              className={`flex flex-col rounded-lg sm:rounded-xl border px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 text-left text-xs sm:text-sm transition min-w-0
                ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                }`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 min-w-0">
                <span
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    active
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                  )}
                </span>
                <Iconify icon={plan.icon} width={12} className="flex-shrink-0 sm:w-3.5 lg:w-[18px]" />
                <span className="font-medium text-[10px] sm:text-xs lg:text-sm truncate min-w-0">{plan.title}</span>
              </div>
              <span className="mt-0.5 sm:mt-1 ml-4 sm:ml-5 lg:ml-6 text-[9px] sm:text-xs text-slate-500 truncate">
                {plan.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* PHẦN QUI ĐỔI CHÍNH */}
      <div className="mt-3 sm:mt-4 flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5">
        {/* Số dư hiện tại */}
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col justify-between rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          <div>
            <div className="mb-2 sm:mb-3 lg:mb-4 flex h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg">
              <Iconify
                icon="mdi:wallet-outline"
                width={18}
                className="text-white sm:w-5 lg:w-6"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600">Số Dư Hiện Tại</p>
            <p className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
              ${currentBalance.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/deposit'}
            className="mt-3 sm:mt-4 lg:mt-6 w-full rounded-lg bg-blue-500 px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-blue-600 transition shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2"
          >
            <Iconify icon="mdi:plus-circle-outline" width={14} className="sm:w-4" />
            Nạp Tiền
          </button>
        </div>

        {/* Panel qui đổi */}
        <div className="flex-1 flex flex-col rounded-lg border border-slate-200 bg-white px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 min-w-0">
          {/* header */}
          <div className="mb-3 sm:mb-4 flex items-start gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 flex-shrink-0">
              <Iconify icon="mdi:swap-horizontal" width={18} className="text-blue-500 sm:w-5 lg:w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                {currentPlan.conversionTitle}
              </p>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-500">
                Qui đổi trực tiếp từ ví sang gói proxy, sử dụng ngay sau khi qui đổi thành công.
              </p>
            </div>
          </div>

          <div className="mb-3 sm:mb-4 h-px w-full bg-slate-200" />

          {/* Chọn dung lượng */}
          <div className="mb-3 sm:mb-4">
            <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold text-slate-700">
              Chọn Dung Lượng Qui Đổi
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1.5 sm:gap-2">
              {/* Nút Custom */}
              <button
                type="button"
                onClick={handleCustomClick}
                className={`rounded-lg border px-2 sm:px-2.5 lg:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition ${
                  isCustom
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                }`}
              >
                <Iconify icon="mdi:pencil-outline" width={10} className="inline mr-0.5 sm:mr-1 sm:w-3" />
                <span className="hidden sm:inline">Tùy Chỉnh</span>
                <span className="sm:hidden">TT</span>
              </button>

              {/* Các gói preset */}
              {PRESET_PACKAGES.map((pkg) => (
                <button
                  key={pkg.value}
                  type="button"
                  onClick={() => handlePresetClick(pkg.value)}
                  className={`rounded-lg border px-2 sm:px-2.5 lg:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium transition whitespace-nowrap ${
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
          <div className="flex flex-col gap-3 sm:gap-4 bg-slate-50 rounded-lg p-3 sm:p-4">
            {/* Input số lượng */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-2 sm:px-3 py-2 flex-1 sm:flex-initial">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Math.max(1, Number(e.target.value) || 1));
                    setIsCustom(true);
                  }}
                  className="w-full sm:w-16 lg:w-20 border-none bg-transparent text-xs sm:text-sm font-medium text-slate-700 outline-none"
                />
                <span className="ml-1.5 sm:ml-2 border-l border-slate-200 pl-2 sm:pl-3 text-[10px] sm:text-xs text-slate-600 whitespace-nowrap">
                  {currentPlan.unitText}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                <Iconify icon="mdi:information-outline" width={12} className="sm:w-3.5 flex-shrink-0" />
                <span>Đơn giá: {currentPlan.subLabel}</span>
              </div>
            </div>

            {/* Tổng tiền và nút hành động */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex flex-col items-center sm:items-end justify-center px-3 sm:px-4 py-2 bg-white rounded-lg border border-slate-200 flex-1 sm:flex-initial">
                <span className="text-[10px] sm:text-xs text-slate-500">Tổng chi phí</span>
                <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">
                  ${exchangeAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-700 transition shadow-sm flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Iconify icon="mdi:check-circle-outline" width={14} className="sm:w-4" />
                <span>Qui Đổi Ngay</span>
              </button>
            </div>
          </div>

          {/* Nút mua gói proxy */}
          <div className="mt-3 sm:mt-4 flex justify-center sm:justify-end">
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
              className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <Iconify icon="mdi:shopping-outline" width={14} className="sm:w-4" />
              <span className="truncate">Mua Gói {currentPlan.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionPanel;

