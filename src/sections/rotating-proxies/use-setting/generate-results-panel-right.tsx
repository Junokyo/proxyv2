'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';

export default function GenerateResultsPanelRight() {
  const [outputFormat, setOutputFormat] = useState('host:port:user:pass');
  const [proxyOutput] = useState('');

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const handleCopy = () => {
    if (proxyOutput) {
      navigator.clipboard.writeText(proxyOutput);
    }
  };

  const handleExport = () => {
    if (proxyOutput) {
      const blob = new Blob([proxyOutput], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rotating-proxies.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Iconify icon="mdi:code-braces" width={14} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground">Proxy Output</h3>
            <p className="text-[10px] text-muted-foreground">Generated proxy list</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]" onClick={handleCopy} disabled={!proxyOutput}>
            <Iconify icon="mdi:content-copy" width={12} className="mr-1" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]" onClick={handleExport} disabled={!proxyOutput}>
            <Iconify icon="mdi:download" width={12} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Format Selector */}
      <div className="mb-3">
        <label className="mb-1 block text-[11px] text-muted-foreground">Output Format</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className={selectClassName}
        >
          <option value="host:port:user:pass">host:port:user:pass</option>
          <option value="user:pass@host:port">user:pass@host:port</option>
          <option value="host:port">host:port (no auth)</option>
        </select>
      </div>

      {/* Output Area */}
      <div className="relative min-h-[140px] rounded-lg border border-border bg-muted/30 p-3">
        {proxyOutput ? (
          <pre className="whitespace-pre-wrap break-all font-mono text-[11px] text-foreground">
            {proxyOutput}
          </pre>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Iconify icon="mdi:playlist-remove" width={28} className="mb-1.5 text-muted-foreground/40" />
            <p className="text-[11px] text-muted-foreground">No proxies generated yet</p>
            <p className="text-[10px] text-muted-foreground/70">Configure and click "Generate Proxy"</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Total: 0 proxies</span>
        <span>Format: {outputFormat}</span>
      </div>
    </div>
  );
}
