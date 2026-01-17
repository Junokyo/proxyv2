import Iconify from '@/components/iconify';
import UserPassShellPanel from './user-pass-shell-panel';
import WhitelistFormPanel from './whitelist-form-panel';

export default function WhitelistSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Main Content */}
      <WhitelistFormPanel />

      {/* Sidebar */}
      <div className="flex flex-col gap-3">
        {/* Traffic Info Card */}
        <div className="rounded-xl border border-border bg-card p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Iconify icon="mdi:web" width={16} className="text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground mb-0.5">Traffic available</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-bold text-foreground">0.00</span>
                <span className="text-[10px] text-muted-foreground">GB</span>
              </div>
            </div>

            {/* Expiration */}
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground mb-0.5">Expiration</p>
              <p className="text-xs font-medium text-foreground">--</p>
            </div>

            {/* Button */}
            <button
              type="button"
              className="h-7 px-2 rounded-md bg-primary text-[11px] font-medium text-white hover:bg-primary/90 transition shrink-0 inline-flex items-center gap-1"
            >
              <Iconify icon="mdi:cart" width={12} />
              Buy now
            </button>
          </div>
        </div>

        {/* Shell Panel */}
        <UserPassShellPanel />
      </div>
    </div>
  );
}
