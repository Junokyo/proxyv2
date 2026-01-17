'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Iconify from '@/components/iconify';
import { Plan } from './PurchasePlanSection';

export interface OrderSummaryCardProps {
  selectedPlan: Plan;
  bandwidth: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  selectedPlan,
  bandwidth,
}) => {
  // Calculate dynamic values based on selected plan
  const subtotal = selectedPlan.originalPrice;
  const discountAmount = Math.round(subtotal * (selectedPlan.discountPercent / 100));
  const extraDiscount = selectedPlan.extraDiscount || 0;
  const total = selectedPlan.price;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Order Summary</h3>

      {/* Product Info */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Unlimited Proxies</span>
          <span className="font-medium text-foreground">Unlimited</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedPlan.days}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-foreground"
            >
              {selectedPlan.days} Day
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Bandwidth</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={bandwidth}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-foreground"
            >
              {bandwidth}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={subtotal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-foreground"
            >
              ${subtotal}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex justify-between text-primary">
          <span>Discount (-{selectedPlan.discountPercent}%)</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={discountAmount}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              -${discountAmount}
            </motion.span>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {extraDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-primary"
            >
              <span>Double discount offer</span>
              <span>-${extraDiscount}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-foreground">Total</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={total}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            className="text-lg font-bold text-foreground"
          >
            ${total}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Order Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button className="mt-4 h-10 w-full gap-2">
          Order Now
          <Iconify icon="mdi:arrow-right" width={16} />
        </Button>
      </motion.div>

      {/* Payment Methods */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-muted-foreground">We accept these payment methods:</p>
        <div className="mt-2 flex justify-center gap-3">
          {['logos:visa', 'logos:mastercard', 'logos:paypal'].map((icon, idx) => (
            <motion.div
              key={icon}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
              className="flex h-6 w-10 items-center justify-center rounded bg-muted"
            >
              <Iconify icon={icon} width={24} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
