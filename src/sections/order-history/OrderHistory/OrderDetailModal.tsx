import React from 'react';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Order {
  id: string;
  userId: string;
  sum: number;
  dateOrder: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetail {
  id: string;
  orderId: string;
  providerId: string;
  proxyTypeId: string;
  countryId: string;
  code: string;
  price: number;
  quantity: number;
  tranCode: string;
  detail: string;
  status: string;
  expiredDate: string;
}

interface OrderDetailModalProps {
  order: Order | null;
  orderDetails: OrderDetail[];
  isLoading: boolean;
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
  });
};

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  orderDetails,
  isLoading,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-0">
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
            {/* Order Info */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Mã đơn hàng</span>
                <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                  {order.id}
                </code>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Tổng tiền</span>
                <span className="text-lg font-bold text-slate-900">
                  {formatVND(order.sum)} VNĐ
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Ngày đặt hàng</span>
                <span className="text-sm text-slate-900">
                  {order.dateOrder ? formatDateTime(order.dateOrder) : '-'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Thời gian tạo</span>
                <span className="text-sm text-slate-900">
                  {formatDateTime(order.createdAt)}
                </span>
              </div>
            </div>

            {/* Order Details */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  icon="mdi:package-variant-closed"
                  className="h-5 w-5 text-slate-600"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Chi tiết đơn hàng ({orderDetails.length} mục)
                </span>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Icon
                    icon="mdi:loading"
                    className="h-8 w-8 text-blue-500 animate-spin"
                  />
                </div>
              ) : orderDetails.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-500">
                  <p>Không có chi tiết đơn hàng</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orderDetails.map((detail, index) => (
                    <div
                      key={detail.id}
                      className="rounded-lg bg-blue-50 border border-blue-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-blue-700">
                          Mục {index + 1}
                        </span>
                        {detail.status && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                            <Icon icon="mdi:circle" className="h-2 w-2" />
                            {detail.status}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500">Mã:</span>
                          <code className="ml-2 rounded bg-white px-2 py-1 font-mono font-semibold text-slate-700">
                            {detail.code}
                          </code>
                        </div>
                        <div>
                          <span className="text-slate-500">Giá:</span>
                          <span className="ml-2 font-semibold text-slate-900">
                            {formatVND(detail.price)} VNĐ
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Số lượng:</span>
                          <span className="ml-2 font-semibold text-slate-900">
                            {detail.quantity}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Tổng:</span>
                          <span className="ml-2 font-bold text-green-600">
                            {formatVND(detail.price * detail.quantity)} VNĐ
                          </span>
                        </div>
                        {detail.providerId && (
                          <div>
                            <span className="text-slate-500">Provider ID:</span>
                            <span className="ml-2 text-slate-700">
                              {detail.providerId}
                            </span>
                          </div>
                        )}
                        {detail.proxyTypeId && (
                          <div>
                            <span className="text-slate-500">Proxy Type ID:</span>
                            <span className="ml-2 text-slate-700">
                              {detail.proxyTypeId}
                            </span>
                          </div>
                        )}
                        {detail.countryId && (
                          <div>
                            <span className="text-slate-500">Country ID:</span>
                            <span className="ml-2 text-slate-700">
                              {detail.countryId}
                            </span>
                          </div>
                        )}
                        {detail.tranCode && (
                          <div className="col-span-2">
                            <span className="text-slate-500">Mã giao dịch:</span>
                            <code className="ml-2 rounded bg-white px-2 py-1 font-mono text-slate-700">
                              {detail.tranCode}
                            </code>
                          </div>
                        )}
                        {detail.detail && (
                          <div className="col-span-2">
                            <span className="text-slate-500">Chi tiết:</span>
                            <p className="mt-1 text-slate-700">{detail.detail}</p>
                          </div>
                        )}
                        {detail.expiredDate && (
                          <div className="col-span-2">
                            <span className="text-slate-500">Hết hạn:</span>
                            <span className="ml-2 text-slate-700">
                              {formatDateTime(detail.expiredDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
