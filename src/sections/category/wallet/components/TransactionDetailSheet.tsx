'use client';

import { useEffect } from 'react';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useWalletTransaction } from '@/graphql/hooks/wallet-transactions';
import { TransactionType, TRANSACTION_TYPE_LABELS } from '@/graphql/types';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface TransactionDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string;
}

/**
 * Format currency to VND
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format date to Vietnamese format
 */
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Get transaction type badge variant
 */
const getTransactionTypeBadge = (type: TransactionType) => {
  const variants: Record<TransactionType, { variant: string; className: string }> = {
    [TransactionType.DEPOSIT]: {
      variant: 'default',
      className: 'bg-green-100 text-green-700 hover:bg-green-200',
    },
    [TransactionType.WITHDRAW]: {
      variant: 'default',
      className: 'bg-red-100 text-red-700 hover:bg-red-200',
    },
    [TransactionType.PROMOTION]: {
      variant: 'default',
      className: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    },
    [TransactionType.PURCHASE]: {
      variant: 'default',
      className: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    },
    [TransactionType.REFUND]: {
      variant: 'default',
      className: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    },
    [TransactionType.ADJUSTMENT]: {
      variant: 'default',
      className: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
  };
  return variants[type] || variants[TransactionType.ADJUSTMENT];
};

/**
 * Detail Row Component
 */
interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border last:border-0">
      <div className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0 sm:w-40">
        {label}
      </div>
      <div className="flex-1 text-sm sm:text-base font-medium">{value}</div>
    </div>
  );
}

/**
 * Transaction Detail Sheet Component
 * Displays detailed information about a specific transaction
 */
export function TransactionDetailSheet({
  open,
  onOpenChange,
  transactionId,
}: TransactionDetailSheetProps) {
  const { data, loading, refetch } = useWalletTransaction(
    transactionId,
    !transactionId || !open,
  );

  useEffect(() => {
    if (open && transactionId) {
      refetch();
    }
  }, [open, transactionId, refetch]);

  const transaction = data?.walletTransaction;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Chi tiết giao dịch</SheetTitle>
          <SheetDescription>
            Thông tin đầy đủ về giao dịch này
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : transaction ? (
            <div className="space-y-6">
              {/* Transaction Header */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Loại giao dịch
                  </span>
                  <Badge className={getTransactionTypeBadge(transaction.type).className}>
                    {TRANSACTION_TYPE_LABELS[transaction.type]}
                  </Badge>
                </div>
                <div className="text-center py-2">
                  <div className="text-xs text-muted-foreground mb-1">
                    Số tiền giao dịch
                  </div>
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${
                      transaction.coin >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.coin >= 0 ? '+' : ''}
                    {formatCurrency(transaction.coin)}
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="border border-border rounded-lg overflow-hidden">
                <DetailRow label="Mã giao dịch" value={transaction.id} />
                <DetailRow label="Mã ví" value={transaction.walletId} />
                <DetailRow
                  label="Số dư sau GD"
                  value={
                    <span className="font-semibold">
                      {formatCurrency(transaction.balanceAfter)}
                    </span>
                  }
                />
                {transaction.description && (
                  <DetailRow
                    label="Mô tả"
                    value={
                      <span className="text-sm">{transaction.description}</span>
                    }
                  />
                )}
                {transaction.reference && (
                  <DetailRow
                    label="Mã tham chiếu"
                    value={
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {transaction.reference}
                      </code>
                    }
                  />
                )}
                <DetailRow
                  label="Thời gian"
                  value={formatDate(transaction.dateInput)}
                />
              </div>

              {/* Transaction Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs text-blue-800 font-medium mb-2">
                  📝 Thông tin bổ sung
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    • Giao dịch này{' '}
                    {transaction.coin >= 0 ? 'cộng thêm' : 'trừ đi'}{' '}
                    <strong>{formatCurrency(Math.abs(transaction.coin))}</strong>{' '}
                    vào ví
                  </p>
                  <p>
                    • Số dư ví sau khi thực hiện:{' '}
                    <strong>{formatCurrency(transaction.balanceAfter)}</strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <p>Không tìm thấy thông tin giao dịch</p>
            </div>
          )}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

