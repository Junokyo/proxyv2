// ProxyGeneratorMini.tsx
import React, { useState } from 'react';

const WhitelistFormPanel: React.FC = () => {
  const [country, setCountry] = useState('global');
  const [sessionType, setSessionType] = useState('rotation');

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Title */}
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Proxy generator
      </h2>

      {/* Country / Region */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
            <span>Country/Region</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
              i
            </span>
          </div>

          <button
            type="button"
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            View country code
          </button>
        </div>

        <div className="max-w-xs">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="global">🌐 Global</option>
            <option value="us">🇺🇸 United States</option>
            <option value="uk">🇬🇧 United Kingdom</option>
          </select>
        </div>
      </div>

      {/* Session type */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
          <span>Session type</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
            i
          </span>
        </div>

        <div className="max-w-xs">
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="rotation">Rotation IP</option>
            <option value="sticky">Sticky IP</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WhitelistFormPanel;
