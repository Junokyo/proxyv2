// ResidentialExtractionView.tsx
'use client';

import React, { useCallback, useState } from 'react';
import {
  ProxyMode,
  ProxyModeTabs,
} from '@/sections/proxies/components/ProxyModeTabs';
import { UserPassContent } from './UserPass/UserPassContent';
import { WhitelistContent } from './WhiteList/WhitelistContent';

export default function UseSettingSection() {
  const [currentTab, setCurrentTab] = useState<ProxyMode>('user-pass');

  const handleChangeTab = useCallback((mode: ProxyMode) => {
    setCurrentTab(mode);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tabs */}
      <ProxyModeTabs value={currentTab} onChange={handleChangeTab} />

      {/* Content */}
      <div className="mt-4">
        {currentTab === 'user-pass' && <UserPassContent />}
        {currentTab === 'whitelist' && <WhitelistContent />}
        {currentTab === 'alert' && (
          <div className="px-5 py-4 text-sm text-slate-600">
            Alert settings content…
          </div>
        )}
      </div>
    </div>
  );
}
