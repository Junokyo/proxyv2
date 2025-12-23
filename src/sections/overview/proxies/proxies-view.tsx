import { useCallback, useState } from 'react';
import DataCenterView from './DataCenter/data-center-view';
import IspProxiesView from './IspProxies/isp-proxies-view';
import { ProxyTabCard } from './proxies-tab-card';
import ResidentialProxiesView from './ResidentialProxies/residential-proxies-view';
import RotatingIspView from './Rotating/rotating-isp-view';
import UlimitedProxiesView from './UlimitedProxies/ulimited-proxies-view';

const TABS_DATA = [
  { value: 'rp', label: 'Residential Proxies', price: '$0.65', unit: '/GB' },
  { value: 'up', label: 'Unlimited Proxies', price: '$10', unit: '/month' },
  { value: 'isp', label: 'ISP Proxies', price: '$1.20', unit: '/IP' },
  { value: 'datacenter', label: 'Datacenter Proxies', price: '$0.50', unit: '/IP' },
  { value: 'rotating', label: 'Rotating ISP Proxies', price: '$15', unit: '/month' },
];

export default function ProxiesView() {
  const [currentTab, setCurrentTab] = useState('rp');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);
  
  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Choose Your Proxy Type
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Select the perfect proxy solution for your needs
        </p>
      </div>

      {/* Tabs Grid - Fully responsive without horizontal scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-2.5 xl:gap-2 mb-8">
        {TABS_DATA.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleChangeTab(tab.value)}
            className={`
              group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-[1.02]
              ${currentTab === tab.value
                ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-xl ring-4 ring-amber-200 scale-[1.02]'
                : 'bg-white border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg'
              }
            `}
          >
            {/* Gradient overlay for active state */}
            {currentTab === tab.value && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/50 to-amber-600/50"></div>
            )}
            
            <div className="relative z-10">
              <ProxyTabCard 
                title={tab.label} 
                price={tab.price} 
                unit={tab.unit} 
              />
            </div>

            {/* Active indicator badge */}
            {currentTab === tab.value && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-slate-800">Active</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Content Section with smooth transition */}
      <div className="w-full">
        <div className="animate-fadeIn">
          {currentTab === 'rp' && <ResidentialProxiesView />}
          {currentTab === 'up' && <UlimitedProxiesView />}
          {currentTab === 'isp' && <IspProxiesView />}
          {currentTab === 'datacenter' && <DataCenterView />}
          {currentTab === 'rotating' && <RotatingIspView />}
        </div>
      </div>
    </div>
  );
}
