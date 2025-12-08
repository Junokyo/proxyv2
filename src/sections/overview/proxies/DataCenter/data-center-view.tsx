import { ProxyPlanCard } from '../../components/proxy-card-plan';
import { IspProxyListCard } from '../IspProxies/isp-proxy-card';
import { ActionSection } from '../ResidentialProxies/resident-proxies-action';

export default function DataCenterView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full md:col-span-12">
        <ProxyPlanCard
          title="Datacenter Proxies"
          description="Purchase premium data center proxies with unlimited traffic and stable IP addresses. Experience enhanced privacy and speed at an exceptional value."
          icon="solar:server-square-bold-duotone"
          stats={[
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
            price: '0.11',
            unit: '/IP/Day',
            badgeText: '', // Không có badge vàng trong hình
            features: [
              'Exclusive DC Proxies',
              'Best price',
              'Market-leading speed',
              'Pay per IP, no GB limit',
            ],
          }}
        />
      </div>

      <div className="w-full md:col-span-12">
        <IspProxyListCard />
      </div>

      <div className="w-full md:col-span-12">
        <ActionSection />{' '}
      </div>
    </div>
  );
}
