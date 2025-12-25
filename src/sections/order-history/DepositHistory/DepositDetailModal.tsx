import React from 'react';
import { Icon } from '@iconify/react';
import { DepositRecord } from '@/types/deposit.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DepositDetailModalProps {
  deposit: DepositRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const getStatusConfig = (status: DepositRecord['status']) => {
  switch (status) {
    case 'success':
      return {
        icon: 'mdi:check-circle',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Thành công',
      };
    case 'processing':
      return {
        icon: 'mdi:autorenew',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'Đang xử lý',
      };
    case 'pending':
      return {
        icon: 'mdi:clock-outline',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        label: 'Chờ xử lý',
      };
    case 'failed':
      return {
        icon: 'mdi:close-circle',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Thất bại',
      };
  }
};

export const DepositDetailModal: React.FC<DepositDetailModalProps> = ({
  deposit,
  isOpen,
  onClose,
}) => {
  if (!deposit) return null;

  const statusConfig = getStatusConfig(deposit.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Icon icon="mdi:file-document-outline" className="h-5 w-5 text-blue-500" />
            Chi tiết giao dịch
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Status Card */}
          <div className={`rounded-lg border-2 ${statusConfig.border} ${statusConfig.bg} p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon={statusConfig.icon} className={`h-8 w-8 ${statusConfig.color}`} />
                <div>
                  <p className="text-xs text-slate-500">Trạng thái</p>
                  <p className={`text-lg font-semibold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </p>
                </div>
              </div>
              {deposit.status === 'processing' && (
                <div className="animate-pulse">
                  <Icon icon="mdi:autorenew" className="h-6 w-6 text-blue-500 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Transaction Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mã giao dịch */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs text-slate-500 mb-1">Mã giao dịch</p>
              <code className="text-sm font-semibold text-slate-900 font-mono">
                {deposit.transactionCode}
              </code>
            </div>

            {/* Số tiền */}
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs text-green-700 mb-1">Số tiền</p>
              <p className="text-lg font-bold text-green-600">
                {formatVND(deposit.amount)} VNĐ
              </p>
            </div>
          </div>

          {/* Bank Info */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="mdi:bank" className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                Thông tin ngân hàng
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-500">Ngân hàng</p>
                <p className="text-sm font-semibold text-slate-900">{deposit.bankName}</p>
              </div>
              
              {deposit.accountNumber && (
                <div>
                  <p className="text-xs text-slate-500">Số tài khoản</p>
                  <p className="text-sm font-semibold text-slate-900">{deposit.accountNumber}</p>
                </div>
              )}
              
              {deposit.accountName && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-500">Tên tài khoản</p>
                  <p className="text-sm font-semibold text-slate-900">{deposit.accountName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="mdi:timeline-clock-outline" className="h-5 w-5 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                Thời gian
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <Icon icon="mdi:clock-outline" className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Thời gian tạo</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDateTime(deposit.createdAt)}
                  </p>
                </div>
              </div>

              {deposit.completedAt && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                    <Icon icon="mdi:check" className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Thời gian hoàn thành</p>
                    <p className="text-sm font-medium text-slate-900">
                      {formatDateTime(deposit.completedAt)}
                    </p>
                  </div>
                </div>
              )}

              {deposit.updatedAt && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 flex-shrink-0">
                    <Icon icon="mdi:update" className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">Cập nhật lần cuối</p>
                    <p className="text-sm font-medium text-slate-900">
                      {formatDateTime(deposit.updatedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Denial Reason or Note */}
          {(deposit.denialReason || deposit.note) && (
            <div className={`rounded-lg border p-4 ${
              deposit.status === 'failed' 
                ? 'bg-red-50 border-red-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start gap-2">
                <Icon 
                  icon={deposit.status === 'failed' ? 'mdi:alert-circle' : 'mdi:information'} 
                  className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    deposit.status === 'failed' ? 'text-red-600' : 'text-blue-600'
                  }`}
                />
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">
                    {deposit.status === 'failed' ? 'Lý do từ chối' : 'Ghi chú'}
                  </p>
                  <p className="text-sm text-slate-700">
                    {deposit.denialReason || deposit.note}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-slate-100 hover:bg-slate-200 py-3 text-sm font-medium text-slate-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

