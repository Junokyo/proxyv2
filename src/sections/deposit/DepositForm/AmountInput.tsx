import React from 'react';
import { Icon } from '@iconify/react';

interface AmountInputProps {
  amount: number;
  onChangeAmount: (value: number) => void;
}

// Số tiền chọn nhanh (VNĐ)
const QUICK_AMOUNTS = [
  100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000,
];

// Format số tiền VNĐ
const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChangeAmount,
}) => {
  const handleChange = (value: number) => {
    if (value < 0) return;
    onChangeAmount(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    handleChange(Number(value || 0));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon icon="mdi:cash-multiple" className="h-5 w-5 text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-800">Số tiền nạp</h3>
      </div>

      {/* Amount Input */}
      <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => handleChange(Math.max(0, amount - 100000))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-xl font-semibold text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <Icon icon="mdi:minus" className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-end gap-1.5">
              <input
                type="text"
                value={formatVND(amount)}
                onChange={handleInputChange}
                placeholder="0"
                className="w-48 border-none bg-transparent text-center text-3xl font-bold text-slate-900 outline-none"
              />
              <span className="text-xl font-semibold text-slate-600 pb-0.5">
                VNĐ
              </span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>

          <button
            type="button"
            onClick={() => handleChange(amount + 100000)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-xl font-semibold text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <Icon icon="mdi:plus" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <p className="mb-2 text-xs font-medium text-slate-600">
          Chọn nhanh:
        </p>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <button
              key={quickAmount}
              type="button"
              onClick={() => handleChange(quickAmount)}
              className={`
                rounded-lg border-2 px-2 py-2 text-xs font-semibold transition-all
                ${
                  amount === quickAmount
                    ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600'
                }
              `}
            >
              {quickAmount >= 1000000
                ? `${quickAmount / 1000000}M`
                : `${quickAmount / 1000}K`}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-2.5 text-[11px] text-amber-800">
        <Icon
          icon="mdi:alert-circle-outline"
          className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
        />
        <div>
          <p className="font-semibold mb-0.5">Lưu ý:</p>
          <p className="text-[10px]">Tối thiểu: 100K | Tối đa: 100M</p>
        </div>
      </div>
    </div>
  );
};

