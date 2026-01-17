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
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="mdi:cash-multiple" className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-medium text-foreground">Số tiền nạp</h3>
      </div>

      {/* Amount Input */}
      <div className="rounded-md border border-border bg-muted/40 p-2">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleChange(Math.max(0, amount - 100000))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
          >
            <Icon icon="mdi:minus" className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-1">
            <input
              type="text"
              value={formatVND(amount)}
              onChange={handleInputChange}
              placeholder="0"
              className="w-28 border-none bg-transparent text-center text-lg font-bold text-foreground outline-none"
            />
            <span className="text-sm font-medium text-muted-foreground">₫</span>
          </div>

          <button
            type="button"
            onClick={() => handleChange(amount + 100000)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
          >
            <Icon icon="mdi:plus" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex flex-wrap gap-1">
        {QUICK_AMOUNTS.map((quickAmount) => (
          <button
            key={quickAmount}
            type="button"
            onClick={() => handleChange(quickAmount)}
            className={`
              rounded-md border px-2 py-1 text-[10px] font-semibold transition-all
              ${
                amount === quickAmount
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50'
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
  );
};

