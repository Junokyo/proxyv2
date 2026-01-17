'use client';

import { useState } from 'react';

export default function PrivateIpv4WhitelistForm() {
  const [country, setCountry] = useState('us');
  const [state, setState] = useState('random');
  const [city, setCity] = useState('random');
  const [sessionType, setSessionType] = useState('sticky');

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const labelClassName = 'mb-1 flex items-center gap-1 text-[11px] text-muted-foreground';

  const infoIconClassName =
    'flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] text-muted-foreground';

  return (
    <div className="h-full rounded-xl border-0 bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Title */}
      <h2 className="mb-4 text-xs font-semibold text-foreground">Private IPv4 Proxy Generator</h2>

      {/* Country */}
      <div className="mb-3">
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
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
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

      {/* Session settings */}
      <div className="pt-4 border-t border-border">
        <h3 className="mb-3 text-xs font-semibold text-foreground">Session settings</h3>

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
      </div>
    </div>
  );
}
