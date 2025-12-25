import React from 'react';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TransactionRecord {
  id: string;
  transactionId: string;
  type: string;
  amount: string;
  status: string;
  date: string;
  description: string;
}

interface TransactionDetailModalProps {
  transaction: TransactionRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  if (!transaction) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return 'mdi:check-circle';
      case 'pending':
        return 'mdi:clock-outline';
      case 'failed':
        return 'mdi:close-circle';
      default:
        return 'mdi:information-outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'nạp tiền':
        return 'mdi:cash-plus';
      case 'thanh toán':
        return 'mdi:credit-card-outline';
      case 'hoàn tiền':
        return 'mdi:cash-refund';
      default:
        return 'mdi:swap-horizontal';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <div className="p-6">
          <DialogHeader className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Icon
                icon={getTypeIcon(transaction.type)}
                className="h-8 w-8 text-slate-600"
              />
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Chi tiết giao dịch
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Transaction ID */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Mã giao dịch</span>
              <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                {transaction.transactionId}
              </code>
            </div>

            {/* Type */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Loại giao dịch</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                <Icon
                  icon={getTypeIcon(transaction.type)}
                  className="h-3.5 w-3.5"
                />
                {transaction.type}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Số tiền</span>
              <span
                className={`text-lg font-bold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
              >
                {transaction.amount}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Trạng thái</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(transaction.status)} border`}
              >
                <Icon
                  icon={getStatusIcon(transaction.status)}
                  className="h-4 w-4"
                />
                {transaction.status === 'success'
                  ? 'Thành công'
                  : transaction.status === 'pending'
                    ? 'Đang chờ'
                    : transaction.status === 'failed'
                      ? 'Thất bại'
                      : transaction.status}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Thời gian</span>
              <span className="text-sm text-slate-900">
                {new Date(transaction.date).toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">Mô tả</span>
              <p className="mt-2 text-sm text-slate-900">
                {transaction.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
