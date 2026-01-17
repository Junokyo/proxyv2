'use client';

import { Icon } from '@iconify/react';
import GiftInfo from './GiftInfo';
import MembershipHeader from './MemberShipHeader';
import OrderHistory from './OrderHistory';

// Stats data - can be fetched from API
const STATS_DATA = [
  {
    label: 'Current Level',
    value: 'V0',
    subtext: 'Starter',
    icon: 'mdi:shield-star-outline',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Gift Ratio',
    value: '0%',
    subtext: 'Up to 20%',
    icon: 'mdi:gift-outline',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
  },
  {
    label: 'Total Spent',
    value: '$0.00',
    subtext: 'This month',
    icon: 'mdi:wallet-outline',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    label: 'Next Level',
    value: '$1,000',
    subtext: 'Required',
    icon: 'mdi:trending-up',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
  },
];

export default function MemberShipView() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">
          Membership Center
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your membership level and view rewards
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS_DATA.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.subtext}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <Icon icon={stat.icon} className={`text-xl ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <MembershipHeader currentAmount={0} nextLevelAmount={1000} />
        <OrderHistory />
        <GiftInfo currentMembership="V0" />
      </div>
    </div>
  );
}
