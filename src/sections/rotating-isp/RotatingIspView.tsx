// UnlimitedProxiesView.tsx
'use client';

import {
  ProxyTabConfig,
  ProxyTabsLayout,
} from '@/sections/proxies/components/ProxyTabsLayout';
import RotatingIspPurchasePlanSection from './PurchasePlan/PurchasePlanSection';
import UseSettingSection from './UseSetting/UseSettingSection';

const unlimitedTabs: ProxyTabConfig[] = [
  {
    key: 'purchase',
    label: 'Purchase Plan',
    content: <RotatingIspPurchasePlanSection />,
  },
  {
    key: 'use-settings',
    label: 'Use Settings',
    content: <UseSettingSection />,
  },
  {
    key: 'api-example',
    label: 'API Example',
    content: '',
  },
  // {
  //   key: 'usage-record',
  //   label: 'Usage Record',
  //   content: '',
  // },
];

export default function RotatingIspView() {
  return (
    <ProxyTabsLayout
      title="Rotating ISP Proxies"
      subtitle="Choose the billing type that suits your use case and get started in minutes"
      rightLinkText=""
      // introCard={
      //   <ProxyIntroCard
      //     icon={<Iconify icon="solar:infinity-outline" />}
      //     title="Unlimited Proxies"
      //     description="Take advantage of unlimited data for seamless browsing and crawling."
      //   />
      // }
      tabs={unlimitedTabs}
      defaultTabKey="purchase"
    />
  );
}
