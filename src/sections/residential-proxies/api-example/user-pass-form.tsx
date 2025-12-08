// ProxyGeneratorSimple.tsx
import React, { useState } from 'react';

const UserPassGeneratorForm: React.FC = () => {
  const [subAccount, setSubAccount] = useState('6avaq3x9z3az');
  const [country, setCountry] = useState('global');
  const [host, setHost] = useState('');
  const [stateIspType, setStateIspType] = useState('state-city');
  const [state, setState] = useState('random');
  const [city, setCity] = useState('random');
  const [sessionType, setSessionType] = useState('rotation');

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Sub-accounts + Add Users */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="w-full md:max-w-md">
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
            <span>Sub-accounts</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
              i
            </span>
          </div>
          <select
            value={subAccount}
            onChange={(e) => setSubAccount(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="6avaq3x9z3az">6avaq3x9z3az</option>
            <option value="account-2">account-2</option>
          </select>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-indigo-500 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm transition hover:bg-indigo-50"
        >
          <span className="mr-1 text-base leading-none">+</span>
          Add Users
        </button>
      </div>

      {/* Divider */}
      <div className="my-4 border-b border-dashed border-slate-200" />

      {/* Proxy generator */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Proxy generator
        </h2>

        {/* Country / Region + Host */}
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

          <div className="grid gap-4 md:grid-cols-2">
            {/* Country */}
            <div>
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

            {/* Host */}
            <div>
              <div className="mb-1 text-xs font-medium text-slate-700 flex items-center gap-1">
                <span>Host</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
                  i
                </span>
              </div>
              <select
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select host</option>
                <option value="host-1">host-1</option>
                <option value="host-2">host-2</option>
              </select>
            </div>
          </div>
        </div>

        {/* State-City / ISP + State */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">
              State-City / ISP
            </div>
            <select
              value={stateIspType}
              onChange={(e) => setStateIspType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="state-city">State-City</option>
              <option value="isp">ISP</option>
            </select>
          </div>

          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">State</div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="random">Random</option>
              <option value="state-1">State 1</option>
              <option value="state-2">State 2</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">City</div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="random">Random</option>
              <option value="city-1">City 1</option>
              <option value="city-2">City 2</option>
            </select>
          </div>

          {/* cột phải trống để align giống UI */}
          <div />
        </div>

        {/* Session type */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
              <span>Session type</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
                i
              </span>
            </div>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="rotation">Rotation IP</option>
              <option value="sticky">Sticky IP</option>
            </select>
          </div>

          <div />
        </div>
      </div>
    </div>
  );
};

export default UserPassGeneratorForm;
