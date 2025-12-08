// GenerateResultsPanel.tsx
import React, { useState } from 'react';

const GenerateResultsPanelRight: React.FC = () => {
  const [topMessage, setTopMessage] = useState(
    'Please order the Residential proxies first',
  );
  const [activeTab, setActiveTab] = useState<'output' | 'qr'>('output');
  const [outputFormat, setOutputFormat] = useState('endpoint-port');
  const [templateFormat, setTemplateFormat] = useState(
    'username:password:hostname:port',
  );
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
      {/* Top input + copy */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          value={topMessage}
          onChange={(e) => setTopMessage(e.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-[#050816] px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => copyToClipboard(topMessage)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
          title="Copy"
        >
          {/* copy icon */}
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

      {/* Divider */}
      <div className="mb-4 border-b border-dashed border-slate-700" />

      {/* Tabs */}
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex rounded-lg border border-slate-700 bg-[#050816] p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('output')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'output'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Output format
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              activeTab === 'qr'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            QR code
          </button>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-sky-400 hover:underline"
        >
          Proxy list &gt;
        </button>
      </div>

      {/* Output controls */}
      {activeTab === 'output' && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-medium text-slate-200">
              <span>Output format</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] text-slate-400">
                i
              </span>
            </div>

            <span className="text-xs font-medium text-slate-300">Quantity</span>
          </div>

          <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_90px]">
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="h-9 rounded-lg border border-slate-700 bg-[#050816] px-3 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="endpoint-port">Endpoint:port</option>
              <option value="ip-port">IP:port</option>
            </select>

            <select
              value={templateFormat}
              onChange={(e) => setTemplateFormat(e.target.value)}
              className="h-9 rounded-lg border border-slate-700 bg-[#050816] px-3 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="username:password:hostname:port">
                username:password:hostname:port
              </option>
              <option value="login:pass@host:port">login:pass@host:port</option>
            </select>

            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-9 rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </>
      )}

      {activeTab === 'qr' && (
        <div className="mb-5 text-xs text-slate-300">
          QR mode UI placeholder – tùy bạn render list QR hoặc canvas ở đây.
        </div>
      )}

      {/* Result textarea + buttons */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <textarea
            value={resultText}
            onChange={(e) => setResultText(e.target.value)}
            className="h-64 w-full resize-none rounded-lg border border-slate-700 bg-[#050816] px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {/* placeholder text style giống hình */}
          {resultText.trim() === '' && (
            <span className="pointer-events-none absolute left-3 top-2 text-sm text-slate-400">
              Please order the Residential proxies first
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {/* button 1: copy */}
          <button
            type="button"
            onClick={() => copyToClipboard(resultText)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
            title="Copy results"
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

          {/* button 2: secondary action (download, save, etc.) */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
            title="Secondary action"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 3v13" />
              <path d="M7 11l5 5 5-5" />
              <rect x="4" y="18" width="16" height="3" rx="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateResultsPanelRight;
