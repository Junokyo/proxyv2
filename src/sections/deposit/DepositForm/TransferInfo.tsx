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
      className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-medium text-primary hover:bg-primary/10 transition-colors"
    >
      <Icon icon={copiedField === field ? "mdi:check" : "mdi:content-copy"} className="h-3 w-3" />
      {copiedField === field ? 'OK' : 'Copy'}
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Icon icon="mdi:information-outline" className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-medium text-foreground">Thông tin chuyển khoản</h3>
      </div>

      {/* QR Code Section */}
      <div className="rounded-md border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 p-2">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-white p-1.5 shadow-sm border border-violet-100 dark:border-violet-800">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                `Bank: ${bankAccount.bankName}\nAccount: ${bankAccount.accountNumber}\nName: ${bankAccount.accountName}\nAmount: ${formatVND(amount)} VND\nContent: ${transactionCode}`
              )}`}
              alt="QR Code"
              className="w-20 h-20"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground mb-1">Quét QR hoặc chuyển khoản thủ công</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">STK:</span>
                <span className="text-[11px] font-bold text-foreground">{bankAccount.accountNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Tên:</span>
                <span className="text-[10px] font-medium text-foreground truncate ml-1">{bankAccount.accountName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Details */}
      <div className="space-y-1.5">
        {/* Số tài khoản */}
        <div className="flex items-center justify-between rounded-md bg-muted/30 px-2 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">STK</span>
            <span className="text-xs font-bold text-foreground">{bankAccount.accountNumber}</span>
          </div>
          <CopyButton text={bankAccount.accountNumber} field="account" />
        </div>

        {/* Tên tài khoản */}
        <div className="flex items-center justify-between rounded-md bg-muted/30 px-2 py-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] text-muted-foreground shrink-0">Tên</span>
            <span className="text-[11px] font-medium text-foreground truncate">{bankAccount.accountName}</span>
          </div>
          <CopyButton text={bankAccount.accountName} field="name" />
        </div>

        {/* Số tiền */}
        <div className="flex items-center justify-between rounded-md bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-2 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Số tiền</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatVND(amount)}₫</span>
          </div>
          <CopyButton text={amount.toString()} field="amount" />
        </div>

        {/* Nội dung */}
        <div className="flex items-center justify-between rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-2 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-700 dark:text-amber-400">Nội dung</span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">{transactionCode}</span>
          </div>
          <CopyButton text={transactionCode} field="content" />
        </div>
      </div>

      {/* Hướng dẫn */}
      <div className="rounded-md bg-destructive/10 border border-destructive/20 px-2 py-1.5">
        <p className="text-[9px] text-destructive">
          Chuyển đúng số tiền <strong>{formatVND(amount)}₫</strong> với nội dung <strong>{transactionCode}</strong>. Xử lý tự động 5-10 phút.
        </p>
      </div>
    </div>
  );
};

