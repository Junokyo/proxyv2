'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Iconify from '@/components/iconify';
import { OrderSummaryCard } from './OrderSummary';
import { PlanCard } from './PlanCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const FEATURES = [
  ['Unlimited traffic', 'Exclusive proxies servers'],
  ['Real residential proxies', 'Unlimited concurrent requests'],
  ['Unlimited IPs', 'Country distribution around the world'],
];

type PlanId = '1d' | '7d' | '30d' | '60d';

export interface Plan {
  id: PlanId;
  label: string;
  days: number;
  originalPrice: number;
  price: number;
  discountLabel: string;
  discountPercent: number;
  extraDiscount?: number;
  perDayOriginal: number;
  perDayPrice: number;
  isHighlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: '1d',
    label: '1Day',
    days: 1,
    originalPrice: 310,
    price: 248,
    discountLabel: '20%OFF',
    discountPercent: 20,
    perDayOriginal: 310,
    perDayPrice: 248,
  },
  {
    id: '7d',
    label: '7Day',
    days: 7,
    originalPrice: 990,
    price: 792,
    discountLabel: '20%OFF',
    discountPercent: 20,
    perDayOriginal: 33,
    perDayPrice: 113,
  },
  {
    id: '30d',
    label: '30Day',
    days: 30,
    originalPrice: 2530,
    price: 2177,
    discountLabel: '10%+Extra $100 OFF',
    discountPercent: 10,
    extraDiscount: 100,
    perDayOriginal: 84,
    perDayPrice: 73,
    isHighlighted: true,
  },
  {
    id: '60d',
    label: '60Day',
    days: 60,
    originalPrice: 4750,
    price: 4175,
    discountLabel: '10%+Extra $100 OFF',
    discountPercent: 10,
    extraDiscount: 100,
    perDayOriginal: 158,
    perDayPrice: 70,
  },
];

const BANDWIDTH_OPTIONS = ['200Mbps', '500Mbps', '1Gbps'];

export default function PurchasePlanSection() {
  const [selectedId, setSelectedId] = useState<PlanId>('30d');
  const [bandwidth, setBandwidth] = useState('200Mbps');
  const selectedPlan = PLANS.find((p) => p.id === selectedId)!;

  return (
    <motion.div
      className="w-full space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top: Subscription + Order Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        {/* LEFT: Subscription cards */}
        <motion.div
          className="rounded-xl border border-border bg-card p-5"
          variants={itemVariants}
        >
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-foreground">Subscription</span>
            <span className="text-xs text-primary">(Unlimited traffic)</span>
          </div>

          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <PlanCard
                  plan={plan}
                  isActive={plan.id === selectedId}
                  onSelect={() => setSelectedId(plan.id)}
                  bandwidth={bandwidth}
                  onBandwidthChange={setBandwidth}
                  bandwidthOptions={BANDWIDTH_OPTIONS}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-5 border-t border-border pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">
                Features you can use with each plan
              </span>
              <button className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                Restricted Websites
                <Iconify icon="mdi:open-in-new" width={12} />
              </button>
            </div>

            <motion.div
              className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {FEATURES.map((col, idx) => (
                <motion.ul
                  key={idx}
                  className="space-y-2.5"
                  variants={itemVariants}
                >
                  {col.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-foreground">
                      <span className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </motion.ul>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Order Summary */}
        <motion.div variants={itemVariants}>
          <OrderSummaryCard selectedPlan={selectedPlan} bandwidth={bandwidth} />
        </motion.div>
      </div>
    </motion.div>
  );
}
