'use client';

import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { ChevronRight, ExternalLink, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProxyType } from '../data/mock-data';

interface ProductInfoCardProps {
  proxy: ProxyType;
  className?: string;
}

export function ProductInfoCard({ proxy, className }: ProductInfoCardProps) {
  return (
    <motion.div
      key={proxy.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn('overflow-hidden border-0 shadow-[0_1px_3px_rgba(0,0,0,0.08)]', className)}>
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Left: Product Info */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                <Icon icon={proxy.icon} className="text-2xl text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground">{proxy.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {proxy.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 shrink-0">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Remaining traffic</div>
                  <div className="text-base font-bold text-foreground">
                    {proxy.stats.remainingTraffic.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-muted-foreground">
                      {proxy.stats.trafficUnit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950 shrink-0">
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Expiration time</div>
                  <div className="text-base font-bold text-foreground">
                    {proxy.stats.expirationTime || '--'}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer to push footer to bottom */}
            <div className="flex-1 min-h-4" />

            {/* Action Links + Start Using Button */}
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1">
                <button className="inline-flex items-center gap-0.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted/50">
                  Automatic renewal
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-0.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted/50">
                  Alert settings
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted/50">
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {/* Start Using Button */}
              <button
                className="h-10 px-8 text-sm font-medium text-primary border border-primary bg-white rounded-md hover:bg-primary/5 transition-colors"
              >
                Start using
              </button>
            </div>
          </div>

          {/* Right: Price Panel (Blue Gradient) */}
          <div className="w-full lg:w-[280px] shrink-0 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#4f46e5] p-5 text-white flex flex-col relative">
            {/* Badge at top right */}
            {proxy.discount && (
              <Badge variant="success" className="absolute top-4 right-4">
                {proxy.discount}% OFF
              </Badge>
            )}

            {/* Starts from label */}
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-medium">
              Starts from
            </div>

            {/* Price row */}
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-[36px] font-bold leading-none">${proxy.price}</span>
              <span className="text-sm text-white/80 font-medium">{proxy.unit}</span>
            </div>

            {/* Features */}
            <ul className="mt-4 space-y-2 flex-1">
              {proxy.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon
                    icon="mdi:check"
                    className="text-sm text-emerald-300 shrink-0 mt-0.5"
                  />
                  <span className="text-[13px] leading-snug text-white/90">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Buy Button */}
            <button className="mt-4 w-full h-10 inline-flex items-center justify-center gap-2 bg-white text-[#2563eb] hover:bg-white/95 font-semibold rounded-md shadow-lg">
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
