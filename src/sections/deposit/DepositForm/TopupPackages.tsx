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
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:gift" className="h-5 w-5 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-800">
            Chọn gói nạp
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Icon icon="mdi:loading" className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon icon="mdi:gift" className="h-5 w-5 text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-800">
          Chọn gói nạp
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
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
                flex flex-col items-center gap-2 rounded-lg border-2 p-3 text-left transition-all relative
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <Icon
                    icon="mdi:check-circle"
                    className="h-5 w-5 text-blue-500"
                  />
                </div>
              )}

              {/* Badge khuyến mãi */}
              {pkg.percent > 0 && (
                <div className="absolute top-1 left-1">
                  <div className="rounded-full bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5">
                    +{pkg.percent}%
                  </div>
                </div>
              )}

              {/* Tên gói */}
              <div className="flex-1 w-full text-center">
                <p
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-blue-600' : 'text-slate-800'
                  }`}
                >
                  {pkg.name}
                </p>
              </div>

              {/* Mệnh giá */}
              <div className="w-full text-center">
                <p className="text-base font-bold text-slate-900">
                  {formatVND(pkg.max)}₫
                </p>
              </div>

              {/* Khuyến mãi */}
              {pkg.percent > 0 && (
                <div className="w-full text-center space-y-0.5">
                  <p className="text-[10px] text-slate-500">
                    Khuyến mãi: +{formatVND(bonusAmount)}₫
                  </p>
                  <p className="text-xs font-semibold text-green-600">
                    Tổng: {formatVND(totalAmount)}₫
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {sortedPackages.length === 0 && !loading && (
        <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
          <p>Không có gói nạp nào khả dụng</p>
        </div>
      )}

      {sortedPackages.length > 0 && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-100 p-2.5 text-[11px] text-green-700">
          <Icon icon="mdi:information" className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Chọn gói nạp để tự động áp dụng mệnh giá và khuyến mãi tương ứng
          </p>
        </div>
      )}
    </div>
  );
};

