import { ProxyPlanCard } from '../../components/proxy-card-plan';
import { ActionSection } from '../ResidentialProxies/resident-proxies-action';

import { IspProxyListCard } from './isp-proxy-card';

/**
 * ISP Proxies View component
 * Displays ISP proxy plans and configurations
 */
export default function IspProxiesView() {
  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col gap-6 min-w-0">
      <div className="w-full md:col-span-12">
        <ProxyPlanCard
          title="ISP Proxies"
          description="Trusted premium ISP proxy. Get uninterrupted connectivity and unlimited residential IP sessions for your business on a pay-per-IP basis."
          icon="line-md:home"
          stats={[
            {
              label: 'Extractable',
              value: '0',
              unit: 'IPs',
              icon: 'solar:cloud-download-outline',
            },
            {
              label: 'Available',
              value: '0',
              unit: 'IPs',
              icon: 'solar:map-point-wave-outline',
            },
            {
              label: 'Expiring soon',
              value: '0',
              unit: 'IPs',
              icon: 'solar:alarm-outline',
            },
            {
              label: 'Automatic renewal',
              value: '0',
              unit: 'IPs',
              icon: 'solar:refresh-outline',
            },
          ]}
          pricePanel={{
            price: '0.17',
            unit: '/IP/Day',
            badgeText: '', // Hình của bạn không có badge màu vàng
            features: [
              'Dedicated IP',
              'Unlimited duration sessions',
              'Lifetime IP retention',
              'Unlimited traffic',
            ],
          }}
        />
      </div>

      <div className="w-full md:col-span-12">
        <IspProxyListCard />
      </div>

      <div className="w-full md:col-span-12">
        <ActionSection />
      </div>
    </div>
  );
}
