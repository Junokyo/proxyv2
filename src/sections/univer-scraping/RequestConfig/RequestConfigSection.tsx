// ScrapingPlaygroundPage.tsx
import React from 'react';
import ApiPlaygroundLayout, {
  CodeTab,
  PlaygroundField,
} from '@/sections/components/ApiPlaygroundLayout';

const scrapingFields: PlaygroundField[] = [
  {
    name: 'token',
    label: 'API Token',
    type: 'text',
    required: true,
    placeholder: '****************',
  },
  {
    name: 'url',
    label: 'URL',
    type: 'text',
    required: true,
    placeholder: 'https://www.google.com/',
  },
  {
    name: 'type',
    label: 'Presentation Type',
    type: 'select',
    required: true,
    options: ['HTML', 'JSON', 'Screenshot'],
  },
  {
    name: 'js_render',
    label: 'JS Render',
    type: 'switch',
    helperText: 'Enable to render JavaScript before returning HTML.',
  },
  {
    name: 'block_resources',
    label: 'Block',
    type: 'select',
    options: ['Images', 'CSS', 'Fonts'],
  },
  {
    name: 'country',
    label: 'Country/Region',
    type: 'select',
    options: ['Random', 'US', 'VN', 'DE'],
  },
];

const scrapingTabs: CodeTab[] = [
  {
    key: 'curl',
    label: 'Curl',
    code: `curl --request POST \\
  --url https://unlocker-api.lunaproxy.com/request \\
  --header "Authorization: Bearer **************" \\
  --header "content-type: application/json" \\
  --data '{"url":"https://www.google.com/","type":"html","js_render":"false"}' > google.html`,
  },
  {
    key: 'node',
    label: 'Node',
    code: `import fetch from "node-fetch";

const res = await fetch("https://unlocker-api.lunaproxy.com/request", {
  method: "POST",
  headers: {
    "Authorization": "Bearer **************",
    "content-type": "application/json",
  },
  body: JSON.stringify({ url: "https://www.google.com/", type: "html" }),
});

console.log(await res.text());`,
  },
];

const RequestConfigSection: React.FC = () => {
  return (
    <ApiPlaygroundLayout
      serviceName="Scraping API"
      balanceText="0"
      fields={scrapingFields}
      codeTabs={scrapingTabs}
      serviceIcon={
        <span className="mr-2 text-blue-500 text-lg">🌐</span> // hoặc Iconify
      }
    />
  );
};

export default RequestConfigSection;
