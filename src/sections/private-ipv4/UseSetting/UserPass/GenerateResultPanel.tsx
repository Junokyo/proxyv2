import React from 'react';

interface Props {
  title?: string;
  headerPlaceholder: string;
}

export const GenerateResultPanel: React.FC<Props> = ({
  title = 'Generate results',
  headerPlaceholder,
}) => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#151b2b] text-slate-100 shadow">
      {/* Title row */}
      <div className="flex items-center justify-between border-b border-slate-700 px-5 py-3 text-[13px] font-semibold">
        <span>{title}</span>
      </div>

      {/* Header input + copy */}
      <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-3 text-[11px]">
        <input
          readOnly
          className="w-full rounded-md border border-slate-700 bg-[#111827] px-3 py-2 text-[11px] text-slate-300 outline-none"
          value={headerPlaceholder}
        />
        <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-600 bg-transparent text-[11px]">
          ⧉
        </button>
      </div>

      {/* Tabs: Output format / QR code */}
      <div className="flex gap-2 border-b border-slate-700 px-5 py-2.5 text-[11px]">
        <button className="rounded-md border border-slate-500 bg-slate-100/10 px-3 py-1.5 text-[11px] font-medium text-slate-100">
          Output format
        </button>
        <button className="rounded-md border border-transparent px-3 py-1.5 text-[11px] text-slate-400 hover:border-slate-600">
          QR code
        </button>
      </div>

      {/* Output format + quantity */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-700 px-5 py-3 text-[11px]">
        <div className="flex min-w-[220px] flex-1 items-center gap-2">
          <span className="text-slate-400">Output format</span>
          <select className="w-44 rounded-md border border-slate-700 bg-[#111827] px-2 py-1.5 text-[11px]">
            <option>Endpoint:port</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Quantity</span>
          <input
            type="number"
            defaultValue={10}
            className="w-16 rounded-md border border-slate-700 bg-[#111827] px-2 py-1.5 text-[11px] text-slate-100 outline-none"
          />
        </div>
      </div>

      {/* Result textarea */}
      <div className="flex-1 px-5 py-4 text-[11px]">
        <div className="relative h-full">
          <textarea
            readOnly
            className="h-full min-h-[260px] w-full resize-none rounded-md border border-slate-700 bg-[#111827] px-3 py-2 text-[11px] text-slate-200 outline-none"
            value={headerPlaceholder}
          />
          <button className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-slate-600 bg-[#111827] text-[11px]">
            ⧉
          </button>
        </div>
      </div>
    </div>
  );
};
