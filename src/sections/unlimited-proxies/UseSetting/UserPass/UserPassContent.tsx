// UserPassContent.tsx
import React from 'react';
import { ProxyGeneratorLayout } from '@/sections/proxies/components/ProxyGeneratorLayout';
import { GenerateResultPanel } from './GenerateResultPanel';
import { ResidentialUserPassPanel } from './ResidentialUserPassPanel';

export const UserPassContent: React.FC = () => {
  return (
    <ProxyGeneratorLayout
      // md: 6/6, xs: 12/12
      left={<ResidentialUserPassPanel />}
      right={
        <GenerateResultPanel
          title="Test Command"
          headerPlaceholder="Please order the Residential proxies first"
        />
      }
    />
  );
};
