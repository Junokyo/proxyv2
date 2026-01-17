import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@/auth/store/auth.store';
import { useGraphQLQuery } from '@/graphql/hooks/use-graphql-query';
import { GET_WALLET_BY_USER_ID } from '@/graphql/queries/wallets';
import { GET_WALLET_TRANSACTIONS } from '@/graphql/queries/wallet-transactions';
import { DepositDetailModal } from './DepositDetailModal';

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

const DepositHistory: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDeposit, setSelectedDeposit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch wallet by userId
  const { data: walletData, loading: walletLoading } = useGraphQLQuery<{
    walletByUserId: {
      id: string;
      userId: string;
      balance: number;
      sum: number;
      promotion: number;
      createdAt: string;
      updatedAt: string;
    };
  }>({
    query: GET_WALLET_BY_USER_ID,
    variables: {
      userId: user?.id || '',
    },
    skip: !user?.id,
  });

  const walletId = walletData?.walletByUserId?.id;

  // Fetch wallet transactions
  const { data: transactionsData, loading: transactionsLoading } = useGraphQLQuery<{
    walletTransactions: {
      totalCount: number;
      items: Array<{
        id: string;
        walletId: string;
        type: string;
        description: string;
        balanceAfter: number;
        reference: string;
        dateInput: string;
      }>;
    };
  }>({
    query: GET_WALLET_TRANSACTIONS,
    variables: {
      walletId: walletId || '',
      pagination: {
        page: currentPage,
        limit: pageSize,
      },
      searchQuery: searchTerm || undefined,
    },
    skip: !walletId,
  });

  const loading = walletLoading || transactionsLoading;
  const transactions = transactionsData?.walletTransactions?.items || [];
  const totalCount = transactionsData?.walletTransactions?.totalCount || 0;

  // Filter data by status filter
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') {
      return transactions;
    }
    return transactions.filter((record) => {
      // Map transaction type to status
      const status = record.type === 'DEPOSIT' ? 'success' : 'processing';
      return status === statusFilter;
    });
  }, [transactions, statusFilter]);

  const handleViewDetail = (deposit: any) => {
    setSelectedDeposit(deposit);
    setIsModalOpen(true);
  };

  const getStatusBadge = (type: string) => {
    // Map transaction type to status display
    if (type === 'DEPOSIT') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
          <Icon icon="mdi:check-circle" className="h-4 w-4" />
          Thành công
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
        <Icon icon="mdi:autorenew" className="h-4 w-4" />
        Đang xử lý
      </span>
    );
  };

  if (loading) {
    return (
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center py-16">
          <Icon icon="mdi:loading" className="h-10 w-10 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Lịch sử nạp tiền
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Xem lại các giao dịch nạp tiền của bạn
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
            placeholder="Tìm mã giao dịch, ngân hàng..."
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
          <option value="processing">Đang xử lý</option>
          <option value="pending">Chờ xử lý</option>
          <option value="failed">Thất bại</option>
        </select>
      </div>

      {/* Table - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Mã giao dịch</th>
              <th className="px-4 py-3">Số tiền</th>
              <th className="px-4 py-3">Loại</th>
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
                      {record.reference || record.id}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-slate-900">
                      {formatVND(record.balanceAfter)} ₫
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      <Icon icon="mdi:swap-horizontal" className="h-3.5 w-3.5" />
                      {record.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">{getStatusBadge(record.type)}</td>
                  <td className="px-4 py-4 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        icon="mdi:calendar-outline"
                        className="h-4 w-4 text-slate-400"
                      />
                      <span className="text-xs">
                        {formatDateTime(record.dateInput)}
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
                    {record.reference || record.id}
                  </code>
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {formatVND(record.balanceAfter)} ₫
                  </p>
                </div>
                <div>{getStatusBadge(record.type)}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Loại giao dịch:</span>
                  <span className="font-medium text-slate-900">{record.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Mô tả:</span>
                  <span className="text-xs text-slate-600">
                    {record.description || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Thời gian:</span>
                  <span className="text-xs text-slate-600">
                    {formatDateTime(record.dateInput)}
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
                <p className="text-xs font-medium text-green-600">
                  Nạp tiền
                </p>
                <p className="text-2xl font-bold text-green-700 mt-1">
                  {filteredData.filter((r) => r.type === 'DEPOSIT').length}
                </p>
              </div>
              <Icon
                icon="mdi:check-circle"
                className="h-10 w-10 text-green-400"
              />
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  Tổng số dư
                </p>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {walletData?.walletByUserId?.balance ? formatVND(walletData.walletByUserId.balance) : '0'} ₫
                </p>
              </div>
              <Icon
                icon="mdi:wallet"
                className="h-10 w-10 text-blue-400"
              />
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-600">Khuyến mãi</p>
                <p className="text-2xl font-bold text-purple-700 mt-1">
                  {walletData?.walletByUserId?.promotion ? formatVND(walletData.walletByUserId.promotion) : '0'} ₫
                </p>
              </div>
              <Icon
                icon="mdi:gift"
                className="h-10 w-10 text-purple-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <DepositDetailModal
        deposit={selectedDeposit}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDeposit(null);
        }}
      />
    </div>
  );
};

export default DepositHistory;

