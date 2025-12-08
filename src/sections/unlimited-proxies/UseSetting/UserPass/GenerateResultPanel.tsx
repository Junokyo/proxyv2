// GenerateResultPanel.tsx
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
    <div className="h-full rounded-2xl bg-[#151b2b] text-slate-100 shadow">
      {/* Title */}
      <div className="border-b border-slate-700 px-5 py-3 text-sm font-semibold">
        {title}
      </div>

      {/* Header input */}
      <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-3 text-[11px]">
        <input
          readOnly
          className="w-full rounded-md bg-[#111827] px-3 py-2 text-[11px] text-slate-300 outline-none"
          value={headerPlaceholder}
        />
        <button className="rounded-md border border-slate-600 px-2 py-1 text-[10px]">
          ⧉
        </button>
      </div>

      {/* Format + Quantity */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-700 px-5 py-3 text-[11px]">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-slate-400">Output format</span>
          <select className="w-40 rounded-md bg-[#111827] px-2 py-1.5 text-[11px]">
            <option>Endpoint:port</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Quantity</span>
          <input
            type="number"
            defaultValue={10}
            className="w-16 rounded-md bg-[#111827] px-2 py-1.5 text-[11px] text-slate-100 outline-none"
          />
        </div>
      </div>

      {/* Result textarea */}
      <div className="relative h-[340px] px-5 py-4 text-[11px]">
        <textarea
          readOnly
          className="h-full w-full resize-none rounded-md bg-[#111827] px-3 py-2 text-[11px] text-slate-200 outline-none"
          value={headerPlaceholder}
        />
        <button className="absolute right-8 top-6 rounded-md border border-slate-600 bg-[#111827] px-2 py-1 text-[11px]">
          ⧉
        </button>
      </div>
    </div>
  );
};
