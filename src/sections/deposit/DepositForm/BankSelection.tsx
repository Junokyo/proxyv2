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
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:bank" className="h-5 w-5 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-800">
            Chọn ngân hàng
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
        <Icon icon="mdi:bank" className="h-5 w-5 text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-800">
          Chọn ngân hàng
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
        {sortedBanks.map((bank) => (
          <button
            key={bank.id}
            type="button"
            onClick={() => onSelectBank(bank.bankCode)}
            className={`
              flex items-center gap-2 rounded-lg border-2 p-2.5 text-left transition-all
              ${
                selectedBankCode === bank.bankCode
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-sm'
              }
            `}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white flex-shrink-0">
              {bank.bankLogoUrl ? (
                <img
                  src={bank.bankLogoUrl}
                  alt={bank.bankName}
                  className="h-5 w-5 object-contain"
                />
              ) : (
                <Icon icon="mdi:bank" className="h-5 w-5 text-slate-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${
                selectedBankCode === bank.bankCode ? 'text-blue-600' : 'text-slate-800'
              }`}>
                {bank.bankName}
              </p>
              <p className="text-[10px] text-slate-500 truncate leading-tight">
                {bank.bankCode}
              </p>
            </div>
            {selectedBankCode === bank.bankCode && (
              <Icon
                icon="mdi:check-circle"
                className="h-4 w-4 text-blue-500 flex-shrink-0"
              />
            )}
            {bank.isDefault && selectedBankCode !== bank.bankCode && (
              <Icon
                icon="mdi:star"
                className="h-3 w-3 text-amber-500 flex-shrink-0"
              />
            )}
          </button>
        ))}
      </div>

      {sortedBanks.length === 0 && !loading && (
        <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
          <p>Không có ngân hàng nào khả dụng</p>
        </div>
      )}
      {sortedBanks.length > 0 && (
        <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-[11px] text-blue-700">
          <Icon icon="mdi:information" className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <p>
            Chọn ngân hàng để xem thông tin chuyển khoản
          </p>
        </div>
      )}
    </div>
  );
};

