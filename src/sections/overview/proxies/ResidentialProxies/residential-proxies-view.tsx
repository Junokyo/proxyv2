import { ProxyPlanCard } from '../../components/proxy-card-plan';

import { ActionSection } from './resident-proxies-action';
import { ResidentProxiesTrafficChartCard } from './resident-proxies-traffic-chart';

/**
 * Residential Proxies View component
 * Displays residential proxy plans and traffic statistics
 */
export default function ResidentialProxiesView() {
  return (
    <div className="w-full max-w-full flex flex-col gap-6 overflow-x-hidden">
      <div className="w-full md:col-span-12">
        <ProxyPlanCard
          title="Residential Proxies"
          description="Discover over 200M+ ethically sourced residential IPs for seamless human-like crawling. Access local public data effortlessly and without barriers."
          icon="line-md:home"
          stats={[
            {
              label: 'Remaining traffic',
              value: '0.00',
              unit: 'GB',
              icon: 'mynaui:chart-line',
            },
            {
              label: 'Expiration time',
              value: '--',
              icon: 'mdi:timer-outline',
            },
          ]}
          pricePanel={{
            price: '0.65',
            unit: '/GB',
            badgeText: '83% OFF',
            features: [
              'HTTP/HTTPS/SOCKS5 protocols',
              'Unused GBs roll over',
              '99.9% fast response time',
              'Country and city-level targeting',
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
