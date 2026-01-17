import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';

export interface TopupPackage {
  id: string;
  name: string;
  max: number;
  percent: number;
}

interface TopupPackagesProps {
  packages: TopupPackage[];
  loading: boolean;
  selectedPackageId: string | null;
  onSelectPackage: (pkg: TopupPackage) => void;
}

const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export const TopupPackages: React.FC<TopupPackagesProps> = ({
  packages,
  loading,
  selectedPackageId,
  onSelectPackage,
}) => {
  // Sort packages by max amount (ascending)
  const sortedPackages = useMemo(() => {
    return [...packages].sort((a, b) => a.max - b.max);
  }, [packages]);

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Icon icon="mdi:gift" className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-medium text-foreground">Chọn gói nạp</h3>
        </div>
        <div className="flex items-center justify-center py-6">
          <Icon icon="mdi:loading" className="h-6 w-6 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="mdi:gift" className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-medium text-foreground">Chọn gói nạp</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5">
        {sortedPackages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const bonusAmount = (pkg.max * pkg.percent) / 100;
          const totalAmount = pkg.max + bonusAmount;

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelectPackage(pkg)}
              className={`
                flex flex-col items-center gap-0.5 rounded-md border p-2 text-left transition-all relative
                ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'bg-card border-border hover:border-primary/40'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-0.5 right-0.5">
                  <Icon icon="mdi:check-circle" className="h-3 w-3 text-primary" />
                </div>
              )}

              {pkg.percent > 0 && (
                <div className="absolute top-0.5 left-0.5">
                  <div className="rounded-full bg-emerald-500 text-white text-[8px] font-bold px-1 py-0">
                    +{pkg.percent}%
                  </div>
                </div>
              )}

              <p className="text-xs font-bold text-foreground mt-1">
                {formatVND(pkg.max)}₫
              </p>

              {pkg.percent > 0 && (
                <p className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                  ={formatVND(totalAmount)}₫
                </p>
              )}
            </button>
          );
        })}
      </div>

      {sortedPackages.length === 0 && !loading && (
        <div className="flex items-center justify-center py-4 text-muted-foreground text-xs">
          <p>Không có gói nạp nào</p>
        </div>
      )}
    </div>
  );
};

