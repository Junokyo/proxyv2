import React from 'react';
import { CardSection } from '@/sections/proxies/components/CardSection';

export const PrivateIpv4UserPassPanel: React.FC = () => {
  return (
    <>
      {/* SUB-ACCOUNTS */}
      <CardSection title="Sub-accounts">
        <div className="flex gap-2">
          <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
            <option>6avaq3x9z3az</option>
          </select>
          <button className="rounded-lg border border-slate-200 bg-white px-3 text-xs">
            + Add Users
          </button>
        </div>
      </CardSection>

      {/* PROXY GENERATOR */}
      <CardSection title="Proxy generator">
        <div className="space-y-3">
          {/* Country / Region */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-[11px] text-slate-500">
                Country
              </label>
              <button className="text-[11px] text-sky-500">
                View country code
              </button>
            </div>
            <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <option>🇺🇸 United States</option>
              <option>🇬🇧 United Kingdom</option>
              <option>🇩🇪 Germany</option>
              <option>🇫🇷 France</option>
              <option>🇯🇵 Japan</option>
            </select>
          </div>

          {/* State + City */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                State
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                <option>Random</option>
                <option>California</option>
                <option>Texas</option>
                <option>New York</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                City
              </label>
              <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                <option>Random</option>
                <option>Los Angeles</option>
                <option>Houston</option>
                <option>New York City</option>
              </select>
            </div>
          </div>

          {/* Username + Password */}
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                Username
              </label>
              <input
                readOnly
                value="user-6avaq3x9z3az"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-slate-500">
                Password
              </label>
              <input
                readOnly
                value="O5gqrrtzoP9kQ"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>
      </CardSection>

      {/* SESSION SETTINGS */}
      <CardSection title="Session settings">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Session type
            </label>
            <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <option>Sticky IP</option>
              <option>Rotation IP</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Session duration
            </label>
            <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>24 hours</option>
            </select>
          </div>
        </div>
      </CardSection>

      {/* ADVANCED SETTINGS */}
      <CardSection title="Advanced settings">
        <div className="space-y-4">
          {/* Protocol */}
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Protocol
            </label>
            <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
              <option>HTTP/HTTPS</option>
              <option>SOCKS5</option>
            </select>
          </div>

          {/* Unblock targets */}
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Unblock targets
            </label>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px]">
                Apply for Unblock
              </button>
              <button className="text-[11px] text-sky-500">
                View domain status
              </button>
            </div>
          </div>
        </div>
      </CardSection>
    </>
  );
};
