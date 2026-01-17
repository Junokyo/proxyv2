import Iconify from '@/components/iconify';
import GenerateResultsPanelRight from './generate-results-panel-right';
import UserLeft from './user-left';

export default function UserView() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Main Content */}
      <UserLeft />

      {/* Sidebar */}
      <div className="flex flex-col gap-4">
        {/* Traffic Info Card */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Iconify icon="mdi:web" width={24} className="text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Traffic available</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">0.00</span>
                <span className="text-sm text-muted-foreground">GB</span>
              </div>
            </div>

            {/* Expiration */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-0.5">Expiration</p>
              <p className="text-sm font-medium text-foreground">--</p>
            </div>

            {/* Button */}
            <button
              type="button"
              className="h-9 px-4 rounded-md bg-primary text-sm font-medium text-white hover:bg-primary/90 transition shrink-0 inline-flex items-center gap-1.5"
            >
              <Iconify icon="mdi:cart" width={16} />
              Buy now
            </button>
          </div>
        </div>

        {/* Proxy Output Panel */}
        <GenerateResultsPanelRight />
      </div>
    </div>
  );
}
