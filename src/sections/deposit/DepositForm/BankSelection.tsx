import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { getBanks } from '@/mocks/banks.mock';
import { Bank } from '@/types/bank.types';

interface BankSelectionProps {
  selectedBank: string;
  onSelectBank: (bankCode: string) => void;
}

export const BankSelection: React.FC<BankSelectionProps> = ({
  selectedBank,
  onSelectBank,
}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await getBanks();
        setBanks(data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);
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
        {banks.map((bank) => (
          <button
            key={bank.code}
            type="button"
            onClick={() => onSelectBank(bank.code)}
            className={`
              flex items-center gap-2 rounded-lg border-2 p-2.5 text-left transition-all
              ${
                selectedBank === bank.code
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : `${bank.color} hover:border-blue-300 hover:shadow-sm`
              }
            `}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white flex-shrink-0">
              <Icon icon="emojione:flag-for-vietnam" className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${
                selectedBank === bank.code ? 'text-blue-600' : 'text-slate-800'
              }`}>
                {bank.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate leading-tight">{bank.fullName}</p>
            </div>
            {selectedBank === bank.code && (
              <Icon
                icon="mdi:check-circle"
                className="h-4 w-4 text-blue-500 flex-shrink-0"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 p-2.5 text-[11px] text-blue-700">
        <Icon icon="mdi:information" className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <p>
          Chọn ngân hàng để xem thông tin chuyển khoản
        </p>
      </div>
    </div>
  );
};

