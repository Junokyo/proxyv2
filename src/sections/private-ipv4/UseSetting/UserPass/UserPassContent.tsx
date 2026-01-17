// UserPassContent.tsx
import React from 'react';
import { ProxyGeneratorLayout } from '@/sections/proxies/components/ProxyGeneratorLayout';
import { GenerateResultPanel } from './GenerateResultPanel';
import { PrivateIpv4UserPassPanel } from './PrivateIpv4UserPassPanel';

export const UserPassContent: React.FC = () => {
  return (
    <ProxyGeneratorLayout
      // md: 6/6, xs: 12/12
      left={<PrivateIpv4UserPassPanel />}
      right={
        <GenerateResultPanel
          title="Test Command"
          headerPlaceholder="Please order the Private IPv4 proxies first"
        />
      }
    />
  );
};
