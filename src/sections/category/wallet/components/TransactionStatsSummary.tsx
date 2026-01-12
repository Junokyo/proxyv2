'use client';

import { WalletTransactionStats } from '@/graphql/types';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Gift, Activity } from 'lucide-react';

interface TransactionStatsSummaryProps {
  stats: WalletTransactionStats;
  loading?: boolean;
}

/**
 * Format currency to VND
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Stat Card Component
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

function StatCard({ title, value, icon, iconBgColor, iconColor }: StatCardProps) {
  return (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`p-2 sm:p-3 rounded-lg ${iconBgColor}`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * Transaction Stats Summary Component
 * Displays overview statistics of wallet transactions
 */
export function TransactionStatsSummary({
  stats,
  loading,
}: TransactionStatsSummaryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4 sm:p-6 animate-pulse">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg" />
              <div className="flex-1">
                <div className="h-3 bg-muted rounded mb-2 w-20" />
                <div className="h-6 bg-muted rounded w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Tổng nạp tiền"
        value={formatCurrency(stats.totalDeposited)}
        icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatCard
        title="Tổng rút tiền"
        value={formatCurrency(stats.totalWithdrawn)}
        icon={<TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
      <StatCard
        title="Tổng khuyến mãi"
        value={formatCurrency(stats.totalPromotions)}
        icon={<Gift className="w-5 h-5 sm:w-6 sm:h-6" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <StatCard
        title="Số giao dịch"
        value={stats.transactionCount.toLocaleString('vi-VN')}
        icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
    </div>
  );
}

