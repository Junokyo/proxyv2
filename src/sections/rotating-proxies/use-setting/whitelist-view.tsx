'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';

export default function WhitelistView() {
  const [formData, setFormData] = useState({
    protocol: 'http',
    region: '',
    state: '',
    city: '',
    isp: '',
    ipAddress: '',
  });

  const [whitelistedIPs, setWhitelistedIPs] = useState<string[]>([]);

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const inputClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const handleAddIP = () => {
    if (formData.ipAddress && !whitelistedIPs.includes(formData.ipAddress)) {
      setWhitelistedIPs([...whitelistedIPs, formData.ipAddress]);
      setFormData({ ...formData, ipAddress: '' });
    }
  };

  const handleRemoveIP = (ip: string) => {
    setWhitelistedIPs(whitelistedIPs.filter((item) => item !== ip));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Left Panel - Form */}
      <div className="rounded-xl border border-border bg-card p-4">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Iconify icon="mdi:shield-check" width={14} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground">IP Whitelist</h3>
            <p className="text-[10px] text-muted-foreground">Configure whitelist authentication</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-2">
          {/* Row 1: Protocol */}
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Protocol</label>
            <select
              value={formData.protocol}
              onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
              className={selectClassName}
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="socks5">SOCKS5</option>
            </select>
          </div>

          {/* Row 2: Region & State */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[11px] text-muted-foreground">Region/Country</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className={selectClassName}
              >
                <option value="">Select Region</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="jp">Japan</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-muted-foreground">State</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className={selectClassName}
              >
                <option value="">Select State</option>
                <option value="ca">California</option>
                <option value="ny">New York</option>
                <option value="tx">Texas</option>
              </select>
            </div>
          </div>

          {/* Row 3: City & ISP */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[11px] text-muted-foreground">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={selectClassName}
              >
                <option value="">Select City</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="new-york">New York</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-muted-foreground">ISP</label>
              <select
                value={formData.isp}
                onChange={(e) => setFormData({ ...formData, isp: e.target.value })}
                className={selectClassName}
              >
                <option value="">Select ISP</option>
                <option value="att">AT&T</option>
                <option value="verizon">Verizon</option>
              </select>
            </div>
          </div>

          {/* IP Address Input */}
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">IP Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.ipAddress}
                onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                placeholder="e.g., 192.168.1.1"
                className={inputClassName}
              />
              <Button onClick={handleAddIP} size="sm" className="h-7 shrink-0 px-2">
                <Iconify icon="mdi:plus" width={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Whitelisted IPs */}
      <div className="rounded-xl border border-border bg-card p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Iconify icon="mdi:format-list-bulleted" width={14} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-foreground">Whitelisted IPs</h3>
              <p className="text-[10px] text-muted-foreground">{whitelistedIPs.length} IP(s)</p>
            </div>
          </div>
        </div>

        {/* IP List */}
        <div className="min-h-[180px] rounded-lg border border-border bg-muted/30 p-2">
          {whitelistedIPs.length > 0 ? (
            <div className="space-y-1.5">
              {whitelistedIPs.map((ip, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-border bg-background px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <Iconify icon="mdi:ip-network" width={12} className="text-muted-foreground" />
                    <span className="font-mono text-[11px] text-foreground">{ip}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIP(ip)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Iconify icon="mdi:close" width={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Iconify icon="mdi:shield-off" width={28} className="mb-1.5 text-muted-foreground/40" />
              <p className="text-[11px] text-muted-foreground">No IPs whitelisted</p>
              <p className="text-[10px] text-muted-foreground/70">Add IPs to enable whitelist auth</p>
            </div>
          )}
        </div>

        {/* Proxy Host Info */}
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-2">
          <h4 className="mb-1 text-[11px] text-muted-foreground">Proxy Host (Whitelist)</h4>
          <div className="flex items-center justify-between">
            <code className="font-mono text-[11px] text-foreground">rotating.proxy.example.com:8080</code>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Iconify icon="mdi:content-copy" width={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
