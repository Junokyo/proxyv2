import React, { useState } from 'react';
import Iconify from '@/components/iconify';

const WhitelistFormPanel: React.FC = () => {
  const [extractionType, setExtractionType] = useState<'link' | 'direct'>('direct');
  const [country, setCountry] = useState('global');
  const [sessionType, setSessionType] = useState('rotation');

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const labelClassName = 'mb-1 flex items-center gap-1 text-[11px] text-muted-foreground';

  const infoIconClassName =
    'flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] text-muted-foreground';

  return (
    <div className="h-full rounded-xl border-0 bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      {/* Top notice */}
      <div className="mb-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 px-3 py-2 text-[11px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
            <Iconify icon="mdi:information" width={14} />
            <span>Whitelist has been added, can be used directly</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline"
          >
            View whitelist
            <Iconify icon="mdi:arrow-right" width={12} />
          </button>
        </div>
      </div>

      {/* Proxy generator */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-foreground">Proxy generator</h2>

        {/* Extraction type */}
        <div>
          <div className={labelClassName}>
            <span>Extraction type</span>
            <span className={infoIconClassName}>i</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {/* Link Extraction */}
            <button
              type="button"
              onClick={() => setExtractionType('link')}
              className={[
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] transition',
                extractionType === 'link'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-background text-foreground hover:border-primary/50',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-3.5 w-3.5 items-center justify-center rounded-full border',
                  extractionType === 'link' ? 'border-primary' : 'border-border',
                ].join(' ')}
              >
                {extractionType === 'link' && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </span>
              <span>Link Extraction</span>
            </button>

            {/* Direct Generation */}
            <button
              type="button"
              onClick={() => setExtractionType('direct')}
              className={[
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] transition',
                extractionType === 'direct'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-background text-foreground hover:border-primary/50',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-3.5 w-3.5 items-center justify-center rounded-full border',
                  extractionType === 'direct' ? 'border-primary' : 'border-border',
                ].join(' ')}
              >
                {extractionType === 'direct' && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </span>
              <span>Direct Generation</span>
            </button>
          </div>
        </div>

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

      {/* Advanced settings */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <h3 className="text-xs font-semibold text-foreground">Advanced settings</h3>

        <div>
          <div className={labelClassName}>Unblock targets</div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="h-7 inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 text-[11px] font-medium text-foreground transition hover:bg-muted hover:border-primary/50"
            >
              <Iconify icon="mdi:shield-check" width={12} />
              Apply for Unblock
            </button>

            <button
              type="button"
              className="text-[11px] font-medium text-primary hover:underline"
            >
              View domain status
            </button>
          </div>

          <p className="mt-1.5 text-[10px] text-muted-foreground">
            Some domain names do not support access, but they can be accessed
            normally after submission for review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhitelistFormPanel;
