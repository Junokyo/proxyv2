import { ProxyPlanCard } from '../components/proxy-card-plan';
import { ActionSection } from '../proxies/ResidentialProxies/resident-proxies-action';
import MainAccountUsedCard from './main-account-used-card';
import UniversalCrawlingIntegrationCard from './universal-crawling-integration-card';

export default function UniversalApiView() {
  return (
    <div className="w-full max-w-full flex flex-col gap-4 sm:gap-6 overflow-x-hidden">
      <div className="w-full">
        <ProxyPlanCard
          title="Universal Scraping API"
          description="Simulate real user behavior and bypass website access restrictions."
          icon="solar:window-frame-bold-duotone"
          stats={[
            {
              label: 'Remaining results',
              value: '0',
              icon: 'solar:chart-line-duotone',
            },
            {
              label: 'Expiration time',
              value: '--',
              icon: 'solar:clock-circle-outline',
            },
          ]}
          links={['Documentation']}
          pricePanel={{
            price: '1.05',
            unit: '/1k Results',
            badgeText: 'Free 30days',
            features: [
              'Global geographic coverage',
              'Data in raw HTML/PNG format',
              'Browser fingerprinting',
              'Automatic retry and IP rotation',
            ],
          }}
        />
      </div>
      <div className="w-full">
        <UniversalCrawlingIntegrationCard />
      </div>

      <div className="w-full">
        <MainAccountUsedCard />
      </div>

      <div className="w-full">
        <ActionSection />
      </div>
    </div>
  );
}
