// Private IPv4 Proxies View
'use client';

import {
  ProxyTabConfig,
  ProxyTabsLayout,
} from '@/sections/proxies/components/ProxyTabsLayout';
import PrivateIpv4PurchasePlanSection from './PurchasePlan/PurchasePlanSection';
import UseSettingSection from './UseSetting/UseSettingSection';
import ApiExampleSection from './ApiExample/ApiExampleSection';

const privateIpv4Tabs: ProxyTabConfig[] = [
  {
    key: 'purchase',
    label: 'Purchase Plan',
    content: <PrivateIpv4PurchasePlanSection />,
  },
  {
    key: 'use-settings',
    label: 'Use Settings',
    content: <UseSettingSection />,
  },
  {
    key: 'api-example',
    label: 'API Example',
    content: <ApiExampleSection />,
  },
];

export default function PrivateIpv4View() {
  return (
    <ProxyTabsLayout
      title="Private IPv4 Proxies"
      subtitle="High-quality private IPv4 proxies with dedicated IP addresses"
      rightLinkText=""
      tabs={privateIpv4Tabs}
      defaultTabKey="purchase"
    />
  );
}
