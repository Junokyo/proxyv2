'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';

export default function PrivateIpv4ProxyGeneratorForm() {
  const [subAccount, setSubAccount] = useState('6avaq3x9z3az');
  const [country, setCountry] = useState('us');
  const [state, setState] = useState('random');
  const [city, setCity] = useState('random');
  const [sessionType, setSessionType] = useState('sticky');
  const [sessionDuration, setSessionDuration] = useState('30');

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const labelClassName = 'mb-1 flex items-center gap-1 text-[11px] text-muted-foreground';

  const infoIconClassName =
    'flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] text-muted-foreground';

  return (
    <div className="h-full rounded-xl border-0 bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Top row: Sub-accounts + Add Users */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
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
          className="h-7 inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-2 text-[11px] font-medium text-foreground transition hover:bg-muted hover:border-primary/50"
        >
          <Iconify icon="mdi:plus" width={14} />
          Add Users
        </button>
      </div>

      {/* Proxy generator */}
      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <h2 className="text-xs font-semibold text-foreground">Private IPv4 Proxy Generator</h2>

        {/* Country */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className={labelClassName}>
              <span>Country</span>
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
            <option value="us">🇺🇸 United States</option>
            <option value="uk">🇬🇧 United Kingdom</option>
            <option value="de">🇩🇪 Germany</option>
            <option value="fr">🇫🇷 France</option>
            <option value="jp">🇯🇵 Japan</option>
            <option value="kr">🇰🇷 South Korea</option>
            <option value="sg">🇸🇬 Singapore</option>
            <option value="nl">🇳🇱 Netherlands</option>
            <option value="cn">🇨🇳 China</option>
            <option value="au">🇦🇺 Australia</option>
          </select>
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
              <option value="california">California</option>
              <option value="texas">Texas</option>
              <option value="new-york">New York</option>
              <option value="florida">Florida</option>
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
              <option value="los-angeles">Los Angeles</option>
              <option value="houston">Houston</option>
              <option value="new-york-city">New York City</option>
              <option value="miami">Miami</option>
            </select>
          </div>
        </div>
      </div>

      {/* Session settings */}
      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <h3 className="text-xs font-semibold text-foreground">Session settings</h3>

        <div className="grid gap-2 sm:grid-cols-2">
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
              <option value="sticky">Sticky IP</option>
              <option value="rotation">Rotation IP</option>
            </select>
          </div>

          <div>
            <div className={labelClassName}>
              <span>Session duration</span>
              <span className={infoIconClassName}>i</span>
            </div>
            <select
              value={sessionDuration}
              onChange={(e) => setSessionDuration(e.target.value)}
              className={selectClassName}
            >
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="1440">24 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button
          type="button"
          className="w-full h-8 rounded-md bg-primary text-xs font-medium text-white hover:bg-primary/90 transition inline-flex items-center justify-center gap-1.5"
        >
          <Iconify icon="mdi:refresh" width={14} />
          Generate Proxy
        </button>
      </div>
    </div>
  );
}
