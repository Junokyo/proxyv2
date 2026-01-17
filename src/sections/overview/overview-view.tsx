'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import {
  ProxyTypeTabs,
  ProxyTypeCards,
  ProductInfoCard,
  TrafficLineChart,
  ExchangeCDKeyWidget,
  AffiliateWidget,
  ContactWidget,
} from './components';
import {
  PROXY_TYPES,
  TRAFFIC_CHART_DATA,
  AFFILIATE_DATA,
  MAIN_TABS,
} from './data/mock-data';
import UniversalApiView from './universal-api/universal-api-view';

export default function OverviewView() {
  // Main tab state (Proxies / Scraping API)
  const [currentTab, setCurrentTab] = useState<string>('proxies');

  // Active proxy type
  const [activeProxyType, setActiveProxyType] = useState<string>('residential');

  // Get current proxy data
  const currentProxy = useMemo(
    () => PROXY_TYPES.find((p) => p.value === activeProxyType) || PROXY_TYPES[0],
    [activeProxyType]
  );

  const handleMainTabChange = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  const handleProxyTypeChange = useCallback((value: string) => {
    setActiveProxyType(value);
  }, []);

  const handleCDKeyExchange = useCallback((cdkey: string) => {
    console.log('Exchange CDKey:', cdkey);
    // TODO: Implement API call
  }, []);

  return (
    <div className="w-full">
      {/* Main Layout: Content + Sidebar */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Main Tabs */}
          <ProxyTypeTabs
            tabs={MAIN_TABS}
            activeTab={currentTab}
            onTabChange={handleMainTabChange}
          />

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {currentTab === 'proxies' && (
              <motion.div
                key="proxies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Proxy Type Cards */}
                <ProxyTypeCards
                  proxyTypes={PROXY_TYPES}
                  activeType={activeProxyType}
                  onTypeChange={handleProxyTypeChange}
                />

                {/* Product Info Card */}
                <ProductInfoCard proxy={currentProxy} />

                {/* Traffic Chart */}
                <TrafficLineChart
                  data={TRAFFIC_CHART_DATA}
                  title="Total traffic"
                  subtitle="Last 30 days:"
                />
              </motion.div>
            )}

            {currentTab === 'scraping' && (
              <motion.div
                key="scraping"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <UniversalApiView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[300px] shrink-0 space-y-4">
          {/* Exchange CDKey */}
          <ExchangeCDKeyWidget onExchange={handleCDKeyExchange} />

          {/* Affiliate Program */}
          <AffiliateWidget
            invitationCode={AFFILIATE_DATA.invitationCode}
            invitationLink={AFFILIATE_DATA.invitationLink}
            commission={AFFILIATE_DATA.commission}
            withdrawable={AFFILIATE_DATA.withdrawable}
          />

          {/* Contact */}
          <ContactWidget />
        </div>
      </div>
    </div>
  );
}
