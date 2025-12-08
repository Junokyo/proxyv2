// TopUpRight.tsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface TopUpRightProps {
  amount: number;
}

type PaymentTab = 'crypto' | 'card' | 'alipay' | 'paypal';

const cryptoList = [
  {
    code: 'USDT-TRC20',
    label: 'Tether-TRC20',
    icon: 'cryptocurrency-color:usdt',
  },
  { code: 'TRON', label: 'TRON', icon: 'cryptocurrency-color:trx' },
  { code: 'BTC', label: 'Bitcoin', icon: 'cryptocurrency-color:btc' },
  { code: 'ETH', label: 'Ethereum', icon: 'cryptocurrency-color:eth' },
  { code: 'LTC', label: 'Litecoin', icon: 'cryptocurrency-color:ltc' },
];

export const TopUpRight: React.FC<TopUpRightProps> = ({ amount }) => {
  const [tab, setTab] = useState<PaymentTab>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT-TRC20');

  const total = amount * 1.05; // ví dụ thêm 5% fee cho giống 1050

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-slate-800">
          Payment Method
        </p>

        {/* Tabs: Crypto / Card / Alipay / Paypal */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                checked={tab === 'crypto'}
                onChange={() => setTab('crypto')}
                className="h-4 w-4 accent-blue-500"
              />
              <span className="text-sm font-medium text-slate-800">
                Crypto Currencies
              </span>
            </label>

            {tab === 'crypto' && (
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="grid grid-cols-2 gap-3">
                  {cryptoList.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setSelectedCrypto(c.code)}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
                        selectedCrypto === c.code
                          ? 'border-blue-500 bg-white text-blue-600 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon icon={c.icon} className="h-5 w-5" />
                        <span>{c.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Credit Card */}
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={tab === 'card'}
                  onChange={() => setTab('card')}
                  className="h-4 w-4 accent-blue-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Credit Card
                </span>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-500">
                  Recommend
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Icon icon="mdi:visa" className="h-6 w-6" />
                <Icon icon="mdi:mastercard" className="h-6 w-6" />
                <Icon icon="mdi:credit-card-outline" className="h-5 w-5" />
              </div>
            </label>

            {/* Alipay */}
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={tab === 'alipay'}
                  onChange={() => setTab('alipay')}
                  className="h-4 w-4 accent-blue-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Alipay
                </span>
              </div>
              <Icon
                icon="simple-icons:alipay"
                className="h-6 w-6 text-sky-500"
              />
            </label>

            {/* PayPal / Installment */}
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={tab === 'paypal'}
                  onChange={() => setTab('paypal')}
                  className="h-4 w-4 accent-blue-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  PayPal/Credit Card/Installment
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Icon icon="mdi:visa" className="h-6 w-6" />
                <Icon icon="mdi:paypal" className="h-6 w-6" />
              </div>
            </label>
          </div>

          {/* Amount summary */}
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Amount</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Fee</span>
              <span>${(total - amount).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-slate-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom button card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <button className="flex w-full items-center justify-center rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600">
          Continue to Pay
        </button>
      </div>
    </div>
  );
};
