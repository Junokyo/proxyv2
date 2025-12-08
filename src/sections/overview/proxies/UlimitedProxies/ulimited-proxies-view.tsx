import { ProxyPlanCard } from '../../components/proxy-card-plan';
import { ActionSection } from '../ResidentialProxies/resident-proxies-action';
import { ServerListCard } from './ulimited-proxies-server';

export default function UlimitedProxiesView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full md:col-span-12">
        <ProxyPlanCard
          title="Unlimited Proxies"
          description="Experience seamless web data crawling with no GB fees or IP limits. Achieve higher scalability for your business while enjoying unlimited traffic."
          icon="line-md:home"
          stats={[
            {
              label: 'Available servers',
              value: '0',
              icon: 'hugeicons:computer',
            },
            {
              label: 'Expiring soon',
              value: '0',
              icon: 'icon-park-solid:alarm-clock',
            },
          ]}
          pricePanel={{
            price: '70',
            unit: '/Day',
            badgeText: 'Unlimited traffic',
            features: [
              'Unlimited traffic usage',
              'IP rotation mechanism',
              'Dedicated Proxies server',
              'Top Proxies performance',
            ],
          }}
        />
      </div>

      <div className="w-full md:col-span-12">
        <ServerListCard />
      </div>

      <div className="w-full md:col-span-12">
        <ActionSection />
      </div>
    </div>
  );
}
