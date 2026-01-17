'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

// Duration options with discounts
const DURATION_OPTIONS = [
  { value: 7, label: '7 Days', discount: null, icon: 'mdi:calendar-week' },
  { value: 14, label: '14 Days', discount: '5%', icon: 'mdi:calendar-week' },
  { value: 30, label: '30 Days', discount: '10%', icon: 'mdi:calendar-month' },
  { value: 60, label: '60 Days', discount: '15%', icon: 'mdi:calendar-month' },
  { value: 90, label: '90 Days', discount: '20%', icon: 'mdi:calendar-month' },
];

// Country data
interface Country {
  code: string;
  name: string;
  flag: string;
  pricePerIp: number;
  continent: 'asia' | 'europe' | 'other';
}

const COUNTRIES: Country[] = [
  // Asia
  { code: 'kz', name: 'Kazakhstan', flag: '🇰🇿', pricePerIp: 2.88, continent: 'asia' },
  { code: 'in', name: 'India', flag: '🇮🇳', pricePerIp: 2.88, continent: 'asia' },
  { code: 'tr', name: 'Türkiye', flag: '🇹🇷', pricePerIp: 2.88, continent: 'asia' },
  { code: 'ge', name: 'Georgia', flag: '🇬🇪', pricePerIp: 2.88, continent: 'asia' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬', pricePerIp: 2.88, continent: 'asia' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷', pricePerIp: 2.88, continent: 'asia' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭', pricePerIp: 2.88, continent: 'asia' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾', pricePerIp: 2.88, continent: 'asia' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵', pricePerIp: 2.88, continent: 'asia' },
  { code: 'am', name: 'Armenia', flag: '🇦🇲', pricePerIp: 2.88, continent: 'asia' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩', pricePerIp: 2.88, continent: 'asia' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩', pricePerIp: 2.88, continent: 'asia' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪', pricePerIp: 2.88, continent: 'asia' },
  { code: 'hk', name: 'Hong Kong', flag: '🇭🇰', pricePerIp: 2.88, continent: 'asia' },
  { code: 'cn', name: 'China', flag: '🇨🇳', pricePerIp: 2.88, continent: 'asia' },
  // Europe
  { code: 'fr', name: 'France', flag: '🇫🇷', pricePerIp: 2.88, continent: 'europe' },
  { code: 'de', name: 'Germany', flag: '🇩🇪', pricePerIp: 2.88, continent: 'europe' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱', pricePerIp: 2.88, continent: 'europe' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', pricePerIp: 2.88, continent: 'europe' },
  { code: 'it', name: 'Italy', flag: '🇮🇹', pricePerIp: 2.88, continent: 'europe' },
  { code: 'bg', name: 'Bulgaria', flag: '🇧🇬', pricePerIp: 2.88, continent: 'europe' },
  { code: 'lv', name: 'Latvia', flag: '🇱🇻', pricePerIp: 2.88, continent: 'europe' },
  { code: 'pl', name: 'Poland', flag: '🇵🇱', pricePerIp: 2.88, continent: 'europe' },
  { code: 'es', name: 'Spain', flag: '🇪🇸', pricePerIp: 2.88, continent: 'europe' },
  { code: 'lt', name: 'Lithuania', flag: '🇱🇹', pricePerIp: 2.88, continent: 'europe' },
  { code: 'cz', name: 'Czech Republic', flag: '🇨🇿', pricePerIp: 2.88, continent: 'europe' },
  { code: 'se', name: 'Sweden', flag: '🇸🇪', pricePerIp: 2.88, continent: 'europe' },
  { code: 'be', name: 'Belgium', flag: '🇧🇪', pricePerIp: 2.88, continent: 'europe' },
  { code: 'ro', name: 'Romania', flag: '🇷🇴', pricePerIp: 2.88, continent: 'europe' },
  { code: 'fi', name: 'Finland', flag: '🇫🇮', pricePerIp: 2.88, continent: 'europe' },
  { code: 'ch', name: 'Switzerland', flag: '🇨🇭', pricePerIp: 2.88, continent: 'europe' },
  { code: 'ru', name: 'Russia', flag: '🇷🇺', pricePerIp: 2.88, continent: 'europe' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹', pricePerIp: 2.88, continent: 'europe' },
  { code: 'ua', name: 'Ukraine', flag: '🇺🇦', pricePerIp: 2.88, continent: 'europe' },
  { code: 'hu', name: 'Hungary', flag: '🇭🇺', pricePerIp: 2.88, continent: 'europe' },
  // Other Regions
  { code: 'us', name: 'United States', flag: '🇺🇸', pricePerIp: 2.88, continent: 'other' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦', pricePerIp: 2.88, continent: 'other' },
  { code: 'au', name: 'Australia', flag: '🇦🇺', pricePerIp: 2.88, continent: 'other' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽', pricePerIp: 2.88, continent: 'other' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷', pricePerIp: 2.88, continent: 'other' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', pricePerIp: 2.88, continent: 'other' },
];

// Cart item interface
interface CartItem {
  country: Country;
  quantity: number;
}

export default function PrivateIpv4PurchasePlanSection() {
  const [duration, setDuration] = useState(30);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Group countries by continent
  const groupedCountries = useMemo(() => {
    const groups: Record<string, Country[]> = {
      asia: [],
      europe: [],
      other: [],
    };
    COUNTRIES.forEach((country) => {
      groups[country.continent].push(country);
    });
    return groups;
  }, []);

  // Calculate totals
  const { subtotal, totalQuantity, discountAmount, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.country.pricePerIp * item.quantity, 0);
    const qty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const durationOption = DURATION_OPTIONS.find((d) => d.value === duration);
    const discountPercent = durationOption?.discount ? parseInt(durationOption.discount) / 100 : 0;
    const discount = sub * discountPercent;
    return {
      subtotal: sub,
      totalQuantity: qty,
      discountAmount: discount,
      total: sub - discount,
    };
  }, [cart, duration]);

  // Toggle country in cart
  const toggleCountry = (country: Country) => {
    const existingIndex = cart.findIndex((item) => item.country.code === country.code);
    if (existingIndex >= 0) {
      setCart(cart.filter((_, i) => i !== existingIndex));
    } else {
      setCart([...cart, { country, quantity: 1 }]);
    }
  };

  // Update quantity
  const updateQuantity = (code: string, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.country.code === code) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const isInCart = (code: string) => cart.some((item) => item.country.code === code);
  const getQuantity = (code: string) => cart.find((item) => item.country.code === code)?.quantity || 0;

  const continentLabels: Record<string, string> = {
    asia: 'Asia',
    europe: 'Europe',
    other: 'Other Regions',
  };

  const continentIcons: Record<string, string> = {
    asia: 'mdi:earth-asia',
    europe: 'mdi:earth',
    other: 'mdi:earth-americas',
  };

  const durationLabel = DURATION_OPTIONS.find((d) => d.value === duration)?.label || '';
  const discountPercent = DURATION_OPTIONS.find((d) => d.value === duration)?.discount
    ? parseInt(DURATION_OPTIONS.find((d) => d.value === duration)!.discount!) / 100
    : 0;

  return (
    <motion.div
      className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(300px,1fr)] items-start"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Content */}
      <div className="min-w-0 space-y-6">
        {/* Configuration Panel */}
        <motion.div className="rounded-xl border border-border bg-card p-4" variants={itemVariants}>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Iconify icon="mdi:calendar-clock" width={14} className="text-primary" />
              Duration:
            </label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDuration(opt.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all',
                    duration === opt.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                  )}
                >
                  <span className="font-medium">{opt.label}</span>
                  {opt.discount && (
                    <span className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                      duration === opt.value ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    )}>
                      -{opt.discount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <h2 className="text-base font-semibold text-foreground">Select Region & Quantity</h2>
            <p className="text-sm text-muted-foreground">Choose countries and set IP quantity for each</p>
          </div>
          <button className="hidden items-center gap-1.5 text-xs text-primary hover:underline sm:flex">
            <Iconify icon="mdi:message-question-outline" width={14} />
            Haven't found the locations you need? Contact us
          </button>
        </motion.div>

        {/* Country Selection by Region */}
        <div className="space-y-4">
          {Object.entries(groupedCountries).map(([cont, countries]) => (
            <motion.div
              key={cont}
              className="rounded-xl border border-border bg-card p-4"
              variants={itemVariants}
            >
              {/* Region Header */}
              <div className="mb-3 flex items-center gap-2">
                <Iconify icon={continentIcons[cont]} width={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{continentLabels[cont]}</h3>
                <span className="text-xs text-muted-foreground">({countries.length})</span>
              </div>

              {/* Country Chips */}
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => {
                  const inCart = isInCart(country.code);
                  const qty = getQuantity(country.code);

                  return inCart ? (
                    <motion.div
                      key={country.code}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-primary/10 py-1 pl-2.5 pr-1"
                    >
                      <span className="text-sm">{country.flag}</span>
                      <span className="text-xs font-medium text-foreground">{country.name}</span>
                      <span className="text-xs text-primary">${country.pricePerIp.toFixed(2)}</span>
                      <div className="flex items-center gap-0.5 rounded-full bg-card px-1">
                        <button
                          onClick={() => updateQuantity(country.code, -1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Iconify icon="mdi:minus" width={12} />
                        </button>
                        <span className="min-w-[16px] text-center text-xs font-semibold">{qty}</span>
                        <button
                          onClick={() => updateQuantity(country.code, 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Iconify icon="mdi:plus" width={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleCountry(country)}
                        className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Iconify icon="mdi:close" width={12} />
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      key={country.code}
                      onClick={() => toggleCountry(country)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      <span className="text-sm">{country.flag}</span>
                      <span className="font-medium text-foreground">{country.name}</span>
                      <span className="text-primary">${country.pricePerIp.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar - Order Summary */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="rounded-xl border-0 bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="mb-4 text-[15px] font-semibold text-foreground">Order Summary</div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium text-foreground">Private IPv4</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Countries</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={cart.length}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="font-medium text-foreground"
                >
                  {cart.length} selected
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total IPs</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={totalQuantity}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="font-medium text-foreground"
                >
                  {totalQuantity} IPs
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={duration}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="font-medium text-foreground"
                >
                  {durationLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={subtotal}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-medium text-foreground"
                  >
                    ${subtotal.toFixed(2)}
                  </motion.span>
                </AnimatePresence>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Discount ({Math.round(discountPercent * 100)}% off)</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={discountAmount}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      -${discountAmount.toFixed(2)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-3 text-foreground font-bold text-base">
                <span>Total</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="mt-4 w-full h-10 gap-2">
                <Iconify icon="mdi:cart" width={16} />
                Order now
              </Button>
            </motion.div>
          </div>

          <div className="mt-5 text-[11px] text-muted-foreground space-y-2">
            <div className="font-medium text-foreground">We accept these payment methods</div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { icon: 'logos:visa', label: 'Visa' },
                { icon: 'logos:mastercard', label: 'MC' },
                { icon: 'logos:paypal', label: 'PayPal' },
                { icon: 'mdi:currency-btc', label: 'Crypto' },
              ].map((method, idx) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center justify-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-1"
                >
                  <Iconify icon={method.icon} width={method.icon.startsWith('logos') ? 18 : 16} />
                  <span>{method.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Note card */}
        <div className="rounded-xl border-0 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-[12px] text-amber-700 dark:text-amber-400 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-2">
            <Iconify icon="mdi:information-outline" width={16} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              For very large orders or custom plans, you can contact sales to negotiate dedicated pricing and payment options.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
