import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/auth/store/auth.store';
import { FilterOperator } from '@/constant';
import { useGraphQLQuery } from '@/graphql/hooks/use-graphql-query';
import { GET_ORDERS_QUERY, GET_ORDER_DETAILS_QUERY } from '@/graphql/queries/orders';
import { OrderDetailModal } from './OrderDetailModal';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Build filter for Orders query
  const orderFilters = useMemo(() => {
    const filters: any[] = [
      {
        field: 'userId',
        operator: FilterOperator.EQ,
        value: user?.id || '',
      },
    ];

    // Add date filter if date is selected
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      filters.push({
        field: 'dateOrder',
        operator: FilterOperator.EQ,
        value: dateStr,
      });
    }

    return { filters };
  }, [user?.id, selectedDate]);

  // Fetch orders
  const { data: ordersData, loading: ordersLoading, refetch } = useGraphQLQuery<{
    orders: {
      totalCount: number;
      items: Order[];
    };
  }>({
    query: GET_ORDERS_QUERY,
    variables: {
      filter: orderFilters,
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
    },
    skip: !user?.id,
  });

  // Fetch order details when order is selected
  const { data: orderDetailsData, loading: orderDetailsLoading } = useGraphQLQuery<{
    orderDetails: {
      totalCount: number;
      items: OrderDetail[];
    };
  }>({
    query: GET_ORDER_DETAILS_QUERY,
    variables: {
      filter: {
        filters: [
          {
            field: 'orderId',
            operator: FilterOperator.EQ,
            value: selectedOrderId || '',
          },
        ],
      },
    },
    skip: !selectedOrderId,
  });

  const loading = ordersLoading;
  const orders = ordersData?.orders?.items || [];
  const totalCount = ordersData?.orders?.totalCount || 0;
  const orderDetails = orderDetailsData?.orderDetails?.items || [];
  const totalPages = Math.ceil(totalCount / pageSize);

  // Refetch when pagination or date changes
  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [currentPage, selectedDate, user?.id, refetch]);

  const handleViewDetail = (order: Order) => {
    setSelectedOrderId(order.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleDateReset = () => {
    setSelectedDate(undefined);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Lịch sử đơn hàng
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Xem lại các đơn hàng của bạn
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              mode="input"
              variant="outline"
              id="date"
              className={cn(
                'h-10 justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground',
              )}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, 'dd/MM/yyyy')
              ) : (
                <span>Chọn ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
            {selectedDate && (
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDateReset}
                  className="w-full"
                >
                  Xóa bộ lọc ngày
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Mã đơn hàng</th>
              <th className="px-4 py-3">Tổng tiền</th>
              <th className="px-4 py-3">Ngày đặt hàng</th>
              <th className="px-4 py-3 rounded-tr-lg">Thời gian tạo</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-16 text-center text-sm text-slate-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Icon
                      icon="mdi:loading"
                      className="h-8 w-8 text-blue-500 animate-spin"
                    />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-16 text-center text-sm text-slate-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <Icon
                        icon="mdi:database-search-outline"
                        className="h-8 w-8 text-slate-400"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">
                        Không tìm thấy đơn hàng
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Thử thay đổi bộ lọc ngày
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleViewDetail(order)}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                      {order.id}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-slate-900">
                      {formatVND(order.sum)} VNĐ
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        icon="mdi:calendar-outline"
                        className="h-4 w-4 text-slate-400"
                      />
                      <span className="text-xs">
                        {order.dateOrder
                          ? formatDateTime(order.dateOrder)
                          : '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    <span className="text-xs">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-3">
        {loading ? (
          <div className="py-16 text-center text-sm text-slate-500">
            <Icon
              icon="mdi:loading"
              className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-3"
            />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Icon
                  icon="mdi:database-search-outline"
                  className="h-8 w-8 text-slate-400"
                />
              </div>
              <div>
                <p className="font-medium text-slate-700">
                  Không tìm thấy đơn hàng
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Thử thay đổi bộ lọc ngày
                </p>
              </div>
            </div>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleViewDetail(order)}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                    {order.id}
                  </code>
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {formatVND(order.sum)} VNĐ
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Ngày đặt hàng:</span>
                  <span className="text-xs text-slate-600">
                    {order.dateOrder
                      ? formatDateTime(order.dateOrder)
                      : '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Thời gian tạo:</span>
                  <span className="text-xs text-slate-600">
                    {formatDateTime(order.createdAt)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Icon icon="mdi:gesture-tap" className="h-4 w-4" />
                <span>Nhấn để xem chi tiết</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && orders.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Trang {currentPage + 1} / {totalPages} (Tổng: {totalCount} đơn hàng)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <Icon icon="mdi:chevron-left" className="h-4 w-4" />
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage >= totalPages - 1}
            >
              Sau
              <Icon icon="mdi:chevron-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <OrderDetailModal
        order={orders.find((o) => o.id === selectedOrderId) || null}
        orderDetails={orderDetails}
        isLoading={orderDetailsLoading}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OrderHistory;
