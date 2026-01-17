'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';

export default function UserLeft() {
  const [formData, setFormData] = useState({
    protocol: 'http',
    region: '',
    state: '',
    city: '',
    isp: '',
    session: 'rotating',
    quantity: 10,
  });

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const inputClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Iconify icon="mdi:cog" width={14} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-foreground">Generate Proxy</h3>
          <p className="text-[10px] text-muted-foreground">Configure your proxy settings</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-2">
        {/* Row 1: Protocol & Session */}
        <div className="grid grid-cols-2 gap-2">
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
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Session Type</label>
            <select
              value={formData.session}
              onChange={(e) => setFormData({ ...formData, session: e.target.value })}
              className={selectClassName}
            >
              <option value="rotating">Rotating Session</option>
              <option value="sticky">Sticky Session</option>
            </select>
          </div>
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
              <option value="kr">South Korea</option>
              <option value="sg">Singapore</option>
              <option value="vn">Vietnam</option>
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
              <option value="fl">Florida</option>
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
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
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
              <option value="comcast">Comcast</option>
              <option value="spectrum">Spectrum</option>
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block text-[11px] text-muted-foreground">Quantity</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            min={1}
            max={1000}
            className={inputClassName}
          />
        </div>

        {/* Generate Button */}
        <Button className="w-full h-8 text-xs">
          <Iconify icon="mdi:flash" width={14} className="mr-1" />
          Generate Proxy
        </Button>
      </div>
    </div>
  );
}
