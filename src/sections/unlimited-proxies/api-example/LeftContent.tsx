import { CardSection } from '@/sections/proxies/components/CardSection';

export default function LeftContent() {
  return (
    <div className="space-y-4 px-4 md:px-5 pb-8">
      {/* Sub-account */}
      <CardSection title="Sub-accounts">
        <div className="space-y-2 text-xs">
          <label className="text-[11px] text-slate-500">Sub-account</label>
          <select className="w-full rounded-md border border-slate-200 px-2 py-2 text-xs bg-white">
            <option>6avaq3x9z3az</option>
          </select>
        </div>
      </CardSection>

      {/* Proxy generator */}
      <CardSection title="Proxy generator">
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1 text-[11px] text-slate-500">
              <span>Country/Region</span>
              <button className="text-blue-600">View country code</button>
            </div>
            <select className="w-full rounded-md border border-slate-200 px-2 py-2 text-xs bg-white">
              <option>🌐 Global</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 mb-1 block">
              IP Endpoints
            </label>
            <select className="w-full rounded-md border border-slate-200 px-2 py-2 text-xs bg-white">
              <option>Rotation</option>
              <option>Sticky</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 mb-1 block">
              Session type
            </label>
            <select className="w-full rounded-md border border-slate-200 px-2 py-2 text-xs bg-white">
              <option>Rotation IP</option>
              <option>Sticky IP</option>
            </select>
          </div>
        </div>
      </CardSection>
    </div>
  );
}
