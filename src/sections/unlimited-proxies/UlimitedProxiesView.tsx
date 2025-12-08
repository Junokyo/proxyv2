// UnlimitedProxiesView.tsx
'use client';

import {
  ProxyTabConfig,
  ProxyTabsLayout,
} from '@/sections/proxies/components/ProxyTabsLayout';
import APIExampleSection from './api-example/ApiExampleSection';
import PurchasePlanSection from './PurchasePlan/PurchasePlanSection';
import UseSettingSection from './UseSetting/UseSettingSection';

const unlimitedTabs: ProxyTabConfig[] = [
  {
    key: 'purchase',
    label: 'Purchase Plan',
    content: <PurchasePlanSection />,
  },
  {
    key: 'use-settings',
    label: 'Use Settings',
    content: <UseSettingSection />,
  },
  {
    key: 'api-example',
    label: 'API Example',
    content: <APIExampleSection />,
  },
  // {
  //   key: 'usage-record',
  //   label: 'Usage Record',
  //   content: '',
  // },
];

export default function UnlimitedProxiesView() {
  return (
    <ProxyTabsLayout
      title="Unlimited Proxies"
      subtitle="Take advantage of unlimited data for seamless browsing and crawling"
      rightLinkText="Free upgrade configuration"
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
