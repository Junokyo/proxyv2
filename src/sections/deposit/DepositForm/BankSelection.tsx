import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';

export interface BankAccount {
  id: string;
  bankCode: string;
  bankName: string;
  bankLogoUrl: string | null;
  apiType: string;
  accountNumber: string;
  accountName: string;
  branch: string | null;
  active: boolean;
  isDefault: boolean;
  note: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface BankSelectionProps {
  bankAccounts: BankAccount[];
  loading: boolean;
  selectedBankCode: string;
  onSelectBank: (bankCode: string) => void;
}

export const BankSelection: React.FC<BankSelectionProps> = ({
  bankAccounts,
  loading,
  selectedBankCode,
  onSelectBank,
}) => {
  // Sort banks by sortOrder, then by isDefault, then by bankName
  const sortedBanks = useMemo(() => {
    return [...bankAccounts].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.bankName.localeCompare(b.bankName);
    });
  }, [bankAccounts]);

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Icon icon="mdi:bank" className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-medium text-foreground">Chọn ngân hàng</h3>
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
        <Icon icon="mdi:bank" className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-medium text-foreground">Chọn ngân hàng</h3>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-1.5">
        {sortedBanks.map((bank) => (
          <button
            key={bank.id}
            type="button"
            onClick={() => onSelectBank(bank.bankCode)}
            className={`
              flex items-center gap-1.5 rounded-md border p-1.5 text-left transition-all
              ${
                selectedBankCode === bank.bankCode
                  ? 'border-primary bg-primary/5'
                  : 'bg-card border-border hover:border-primary/40'
              }
            `}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/50 flex-shrink-0">
              {bank.bankLogoUrl ? (
                <img
                  src={bank.bankLogoUrl}
                  alt={bank.bankName}
                  className="h-4 w-4 object-contain"
                />
              ) : (
                <Icon icon="mdi:bank" className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-semibold truncate ${
                selectedBankCode === bank.bankCode ? 'text-primary' : 'text-foreground'
              }`}>
                {bank.bankName}
              </p>
            </div>
            {selectedBankCode === bank.bankCode && (
              <Icon icon="mdi:check-circle" className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {sortedBanks.length === 0 && !loading && (
        <div className="flex items-center justify-center py-4 text-muted-foreground text-xs">
          <p>Không có ngân hàng nào</p>
        </div>
      )}
    </div>
  );
};

