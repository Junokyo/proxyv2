import React, { useState } from 'react';
import Iconify from '@/components/iconify';

const TestCommandPanel: React.FC = () => {
  const [command, setCommand] = useState('Please order the Residential proxies first');
  const [outputFormat, setOutputFormat] = useState('endpoint-port');
  const [quantity, setQuantity] = useState('10');
  const [resultText, setResultText] = useState('Please order the Residential proxies first');

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error(err);
    }
  };

  const selectClassName =
    'h-9 rounded-md border border-slate-700 bg-slate-900 px-3 text-xs text-slate-100 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className="w-full h-full flex flex-col rounded-xl border-0 bg-slate-900 p-5 text-slate-50 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Iconify icon="mdi:console" width={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Test Command</h3>
          <p className="text-xs text-slate-400">Test your proxy configuration</p>
        </div>
      </div>

      {/* Command input + copy */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-slate-50 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => copyToClipboard(command)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
          title="Copy"
        >
          <Iconify icon="mdi:content-copy" width={16} />
        </button>
      </div>

      {/* Output format + quantity labels */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
          <span>Output format</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[10px] text-slate-500">
            i
          </span>
        </div>
        <span className="text-xs font-medium text-slate-400">Quantity</span>
      </div>

      {/* Output format + quantity controls */}
      <div className="mb-4 grid gap-2 grid-cols-[1fr_80px]">
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className={selectClassName}
        >
          <option value="endpoint-port">Endpoint:port</option>
          <option value="ip-port">IP:port</option>
        </select>

        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-9 rounded-md border border-slate-700 bg-slate-900 px-2 text-sm text-slate-100 text-center outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Result textarea + buttons */}
      <div className="flex gap-2 flex-1 min-h-[200px]">
        <textarea
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
          placeholder="Please order the Residential proxies first"
          className="flex-1 resize-none rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => copyToClipboard(resultText)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
            title="Copy results"
          >
            <Iconify icon="mdi:content-copy" width={16} />
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
            title="Download"
          >
            <Iconify icon="mdi:download" width={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCommandPanel;
