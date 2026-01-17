import React, { useState } from 'react';
import Iconify from '@/components/iconify';

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
    } catch (e) {
      console.error(e);
    }
  };

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const inputClassName =
    'flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const labelClassName = 'mb-1 flex items-center gap-1 text-[11px] text-muted-foreground';

  const infoIconClassName =
    'flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] text-muted-foreground';

  return (
    <div className="h-full rounded-xl border-0 bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Top row: Sub-accounts + Add Users */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 max-w-md">
          <div className={labelClassName}>
            <span>Sub-accounts</span>
            <span className={infoIconClassName}>i</span>
          </div>
          <select
            value={subAccount}
            onChange={(e) => setSubAccount(e.target.value)}
            className={selectClassName}
          >
            <option value="6avaq3x9z3az">6avaq3x9z3az</option>
            <option value="account-2">account-2</option>
          </select>
        </div>

        <button
          type="button"
          className="h-7 inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-3 text-[11px] font-medium text-foreground transition hover:bg-muted hover:border-primary/50"
        >
          <Iconify icon="mdi:plus" width={14} />
          Add Users
        </button>
      </div>

      {/* Proxy generator */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <h2 className="text-xs font-semibold text-foreground">Proxy generator</h2>

        {/* Country / Region */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className={labelClassName}>
              <span>Country/Region</span>
              <span className={infoIconClassName}>i</span>
            </div>
            <button
              type="button"
              className="text-[11px] font-medium text-primary hover:underline"
            >
              View country code
            </button>
          </div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={selectClassName}
          >
            <option value="global">🌐 Global</option>
            <option value="us">🇺🇸 United States</option>
            <option value="uk">🇬🇧 United Kingdom</option>
          </select>
        </div>

        {/* Host + State-City/ISP */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <div className={labelClassName}>
              <span>Host</span>
              <span className={infoIconClassName}>i</span>
            </div>
            <select
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className={selectClassName}
            >
              <option value="">Select host</option>
              <option value="host-1">host-1</option>
              <option value="host-2">host-2</option>
            </select>
          </div>

          <div>
            <div className={labelClassName}>
              <span>State-City / ISP</span>
              <span className={infoIconClassName}>i</span>
            </div>
            <select
              value={stateIspType}
              onChange={(e) => setStateIspType(e.target.value)}
              className={selectClassName}
            >
              <option value="state-city">State-City</option>
              <option value="isp">ISP</option>
            </select>
          </div>
        </div>

        {/* State + City */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <div className={labelClassName}>State</div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={selectClassName}
            >
              <option value="random">Random</option>
              <option value="state-1">State 1</option>
              <option value="state-2">State 2</option>
            </select>
          </div>

          <div>
            <div className={labelClassName}>City</div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={selectClassName}
            >
              <option value="random">Random</option>
              <option value="city-1">City 1</option>
              <option value="city-2">City 2</option>
            </select>
          </div>
        </div>

        {/* Username + Password */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <div className={labelClassName}>Username</div>
            <div className="flex items-center gap-1.5">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() => handleCopy(username)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                title="Copy username"
              >
                <Iconify icon="mdi:content-copy" width={12} />
              </button>
            </div>
          </div>

          <div>
            <div className={labelClassName}>Password</div>
            <div className="flex items-center gap-1.5">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() => handleCopy(password)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                title="Copy password"
              >
                <Iconify icon="mdi:content-copy" width={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session settings */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <h3 className="text-xs font-semibold text-foreground">Session settings</h3>

        <div>
          <div className={labelClassName}>
            <span>Session type</span>
            <span className={infoIconClassName}>i</span>
          </div>
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className={selectClassName}
          >
            <option value="rotation">Rotation IP</option>
            <option value="sticky">Sticky IP</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProxyGeneratorForm;
