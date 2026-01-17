import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import GenerateResultsPanelRight from './generate-results-panel-right';
import UserLeft from './user-left';

export default function UserView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Main Content */}
      <UserLeft />

      {/* Sidebar */}
      <div className="flex flex-col gap-3">
        {/* Plan Info Card */}
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Iconify icon="mdi:refresh" width={16} className="text-primary" />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="mb-0.5 text-[10px] text-muted-foreground">Active Plan</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-semibold text-foreground">No active plan</span>
              </div>
            </div>

            {/* Expiration */}
            <div className="text-right">
              <p className="mb-0.5 text-[10px] text-muted-foreground">Expiration</p>
              <p className="text-xs font-medium text-foreground">--</p>
            </div>

            {/* Button */}
            <Button size="sm" className="h-7 shrink-0 px-2 text-[11px]">
              <Iconify icon="mdi:cart" width={12} className="mr-1" />
              Buy now
            </Button>
          </div>
        </div>

        {/* Proxy Output Panel */}
        <GenerateResultsPanelRight />
      </div>
    </div>
  );
}
