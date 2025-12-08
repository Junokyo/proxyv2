// WhitelistContent.tsx
import React from 'react';
import { ProxyGeneratorLayout } from '@/sections/proxies/components/ProxyGeneratorLayout';
import { InterfaceParametersPanel } from './InterfaceParametersPanel';
import { WhitelistLeftPanel } from './WhitelistLeftPanel';

export const WhitelistContent: React.FC = () => {
  return (
    <ProxyGeneratorLayout
      left={<WhitelistLeftPanel />}
      right={<InterfaceParametersPanel />}
    />
  );
};
