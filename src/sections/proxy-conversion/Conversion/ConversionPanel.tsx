'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Iconify from '@/components/iconify/iconify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type PlanKey = 'residential' | 'rotating' | 'isp' | 'datacenter';

interface ConversionPanelProps {
  selectedPlan: PlanKey;
  onChangePlan: (plan: PlanKey) => void;
}

const PLAN_CONFIG: Record<
  PlanKey,
  {
    title: string;
    shortTitle: string;
    subLabel: string;
    unitPrice: number;
    unitText: string;
    description: string;
    icon: string;
    bgGradient: string;
    iconBg: string;
    borderColor: string;
  }
> = {
  residential: {
    title: 'Residential Proxies',
    shortTitle: 'Residential',
    subLabel: '$0.77/GB',
    unitPrice: 0.77,
    unitText: 'GB',
    description: 'Quy đổi trực tiếp từ ví sang gói Residential Proxies',
    icon: 'mdi:home-city-outline',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500/50',
  },
  rotating: {
    title: 'Rotating ISP Proxies',
    shortTitle: 'Rotating ISP',
    subLabel: '$0.4/GB',
    unitPrice: 0.4,
    unitText: 'GB',
    description: 'Quy đổi trực tiếp từ ví sang gói Rotating ISP Proxies',
    icon: 'mdi:cached',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500/50',
  },
  isp: {
    title: 'ISP Proxies',
    shortTitle: 'ISP',
    subLabel: '$0.17/IP/Ngày',
    unitPrice: 0.17 * 30,
    unitText: 'IP (30 Ngày)',
    description: 'Quy đổi trực tiếp từ ví sang gói ISP Proxies',
    icon: 'mdi:server-network',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    borderColor: 'border-violet-500/50',
  },
  datacenter: {
    title: 'Datacenter Proxies',
    shortTitle: 'Datacenter',
    subLabel: '$0.11/IP/Ngày',
    unitPrice: 0.11 * 30,
    unitText: 'IP (30 Ngày)',
    description: 'Quy đổi trực tiếp từ ví sang gói Datacenter Proxies',
    icon: 'mdi:database',
    bgGradient: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500/50',
  },
};

const PRESET_PACKAGES = [
  { value: 5, label: '5GB' },
  { value: 10, label: '10GB' },
  { value: 45, label: '45GB' },
  { value: 120, label: '120GB' },
  { value: 280, label: '280GB' },
  { value: 1000, label: '1TB' },
  { value: 2000, label: '2TB' },
  { value: 3000, label: '3TB' },
  { value: 5000, label: '5TB' },
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
  const [isCustom, setIsCustom] = useState<boolean>(true);

  const currentPlan = PLAN_CONFIG[selectedPlan];

  const exchangeAmount = useMemo(
    () => (quantity > 0 ? quantity * currentPlan.unitPrice : 0),
    [quantity, currentPlan.unitPrice]
  );

  const handlePresetClick = (value: number) => {
    setQuantity(value);
    setIsCustom(false);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setQuantity(1);
  };

  const currentBalance = 1250.5;
  const canConvert = exchangeAmount <= currentBalance && exchangeAmount > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)] items-start">
      {/* Main Content */}
      <div className="min-w-0 space-y-6">
        {/* Proxy Type Selection */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Iconify icon="mdi:package-variant" width={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Chọn loại Proxy</span>
            </div>
          </div>
          <LayoutGroup>
          <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
            {tabs.map(({ key }) => {
              const plan = PLAN_CONFIG[key];
              const isActive = key === selectedPlan;

              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => onChangePlan(key)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'group relative flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-all',
                    isActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                >
                  <div className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all',
                    isActive ? plan.iconBg : 'bg-muted/50 text-muted-foreground'
                  )}>
                    <Iconify icon={plan.icon} width={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-foreground truncate">{plan.shortTitle}</h4>
                    <p className="text-[11px] text-muted-foreground">{plan.subLabel}</p>
                  </div>

                  {isActive && (
                    <Iconify icon="mdi:check-circle" width={16} className="shrink-0 text-primary" />
                  )}
                </motion.button>
              );
            })}
          </div>
          </LayoutGroup>
        </div>

        {/* Conversion Panel */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Iconify icon="mdi:swap-horizontal" width={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Quy Đổi {currentPlan.shortTitle}</span>
            </div>
            <span className="text-xs text-muted-foreground">{currentPlan.subLabel}</span>
          </div>

          {/* Package Selection */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              type="button"
              onClick={handleCustomClick}
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all',
                isCustom
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50'
              )}
            >
              <Iconify icon="mdi:pencil-outline" width={12} />
              Tùy chỉnh
            </button>

            {PRESET_PACKAGES.map((pkg) => (
              <button
                key={pkg.value}
                type="button"
                onClick={() => handlePresetClick(pkg.value)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-all',
                  !isCustom && quantity === pkg.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                )}
              >
                {pkg.label}
              </button>
            ))}
          </div>

          {/* Input Section */}
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted/40 p-3">
            <div className="flex items-center rounded-md border border-border bg-card overflow-hidden">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  setQuantity(Math.max(1, Number(e.target.value) || 1));
                  setIsCustom(true);
                }}
                className="w-16 border-none bg-transparent px-3 py-2 text-sm font-semibold text-foreground outline-none"
              />
              <span className="border-l border-border bg-muted/50 px-2.5 py-2 text-[11px] text-muted-foreground">
                {currentPlan.unitText}
              </span>
            </div>

            <Iconify icon="mdi:arrow-right" width={16} className="text-muted-foreground" />

            <div className="flex items-center gap-1">
              <span className="text-[11px] text-muted-foreground">Tổng:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={exchangeAmount}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-base font-bold text-foreground"
                >
                  ${exchangeAmount.toFixed(2)}
                </motion.span>
              </AnimatePresence>
            </div>

            <Button
              disabled={!canConvert}
              className="gap-1.5 h-9 px-4 text-xs ml-auto"
            >
              <Iconify icon="mdi:lightning-bolt" width={14} />
              Quy Đổi
            </Button>
          </div>

          {/* Buy Package Link */}
          <div className="mt-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => {
                const routes: Record<PlanKey, string> = {
                  residential: '/residential-proxies',
                  rotating: '/rotating-isp',
                  isp: '/isp-proxies',
                  datacenter: '/datacenter-proxies',
                };
                window.location.href = routes[selectedPlan];
              }}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Iconify icon="mdi:shopping-outline" width={14} />
              Mua gói {currentPlan.shortTitle} với ưu đãi
              <Iconify icon="mdi:arrow-right" width={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Wallet */}
      <div className="space-y-3">
        {/* Balance Card */}
        <div className="rounded-xl bg-gradient-to-br from-primary to-primary/90 p-4 text-primary-foreground">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] opacity-80">Số dư ví</p>
              <p className="text-xl font-bold">${currentBalance.toFixed(2)}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <Iconify icon="mdi:wallet" width={18} />
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="w-full gap-1.5 bg-white/95 text-primary hover:bg-white text-xs h-8"
            onClick={() => (window.location.href = '/deposit')}
          >
            <Iconify icon="mdi:plus-circle" width={14} />
            Nạp Tiền
          </Button>
        </div>

        {/* Conversion Summary */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">Chi tiết quy đổi</div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Loại Proxy</span>
              <span className="font-medium text-foreground">{currentPlan.shortTitle}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Dung lượng</span>
              <span className="font-medium text-foreground">{quantity} {currentPlan.unitText}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Đơn giá</span>
              <span className="font-medium text-foreground">{currentPlan.subLabel}</span>
            </div>

            <div className="border-t border-border pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tổng thanh toán</span>
                <span className="text-base font-bold text-primary">${exchangeAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md bg-muted/50 px-2 py-1.5">
              <span className="text-muted-foreground text-[11px]">Số dư còn lại</span>
              <span className={cn(
                'text-xs font-bold',
                canConvert ? 'text-emerald-600' : 'text-destructive'
              )}>
                ${Math.max(0, currentBalance - exchangeAmount).toFixed(2)}
              </span>
            </div>
          </div>

          {!canConvert && exchangeAmount > 0 && (
            <div className="mt-3 rounded-md bg-destructive/10 px-2.5 py-2 text-[11px] text-destructive">
              <div className="flex items-start gap-1.5">
                <Iconify icon="mdi:alert-circle" width={14} className="shrink-0 mt-0.5" />
                <p>Số dư không đủ. Cần nạp thêm ${(exchangeAmount - currentBalance).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2.5 text-[11px] text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-2">
            <Iconify icon="mdi:lightning-bolt" width={14} className="shrink-0" />
            <p>Proxy kích hoạt ngay sau khi quy đổi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionPanel;
