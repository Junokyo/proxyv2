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
    <div className="rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-sm max-w-full overflow-hidden">
      {/* Header */}
      <div className="mb-3 sm:mb-4 flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 sm:h-9 lg:h-10 w-8 sm:w-9 lg:w-10 items-center justify-center rounded-lg bg-blue-50 flex-shrink-0">
              <Iconify icon="mdi:file-document-outline" width={14} className="text-blue-500 sm:w-4 lg:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-semibold text-slate-900">Chi Tiết Giao Dịch</p>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                Đối soát, khiếu nại và kiểm tra lịch sử
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 px-2.5 sm:px-3 lg:px-4 py-2 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition w-full sm:w-auto">
            <Iconify icon="mdi:download" width={12} className="sm:w-3.5 flex-shrink-0" />
            <span>Xuất File</span>
          </button>
        </div>
      </div>

      {/* Filter row */}
      <div className="mb-3 sm:mb-4 flex flex-col gap-2 sm:gap-3">
        {/* Search */}
        <div className="flex h-9 sm:h-10 items-center rounded-lg border border-slate-200 bg-white pl-2 sm:pl-3 text-sm text-slate-600 focus-within:border-blue-400 transition">
          <Iconify icon="mdi:magnify" width={14} className="text-slate-400 sm:w-4 flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm mã GD, lý do..."
            className="h-full flex-1 bg-transparent px-2 text-xs sm:text-sm outline-none min-w-0"
          />
        </div>

        {/* Plan filter and Date range */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Plan filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value as PlanKey | 'all')}
              className="w-full sm:w-auto h-9 sm:h-10 rounded-lg border border-slate-200 bg-white pl-2 sm:pl-3 pr-8 sm:pr-10 text-xs sm:text-sm text-slate-700 outline-none hover:border-blue-400 transition appearance-none cursor-pointer"
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
              width={12}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none sm:w-3.5"
            />
          </div>

          {/* Date range */}
          <button className="flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 text-[10px] sm:text-sm text-slate-500 hover:border-blue-400 transition flex-1 sm:flex-initial whitespace-nowrap">
            <Iconify icon="mdi:calendar-blank-outline" width={14} className="sm:w-4 flex-shrink-0" />
            <span>Thời gian</span>
          </button>
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
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  onChange={toggleAll}
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5 accent-blue-500 cursor-pointer"
                />
              </th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[50px] sm:min-w-[60px]">Mã</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[70px] sm:min-w-[80px]">Gói</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[60px] sm:min-w-[70px]">DL</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[60px] sm:min-w-[70px]">Trừ</th>
              <th className="hidden md:table-cell px-2 py-2 whitespace-nowrap min-w-[75px]">SĐ Trước</th>
              <th className="hidden lg:table-cell px-2 py-2 whitespace-nowrap min-w-[75px]">SĐ Sau</th>
              <th className="hidden xl:table-cell px-2 py-2 whitespace-nowrap min-w-[100px]">Lý Do</th>
              <th className="hidden sm:table-cell px-2 py-2 whitespace-nowrap min-w-[95px]">Thời Gian</th>
              <th className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap min-w-[65px] sm:min-w-[70px]">TT</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-8 sm:py-12 text-center text-sm text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-slate-50">
                      <Iconify
                        icon="mdi:file-remove-outline"
                        width={20}
                        className="text-slate-300"
                      />
                    </div>
                    <span className="text-xs sm:text-sm">Không có giao dịch nào</span>
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
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 accent-blue-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                    <span className="font-medium text-blue-600 text-[9px] sm:text-xs">{row.id}</span>
                  </td>
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-blue-700">
                      <span className="hidden sm:inline">{PLAN_LABEL[row.planType as PlanKey]}</span>
                      <span className="sm:hidden">{PLAN_LABEL[row.planType as PlanKey].split(' ')[0]}</span>
                    </span>
                  </td>
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap font-medium text-[9px] sm:text-xs">
                    {row.amount}
                  </td>
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap text-red-600 font-semibold text-[9px] sm:text-xs">
                    -{row.deduct}
                  </td>
                  <td className="hidden md:table-cell px-2 py-2 whitespace-nowrap text-xs">
                    {row.balanceBefore}
                  </td>
                  <td className="hidden lg:table-cell px-2 py-2 whitespace-nowrap font-medium text-xs">
                    {row.balanceAfter}
                  </td>
                  <td className="hidden xl:table-cell px-2 py-2 max-w-xs">
                    <span className="text-slate-600 text-xs truncate block max-w-[100px]" title={row.reason}>
                      {row.reason}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-2 py-2 whitespace-nowrap text-slate-500 text-[10px]">
                    {row.time}
                  </td>
                  <td className="px-1 sm:px-2 py-1.5 sm:py-2 whitespace-nowrap">
                    {row.status === 'success' ? (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-green-700">
                        <Iconify icon="mdi:check-circle" width={9} className="sm:w-3 flex-shrink-0" />
                        <span className="hidden sm:inline">OK</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-yellow-50 px-1 py-0.5 text-[8px] sm:text-xs font-medium text-yellow-700">
                        <Iconify icon="mdi:clock-outline" width={9} className="sm:w-3 flex-shrink-0" />
                        <span className="hidden sm:inline">Chờ</span>
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
        <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-600">
          <div className="text-center sm:text-left">
            Hiển thị <span className="font-semibold">{filteredData.length}</span> giao dịch
            {selectedRows.length > 0 && (
              <span className="ml-1 sm:ml-2">
                - Đã chọn <span className="font-semibold text-blue-600">{selectedRows.length}</span>
              </span>
            )}
          </div>

          {/* Có thể thêm pagination ở đây */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex gap-1 sm:gap-2 order-2 sm:order-1">
              <button className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
                <span className="hidden sm:inline">Trước</span>
                <span className="sm:hidden">←</span>
              </button>
              <button className="rounded-lg bg-blue-500 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white min-w-[28px] sm:min-w-[32px]">
                1
              </button>
              <button className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition min-w-[28px] sm:min-w-[32px]">
                2
              </button>
              <button className="rounded-lg border border-slate-200 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition">
                <span className="hidden sm:inline">Sau</span>
                <span className="sm:hidden">→</span>
              </button>
            </div>

            <div className="text-[10px] sm:text-xs text-slate-500 order-1 sm:order-2">
              Trang 1 / 1
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeDetailsTable;

