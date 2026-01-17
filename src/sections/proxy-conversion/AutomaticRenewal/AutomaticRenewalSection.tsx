'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Iconify from '@/components/iconify/iconify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PlanKey = 'residential' | 'unlimited' | 'isp' | 'datacenter' | 'rotating';

const PLANS: { key: PlanKey; label: string; icon: string }[] = [
  { key: 'residential', label: 'Residential', icon: 'mdi:home-city-outline' },
  { key: 'unlimited', label: 'Unlimited', icon: 'mdi:infinity' },
  { key: 'rotating', label: 'Rotating ISP', icon: 'mdi:cached' },
  { key: 'isp', label: 'ISP', icon: 'mdi:server-network' },
  { key: 'datacenter', label: 'Datacenter', icon: 'mdi:database' },
];

const TRAFFIC_OPTIONS = [
  { id: 'custom', label: 'Tùy chỉnh', unitPrice: '--', totalPrice: '--' },
  { id: '5', label: '5GB', unitPrice: '$0.77/GB', totalPrice: '$3.85' },
  { id: '10', label: '10GB', unitPrice: '$0.77/GB', totalPrice: '$7.7' },
  { id: '45', label: '45GB', unitPrice: '$0.77/GB', totalPrice: '$34.65' },
  { id: '120', label: '120GB', unitPrice: '$0.77/GB', totalPrice: '$92.4' },
  { id: '280', label: '280GB', unitPrice: '$0.77/GB', totalPrice: '$215.6' },
  { id: '1000', label: '1TB', unitPrice: '$0.77/GB', totalPrice: '$770' },
  { id: '2000', label: '2TB', unitPrice: '$0.77/GB', totalPrice: '$1,540' },
];

const DURATION_OPTIONS = [
  { value: '30', label: '30 Ngày' },
  { value: '60', label: '60 Ngày' },
  { value: '90', label: '90 Ngày' },
];

const AutomaticRenewalSection: React.FC = () => {
  const [autoRenew, setAutoRenew] = useState(false);
  const [activePlan, setActivePlan] = useState<PlanKey>('residential');
  const [duration, setDuration] = useState('30');
  const [selectedTraffic, setSelectedTraffic] = useState<string>('5');
  const [leftGb, setLeftGb] = useState('1');
  const [beforeDays, setBeforeDays] = useState('1');

  const selectedOption = TRAFFIC_OPTIONS.find(t => t.id === selectedTraffic);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] items-start">
      {/* Main Content */}
      <div className="space-y-4">
        {/* Header Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <Iconify icon="mdi:autorenew" width={18} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Gia Hạn Tự Động</h3>
                <p className="text-[11px] text-muted-foreground">Tự động gia hạn khi sắp hết</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoRenew(!autoRenew)}
              className={cn(
                'relative h-6 w-11 rounded-full transition-colors',
                autoRenew ? 'bg-emerald-500' : 'bg-muted'
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                  autoRenew ? 'left-[22px]' : 'left-0.5'
                )}
              />
            </button>
          </div>
        </div>

        {/* Selection Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          {/* Proxy Type Pills */}
          <div className="mb-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Loại Proxy</div>
            <div className="flex flex-wrap gap-1.5">
              {PLANS.map((plan) => (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setActivePlan(plan.key)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                    activePlan === plan.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  )}
                >
                  <Iconify icon={plan.icon} width={12} />
                  {plan.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Pills */}
          <div className="mb-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Thời hạn</div>
            <div className="flex flex-wrap gap-1.5">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDuration(opt.value)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                    duration === opt.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Traffic Options */}
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">Dung lượng</div>
            <div className="flex flex-wrap gap-1.5">
              {TRAFFIC_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedTraffic(opt.id)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                    selectedTraffic === opt.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50',
                    opt.id === 'custom' && 'gap-1 inline-flex items-center'
                  )}
                >
                  {opt.id === 'custom' && <Iconify icon="mdi:pencil-outline" width={12} />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Iconify icon="mdi:cog-outline" width={14} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Điều kiện gia hạn</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Gia hạn khi còn</span>
              <input
                type="number"
                min={0}
                value={leftGb}
                onChange={(e) => setLeftGb(e.target.value)}
                className="h-8 w-14 rounded-md border border-border bg-card px-2 text-center text-xs font-medium text-foreground outline-none focus:border-primary"
              />
              <span className="text-muted-foreground">GB</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Hoặc còn</span>
              <input
                type="number"
                min={0}
                value={beforeDays}
                onChange={(e) => setBeforeDays(e.target.value)}
                className="h-8 w-14 rounded-md border border-border bg-card px-2 text-center text-xs font-medium text-foreground outline-none focus:border-primary"
              />
              <span className="text-muted-foreground">ngày trước khi hết hạn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-3">
        {/* Summary Card */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">Tóm tắt cài đặt</div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trạng thái</span>
              <span className={cn('font-medium', autoRenew ? 'text-emerald-600' : 'text-muted-foreground')}>
                {autoRenew ? 'Đang bật' : 'Đang tắt'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loại Proxy</span>
              <span className="font-medium text-foreground">
                {PLANS.find(p => p.key === activePlan)?.label}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thời hạn</span>
              <span className="font-medium text-foreground">{duration} ngày</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dung lượng</span>
              <span className="font-medium text-foreground">{selectedOption?.label}</span>
            </div>

            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Đơn giá</span>
                <span className="font-medium text-foreground">{selectedOption?.unitPrice}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-muted-foreground">Tổng tiền/lần</span>
                <span className="text-base font-bold text-primary">{selectedOption?.totalPrice}</span>
              </div>
            </div>
          </div>

          <Button className="w-full mt-4 gap-1.5 h-9 text-xs">
            <Iconify icon="mdi:content-save-outline" width={14} />
            Lưu Cài Đặt
          </Button>
        </div>

        {/* Info Card */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 px-3 py-2.5 text-[11px] text-blue-700 dark:text-blue-400">
          <div className="flex items-start gap-2">
            <Iconify icon="mdi:information-outline" width={14} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Lưu ý:</p>
              <ul className="space-y-0.5 list-disc list-inside text-blue-600 dark:text-blue-400">
                <li>Đảm bảo ví đủ số dư</li>
                <li>Nhận thông báo trước khi gia hạn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomaticRenewalSection;
