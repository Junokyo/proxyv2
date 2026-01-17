import React, { useState } from 'react';
import Iconify from '@/components/iconify';

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

  const selectClassName =
    'h-7 rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className="w-full h-full flex flex-col rounded-xl border-0 bg-slate-900 p-4 text-slate-50 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <Iconify icon="mdi:server-network" width={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white">Proxy Output</h3>
          <p className="text-[10px] text-slate-400">Generated proxy list will appear here</p>
        </div>
      </div>

      {/* Endpoint input + copy */}
      <div className="mb-3 flex items-center gap-1.5">
        <input
          type="text"
          value={topMessage}
          onChange={(e) => setTopMessage(e.target.value)}
          className="flex-1 h-7 rounded-md border border-slate-700 bg-slate-800 px-2 text-[11px] text-slate-50 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="button"
          onClick={() => copyToClipboard(topMessage)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
          title="Copy"
        >
          <Iconify icon="mdi:content-copy" width={12} />
        </button>
      </div>

      {/* Tabs + Proxy list link */}
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex rounded-md border border-slate-700 bg-slate-800 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('output')}
            className={[
              'px-2 py-1 rounded text-[10px] font-medium transition',
              activeTab === 'output'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-slate-200',
            ].join(' ')}
          >
            Output format
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={[
              'px-2 py-1 rounded text-[10px] font-medium transition',
              activeTab === 'qr'
                ? 'bg-white text-slate-900'
                : 'text-slate-400 hover:text-slate-200',
            ].join(' ')}
          >
            QR code
          </button>
        </div>

        <button
          type="button"
          className="text-[10px] font-medium text-primary hover:underline"
        >
          Proxy list &gt;
        </button>
      </div>

      {/* Output controls */}
      {activeTab === 'output' && (
        <div className="mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] font-medium text-slate-300">
              <span>Output format</span>
              <span className="flex h-3 w-3 items-center justify-center rounded-full border border-slate-600 text-[8px] text-slate-500">
                i
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400">Quantity</span>
          </div>

          <div className="grid gap-1.5 grid-cols-[1fr_1fr_60px]">
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className={selectClassName}
            >
              <option value="endpoint-port">Endpoint:port</option>
              <option value="ip-port">IP:port</option>
            </select>

            <select
              value={templateFormat}
              onChange={(e) => setTemplateFormat(e.target.value)}
              className={selectClassName}
            >
              <option value="username:password:hostname:port">
                user:pass:host:p
              </option>
              <option value="login:pass@host:port">login:pass@host:port</option>
            </select>

            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-7 rounded-md border border-slate-700 bg-slate-900 px-1.5 text-[11px] text-slate-100 text-center outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}

      {activeTab === 'qr' && (
        <div className="mb-3 py-6 text-center text-[10px] text-slate-500">
          QR code will be displayed here
        </div>
      )}

      {/* Result textarea + buttons */}
      <div className="flex gap-1.5 flex-1 min-h-[160px]">
        <textarea
          value={resultText}
          onChange={(e) => setResultText(e.target.value)}
          placeholder="Please order the Residential proxies first"
          className="flex-1 resize-none rounded-md border border-slate-700 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => copyToClipboard(resultText)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
            title="Copy results"
          >
            <Iconify icon="mdi:content-copy" width={12} />
          </button>

          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
            title="Download"
          >
            <Iconify icon="mdi:download" width={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateResultsPanelRight;
