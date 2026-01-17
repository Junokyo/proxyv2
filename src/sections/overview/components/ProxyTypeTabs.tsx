'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TabItem {
  value: string;
  label: string;
  badge?: string;
}

interface ProxyTypeTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function ProxyTypeTabs({ tabs, activeTab, onTabChange, className }: ProxyTypeTabsProps) {
  return (
    <div className={cn('flex items-center gap-6 border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors',
            'hover:text-foreground',
            activeTab === tab.value
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
        >
          {tab.label}
          {tab.badge && (
            <Badge
              variant="success"
              appearance="light"
              size="sm"
            >
              {tab.badge}
            </Badge>
          )}
          {/* Active underline */}
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
