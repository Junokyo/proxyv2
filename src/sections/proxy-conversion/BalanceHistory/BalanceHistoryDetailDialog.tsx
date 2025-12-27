import React from 'react';
import Iconify from '@/components/iconify/iconify';
import type { BalanceHistoryItem } from './BalanceHistorySection';

interface BalanceHistoryDetailDialogProps {
  item: BalanceHistoryItem;
  onClose: () => void;
}

const BalanceHistoryDetailDialog: React.FC<BalanceHistoryDetailDialogProps> = ({
  item,
  onClose,
}) => {
  const isPositive = item.amount > 0;

  const getTypeInfo = (type: string) => {
    const types: Record<
      string,
      { label: string; icon: string; color: string; bgColor: string }
    > = {
      deposit: {
        label: 'Nạp tiền',
        icon: 'mdi:plus-circle',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      },
      withdraw: {
        label: 'Rút tiền',
        icon: 'mdi:minus-circle',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      },
      conversion: {
        label: 'Qui đổi',
        icon: 'mdi:swap-horizontal-circle',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      purchase: {
        label: 'Mua hàng',
        icon: 'mdi:shopping',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
      },
      refund: {
        label: 'Hoàn tiền',
        icon: 'mdi:cash-refund',
        color: 'text-teal-600',
        bgColor: 'bg-teal-50',
      },
      fee: {
        label: 'Phí dịch vụ',
        icon: 'mdi:cash-minus',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      },
    };
    return types[type] || types.deposit;
  };

  const typeInfo = getTypeInfo(item.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${typeInfo.bgColor}`}
            >
              <Iconify
                icon={typeInfo.icon}
                width={24}
                className={typeInfo.color}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Chi Tiết Giao Dịch
              </h3>
              <p className="text-xs text-slate-500">{item.transactionCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <Iconify icon="mdi:close" width={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Transaction Type & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`rounded-xl ${typeInfo.bgColor} p-4 border border-${typeInfo.color.replace('text-', '')}-100`}
            >
              <p className="text-xs font-medium text-slate-500 mb-2">
                Loại Giao Dịch
              </p>
              <div className="flex items-center gap-2">
                <Iconify
                  icon={typeInfo.icon}
                  width={20}
                  className={typeInfo.color}
                />
                <span className={`text-base font-semibold ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
              </div>
            </div>

            <div
              className={`rounded-xl p-4 border ${
                item.status === 'success'
                  ? 'bg-green-50 border-green-100'
                  : item.status === 'pending'
                    ? 'bg-yellow-50 border-yellow-100'
                    : 'bg-red-50 border-red-100'
              }`}
            >
              <p className="text-xs font-medium text-slate-500 mb-2">
                Trạng Thái
              </p>
              <div className="flex items-center gap-2">
                <Iconify
                  icon={
                    item.status === 'success'
                      ? 'mdi:check-circle'
                      : item.status === 'pending'
                        ? 'mdi:clock-outline'
                        : 'mdi:close-circle'
                  }
                  width={20}
                  className={
                    item.status === 'success'
                      ? 'text-green-600'
                      : item.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }
                />
                <span
                  className={`text-base font-semibold ${
                    item.status === 'success'
                      ? 'text-green-700'
                      : item.status === 'pending'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                  }`}
                >
                  {item.status === 'success'
                    ? 'Thành công'
                    : item.status === 'pending'
                      ? 'Đang xử lý'
                      : 'Thất bại'}
                </span>
              </div>
            </div>
          </div>

          {/* Amount Change */}
          <div
            className={`rounded-xl p-6 border-2 ${isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
          >
            <p className="text-xs font-medium text-slate-500 mb-2">
              Số Tiền Thay Đổi
            </p>
            <p
              className={`text-4xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {isPositive ? '+' : ''}
              {item.amount > 0 ? '$' : '-$'}
              {Math.abs(item.amount).toFixed(2)}
            </p>
          </div>

          {/* Balance Flow */}
          <div className="rounded-xl bg-slate-50 p-6 border border-slate-100">
            <p className="text-sm font-semibold text-slate-700 mb-4">
              Biến Động Số Dư
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Số Dư Trước</p>
                <p className="text-2xl font-bold text-slate-700">
                  ${item.balanceBefore.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-center px-4">
                <Iconify
                  icon={
                    isPositive
                      ? 'mdi:arrow-right-thick'
                      : 'mdi:arrow-right-thick'
                  }
                  width={32}
                  className={isPositive ? 'text-green-500' : 'text-red-500'}
                />
              </div>

              <div className="flex-1 text-right">
                <p className="text-xs text-slate-500 mb-1">Số Dư Sau</p>
                <p
                  className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-blue-600'}`}
                >
                  ${item.balanceAfter.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
            <p className="text-xs font-medium text-blue-700 mb-2">Mô Tả</p>
            <p className="text-sm text-slate-700">{item.description}</p>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              Thông Tin Chi Tiết
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Mã Giao Dịch</p>
                <p className="text-sm font-medium text-slate-900">
                  {item.transactionCode}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Thời Gian</p>
                <p className="text-sm font-medium text-slate-900">
                  {item.createdAt}
                </p>
              </div>

              {item.paymentMethod && (
                <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Phương Thức</p>
                  <div className="flex items-center gap-2">
                    <Iconify
                      icon={
                        item.paymentMethod.includes('ngân hàng')
                          ? 'mdi:bank'
                          : item.paymentMethod.includes('PayPal')
                            ? 'mdi:paypal'
                            : item.paymentMethod.includes('tín dụng')
                              ? 'mdi:credit-card'
                              : 'mdi:wallet-outline'
                      }
                      width={16}
                      className="text-slate-600"
                    />
                    <p className="text-sm font-medium text-slate-900">
                      {item.paymentMethod}
                    </p>
                  </div>
                </div>
              )}

              {item.relatedOrder && (
                <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">
                    Đơn Hàng Liên Quan
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {item.relatedOrder}
                  </p>
                </div>
              )}
            </div>

            {/* Metadata */}
            {item.metadata && Object.keys(item.metadata).length > 0 && (
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-xs font-medium text-slate-700 mb-3">
                  Thông Tin Bổ Sung
                </p>
                <div className="space-y-2">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-slate-500 capitalize">
                        {key
                          .replace(/_/g, ' ')
                          .replace(/([A-Z])/g, ' $1')
                          .trim()}
                        :
                      </span>
                      <span className="font-medium text-slate-900">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              <Iconify icon="mdi:file-pdf-box" width={18} />
              Xuất PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              <Iconify icon="mdi:printer" width={18} />
              In Hóa Đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceHistoryDetailDialog;
