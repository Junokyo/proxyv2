// TestCommandPanel.tsx
import React, { useState } from 'react';

const TestCommandPanel: React.FC = () => {
  const [command, setCommand] = useState(
    'Please order the Residential proxies first',
  );
  const [outputFormat, setOutputFormat] = useState('endpoint-port');
  const [quantity, setQuantity] = useState('10');
  const [resultText, setResultText] = useState(
    'Please order the Residential proxies first',
  );

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-700 bg-[#050816] p-6 text-slate-50">
      {/* Title */}
      <h2 className="mb-3 text-sm font-semibold text-slate-50">Test Command</h2>

      {/* Command input + copy */}
      <div className="mb-5 flex items-center gap-3">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-[#050816] px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => copyToClipboard(command)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
          title="Copy command"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <rect x="3" y="3" width="13" height="13" rx="2" />
          </svg>
        </button>
      </div>

      {/* Output format + quantity labels */}
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-200">
        <div className="flex items-center gap-1">
          <span>Output format</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] text-slate-400">
            i
          </span>
        </div>
        <span>Quantity</span>
      </div>

      {/* Output format + quantity controls */}
      <div className="mb-4 grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="h-10 rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="endpoint-port">Endpoint:port</option>
          <option value="ip-port">IP:port</option>
        </select>

        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="h-10 rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Result area */}
      <div className="rounded-lg border border-slate-700 bg-[#050816]">
        {/* Header row with text + copy */}
        <div className="flex items-center justify-between border-b border-slate-700 px-3 py-2">
          <span className="text-sm font-medium text-slate-50">
            Please order the Residential proxies first
          </span>
          <button
            type="button"
            onClick={() => copyToClipboard(resultText)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
            title="Copy result"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <rect x="3" y="3" width="13" height="13" rx="2" />
            </svg>
          </button>
        </div>

        <textarea
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
          className="h-72 w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-100 outline-none"
        />
      </div>
    </div>
  );
};

export default TestCommandPanel;
