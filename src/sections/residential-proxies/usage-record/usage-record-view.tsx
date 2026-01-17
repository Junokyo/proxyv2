'use client';

import React, { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { CalendarDays } from 'lucide-react';

const UsageRecordView: React.FC = () => {
  const [mainDate, setMainDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 11),
    to: addDays(new Date(2025, 0, 11), 6),
  });
  const [subDate, setSubDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 11),
    to: addDays(new Date(2025, 0, 11), 6),
  });
  const [subAccount, setSubAccount] = useState('6avaq3x9z3az');

  const selectClassName =
    'h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className="w-full space-y-6">
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Traffic Used */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
              <Iconify icon="mdi:chart-areaspline" width={22} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Traffic Used</p>
              <p className="text-xl font-bold text-foreground">0.00 <span className="text-sm font-normal text-muted-foreground">GB</span></p>
            </div>
          </div>
        </div>

        {/* Traffic Available */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10">
              <Iconify icon="mdi:database" width={22} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Traffic Available</p>
              <p className="text-xl font-bold text-foreground">0.00 <span className="text-sm font-normal text-muted-foreground">GB</span></p>
            </div>
          </div>
        </div>

        {/* Active Sub-accounts */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10">
              <Iconify icon="mdi:account-group" width={22} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Sub-accounts</p>
              <p className="text-xl font-bold text-foreground">1</p>
            </div>
          </div>
        </div>

        {/* Requests Today */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/10">
              <Iconify icon="mdi:swap-horizontal" width={22} className="text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Requests Today</p>
              <p className="text-xl font-bold text-foreground">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* MAIN ACCOUNT TRAFFIC */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Iconify icon="mdi:chart-line" width={18} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Main account traffic</h3>
                <p className="text-xs text-muted-foreground">Monitor your main account usage</p>
              </div>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="mb-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" mode="input" className="w-full sm:w-[280px]">
                  <CalendarDays className="size-4" />
                  {mainDate?.from ? (
                    mainDate.to ? (
                      <span>
                        {format(mainDate.from, 'LLL dd, y')} - {format(mainDate.to, 'LLL dd, y')}
                      </span>
                    ) : (
                      format(mainDate.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={mainDate?.from}
                  selected={mainDate}
                  onSelect={setMainDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Chart */}
          <div className="relative h-64 rounded-lg border border-border bg-muted/20">
            {/* Y-axis labels */}
            <div className="absolute left-3 top-0 flex h-full flex-col justify-between py-4 text-[10px] text-muted-foreground">
              <span>100 GB</span>
              <span>75 GB</span>
              <span>50 GB</span>
              <span>25 GB</span>
              <span>0 GB</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 flex h-full flex-col">
              {/* Grid lines */}
              <div className="flex-1 border-l border-border">
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between border-l border-border px-4 pt-2 text-[10px] text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* No data overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Iconify icon="mdi:chart-line-variant" width={40} className="mx-auto mb-2 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No traffic data available</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUB ACCOUNT TRAFFIC */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                <Iconify icon="mdi:account-details" width={18} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Sub-account traffic</h3>
                <p className="text-xs text-muted-foreground">Monitor sub-account usage</p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Iconify icon="mdi:open-in-new" width={16} />
              Usage Details
            </button>
          </div>

          {/* Controls */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <select
              value={subAccount}
              onChange={(e) => setSubAccount(e.target.value)}
              className={selectClassName}
            >
              <option value="6avaq3x9z3az">6avaq3x9z3az</option>
              <option value="sub-2">sub-account-2</option>
              <option value="sub-3">sub-account-3</option>
            </select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" mode="input" className="w-full sm:w-[280px]">
                  <CalendarDays className="size-4" />
                  {subDate?.from ? (
                    subDate.to ? (
                      <span>
                        {format(subDate.from, 'LLL dd, y')} - {format(subDate.to, 'LLL dd, y')}
                      </span>
                    ) : (
                      format(subDate.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={subDate?.from}
                  selected={subDate}
                  onSelect={setSubDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Chart */}
          <div className="relative h-64 rounded-lg border border-border bg-muted/20">
            {/* Y-axis labels */}
            <div className="absolute left-3 top-0 flex h-full flex-col justify-between py-4 text-[10px] text-muted-foreground">
              <span>100 GB</span>
              <span>75 GB</span>
              <span>50 GB</span>
              <span>25 GB</span>
              <span>0 GB</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 flex h-full flex-col">
              {/* Grid lines */}
              <div className="flex-1 border-l border-border">
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
                <div className="h-1/4 border-b border-dashed border-border/50" />
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between border-l border-border px-4 pt-2 text-[10px] text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* No data overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Iconify icon="mdi:chart-line-variant" width={40} className="mx-auto mb-2 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No traffic data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Details Table */}
      <div className="rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10">
              <Iconify icon="mdi:table" width={18} className="text-violet-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent Usage</h3>
              <p className="text-xs text-muted-foreground">Detailed traffic records</p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            <Iconify icon="mdi:download" width={16} />
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Account</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Traffic Used</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Requests</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <Iconify icon="mdi:table-off" width={40} className="mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No usage records yet</p>
                  <p className="text-xs text-muted-foreground/70">Start using proxies to see your traffic data here</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageRecordView;
