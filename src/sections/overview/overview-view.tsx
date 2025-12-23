import { useCallback, useState } from 'react';
import Iconify from '@/components/iconify';
import ProxiesView from './proxies/proxies-view';
import UniversalApiView from './universal-api/universal-api-view';

const TABS_DATA = [
  {
    value: 'proxies',
    label: 'Proxies',
    icon: 'solar:server-bold-duotone',
    description: 'Manage your proxy services',
  },
  {
    value: 'scraping',
    label: 'Scraping Solutions',
    icon: 'solar:code-scan-bold-duotone',
    description: 'Universal API solutions',
  },
];

export default function OverviewView() {
  const [currentTab, setCurrentTab] = useState('proxies');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 pb-8">
      {/* Header Section with Modern Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 px-4 sm:px-6 lg:px-12 xl:px-16 pt-8 pb-20 sm:pb-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-[1800px] mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white text-xs sm:text-sm font-medium">
                System Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Proxy Dashboard
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Manage your proxies and scraping solutions with our powerful
              platform
            </p>
          </div>

          {/* Tab Cards - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleChangeTab(tab.value)}
                className={`
                  group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-left transition-all duration-300 transform
                  ${
                    currentTab === tab.value
                      ? 'bg-white shadow-2xl scale-105 sm:scale-110'
                      : 'bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:scale-105'
                  }
                `}
              >
                {/* Gradient accent bar */}
                <div
                  className={`
                  absolute top-0 left-0 right-0 h-1 transition-all duration-300
                  ${
                    currentTab === tab.value
                      ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500'
                      : 'bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-amber-500 group-hover:to-orange-500'
                  }
                `}
                ></div>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`
                    flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300
                    ${
                      currentTab === tab.value
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg'
                        : 'bg-amber-100 group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:to-amber-500'
                    }
                  `}
                  >
                    <Iconify
                      icon={tab.icon}
                      className={`text-2xl sm:text-3xl transition-colors duration-300 ${
                        currentTab === tab.value
                          ? 'text-white'
                          : 'text-amber-700 group-hover:text-white'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`
                      text-lg sm:text-xl font-bold mb-2 transition-colors duration-300
                      ${currentTab === tab.value ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}
                    `}
                    >
                      {tab.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                      {tab.description}
                    </p>

                    {/* Active indicator */}
                    {currentTab === tab.value && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-green-600">
                          Active
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className={`
                    transition-all duration-300
                    ${currentTab === tab.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}
                  >
                    <Iconify
                      icon="solar:alt-arrow-right-bold"
                      className="text-xl text-amber-500"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section with Negative Margin for Card Overlap */}
      <div className="relative -mt-12 sm:-mt-16 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Tab Content */}
            <div className="p-4 sm:p-6 lg:p-6 xl:p-8">
              {currentTab === 'proxies' && <ProxiesView />}
              {currentTab === 'scraping' && <UniversalApiView />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
