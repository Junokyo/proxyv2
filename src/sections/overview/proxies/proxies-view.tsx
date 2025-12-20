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
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="w-full max-w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 border rounded-lg p-2 sm:p-3 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        {/* Tab group */}
        {TABS_DATA.map((tab) => (
          <div
            key={tab.value}
            className={
              'rounded-lg transition cursor-pointer flex-shrink-0 sm:flex-shrink min-w-[140px] sm:min-w-0 max-w-full ' +
              (currentTab === tab.value
                ? 'bg-slate-200 ring-2 ring-slate-300' // active
                : 'hover:bg-slate-100') // inactive
            }
            onClick={() => handleChangeTab(tab.value)}
          >
            <ProxyTabCard title={tab.label} price="$10" unit="/month" />
          </div>
        ))}
      </div>

      {/* Nội dung tab */}
      <div className="mt-4 text-sm text-slate-600 w-full max-w-full overflow-x-hidden">
        {currentTab === 'rp' && <ResidentialProxiesView />}
        {currentTab === 'up' && <UlimitedProxiesView />}
        {currentTab === 'isp' && <IspProxiesView />}
        {currentTab === 'datacenter' && <DataCenterView />}
        {currentTab === 'rotating' && <RotatingIspView />}
      </div>
    </div>
  );
}
