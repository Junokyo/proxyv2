// ShellExamplePanel.tsx
import React, { useState } from 'react';

const UserPassShellPanel: React.FC = () => {
  const [language, setLanguage] = useState('shell');
  const [destination, setDestination] = useState('http://myip.lunaproxy.io');
  const [protocol, setProtocol] = useState('http');
  const [codeText, setCodeText] = useState(
    'Please order a residential proxy plan first',
  );

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-700 bg-[#050816] p-6 text-slate-50">
      {/* Top row: language + destination */}
      <div className="mb-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Language */}
        <div>
          <div className="mb-1 text-xs font-medium text-slate-200">
            Language
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="shell">Shell</option>
            <option value="python">Python</option>
            <option value="node">Node.js</option>
          </select>
        </div>

        {/* Destination site */}
        <div>
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-200">
            <span>Destination site</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] text-slate-400">
              i
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-10 flex-1 rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(destination)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#050816] text-slate-300 transition hover:border-indigo-500 hover:text-indigo-300"
              title="Copy destination"
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
        </div>
      </div>

      {/* Protocol select */}
      <div className="mb-4">
        <select
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-700 bg-[#050816] px-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
          <option value="socks5">SOCKS5</option>
        </select>
      </div>

      {/* Divider */}
      <div className="mb-4 border-b border-dashed border-slate-700" />

      {/* Shell label */}
      <div className="mb-2 text-sm font-semibold text-slate-50">Shell</div>

      {/* Code block */}
      <div className="rounded-lg border border-slate-700 bg-[#050816]">
        <textarea
          value={codeText}
          onChange={(e) => setCodeText(e.target.value)}
          className="h-80 w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-100 outline-none"
        />
      </div>
    </div>
  );
};

export default UserPassShellPanel;
