// TrafficOverview.tsx
import React, { useState } from 'react';

type RangeKey = 'yesterday' | 'last7' | 'custom';

const UsageRecordView: React.FC = () => {
  const [mainRange, setMainRange] = useState<RangeKey>('last7');
  const [subRange, setSubRange] = useState<RangeKey>('last7');
  const [mainFrom, setMainFrom] = useState('2025-11-18');
  const [mainTo, setMainTo] = useState('2025-11-25');
  const [subFrom, setSubFrom] = useState('2025-11-18');
  const [subTo, setSubTo] = useState('2025-11-25');
  const [subAccount, setSubAccount] = useState('6avaq3x9z3az');

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* MAIN ACCOUNT TRAFFIC */}
        <div>
          {/* Title */}
          <div className="mb-3 flex items-center gap-1 text-sm font-semibold text-slate-900">
            <span>Main account traffic</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
              i
            </span>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMainRange('yesterday')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                mainRange === 'yesterday'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Yesterday
            </button>

            <button
              type="button"
              onClick={() => setMainRange('last7')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                mainRange === 'last7'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Last 7 days
            </button>

            {/* From date */}
            <input
              type="date"
              value={mainFrom}
              onChange={(e) => {
                setMainFrom(e.target.value);
                setMainRange('custom');
              }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            <span className="text-xs text-slate-400">To</span>

            {/* To date */}
            <input
              type="date"
              value={mainTo}
              onChange={(e) => {
                setMainTo(e.target.value);
                setMainRange('custom');
              }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Chart placeholder */}
          <div className="mt-6 h-64 rounded-lg border border-slate-100 bg-white">
            {/* chỗ này bạn gắn chart lib vào */}
            <div className="flex h-full items-end justify-between px-6 pb-4 text-[10px] text-slate-400">
              {/* fake x-axis labels cho đỡ trống */}
              <span>2025-11-18</span>
              <span>2025-11-20</span>
              <span>2025-11-22</span>
              <span>2025-11-24</span>
            </div>
          </div>
        </div>

        {/* SUB ACCOUNT TRAFFIC */}
        <div className="md:border-l md:border-slate-200 md:pl-8">
          {/* Title row */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
              <span>Sub-account traffic</span>
            </div>

            <button
              type="button"
              className="text-xs font-medium text-indigo-600 hover:underline"
            >
              Usage Details
            </button>
          </div>

          {/* Sub-account + controls */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <select
              value={subAccount}
              onChange={(e) => setSubAccount(e.target.value)}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="6avaq3x9z3az">6avaq3x9z3az</option>
              <option value="sub-2">sub-2</option>
            </select>

            <button
              type="button"
              onClick={() => setSubRange('yesterday')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                subRange === 'yesterday'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Yesterday
            </button>

            <button
              type="button"
              onClick={() => setSubRange('last7')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                subRange === 'last7'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Last 7 days
            </button>

            <input
              type="date"
              value={subFrom}
              onChange={(e) => {
                setSubFrom(e.target.value);
                setSubRange('custom');
              }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-400">To</span>
            <input
              type="date"
              value={subTo}
              onChange={(e) => {
                setSubTo(e.target.value);
                setSubRange('custom');
              }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Chart placeholder */}
          <div className="mt-3 h-64 rounded-lg border border-slate-100 bg-white">
            {/* chỗ này bạn gắn chart lib cho sub-account */}
            <div className="flex h-full items-end justify-between px-6 pb-4 text-[10px] text-slate-400">
              <span>2025-11-18</span>
              <span>2025-11-20</span>
              <span>2025-11-22</span>
              <span>2025-11-24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageRecordView;
