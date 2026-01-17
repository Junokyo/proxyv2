'use client';

import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
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
import DepositHistory from './DepositHistory/DepositHistory';
import OrderHistory from './OrderHistory/OrderHistory';
import TransactionHistory from './TransactionHistory/TransactionHistory';

const TABS_DATA = [
  { value: 'orders', label: 'Lịch sử đơn hàng', color: '#14b8a6' },
  { value: 'transactions', label: 'Lịch sử giao dịch', color: '#f97316' },
  // { value: 'deposits', label: 'Lịch sử nạp tiền', color: '#8b5cf6' },
];

export default function OrderHistoryView() {
  const [currentTab, setCurrentTab] = useState('transactions');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  const handleDateReset = () => {
    setSelectedDate(undefined);
  };

  // Mock stats for order history - replace with real data from API
  const orderStats = {
    total: 156,
    success: 142,
    pending: 8,
    failed: 6,
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900 mb-4">
          Lịch sử đơn hàng
        </h1>

        {/* Stats Cards - 4 columns */}
        <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Tổng đơn hàng */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <Icon icon="mdi:clipboard-list-outline" className="h-5 w-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Tổng đơn hàng</p>
              <p className="mt-0.5 text-lg font-bold text-slate-900">{orderStats.total}</p>
            </div>
          </div>

          {/* Thành công */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50">
              <Icon icon="mdi:check-circle-outline" className="h-5 w-5 text-teal-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Thành công</p>
              <p className="mt-0.5 text-lg font-bold text-slate-900">{orderStats.success}</p>
            </div>
          </div>

          {/* Đang chờ */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50">
              <Icon icon="mdi:clock-outline" className="h-5 w-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Đang chờ</p>
              <p className="mt-0.5 text-lg font-bold text-slate-900">{orderStats.pending}</p>
            </div>
          </div>

          {/* Thất bại */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
              <Icon icon="mdi:close-circle-outline" className="h-5 w-5 text-red-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Thất bại</p>
              <p className="mt-0.5 text-lg font-bold text-slate-900">{orderStats.failed}</p>
            </div>
          </div>
        </div>

        {/* Tabs + Date Picker */}
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-6">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleChangeTab(tab.value)}
                className={
                  'pb-3 text-sm transition font-medium ' +
                  (currentTab === tab.value
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-900')
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <div className="pb-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  mode="input"
                  variant="outline"
                  size="sm"
                  className={cn(
                    'h-9 justify-start text-left font-normal',
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
              <PopoverContent className="w-auto p-0" align="end">
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
        </div>
      </div>

      <div className="text-sm text-slate-600">
        {currentTab === 'transactions' && <TransactionHistory selectedDate={selectedDate} />}
        {currentTab === 'orders' && <OrderHistory selectedDate={selectedDate} />}
        {currentTab === 'deposits' && <DepositHistory />}
      </div>
    </div>
  );
}
