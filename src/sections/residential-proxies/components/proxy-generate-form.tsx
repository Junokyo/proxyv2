// ProxyGeneratorForm.tsx
import React, { useState } from 'react';

const ProxyGeneratorForm: React.FC = () => {
  const [subAccount, setSubAccount] = useState('6avaq3x9z3az');
  const [country, setCountry] = useState('global');
  const [host, setHost] = useState('');
  const [stateIspType, setStateIspType] = useState('state-city');
  const [state, setState] = useState('random');
  const [city, setCity] = useState('random');
  const [username, setUsername] = useState('user-6avaq3x9z3az');
  const [password, setPassword] = useState('O5gqrrtzoP9kQ');
  const [sessionType, setSessionType] = useState('rotation');

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      // nếu cần có toast thì hook thêm sau
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top row: Sub-accounts + Add Users */}
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
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="6avaq3x9z3az">6avaq3x9z3az</option>
            <option value="account-2">account-2</option>
          </select>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-500 hover:text-indigo-600"
        >
          <span className="mr-1 text-base leading-none">+</span>
          Add Users
        </button>
      </div>

      {/* Proxy generator */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Proxy generator
        </h2>

        {/* Country / Region */}
        <div>
          <div className="mb-1 flex items-center justify-between">
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
          <div className="max-w-md">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="flex w-full items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="global">🌐 Global</option>
              <option value="us">🇺🇸 United States</option>
              <option value="uk">🇬🇧 United Kingdom</option>
            </select>
          </div>
        </div>

        {/* Host + State-City/ISP */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
              <span>Host</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
                i
              </span>
            </div>
            <select
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select host</option>
              <option value="host-1">host-1</option>
              <option value="host-2">host-2</option>
            </select>
          </div>

          <div>
            <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
              <span>State-City / ISP</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
                i
              </span>
            </div>
            <select
              value={stateIspType}
              onChange={(e) => setStateIspType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="state-city">State-City</option>
              <option value="isp">ISP</option>
            </select>
          </div>
        </div>

        {/* State + City */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">State</div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="random">Random</option>
              <option value="state-1">State 1</option>
              <option value="state-2">State 2</option>
            </select>
          </div>

          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">City</div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="random">Random</option>
              <option value="city-1">City 1</option>
              <option value="city-2">City 2</option>
            </select>
          </div>
        </div>

        {/* Username + Password */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">
              Username
            </div>
            <div className="flex items-center gap-2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleCopy(username)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
                title="Copy username"
              >
                ⧉
              </button>
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs font-medium text-slate-700">
              Password
            </div>
            <div className="flex items-center gap-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleCopy(password)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
                title="Copy password"
              >
                ⧉
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session settings */}
      <div className="mt-8 space-y-2">
        <h3 className="text-base font-semibold text-slate-900">
          Session settings
        </h3>

        <div>
          <div className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
            <span>Session type</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400">
              i
            </span>
          </div>
          <div className="max-w-md">
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="rotation">Rotation IP</option>
              <option value="sticky">Sticky IP</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyGeneratorForm;
