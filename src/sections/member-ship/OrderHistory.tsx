'use client';

import { Icon } from '@iconify/react';

interface Order {
  id: string;
  orderNumber: string;
  paymentAmount: string;
  paymentMethod: string;
  paymentTime: string;
  giftRatio: string;
  giftTraffic: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  denialReason?: string;
}

interface OrderHistoryProps {
  orders?: Order[];
}

const statusConfig = {
  Completed: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    icon: 'mdi:check-circle',
    iconColor: 'text-teal-500',
  },
  Pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: 'mdi:clock-outline',
    iconColor: 'text-amber-500',
  },
  Rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: 'mdi:close-circle',
    iconColor: 'text-red-500',
  },
};

const OrderHistory = ({ orders = [] }: OrderHistoryProps) => {
  const columns = [
    { key: 'orderNumber', label: 'Order Number', icon: 'mdi:receipt-text-outline' },
    { key: 'paymentAmount', label: 'Amount', icon: 'mdi:currency-usd' },
    { key: 'paymentMethod', label: 'Method', icon: 'mdi:credit-card-outline' },
    { key: 'paymentTime', label: 'Date', icon: 'mdi:calendar-outline' },
    { key: 'giftRatio', label: 'Gift Ratio', icon: 'mdi:percent' },
    { key: 'giftTraffic', label: 'Gift Traffic', icon: 'mdi:download-outline' },
    { key: 'status', label: 'Status', icon: 'mdi:check-circle-outline' },
    { key: 'denialReason', label: 'Notes', icon: 'mdi:text-box-outline' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Icon icon="mdi:history" className="text-xl text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Order History</h2>
              <p className="text-sm text-slate-500">Track your membership purchases and rewards</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
            <Icon icon="mdi:filter-variant" className="text-lg" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden">
        {orders.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {orders.map((order) => {
              const statusStyle = statusConfig[order.status];
              return (
                <div key={order.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{order.orderNumber}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{order.paymentTime}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      <Icon icon={statusStyle.icon} className={`text-sm ${statusStyle.iconColor}`} />
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs">Amount</p>
                      <p className="font-semibold text-slate-900">{order.paymentAmount}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Method</p>
                      <p className="text-slate-700">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Gift Ratio</p>
                      <p className="text-teal-600 font-medium">{order.giftRatio}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Gift Traffic</p>
                      <p className="text-slate-700">{order.giftTraffic}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon icon={column.icon} className="text-slate-400" />
                    {column.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length > 0 ? (
              orders.map((order) => {
                const statusStyle = statusConfig[order.status];
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-slate-900">{order.orderNumber}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-slate-900">{order.paymentAmount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">{order.paymentMethod}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">{order.paymentTime}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-teal-600">{order.giftRatio}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">{order.giftTraffic}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <Icon icon={statusStyle.icon} className={`text-sm ${statusStyle.iconColor}`} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-500">{order.denialReason || '-'}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
        <Icon icon="mdi:receipt-text-outline" className="text-3xl text-slate-400" />
      </div>
      <h3 className="text-sm font-medium text-slate-900 mb-1">No orders yet</h3>
      <p className="text-sm text-slate-500 text-center max-w-sm">
        Your membership order history will appear here once you make a purchase.
      </p>
    </div>
  );
}

export default OrderHistory;
