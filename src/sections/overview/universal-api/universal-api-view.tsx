import { ProxyPlanCard } from '../components/proxy-card-plan';
import { ActionSection } from '../proxies/ResidentialProxies/resident-proxies-action';
import MainAccountUsedCard from './main-account-used-card';
import UniversalCrawlingIntegrationCard from './universal-crawling-integration-card';

export default function UniversalApiView() {
  return (
    <div className="w-full flex-direction-column gap-1 justify-between p-2">
      <div className="flex flex-col gap-6">
        <div className="w-full md:col-span-12">
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
        <div className="w-full md:col-span-12">
          <UniversalCrawlingIntegrationCard />
        </div>

        <div className="w-full md:col-span-12">
          <MainAccountUsedCard />
        </div>

        <div className="w-full md:col-span-12">
          <ActionSection />
        </div>
      </div>
    </div>
  );
}
