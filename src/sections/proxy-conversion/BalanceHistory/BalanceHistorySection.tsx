import React, { useState } from 'react';
import Iconify from '@/components/iconify/iconify';
import BalanceHistoryDetailDialog from './BalanceHistoryDetailDialog';

// Types
export interface BalanceHistoryItem {
  id: string;
  transactionCode: string;
  type: 'deposit' | 'withdraw' | 'conversion' | 'purchase' | 'refund' | 'fee';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  paymentMethod?: string;
  relatedOrder?: string;
  createdAt: string;
  metadata?: Record<string, string | number | boolean>;
}

// Mock data với nhiều loại biến động
const MOCK_BALANCE_HISTORY: BalanceHistoryItem[] = [
  {
    id: '1',
    transactionCode: 'TXN20241227001',
    type: 'deposit',
    amount: 500.0,
    balanceBefore: 1250.5,
    balanceAfter: 1750.5,
    description: 'Nạp tiền vào ví',
    status: 'success',
    paymentMethod: 'Chuyển khoản ngân hàng',
    relatedOrder: 'ORD20241227001',
    createdAt: '2024-12-27 10:30:25',
    metadata: { bank: 'VCB', accountNumber: '****1234' },
  },
  {
    id: '2',
    transactionCode: 'TXN20241227002',
    type: 'conversion',
    amount: -77.0,
    balanceBefore: 1750.5,
    balanceAfter: 1673.5,
    description: 'Qui đổi gói Residential Proxies 100GB',
    status: 'success',
    relatedOrder: 'CONV20241227002',
    createdAt: '2024-12-27 11:15:42',
    metadata: {
      plan: 'Residential Proxies',
      amount: '100GB',
      pricePerGB: 0.77,
    },
  },
  {
    id: '3',
    transactionCode: 'TXN20241226003',
    type: 'purchase',
    amount: -120.0,
    balanceBefore: 1673.5,
    balanceAfter: 1553.5,
    description: 'Mua gói ISP Proxies - 30 ngày',
    status: 'success',
    relatedOrder: 'ORD20241226003',
    createdAt: '2024-12-26 14:22:10',
    metadata: { plan: 'ISP Proxies', duration: '30 days', ips: 10 },
  },
  {
    id: '4',
    transactionCode: 'TXN20241226004',
    type: 'deposit',
    amount: 300.0,
    balanceBefore: 1553.5,
    balanceAfter: 1853.5,
    description: 'Nạp tiền qua PayPal',
    status: 'success',
    paymentMethod: 'PayPal',
    relatedOrder: 'ORD20241226004',
    createdAt: '2024-12-26 09:45:33',
    metadata: { paypalEmail: 'user@example.com' },
  },
  {
    id: '5',
    transactionCode: 'TXN20241225005',
    type: 'fee',
    amount: -5.0,
    balanceBefore: 1853.5,
    balanceAfter: 1848.5,
    description: 'Phí giao dịch chuyển khoản quốc tế',
    status: 'success',
    createdAt: '2024-12-25 16:10:55',
    metadata: { feeType: 'international_transfer' },
  },
  {
    id: '6',
    transactionCode: 'TXN20241225006',
    type: 'refund',
    amount: 50.0,
    balanceBefore: 1848.5,
    balanceAfter: 1898.5,
    description: 'Hoàn tiền do hủy đơn hàng',
    status: 'success',
    relatedOrder: 'ORD20241220001',
    createdAt: '2024-12-25 13:20:18',
    metadata: { reason: 'Order cancelled by admin' },
  },
  {
    id: '7',
    transactionCode: 'TXN20241224007',
    type: 'deposit',
    amount: 200.0,
    balanceBefore: 1898.5,
    balanceAfter: 2098.5,
    description: 'Nạp tiền qua thẻ tín dụng',
    status: 'pending',
    paymentMethod: 'Thẻ tín dụng',
    relatedOrder: 'ORD20241224007',
    createdAt: '2024-12-24 08:15:42',
    metadata: { cardLast4: '5678' },
  },
  {
    id: '8',
    transactionCode: 'TXN20241223008',
    type: 'withdraw',
    amount: -100.0,
    balanceBefore: 2098.5,
    balanceAfter: 1998.5,
    description: 'Rút tiền về tài khoản ngân hàng',
    status: 'failed',
    paymentMethod: 'Chuyển khoản ngân hàng',
    createdAt: '2024-12-23 17:30:25',
    metadata: { reason: 'Thông tin tài khoản không chính xác', bank: 'TCB' },
  },
  {
    id: '9',
    transactionCode: 'TXN20241222009',
    type: 'conversion',
    amount: -40.0,
    balanceBefore: 1998.5,
    balanceAfter: 1958.5,
    description: 'Qui đổi gói Rotating ISP Proxies 100GB',
    status: 'success',
    relatedOrder: 'CONV20241222009',
    createdAt: '2024-12-22 12:45:10',
    metadata: {
      plan: 'Rotating ISP Proxies',
      amount: '100GB',
      pricePerGB: 0.4,
    },
  },
  {
    id: '10',
    transactionCode: 'TXN20241221010',
    type: 'purchase',
    amount: -85.0,
    balanceBefore: 1958.5,
    balanceAfter: 1873.5,
    description: 'Mua gói Datacenter Proxies - 90 ngày',
    status: 'success',
    relatedOrder: 'ORD20241221010',
    createdAt: '2024-12-21 15:20:55',
    metadata: { plan: 'Datacenter Proxies', duration: '90 days', ips: 5 },
  },
];

const TRANSACTION_TYPES = [
  {
    value: 'all',
    label: 'Tất cả giao dịch',
    icon: 'mdi:swap-horizontal',
    color: 'slate',
  },
  {
    value: 'deposit',
    label: 'Nạp tiền',
    icon: 'mdi:plus-circle',
    color: 'green',
  },
  {
    value: 'withdraw',
    label: 'Rút tiền',
    icon: 'mdi:minus-circle',
    color: 'orange',
  },
  {
    value: 'conversion',
    label: 'Qui đổi',
    icon: 'mdi:swap-horizontal-circle',
    color: 'blue',
  },
  {
    value: 'purchase',
    label: 'Mua hàng',
    icon: 'mdi:shopping',
    color: 'purple',
  },
  {
    value: 'refund',
    label: 'Hoàn tiền',
    icon: 'mdi:cash-refund',
    color: 'teal',
  },
  { value: 'fee', label: 'Phí dịch vụ', icon: 'mdi:cash-minus', color: 'red' },
];

const BalanceHistorySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'success' | 'pending' | 'failed'
  >('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<BalanceHistoryItem | null>(
    null,
  );
  const itemsPerPage = 10;

  // Filter data
  const filteredData = MOCK_BALANCE_HISTORY.filter((item) => {
    const matchSearch =
      item.transactionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.relatedOrder?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Toggle row selection
  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((item) => item.id));
    }
  };

  // Calculate summary statistics
  const stats = {
    totalDeposit: MOCK_BALANCE_HISTORY.filter(
      (d) => d.type === 'deposit' && d.status === 'success',
    ).reduce((sum, item) => sum + item.amount, 0),
    totalWithdraw: Math.abs(
      MOCK_BALANCE_HISTORY.filter(
        (d) => d.type === 'withdraw' && d.status === 'success',
      ).reduce((sum, item) => sum + item.amount, 0),
    ),
    totalSpent: Math.abs(
      MOCK_BALANCE_HISTORY.filter(
        (d) =>
          (d.type === 'conversion' ||
            d.type === 'purchase' ||
            d.type === 'fee') &&
          d.status === 'success',
      ).reduce((sum, item) => sum + item.amount, 0),
    ),
    totalRefund: MOCK_BALANCE_HISTORY.filter(
      (d) => d.type === 'refund' && d.status === 'success',
    ).reduce((sum, item) => sum + item.amount, 0),
    successCount: MOCK_BALANCE_HISTORY.filter((d) => d.status === 'success')
      .length,
    pendingCount: MOCK_BALANCE_HISTORY.filter((d) => d.status === 'pending')
      .length,
    failedCount: MOCK_BALANCE_HISTORY.filter((d) => d.status === 'failed')
      .length,
  };

  const getTypeConfig = (type: string) => {
    const config = TRANSACTION_TYPES.find((t) => t.value === type);
    return config || TRANSACTION_TYPES[0];
  };

  const handleRowClick = (item: BalanceHistoryItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4 lg:space-y-5 max-w-full overflow-hidden">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
              <Iconify icon="mdi:chart-line" width={22} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng Nạp Tiền</p>
              <p className="text-xl font-bold text-slate-900">
                ${stats.totalDeposit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
              <Iconify icon="mdi:database" width={22} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng Rút Tiền</p>
              <p className="text-xl font-bold text-slate-900">
                ${stats.totalWithdraw.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
              <Iconify icon="mdi:account-group" width={22} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng Chi Tiêu</p>
              <p className="text-xl font-bold text-slate-900">
                ${stats.totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-50">
              <Iconify icon="mdi:swap-horizontal" width={22} className="text-violet-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng Hoàn Tiền</p>
              <p className="text-xl font-bold text-slate-900">
                ${stats.totalRefund.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="rounded-2xl bg-white p-3 sm:p-4 lg:p-6 shadow-sm border border-slate-100">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                <Iconify
                  icon="mdi:swap-horizontal"
                  width={18}
                  className="text-white sm:w-5 lg:w-6"
                />
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold text-slate-900">
                  Biến Động Số Dư
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                  Theo dõi toàn bộ biến động của ví
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 px-2.5 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition flex-1 sm:flex-initial">
                <Iconify icon="mdi:download" width={14} className="sm:w-4" />
                <span>Xuất</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-2.5 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs font-medium text-white hover:from-blue-600 hover:to-indigo-700 transition shadow-lg shadow-blue-500/30 flex-1 sm:flex-initial">
                <Iconify icon="mdi:plus" width={14} className="sm:w-4" />
                <span>Nạp Tiền</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
          {/* Type Filter Buttons */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
            {TRANSACTION_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setTypeFilter(type.value)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  typeFilter === type.value
                    ? `bg-${type.color}-500 text-white shadow-lg shadow-${type.color}-500/30`
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
                style={
                  typeFilter === type.value
                    ? {
                        backgroundColor:
                          type.color === 'slate'
                            ? '#0f172a'
                            : type.color === 'green'
                              ? '#10b981'
                              : type.color === 'orange'
                                ? '#f97316'
                                : type.color === 'blue'
                                  ? '#3b82f6'
                                  : type.color === 'purple'
                                    ? '#a855f7'
                                    : type.color === 'teal'
                                      ? '#14b8a6'
                                      : type.color === 'red'
                                        ? '#ef4444'
                                        : undefined,
                      }
                    : undefined
                }
              >
                <Iconify
                  icon={type.icon}
                  width={12}
                  className="sm:w-3.5 flex-shrink-0"
                />
                <span className="hidden sm:inline">{type.label}</span>
                <span className="sm:hidden">{type.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Search and Status Filter */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Search */}
            <div className="flex h-9 sm:h-10 items-center rounded-lg border border-slate-200 bg-white pl-2 sm:pl-3 text-sm text-slate-600 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
              <Iconify
                icon="mdi:magnify"
                width={16}
                className="text-slate-400 sm:w-[18px] flex-shrink-0"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã GD, mô tả..."
                className="h-full flex-1 bg-transparent px-2 text-xs sm:text-sm outline-none min-w-0"
              />
            </div>

            {/* Date range and Status filter */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Date range */}
              <button
                type="button"
                className="flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 text-[10px] sm:text-sm text-slate-500 hover:border-blue-400 transition whitespace-nowrap"
              >
                <Iconify
                  icon="mdi:calendar-blank-outline"
                  width={14}
                  className="sm:w-4 flex-shrink-0"
                />
                <span>Thời gian</span>
              </button>

              {/* Status filter */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition whitespace-nowrap ${
                    statusFilter === 'all'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setStatusFilter('success')}
                  className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition whitespace-nowrap ${
                    statusFilter === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Thành công
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition whitespace-nowrap ${
                    statusFilter === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Đang xử lý
                </button>
                <button
                  onClick={() => setStatusFilter('failed')}
                  className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition whitespace-nowrap ${
                    statusFilter === 'failed'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Thất bại
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-100 -mx-2 sm:-mx-1">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] sm:text-xs font-medium text-slate-600">
              <tr>
                <th className="px-1 sm:px-2 py-1.5 sm:py-2 w-6 sm:w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onChange={toggleAll}
                    className="h-3 w-3 sm:h-3.5 sm:w-3.5 accent-blue-500 cursor-pointer"
                  />
                </th>
                <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[65px] sm:min-w-[75px]">
                  Mã GD
                </th>
                <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[50px] sm:min-w-[60px]">
                  Loại
                </th>
                <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[60px] sm:min-w-[70px]">
                  Tiền
                </th>
                <th className="hidden md:table-cell px-2 py-2 whitespace-nowrap min-w-[75px]">
                  SĐ Trước
                </th>
                <th className="hidden lg:table-cell px-2 py-2 whitespace-nowrap min-w-[75px]">
                  SĐ Sau
                </th>
                <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[65px] sm:min-w-[70px]">
                  TT
                </th>
                <th className="hidden sm:table-cell px-2 py-2 whitespace-nowrap min-w-[95px]">
                  Thời Gian
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 sm:py-12 text-center text-sm text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                      <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-slate-50">
                        <Iconify
                          icon="mdi:swap-horizontal"
                          width={20}
                          className="text-slate-300"
                        />
                      </div>
                      <span className="text-xs sm:text-sm">
                        Chưa có giao dịch nào
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => {
                  const typeConfig = getTypeConfig(row.type);
                  const isPositive = row.amount > 0;

                  return (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row)}
                      className={`hover:bg-blue-50/50 transition cursor-pointer ${
                        selectedRows.includes(row.id) ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td
                        className="px-1 sm:px-2 py-1.5 sm:py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                          className="h-3 w-3 sm:h-3.5 sm:w-3.5 accent-blue-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                        <span className="font-medium text-blue-600 text-[9px] sm:text-xs">
                          {row.transactionCode}
                        </span>
                      </td>
                      <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <div
                            className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-${typeConfig.color}-50 flex-shrink-0`}
                          >
                            <Iconify
                              icon={typeConfig.icon}
                              width={9}
                              className={`text-${typeConfig.color}-600 sm:w-3`}
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap font-bold text-[9px] sm:text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {isPositive ? '+' : ''}
                        {row.amount > 0 ? '$' : '-$'}
                        {Math.abs(row.amount).toFixed(2)}
                      </td>
                      <td className="hidden md:table-cell px-2 py-2 whitespace-nowrap text-slate-600 text-xs">
                        ${row.balanceBefore.toFixed(2)}
                      </td>
                      <td className="hidden lg:table-cell px-2 py-2 whitespace-nowrap font-semibold text-slate-900 text-xs">
                        ${row.balanceAfter.toFixed(2)}
                      </td>
                      <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                        {row.status === 'success' ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-green-700">
                            <Iconify
                              icon="mdi:check-circle"
                              width={9}
                              className="sm:w-3 flex-shrink-0"
                            />
                            <span className="hidden sm:inline">OK</span>
                          </span>
                        ) : row.status === 'pending' ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-yellow-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-yellow-700">
                            <Iconify
                              icon="mdi:clock-outline"
                              width={9}
                              className="sm:w-3 flex-shrink-0"
                            />
                            <span className="hidden sm:inline">Chờ</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-red-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-red-700">
                            <Iconify
                              icon="mdi:close-circle"
                              width={9}
                              className="sm:w-3 flex-shrink-0"
                            />
                            <span className="hidden sm:inline">Lỗi</span>
                          </span>
                        )}
                      </td>
                      <td className="hidden sm:table-cell px-2 py-2 whitespace-nowrap text-slate-600 text-[10px]">
                        {row.createdAt}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3">
            <div className="text-[10px] sm:text-xs text-slate-600 text-center sm:text-left">
              Hiển thị <span className="font-semibold">{startIndex + 1}</span>{' '}
              đến{' '}
              <span className="font-semibold">
                {Math.min(startIndex + itemsPerPage, filteredData.length)}
              </span>{' '}
              trong tổng{' '}
              <span className="font-semibold">{filteredData.length}</span> GD
              {selectedRows.length > 0 && (
                <span className="ml-1 sm:ml-2">
                  - Đã chọn{' '}
                  <span className="font-semibold text-blue-600">
                    {selectedRows.length}
                  </span>
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-3">
              <div className="flex gap-1 sm:gap-2 order-2 sm:order-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Trước</span>
                  <span className="sm:hidden">←</span>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition min-w-[28px] sm:min-w-[32px] ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">Sau</span>
                  <span className="sm:hidden">→</span>
                </button>
              </div>

              <div className="text-[10px] sm:text-xs text-slate-500 order-1 sm:order-2">
                Trang {currentPage} / {totalPages}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      {selectedItem && (
        <BalanceHistoryDetailDialog
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default BalanceHistorySection;
