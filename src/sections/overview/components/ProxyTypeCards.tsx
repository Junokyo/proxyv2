'use client';

import { Icon } from '@iconify/react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { ProxyType } from '../data/mock-data';

interface ProxyTypeCardsProps {
  proxyTypes: ProxyType[];
  activeType: string;
  onTypeChange: (value: string) => void;
  className?: string;
}

export function ProxyTypeCards({
  proxyTypes,
  activeType,
  onTypeChange,
  className,
}: ProxyTypeCardsProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-3',
        className
      )}
    >
      {proxyTypes.map((proxy, index) => {
        const isActive = activeType === proxy.value;

        return (
          <motion.div
            key={proxy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex-1 min-w-[140px] max-w-[180px]"
          >
            <button
              type="button"
              onClick={() => onTypeChange(proxy.value)}
              className={cn(
                'w-full flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 bg-card transition-all duration-200',
                isActive
                  ? 'border-primary'
                  : 'border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md'
              )}
            >
              {/* Icon in circle */}
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                  isActive
                    ? 'bg-primary/10'
                    : 'bg-gray-100 dark:bg-gray-800'
                )}
              >
                <Icon
                  icon={proxy.icon}
                  className={cn(
                    'text-xl',
                    isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                  )}
                />
              </div>

              {/* Title */}
              <span
                className={cn(
                  'text-[13px] font-semibold text-center leading-tight',
                  isActive ? 'text-primary' : 'text-foreground'
                )}
              >
                {proxy.label}
              </span>

              {/* Price */}
              <div className="text-xs text-muted-foreground">
                From{' '}
                <span
                  className={cn(
                    'font-semibold',
                    isActive ? 'text-primary' : 'text-foreground'
                  )}
                >
                  ${proxy.price}
                </span>
                {proxy.unit}
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
