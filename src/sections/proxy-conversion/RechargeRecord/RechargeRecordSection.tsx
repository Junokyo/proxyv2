import React, { useState } from 'react';
import Iconify from '@/components/iconify/iconify';

// Mock data cho demo
const MOCK_RECHARGE_DATA = [
  {
    orderNumber: 'ORD20241226001',
    amount: '$500.00',
    paymentMethod: 'Chuyển khoản ngân hàng',
    status: 'success',
    denialReason: '-',
    paymentTime: '2024-12-26 10:30:25',
    accountBalance: '$1750.50',
    invoice: 'INV-001.pdf',
  },
  {
    orderNumber: 'ORD20241225002',
    amount: '$300.00',
    paymentMethod: 'PayPal',
    status: 'success',
    denialReason: '-',
    paymentTime: '2024-12-25 14:15:42',
    accountBalance: '$1250.50',
    invoice: 'INV-002.pdf',
  },
  {
    orderNumber: 'ORD20241224003',
    amount: '$200.00',
    paymentMethod: 'Thẻ tín dụng',
    status: 'pending',
    denialReason: '-',
    paymentTime: '2024-12-24 09:20:10',
    accountBalance: '$950.50',
    invoice: '-',
  },
  {
    orderNumber: 'ORD20241223004',
    amount: '$150.00',
    paymentMethod: 'Chuyển khoản ngân hàng',
    status: 'failed',
    denialReason: 'Thông tin tài khoản không chính xác',
    paymentTime: '2024-12-23 16:45:33',
    accountBalance: '$950.50',
    invoice: '-',
  },
  {
    orderNumber: 'ORD20241222005',
    amount: '$1000.00',
    paymentMethod: 'Chuyển khoản ngân hàng',
    status: 'success',
    denialReason: '-',
    paymentTime: '2024-12-22 11:10:55',
    accountBalance: '$950.50',
    invoice: 'INV-005.pdf',
  },
];

const PAYMENT_METHODS = [
  'Tất cả phương thức',
  'Chuyển khoản ngân hàng',
  'PayPal',
  'Thẻ tín dụng',
  'Ví điện tử',
];

const RechargeRecordSection: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tất cả phương thức');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter data
  const filteredData = MOCK_RECHARGE_DATA.filter((item) => {
    const matchOrder = item.orderNumber.toLowerCase().includes(orderNumber.toLowerCase());
    const matchMethod = paymentMethod === 'Tất cả phương thức' || item.paymentMethod === paymentMethod;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchOrder && matchMethod && matchStatus;
  });

  // Toggle row selection
  const toggleRow = (orderId: string) => {
    setSelectedRows((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.orderNumber));
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
            <Iconify icon="mdi:history" width={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">Lịch Sử Nạp Tiền</p>
            <p className="text-xs text-slate-500 mt-1">
              Theo dõi tất cả các giao dịch nạp tiền vào tài khoản
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
            <Iconify icon="mdi:download" width={16} />
            Xuất File
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600 transition">
            <Iconify icon="mdi:plus" width={16} />
            Nạp Tiền Mới
          </button>
        </div>
      </div>

      {/* Filter row */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        {/* Date range */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 hover:border-blue-400 transition"
        >
          <Iconify icon="mdi:calendar-blank-outline" width={16} />
          <span>Thời gian bắt đầu - Kết thúc</span>
        </button>

        {/* Payment method filter */}
        <div className="relative">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-700 outline-none hover:border-blue-400 transition appearance-none cursor-pointer"
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <Iconify 
            icon="mdi:chevron-down" 
            width={16} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
              statusFilter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter('success')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
              statusFilter === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Thành công
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
              statusFilter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
              statusFilter === 'failed'
                ? 'bg-red-500 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Thất bại
          </button>
        </div>

        {/* Order number + search */}
        <div className="flex h-10 flex-1 min-w-[200px] items-center rounded-lg border border-slate-200 bg-white pl-3 text-sm text-slate-600 focus-within:border-blue-400 transition">
          <Iconify icon="mdi:magnify" width={18} className="text-slate-400" />
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Tìm kiếm mã đơn hàng..."
            className="h-full flex-1 bg-transparent px-2 text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-xs font-medium text-slate-600">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 whitespace-nowrap">Mã Đơn Hàng</th>
              <th className="px-4 py-3 whitespace-nowrap">Số Tiền Nạp</th>
              <th className="px-4 py-3 whitespace-nowrap">Phương Thức</th>
              <th className="px-4 py-3 whitespace-nowrap">Trạng Thái</th>
              <th className="px-4 py-3 whitespace-nowrap">Lý Do Từ Chối</th>
              <th className="px-4 py-3 whitespace-nowrap">Thời Gian</th>
              <th className="px-4 py-3 whitespace-nowrap">Số Dư Tài Khoản</th>
              <th className="px-4 py-3 whitespace-nowrap">Hóa Đơn</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-16 text-center text-sm text-slate-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                      <Iconify
                        icon="mdi:receipt-text-outline"
                        width={32}
                        className="text-slate-300"
                      />
                    </div>
                    <span>Chưa có đơn nạp tiền nào</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr
                  key={row.orderNumber}
                  className={`hover:bg-slate-50 transition ${
                    selectedRows.includes(row.orderNumber) ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.orderNumber)}
                      onChange={() => toggleRow(row.orderNumber)}
                      className="h-4 w-4 accent-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-blue-600">{row.orderNumber}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-green-600">
                    +{row.amount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-700">
                      <Iconify 
                        icon={
                          row.paymentMethod.includes('ngân hàng') ? 'mdi:bank' :
                          row.paymentMethod.includes('PayPal') ? 'mdi:paypal' :
                          row.paymentMethod.includes('tín dụng') ? 'mdi:credit-card' :
                          'mdi:wallet-outline'
                        } 
                        width={16} 
                      />
                      {row.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <Iconify icon="mdi:check-circle" width={14} />
                        Thành công
                      </span>
                    ) : row.status === 'pending' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                        <Iconify icon="mdi:clock-outline" width={14} />
                        Đang xử lý
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                        <Iconify icon="mdi:close-circle" width={14} />
                        Thất bại
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <span className={row.denialReason !== '-' ? 'text-red-600' : 'text-slate-400'}>
                      {row.denialReason}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                    {row.paymentTime}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {row.accountBalance}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.invoice !== '-' ? (
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Iconify icon="mdi:file-pdf-box" width={16} />
                        Tải xuống
                      </button>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Hiển thị <span className="font-semibold">{filteredData.length}</span> đơn hàng
            {selectedRows.length > 0 && (
              <span className="ml-2">
                - Đã chọn <span className="font-semibold text-blue-600">{selectedRows.length}</span>
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
              Trang trước
            </button>
            <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
              2
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
              3
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
              Trang sau
            </button>
          </div>
        </div>
      )}

      {/* Stats summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg bg-green-50 p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <Iconify icon="mdi:check-circle" width={20} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">Thành công</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {MOCK_RECHARGE_DATA.filter(d => d.status === 'success').length}
          </p>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-100">
          <div className="flex items-center gap-2 mb-2">
            <Iconify icon="mdi:clock-outline" width={20} className="text-yellow-600" />
            <span className="text-xs font-medium text-yellow-700">Đang xử lý</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">
            {MOCK_RECHARGE_DATA.filter(d => d.status === 'pending').length}
          </p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <Iconify icon="mdi:close-circle" width={20} className="text-red-600" />
            <span className="text-xs font-medium text-red-700">Thất bại</span>
          </div>
          <p className="text-2xl font-bold text-red-900">
            {MOCK_RECHARGE_DATA.filter(d => d.status === 'failed').length}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Iconify icon="mdi:cash-multiple" width={20} className="text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Tổng nạp</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">$2,150</p>
        </div>
      </div>
    </div>
  );
};

export default RechargeRecordSection;

