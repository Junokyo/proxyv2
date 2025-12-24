import React from 'react';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OrderRecord {
  id: string;
  orderId: string;
  product: string;
  amount: string;
  status: string;
  date: string;
  paymentMethod: string;
}

interface OrderDetailModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'mdi:check-circle';
      case 'processing':
        return 'mdi:autorenew';
      case 'failed':
        return 'mdi:close-circle';
      default:
        return 'mdi:information-outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return 'mdi:credit-card-outline';
      case 'paypal':
        return 'mdi:paypal';
      case 'bank transfer':
        return 'mdi:bank-outline';
      default:
        return 'mdi:wallet-outline';
    }
  };

  const mockOrderItems = [
    {
      name: order.product,
      quantity: 1,
      price: order.amount,
      total: order.amount,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <div className="p-6">
          <DialogHeader className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Icon
                icon="mdi:package-variant"
                className="h-8 w-8 text-slate-600"
              />
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Chi tiết đơn hàng
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Order ID */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Mã đơn hàng</span>
              <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                {order.orderId}
              </code>
            </div>

            {/* Product */}
            <div className="flex items-start justify-between">
              <span className="text-sm text-slate-500">Sản phẩm</span>
              <span className="text-sm text-slate-900 text-right max-w-[60%]">
                {order.product}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Tổng tiền</span>
              <span className="text-lg font-bold text-slate-900">
                {order.amount}
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">PT thanh toán</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                <Icon
                  icon={getPaymentMethodIcon(order.paymentMethod)}
                  className="h-3.5 w-3.5"
                />
                {order.paymentMethod}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Trạng thái</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(order.status)} border`}
              >
                <Icon icon={getStatusIcon(order.status)} className="h-4 w-4" />
                {order.status === 'completed'
                  ? 'Hoàn thành'
                  : order.status === 'processing'
                    ? 'Đang xử lý'
                    : order.status === 'failed'
                      ? 'Thất bại'
                      : order.status}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Thời gian</span>
              <span className="text-sm text-slate-900">
                {new Date(order.date).toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {/* Order Items */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">Chi tiết sản phẩm</span>
              <div className="mt-2 space-y-2">
                {mockOrderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-slate-900">{item.name}</span>
                    <span className="font-medium text-slate-900">
                      {item.total}
                    </span>
                  </div>
                ))}
              </div>
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
