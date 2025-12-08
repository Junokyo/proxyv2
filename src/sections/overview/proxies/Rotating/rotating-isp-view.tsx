import { ProxyPlanCard } from '../../components/proxy-card-plan';
import { ActionSection } from '../ResidentialProxies/resident-proxies-action';
import { ResidentProxiesTrafficChartCard } from '../ResidentialProxies/resident-proxies-traffic-chart';

export default function RotatingIspView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full md:col-span-12">
        <ProxyPlanCard
          title="Rotating ISP Proxies"
          description="Utilize our rotating ISP proxy service for sessions that persist from 30 minutes to 12 hours, ensuring stability and reliability for your high-performance tasks."
          icon="solar:home-wifi-angle-bold-duotone"
          stats={[
            {
              label: 'Remaining traffic',
              value: '0.00',
              unit: 'GB',
              icon: 'solar:chart-line-duotone',
            },
            {
              label: 'Expiration time',
              value: '--',
              icon: 'solar:clock-circle-outline',
            },
          ]}
          pricePanel={{
            price: '0.4',
            unit: '/GB',
            badgeText: '90% OFF',
            features: [
              'Up to 12 hours of IP session',
              'Automatic IP rotation',
              '500 whitelists',
              '195 popular locations',
            ],
          }}
        />
      </div>

      <div className="w-full md:col-span-12">
        <ResidentProxiesTrafficChartCard />
      </div>

      <div className="w-full md:col-span-12">
        <ActionSection />
      </div>
    </div>
  );
}
