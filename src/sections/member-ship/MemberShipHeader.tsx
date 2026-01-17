'use client';

import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface MembershipHeaderProps {
  currentAmount?: number;
  nextLevelAmount?: number;
}

// VIP tier configuration
const VIP_TIERS = [
  { level: 'V0', name: 'Starter', minSpend: 0, ratio: '0%', color: 'slate' },
  { level: 'V1', name: 'Bronze', minSpend: 1000, ratio: '5%', color: 'amber' },
  { level: 'V2', name: 'Silver', minSpend: 3000, ratio: '10%', color: 'slate' },
  { level: 'V3', name: 'Gold', minSpend: 10000, ratio: '15%', color: 'yellow' },
  { level: 'V4', name: 'Platinum', minSpend: 30000, ratio: '20%', color: 'indigo' },
];

export default function MemberShipHeader({
  currentAmount = 0,
  nextLevelAmount = 1000,
}: MembershipHeaderProps): JSX.Element {
  const navigate = useNavigate();

  const progress = Math.min(1, currentAmount / nextLevelAmount);
  const percent = Math.round(progress * 100);

  // Determine current tier
  const currentTierIndex = VIP_TIERS.findIndex(
    (tier, index) =>
      currentAmount >= tier.minSpend &&
      (index === VIP_TIERS.length - 1 || currentAmount < VIP_TIERS[index + 1].minSpend)
  );
  const currentTier = VIP_TIERS[Math.max(0, currentTierIndex)];
  const nextTier = VIP_TIERS[Math.min(currentTierIndex + 1, VIP_TIERS.length - 1)];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 shrink-0">
              <Icon icon="mdi:crown" className="text-2xl text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                VIP Membership Benefits
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Earn up to 20% bonus on all proxy purchases
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/residential-proxies')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon icon="mdi:arrow-up-circle-outline" className="text-lg" />
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Current Status */}
          <div className="flex-1">
            {/* Current Level Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <Icon icon="mdi:shield-star" className="text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {currentTier.level} - {currentTier.name}
                </span>
              </div>
              <span className="text-sm text-slate-500">
                Gift ratio: <span className="font-semibold text-teal-600">{currentTier.ratio}</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">
                  Progress to {nextTier.level}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  ${currentAmount.toLocaleString()} / ${nextLevelAmount.toLocaleString()}
                </span>
              </div>

              <div className="relative">
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Milestone markers */}
                <div className="flex justify-between mt-2">
                  {VIP_TIERS.map((tier, index) => (
                    <div
                      key={tier.level}
                      className="flex flex-col items-center"
                      style={{ width: index === 0 || index === VIP_TIERS.length - 1 ? 'auto' : '1px' }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          currentTierIndex >= index ? 'bg-blue-500' : 'bg-slate-300'
                        }`}
                      />
                      <span
                        className={`text-xs mt-1 ${
                          currentTierIndex >= index
                            ? 'text-blue-600 font-medium'
                            : 'text-slate-400'
                        }`}
                      >
                        {tier.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amount needed */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Icon icon="mdi:information-outline" className="text-blue-500 text-lg" />
              <span className="text-sm text-blue-700">
                Spend <span className="font-semibold">${(nextLevelAmount - currentAmount).toLocaleString()}</span> more to unlock {nextTier.level} and get <span className="font-semibold">{nextTier.ratio}</span> gift ratio
              </span>
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="lg:w-72 shrink-0 space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100">
                  <Icon icon="mdi:wifi" className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Residential Proxies</p>
                  <p className="text-base font-semibold text-slate-900">0.00 GB</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100">
                  <Icon icon="mdi:rotate-3d-variant" className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Rotating ISP Proxies</p>
                  <p className="text-base font-semibold text-slate-900">0.00 GB</p>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <button
              onClick={() => navigate('/member-ship#benefits')}
              className="w-full flex items-center justify-between p-3 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span>View all membership benefits</span>
              <Icon icon="mdi:chevron-right" className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
