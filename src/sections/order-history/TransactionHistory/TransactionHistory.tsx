import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { TransactionDetailModal } from './TransactionDetailModal';

interface TransactionRecord {
  id: string;
  transactionId: string;
  type: string;
  amount: string;
  status: string;
  date: string;
  description: string;
}

const mockTransactions: TransactionRecord[] = [
  {
    id: '1',
    transactionId: 'TXN-2024-001',
    type: 'Nạp tiền',
    amount: '+$500.00',
    status: 'success',
    date: '15 Dec, 2024',
    description: 'Nạp tiền qua ngân hàng Vietcombank',
  },
  {
    id: '2',
    transactionId: 'TXN-2024-002',
    type: 'Thanh toán',
    amount: '-$25.00',
    status: 'success',
    date: '14 Dec, 2024',
    description: 'Thanh toán gói Residential Proxies',
  },
  {
    id: '3',
    transactionId: 'TXN-2024-003',
    type: 'Hoàn tiền',
    amount: '+$10.00',
    status: 'success',
    date: '13 Dec, 2024',
    description: 'Hoàn tiền gói proxy không sử dụng',
  },
  {
    id: '4',
    transactionId: 'TXN-2024-004',
    type: 'Thanh toán',
    amount: '-$50.00',
    status: 'pending',
    date: '12 Dec, 2024',
    description: 'Thanh toán gói Unlimited Proxies',
  },
  {
    id: '5',
    transactionId: 'TXN-2024-005',
    type: 'Nạp tiền',
    amount: '+$200.00',
    status: 'success',
    date: '11 Dec, 2024',
    description: 'Nạp tiền qua PayPal',
  },
  {
    id: '6',
    transactionId: 'TXN-2024-006',
    type: 'Thanh toán',
    amount: '-$15.00',
    status: 'failed',
    date: '10 Dec, 2024',
    description: 'Thanh toán API scraping - thất bại',
  },
];

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter data
  const filteredData = mockTransactions.filter((record) => {
    const matchSearch =
      record.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === 'all' || record.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleViewDetail = (transaction: TransactionRecord) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: TransactionRecord['status']) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            <Icon icon="mdi:check-circle" className="h-4 w-4" />
            Thành công
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-700">
            <Icon icon="mdi:clock-outline" className="h-4 w-4" />
            Đang chờ
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
            <Icon icon="mdi:close-circle" className="h-4 w-4" />
            Thất bại
          </span>
        );
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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Lịch sử giao dịch
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Xem lại các giao dịch của bạn
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex h-10 flex-1 min-w-[200px] items-center rounded-lg border border-slate-200 bg-slate-50 pl-3 text-sm text-slate-600 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <Icon icon="mdi:magnify" className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm mã giao dịch, loại giao dịch..."
            className="h-full w-full bg-transparent px-3 text-sm outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="success">Thành công</option>
          <option value="pending">Đang chờ</option>
          <option value="failed">Thất bại</option>
        </select>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Mã giao dịch</th>
              <th className="px-4 py-3">Loại giao dịch</th>
              <th className="px-4 py-3">Số tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 rounded-tr-lg">Thời gian</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
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
                        Không tìm thấy giao dịch
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((record) => (
                <tr
                  key={record.id}
                  onClick={() => handleViewDetail(record)}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                      {record.transactionId}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      <Icon
                        icon={getTypeIcon(record.type)}
                        className="h-3.5 w-3.5"
                      />
                      {record.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`font-semibold ${record.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {record.amount}
                    </span>
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        icon="mdi:calendar-outline"
                        className="h-4 w-4 text-slate-400"
                      />
                      <span className="text-xs">
                        {formatDateTime(record.date)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-3">
        {filteredData.length === 0 ? (
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
                  Không tìm thấy giao dịch
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredData.map((record) => (
            <div
              key={record.id}
              onClick={() => handleViewDetail(record)}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-700">
                    {record.transactionId}
                  </code>
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {record.amount}
                  </p>
                </div>
                <div>{getStatusBadge(record.status)}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Loại giao dịch:</span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    <Icon
                      icon={getTypeIcon(record.type)}
                      className="h-3.5 w-3.5"
                    />
                    {record.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Thời gian:</span>
                  <span className="text-xs text-slate-600">
                    {formatDateTime(record.date)}
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

      {/* Stats Summary */}
      {filteredData.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-600">Thành công</p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  {filteredData.filter((r) => r.status === 'success').length}
                </p>
              </div>
              <Icon
                icon="mdi:check-circle"
                className="h-10 w-10 text-green-400"
              />
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-yellow-600">Đang chờ</p>
                <p className="text-2xl font-bold text-yellow-700 mt-1">
                  {filteredData.filter((r) => r.status === 'pending').length}
                </p>
              </div>
              <Icon
                icon="mdi:clock-outline"
                className="h-10 w-10 text-yellow-400"
              />
            </div>
          </div>

          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-red-600">Thất bại</p>
                <p className="text-2xl font-bold text-red-700 mt-1">
                  {filteredData.filter((r) => r.status === 'failed').length}
                </p>
              </div>
              <Icon
                icon="mdi:close-circle"
                className="h-10 w-10 text-red-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
};

export default TransactionHistory;
