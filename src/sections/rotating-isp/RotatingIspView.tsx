// ISP Proxies View
'use client';

import {
  ProxyTabConfig,
  ProxyTabsLayout,
} from '@/sections/proxies/components/ProxyTabsLayout';
import IspPurchasePlanSection from './PurchasePlan/PurchasePlanSection';
import UseSettingSection from './UseSetting/UseSettingSection';
import ApiExampleSection from './ApiExample/ApiExampleSection';

const ispTabs: ProxyTabConfig[] = [
  {
    key: 'purchase',
    label: 'Purchase Plan',
    content: <IspPurchasePlanSection />,
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

export default function RotatingIspView() {
  return (
    <ProxyTabsLayout
      title="ISP Proxies"
      subtitle="Equipped with ISP proxy, enjoy unparalleled speed and stability"
      rightLinkText=""
      tabs={ispTabs}
      defaultTabKey="purchase"
    />
  );
}
