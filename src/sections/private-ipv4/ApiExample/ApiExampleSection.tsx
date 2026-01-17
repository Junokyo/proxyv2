'use client';

import { useState, useCallback } from 'react';
import PrivateIpv4UserPassSection from './PrivateIpv4UserPassSection';
import PrivateIpv4WhitelistSection from './PrivateIpv4WhitelistSection';

const TABS_DATA = [
  { value: 'pass', label: 'User & Pass' },
  { value: 'whitelist', label: 'Whitelist' },
];

export default function ApiExampleSection() {
  const [currentTab, setCurrentTab] = useState('pass');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Tab group */}
      <div className="inline-flex items-center rounded-md border border-border bg-muted/30 p-0.5">
        {TABS_DATA.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleChangeTab(tab.value)}
            className={[
              'rounded px-3 py-1.5 text-xs font-medium transition-all',
              currentTab === tab.value
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {currentTab === 'pass' && <PrivateIpv4UserPassSection />}
        {currentTab === 'whitelist' && <PrivateIpv4WhitelistSection />}
      </div>
    </div>
  );
}
