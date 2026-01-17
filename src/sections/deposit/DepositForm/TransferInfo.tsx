import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import type { BankAccount } from './BankSelection';

interface TransferInfoProps {
  bankAccount: BankAccount;
  amount: number;
}

const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

export const TransferInfo: React.FC<TransferInfoProps> = ({
  bankAccount,
  amount,
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Tạo mã giao dịch ngẫu nhiên
  const transactionCode = `NP${Date.now().toString().slice(-8)}`;

  const handleCopy = (text: string, field: string) => {
    copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({
    text,
    field,
  }: {
    text: string;
    field: string;
  }) => (
    <button
      type="button"
      onClick={() => handleCopy(text, field)}
      className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-200 transition-colors"
    >
      {copiedField === field ? (
        <>
          <Icon icon="mdi:check" className="h-4 w-4" />
          Đã copy
        </>
      ) : (
        <>
          <Icon icon="mdi:content-copy" className="h-4 w-4" />
          Copy
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon
          icon="mdi:information-outline"
          className="h-5 w-5 text-slate-600"
        />
        <h3 className="text-sm font-semibold text-slate-800">
          Thông tin chuyển khoản
        </h3>
      </div>

      {/* QR Code Section */}
      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4 shadow-sm">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5">
            <Icon icon="mdi:qrcode-scan" className="h-4 w-4 text-purple-600" />
            <h3 className="text-xs font-semibold text-slate-800">
              Quét mã QR
            </h3>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="rounded-xl bg-white p-3 shadow-lg border-2 border-purple-100">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    `Bank: ${bankAccount.bankName}\nAccount: ${bankAccount.accountNumber}\nName: ${bankAccount.accountName}\nAmount: ${formatVND(amount)} VND\nContent: ${transactionCode}`
                  )}`}
                  alt="QR Code"
                  className="w-36 h-36"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-purple-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-md">
                  Scan Me
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
            <Icon icon="mdi:information-outline" className="h-3 w-3" />
            <p>Mở app ngân hàng để quét</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
        <div className="space-y-2.5">
          {/* Ngân hàng */}
          <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
            <div>
              <p className="text-[10px] text-slate-500 mb-0.5">Ngân hàng</p>
              <p className="text-sm font-semibold text-slate-900">
                {bankAccount.bankName}
              </p>
            </div>
            {bankAccount.bankLogoUrl ? (
              <img
                src={bankAccount.bankLogoUrl}
                alt={bankAccount.bankName}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <Icon icon="mdi:bank" className="h-6 w-6 text-blue-500" />
            )}
          </div>

          {/* Số tài khoản */}
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-slate-500">Số tài khoản</p>
              <CopyButton text={bankAccount.accountNumber} field="account" />
            </div>
            <p className="text-base font-bold text-slate-900 tracking-wider">
              {bankAccount.accountNumber}
            </p>
          </div>

          {/* Tên tài khoản */}
          <div className="rounded-lg bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-slate-500">Tên tài khoản</p>
              <CopyButton text={bankAccount.accountName} field="name" />
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {bankAccount.accountName}
            </p>
          </div>

          {/* Chi nhánh */}
          {bankAccount.branch && (
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-[10px] text-slate-500 mb-0.5">Chi nhánh</p>
              <p className="text-xs font-medium text-slate-700">
                {bankAccount.branch}
              </p>
            </div>
          )}

          {/* Số tiền */}
          <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-green-700 font-semibold">
                Số tiền cần chuyển
              </p>
              <CopyButton text={amount.toString()} field="amount" />
            </div>
            <p className="text-xl font-bold text-green-600">
              {formatVND(amount)} VNĐ
            </p>
          </div>

          {/* Nội dung chuyển khoản */}
          <div className="rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-orange-700 font-semibold">
                Nội dung chuyển khoản
              </p>
              <CopyButton text={transactionCode} field="content" />
            </div>
            <p className="text-base font-bold text-orange-600 font-mono">
              {transactionCode}
            </p>
          </div>
        </div>
      </div>

      {/* Hướng dẫn */}
      <div className="rounded-lg bg-red-50 border border-red-200 p-3">
        <div className="flex gap-2">
          <Icon
            icon="mdi:alert-circle"
            className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5"
          />
          <div className="text-[10px] text-red-700 space-y-1">
            <p className="font-semibold text-xs">Lưu ý quan trọng:</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Chuyển <strong>đúng số tiền</strong> {formatVND(amount)} VNĐ</li>
              <li>Nhập <strong>đúng nội dung</strong>: <code className="bg-red-100 px-1 py-0.5 rounded text-[9px]">{transactionCode}</code></li>
              <li>Xử lý tự động trong 5-10 phút</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

