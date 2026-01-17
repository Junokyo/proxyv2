'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Iconify from '@/components/iconify';
import { cn } from '@/lib/utils';
import AutomaticRenewalSection from './AutomaticRenewal/AutomaticRenewalSection';
import BalanceHistorySection from './BalanceHistory/BalanceHistorySection';
import ConversionSection from './Conversion/ConversionSection';

const TABS_DATA = [
  { value: 'conversion', label: 'Quy Đổi Gói', icon: 'mdi:swap-horizontal-circle' },
  { value: 'autoRenewal', label: 'Gia Hạn Tự Động', icon: 'mdi:autorenew' },
  { value: 'balanceHistory', label: 'Lịch Sử Giao Dịch', icon: 'mdi:history' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function ProxyConversionView() {
  const [currentTab, setCurrentTab] = useState('conversion');

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <motion.div
      className="w-full min-w-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-4">
        <h1 className="text-lg font-bold text-foreground">Quy Đổi Proxy</h1>
        <p className="text-xs text-muted-foreground">
          Quy đổi số dư thành gói proxy hoặc quản lý gia hạn
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-4">
        <LayoutGroup>
          <div className="inline-flex gap-6 border-b border-border">
            {TABS_DATA.map((tab) => {
              const isActive = currentTab === tab.value;
              return (
                <motion.button
                  key={tab.value}
                  type="button"
                  onClick={() => handleChangeTab(tab.value)}
                  className={cn(
                    'relative inline-flex items-center gap-1.5 pb-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentTab === 'conversion' && (
          <motion.div
            key="conversion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ConversionSection />
          </motion.div>
        )}
        {currentTab === 'autoRenewal' && (
          <motion.div
            key="autoRenewal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AutomaticRenewalSection />
          </motion.div>
        )}
        {currentTab === 'balanceHistory' && (
          <motion.div
            key="balanceHistory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <BalanceHistorySection />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
