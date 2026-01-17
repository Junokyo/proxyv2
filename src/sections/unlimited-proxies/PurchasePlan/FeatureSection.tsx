'use client';

import Iconify from '@/components/iconify';

const FEATURES = [
  ['Unlimited traffic', 'Exclusive proxies servers'],
  ['Real residential proxies', 'Unlimited concurrent requests'],
  ['Unlimited IPs', 'Country distribution around the world'],
];

export const FeaturesSection: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">
          Features you can use with each plan
        </span>
        <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
          Restricted Websites
          <Iconify icon="mdi:open-in-new" width={12} />
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {FEATURES.map((col, idx) => (
          <ul key={idx} className="space-y-2.5">
            {col.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-foreground">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
