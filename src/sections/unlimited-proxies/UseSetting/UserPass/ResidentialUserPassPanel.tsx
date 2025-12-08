// ResidentialUserPassPanel.tsx
import React from 'react';
import { CardSection } from '@/sections/proxies/components/CardSection';

export const ResidentialUserPassPanel: React.FC = () => {
  return (
    <>
      <CardSection title="Sub-accounts">
        <div className="flex gap-2">
          <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
            <option>6avaq3x9z3az</option>
          </select>
          <button className="rounded-md border border-slate-200 px-3 text-xs">
            + Add Users
          </button>
        </div>
      </CardSection>

      <CardSection title="Proxy generator">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] text-slate-500">Country/Region</label>
            <button className="text-[11px] text-blue-500">
              View country code
            </button>
          </div>
          <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
            <option>🌐 Global</option>
          </select>

          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                Host
              </label>
              <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                <option>State-City</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                State / City / ISP
              </label>
              <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                <option>State-City</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                State
              </label>
              <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                <option>Random</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                City
              </label>
              <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                <option>Random</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                Username
              </label>
              <input
                readOnly
                value="user-6avaq3x9z3az"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                Password
              </label>
              <input
                readOnly
                value="O5gqrrtzoP9kQ"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs"
              />
            </div>
          </div>
        </div>
      </CardSection>

      <CardSection title="Session settings">
        <div>
          <label className="mb-1 block text-[11px] text-slate-500">
            Session type
          </label>
          <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
            <option>Rotation IP</option>
          </select>
        </div>
      </CardSection>

      <CardSection title="Advanced settings">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Proxy cache
            </label>
            <div className="flex items-center gap-2 text-[11px]">
              <input type="checkbox" className="h-3 w-3" />
              <span>
                Cache proxy: Get faster results and reduce data consumption
              </span>
              <button className="text-blue-500">(Save 20%)</button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Unblock targets
            </label>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-slate-200 px-3 py-1 text-[11px]">
                Apply for Unblock
              </button>
              <button className="text-[11px] text-blue-500">
                View domain status
              </button>
            </div>
          </div>
        </div>
      </CardSection>
    </>
  );
};
