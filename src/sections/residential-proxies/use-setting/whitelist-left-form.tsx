// ProxySettingsPanel.tsx
import React, { useState } from 'react';

const WhitelistFormPanel: React.FC = () => {
  const [extractionType, setExtractionType] = useState<'link' | 'direct'>(
    'direct',
  );
  const [country, setCountry] = useState('global');
  const [sessionType, setSessionType] = useState('rotation');

  return (
    <div className="space-y-4">
      {/* MAIN CARD */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Top notice */}
        <div className="mb-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                i
              </span>
              <span>Whitelist has been added, can be used directly</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
            >
              View whitelist
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>

        <div className="mb-5 border-b border-dashed border-slate-200" />

        {/* Proxy generator */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            Proxy generator
          </h2>

          {/* Extraction type */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
              <span>Extraction type</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
                i
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {/* Link Extraction */}
              <button
                type="button"
                onClick={() => setExtractionType('link')}
                className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition ${
                  extractionType === 'link'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      extractionType === 'link'
                        ? 'border-blue-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {extractionType === 'link' && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </span>
                  <span>Link Extraction</span>
                </div>
              </button>

              {/* Direct Generation */}
              <button
                type="button"
                onClick={() => setExtractionType('direct')}
                className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition ${
                  extractionType === 'direct'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      extractionType === 'direct'
                        ? 'border-blue-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {extractionType === 'direct' && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </span>
                  <span>Direct Generation</span>
                </div>
              </button>
            </div>
          </div>

          {/* Country / Region */}
          <div className="space-y-2">
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

          {/* Divider */}
          <div className="border-b border-dashed border-slate-200 pt-2" />

          {/* Session settings */}
          <div className="pt-4 space-y-3">
            <h3 className="text-base font-semibold text-slate-900">
              Session settings
            </h3>

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
        </div>
      </div>

      {/* ADVANCED SETTINGS CARD */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-base font-semibold text-slate-900">
          Advanced settings
        </h3>

        <div className="space-y-2">
          <div className="text-xs font-medium text-slate-700">
            Unblock targets
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Apply for Unblock
            </button>

            <button
              type="button"
              className="text-xs font-medium text-indigo-600 hover:underline"
            >
              View domain status
            </button>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Some domain names do not support access, but they can be accessed
            normally after submission for review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhitelistFormPanel;
