'use client';

import { useState } from 'react';
import Iconify from '@/components/iconify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function WhitelistSection() {
  const [formData, setFormData] = useState({
    protocol: 'http',
    host: 'rotating.proxy.example.com',
    region: '',
    state: '',
    city: '',
    isp: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const selectClassName =
    'w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary';

  const languages = [
    { value: 'curl', label: 'cURL', icon: 'mdi:console' },
    { value: 'python', label: 'Python', icon: 'mdi:language-python' },
    { value: 'nodejs', label: 'Node.js', icon: 'mdi:nodejs' },
    { value: 'php', label: 'PHP', icon: 'mdi:language-php' },
    { value: 'java', label: 'Java', icon: 'mdi:language-java' },
    { value: 'csharp', label: 'C#', icon: 'mdi:language-csharp' },
  ];

  const codeExamples: Record<string, string> = {
    curl: `# Whitelist authentication (no username/password required)
curl -x "rotating.proxy.example.com:8080" \\
     "https://api.ipify.org?format=json"`,
    python: `import requests

# Whitelist authentication (no username/password required)
proxy = {
    "http": "http://rotating.proxy.example.com:8080",
    "https": "http://rotating.proxy.example.com:8080"
}

response = requests.get("https://api.ipify.org?format=json", proxies=proxy)
print(response.json())`,
    nodejs: `const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

// Whitelist authentication (no username/password required)
const proxy = new HttpsProxyAgent('http://rotating.proxy.example.com:8080');

axios.get('https://api.ipify.org?format=json', { httpsAgent: proxy })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,
    php: `<?php
// Whitelist authentication (no username/password required)
$proxy = "http://rotating.proxy.example.com:8080";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.ipify.org?format=json");
curl_setopt($ch, CURLOPT_PROXY, $proxy);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`,
    java: `import java.net.*;
import java.io.*;

public class ProxyWhitelistExample {
    public static void main(String[] args) throws Exception {
        // Whitelist authentication (no username/password required)
        Proxy proxy = new Proxy(Proxy.Type.HTTP,
            new InetSocketAddress("rotating.proxy.example.com", 8080));

        URL url = new URL("https://api.ipify.org?format=json");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection(proxy);

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line);
        }
        in.close();
    }
}`,
    csharp: `using System;
using System.Net;
using System.Net.Http;

class Program {
    static async Task Main() {
        // Whitelist authentication (no username/password required)
        var proxy = new WebProxy("http://rotating.proxy.example.com:8080");

        var handler = new HttpClientHandler { Proxy = proxy };
        var client = new HttpClient(handler);

        var response = await client.GetStringAsync("https://api.ipify.org?format=json");
        Console.WriteLine(response);
    }
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[selectedLanguage]);
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
            <h3 className="text-xs font-semibold text-foreground">Whitelist Auth</h3>
            <p className="text-[10px] text-muted-foreground">Configure with IP whitelist</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-2">
          {/* Row 1: Protocol & Host */}
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
              <label className="mb-1 block text-[11px] text-muted-foreground">Host</label>
              <select
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                className={selectClassName}
              >
                <option value="rotating.proxy.example.com">rotating.proxy.example.com</option>
                <option value="us.rotating.proxy.example.com">us.rotating.proxy.example.com</option>
                <option value="eu.rotating.proxy.example.com">eu.rotating.proxy.example.com</option>
              </select>
            </div>
          </div>

          {/* Row 2: Region & State */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[11px] text-muted-foreground">Region</label>
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

          {/* Info Note */}
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-2">
            <div className="flex items-start gap-2">
              <Iconify icon="mdi:information" width={14} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-[11px] text-foreground">
                Make sure your IP is whitelisted in Use Settings before using whitelist auth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Examples */}
      <div className="rounded-xl border border-border bg-card p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Iconify icon="mdi:code-tags" width={14} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-foreground">Code Examples</h3>
              <p className="text-[10px] text-muted-foreground">Copy and use</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]" onClick={handleCopy}>
            <Iconify icon="mdi:content-copy" width={12} className="mr-1" />
            Copy
          </Button>
        </div>

        {/* Language Tabs */}
        <div className="mb-3 flex flex-wrap gap-1">
          {languages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => setSelectedLanguage(lang.value)}
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all',
                selectedLanguage === lang.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <Iconify icon={lang.icon} width={12} />
              {lang.label}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="rounded-lg border border-border bg-zinc-950 p-3">
          <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11px] text-zinc-100">
            {codeExamples[selectedLanguage]}
          </pre>
        </div>
      </div>
    </div>
  );
}
