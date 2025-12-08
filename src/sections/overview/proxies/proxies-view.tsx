import { useCallback, useState } from 'react';
import DataCenterView from './DataCenter/data-center-view';
import IspProxiesView from './IspProxies/isp-proxies-view';
import { ProxyTabCard } from './proxies-tab-card';
import ResidentialProxiesView from './ResidentialProxies/residential-proxies-view';
import RotatingIspView from './Rotating/rotating-isp-view';
import UlimitedProxiesView from './UlimitedProxies/ulimited-proxies-view';

const TABS_DATA = [
  { value: 'rp', label: 'Residential Proxies', color: '#f97316' },
  { value: 'up', label: 'Unlimited Proxies', color: '#14b8a6' },
  { value: 'isp', label: 'ISP Proxies', color: '#14b8a6' },
  { value: 'datacenter', label: 'Datacenter Proxies', color: '#14b8a6' },
  { value: 'rotating', label: 'Rotating ISP Proxies', color: '#14b8a6' },
];

export default function ProxiesView() {
  const [currentTab, setCurrentTab] = useState('rp');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);
  return (
    <div className="w-full">
      <div className="w-full flex flex-direction-column gap-1 justify-between border rounded-lg p-2 ">
        {/* Tab group */}
        {TABS_DATA.map((tab) => (
          <div
            key={tab.value}
            className={
              'rounded-lg transition cursor-pointer ' +
              (currentTab === tab.value
                ? 'bg-slate-200' // active
                : 'hover:bg-slate-100') // inactive
            }
            onClick={() => handleChangeTab(tab.value)}
          >
            <ProxyTabCard title={tab.label} price="$10" unit="/month" />
          </div>
        ))}
      </div>

      {/* Nội dung tab */}
      <div className="mt-4 text-sm text-slate-600">
        {currentTab === 'rp' && <ResidentialProxiesView />}
        {currentTab === 'up' && <UlimitedProxiesView />}
        {currentTab === 'isp' && <IspProxiesView />}
        {currentTab === 'datacenter' && <DataCenterView />}
        {currentTab === 'rotating' && <RotatingIspView />}
      </div>
    </div>
  );
}
