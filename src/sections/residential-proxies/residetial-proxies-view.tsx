'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ApiSettingView from './api-example/api-example-view';
import { PurchasePlanView } from './purchase-plan/purchase-plan-view';
import UsageRecordView from './usage-record/usage-record-view';
import UseSettingView from './use-setting/use-setting-view';

const TABS_DATA = [
  { value: 'PurchasePlan', label: 'Purchase Plan' },
  { value: 'UseSettings', label: 'Use Settings' },
  { value: 'APIExample', label: 'API Example' },
  { value: 'UsageRecord', label: 'Usage Record' },
];

export default function ResidentialProxiesView() {
  const [currentTab, setCurrentTab] = useState('PurchasePlan');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Residential Proxies</h1>

        {/* Tabs - Underline style */}
        <div className="mt-4 flex items-center gap-6 border-b border-border">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'pb-3 text-sm font-medium transition-colors relative ' +
                (currentTab === tab.value
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {tab.label}
              {currentTab === tab.value && (
                <motion.div
                  layoutId="residential-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {currentTab === 'PurchasePlan' && <PurchasePlanView />}
          {currentTab === 'UseSettings' && <UseSettingView />}
          {currentTab === 'APIExample' && <ApiSettingView />}
          {currentTab === 'UsageRecord' && <UsageRecordView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
