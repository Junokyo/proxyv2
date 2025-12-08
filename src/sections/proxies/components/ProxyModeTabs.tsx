// ProxyModeTabs.tsx
'use client';

import React from 'react';

export type ProxyMode = 'user-pass' | 'whitelist' | 'alert';

interface TabDef {
  key: ProxyMode;
  label: string;
}

const DEFAULT_TABS: TabDef[] = [
  { key: 'user-pass', label: 'User & Pass' },
  { key: 'whitelist', label: 'Whitelist' },
  // { key: 'alert', label: 'Alert settings' },
];

interface ProxyModeTabsProps {
  value: ProxyMode;
  onChange: (mode: ProxyMode) => void;
  tabs?: TabDef[];
}

export const ProxyModeTabs: React.FC<ProxyModeTabsProps> = ({
  value,
  onChange,
  tabs = DEFAULT_TABS,
}) => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white px-4 py-2">
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`rounded-t-md px-4 py-1.5 text-xs font-medium transition
              ${
                active
                  ? 'bg-blue-500 text-white shadow'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
