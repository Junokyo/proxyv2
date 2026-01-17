'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';

export default function PrivateIpv4CodePanel() {
  const [language, setLanguage] = useState('shell');
  const [destination, setDestination] = useState('https://api.ipify.org');
  const [protocol, setProtocol] = useState('http');
  const [codeText, setCodeText] = useState('');

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      console.error(e);
    }
  };

  const selectClassName =
    'h-7 rounded-md border border-slate-700 bg-slate-900 px-2 text-[11px] text-slate-100 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className="w-full h-full flex flex-col rounded-xl border-0 bg-slate-900 p-4 text-slate-50 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <Iconify icon="mdi:code-braces" width={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-white">Code Example</h3>
          <p className="text-[10px] text-slate-400">Copy and use in your application</p>
        </div>
      </div>

      {/* Top row: Language + Destination */}
      <div className="mb-3 grid gap-2 grid-cols-[100px_1fr]">
        {/* Language */}
        <div>
          <div className="mb-1 text-[11px] font-medium text-slate-300">Language</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={selectClassName + ' w-full'}
          >
            <option value="shell">Shell</option>
            <option value="python">Python</option>
            <option value="node">Node.js</option>
            <option value="php">PHP</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Destination site */}
        <div>
          <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-300">
            <span>Destination site</span>
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-600 text-[9px] text-slate-500">
              i
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 h-7 rounded-md border border-slate-700 bg-slate-800 px-2 text-[11px] text-slate-50 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(destination)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
              title="Copy"
            >
              <Iconify icon="mdi:content-copy" width={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Protocol select */}
      <div className="mb-3">
        <select
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          className={selectClassName + ' w-full'}
        >
          <option value="http">HTTP</option>
          <option value="https">HTTPS</option>
          <option value="socks5">SOCKS5</option>
        </select>
      </div>

      {/* Shell label */}
      <div className="mb-2 text-xs font-semibold text-white">
        {language === 'shell' && 'Shell'}
        {language === 'python' && 'Python'}
        {language === 'node' && 'Node.js'}
        {language === 'php' && 'PHP'}
        {language === 'java' && 'Java'}
      </div>

      {/* Code block */}
      <div className="flex gap-1.5 flex-1 min-h-[160px]">
        <textarea
          value={codeText}
          onChange={(e) => setCodeText(e.target.value)}
          placeholder="Please order a Private IPv4 proxy plan first"
          className="flex-1 resize-none rounded-md border border-slate-700 bg-slate-800 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary font-mono"
        />

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => copyToClipboard(codeText)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
            title="Copy code"
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
}
