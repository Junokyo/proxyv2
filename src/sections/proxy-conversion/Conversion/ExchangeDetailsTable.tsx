// ExchangeDetailsTable.tsx
import React, { useState } from 'react';
import Iconify from '@/components/iconify/iconify';
import { PlanKey } from './ConversionPanel';

interface ExchangeDetailsTableProps {
  selectedPlan: PlanKey;
}

const PLAN_LABEL: Record<PlanKey, string> = {
  residential: 'Residential Proxies',
  rotating: 'Rotating ISP Proxies',
  isp: 'ISP Proxies',
  datacenter: 'Datacenter Proxies',
};

// Mock data để demo - trong thực tế sẽ fetch từ API
const MOCK_DATA = [
  {
    id: 'TX001',
    planType: 'residential',
    amount: '50GB',
    deduct: '$38.50',
    balanceBefore: '$1250.50',
    balanceAfter: '$1212.00',
    time: '2024-12-26 14:30:25',
    reason: 'Qui đổi gói Residential Proxies',
    status: 'success',
  },
  {
    id: 'TX002',
    planType: 'rotating',
    amount: '100GB',
    deduct: '$40.00',
    balanceBefore: '$1212.00',
    balanceAfter: '$1172.00',
    time: '2024-12-25 10:15:42',
    reason: 'Qui đổi gói Rotating ISP Proxies',
    status: 'success',
  },
  {
    id: 'TX003',
    planType: 'datacenter',
    amount: '20 IP',
    deduct: '$66.00',
    balanceBefore: '$1172.00',
    balanceAfter: '$1106.00',
    time: '2024-12-24 16:45:10',
    reason: 'Qui đổi gói Datacenter Proxies',
    status: 'success',
  },
  {
    id: 'TX004',
    planType: 'residential',
    amount: '25GB',
    deduct: '$19.25',
    balanceBefore: '$1106.00',
    balanceAfter: '$1086.75',
    time: '2024-12-23 09:20:33',
    reason: 'Qui đổi gói Residential Proxies - Gia hạn',
    status: 'pending',
  },
];

const ExchangeDetailsTable: React.FC<ExchangeDetailsTableProps> = ({
  selectedPlan,
}) => {
  const [filterPlan, setFilterPlan] = useState<PlanKey | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter data
  const filteredData = MOCK_DATA.filter((item) => {
    const matchPlan = filterPlan === 'all' || item.planType === filterPlan;
    const matchSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPlan && matchSearch;
  });

  // Xử lý chọn row
  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((item) => item.id));
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Iconify icon="mdi:file-document-outline" width={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">Chi Tiết Giao Dịch</p>
            <p className="text-xs text-slate-500">
              Đối soát, khiếu nại và kiểm tra lịch sử giao dịch
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
          <Iconify icon="mdi:download" width={16} />
          Xuất File
        </button>
      </div>

      {/* Filter row */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        {/* Plan filter */}
        <div className="relative">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value as PlanKey | 'all')}
            className="h-10 rounded-lg border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-700 outline-none hover:border-blue-400 transition appearance-none cursor-pointer"
          >
            <option value="all">Tất cả gói</option>
            {Object.entries(PLAN_LABEL).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <Iconify 
            icon="mdi:chevron-down" 
            width={16} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>

        {/* Date range */}
        <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500 hover:border-blue-400 transition">
          <Iconify icon="mdi:calendar-blank-outline" width={16} />
          <span>Thời gian bắt đầu - Kết thúc</span>
        </button>

        {/* Search */}
        <div className="flex-1 flex h-10 min-w-[200px] items-center rounded-lg border border-slate-200 bg-white pl-3 text-sm text-slate-600 focus-within:border-blue-400 transition">
          <Iconify icon="mdi:magnify" width={18} className="text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo mã GD, lý do..."
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
              <th className="px-4 py-3 whitespace-nowrap">Mã Giao Dịch</th>
              <th className="px-4 py-3 whitespace-nowrap">Loại Gói</th>
              <th className="px-4 py-3 whitespace-nowrap">Dung Lượng</th>
              <th className="px-4 py-3 whitespace-nowrap">Trừ Số Dư</th>
              <th className="px-4 py-3 whitespace-nowrap">Số Dư Trước</th>
              <th className="px-4 py-3 whitespace-nowrap">Số Dư Sau</th>
              <th className="px-4 py-3 whitespace-nowrap">Lý Do</th>
              <th className="px-4 py-3 whitespace-nowrap">Thời Gian</th>
              <th className="px-4 py-3 whitespace-nowrap">Trạng Thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-16 text-center text-sm text-slate-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50">
                      <Iconify
                        icon="mdi:file-remove-outline"
                        width={32}
                        className="text-slate-300"
                      />
                    </div>
                    <span>Không có giao dịch nào</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50 transition ${
                    selectedRows.includes(row.id) ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 accent-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-blue-600">{row.id}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {PLAN_LABEL[row.planType as PlanKey]}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-red-600 font-semibold">
                    -{row.deduct}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.balanceBefore}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {row.balanceAfter}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <span className="text-slate-600">{row.reason}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {row.time}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <Iconify icon="mdi:check-circle" width={14} />
                        Thành công
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                        <Iconify icon="mdi:clock-outline" width={14} />
                        Đang xử lý
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination hoặc info */}
      {filteredData.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            Hiển thị <span className="font-semibold">{filteredData.length}</span> giao dịch
            {selectedRows.length > 0 && (
              <span className="ml-2">
                - Đã chọn <span className="font-semibold text-blue-600">{selectedRows.length}</span>
              </span>
            )}
          </span>

          {/* Có thể thêm pagination ở đây */}
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
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeDetailsTable;

