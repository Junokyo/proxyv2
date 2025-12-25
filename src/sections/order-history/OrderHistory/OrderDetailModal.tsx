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
  // Thông tin sản phẩm chi tiết
  productDetails?: {
    description?: string;
    category?: string;
    sku?: string;
    specifications?: string;
  };
  // Thông tin khách hàng
  customer?: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  // Thông tin nhà cung cấp
  supplier?: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
  };
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-0">
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

            {/* Customer Information */}
            {order.customer && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="mdi:account-circle"
                    className="h-5 w-5 text-slate-600"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Thông tin khách hàng
                  </span>
                </div>
                <div className="ml-7 space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">
                      Tên khách hàng
                    </span>
                    <span className="text-xs text-slate-900 text-right max-w-[60%] font-medium">
                      {order.customer.name}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">Email</span>
                    <span className="text-xs text-slate-900 text-right max-w-[60%]">
                      {order.customer.email}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">
                      Số điện thoại
                    </span>
                    <span className="text-xs text-slate-900 text-right max-w-[60%]">
                      {order.customer.phone}
                    </span>
                  </div>
                  {order.customer.address && (
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-slate-500">Địa chỉ</span>
                      <span className="text-xs text-slate-900 text-right max-w-[60%]">
                        {order.customer.address}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Supplier Information */}
            {order.supplier && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    icon="mdi:truck-delivery"
                    className="h-5 w-5 text-slate-600"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Thông tin nhà cung cấp
                  </span>
                </div>
                <div className="ml-7 space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">Nhà cung cấp</span>
                    <span className="text-xs text-slate-900 text-right max-w-[60%] font-medium">
                      {order.supplier.name}
                    </span>
                  </div>
                  {order.supplier.company && (
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-slate-500">Công ty</span>
                      <span className="text-xs text-slate-900 text-right max-w-[60%]">
                        {order.supplier.company}
                      </span>
                    </div>
                  )}
                  {order.supplier.email && (
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-slate-500">Email</span>
                      <span className="text-xs text-slate-900 text-right max-w-[60%]">
                        {order.supplier.email}
                      </span>
                    </div>
                  )}
                  {order.supplier.phone && (
                    <div className="flex items-start justify-between">
                      <span className="text-xs text-slate-500">
                        Số điện thoại
                      </span>
                      <span className="text-xs text-slate-900 text-right max-w-[60%]">
                        {order.supplier.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Icon
                  icon="mdi:package-variant-closed"
                  className="h-5 w-5 text-slate-600"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Chi tiết sản phẩm
                </span>
              </div>
              <div className="ml-7 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Sản phẩm</span>
                  <span className="text-xs font-medium text-slate-900 text-right max-w-[60%]">
                    {order.product}
                  </span>
                </div>

                {order.productDetails?.description && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Mô tả</span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {order.productDetails.description}
                    </p>
                  </div>
                )}

                {order.productDetails?.category && (
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">Danh mục</span>
                    <span className="text-xs text-slate-900 text-right max-w-[60%]">
                      {order.productDetails.category}
                    </span>
                  </div>
                )}

                {order.productDetails?.sku && (
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-500">Mã SKU</span>
                    <code className="text-xs font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {order.productDetails.sku}
                    </code>
                  </div>
                )}

                {order.productDetails?.specifications && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">
                      Thông số kỹ thuật
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {order.productDetails.specifications}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-700">
                    Tổng tiền
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {order.amount}
                  </span>
                </div>
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
