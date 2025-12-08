// VideoPlaygroundPage.tsx
import React from 'react';
import ApiPlaygroundLayout, {
  CodeTab,
  PlaygroundField,
} from '@/sections/components/ApiPlaygroundLayout';

const videoFields: PlaygroundField[] = [
  {
    name: 'api_key',
    label: 'Api Key',
    type: 'text',
    required: true,
    placeholder: '****************',
  },
  {
    name: 'startUrls',
    label: 'Video URL',
    type: 'multiText',
    required: true,
    placeholder: 'https://www.youtube.com/watch?v=...',
    helperText: 'You can add multiple video URLs.',
  },
  {
    name: 'quality',
    label: 'Quality',
    type: 'select',
    options: ['-', '360p', '720p', '1080p'],
  },
  {
    name: 'storage_type',
    label: 'Storage Type',
    type: 'select',
    required: true,
    options: ['Default', 'S3', 'GCS'],
  },
];

const videoTabs: CodeTab[] = [
  {
    key: 'shell',
    label: 'Shell',
    code: `curl "https://downloader.lunaproxy.com/api/request" \\
  -H "Content-Type: application/json" \\
  -d '{"api_key":"**************","startUrls":["https://www.youtube.com/watch?v=xxx"]}'`,
  },
  {
    key: 'python',
    label: 'Python',
    code: `import requests

res = requests.post(
  "https://downloader.lunaproxy.com/api/request",
  json={"api_key": "**************", "startUrls": ["https://www.youtube.com/watch?v=xxx"]}
)
print(res.json())`,
  },
];

const VidRequestConfig: React.FC = () => {
  return (
    <ApiPlaygroundLayout
      serviceName="YouTube Downloader"
      balanceText="0.00 MB"
      fields={videoFields}
      codeTabs={videoTabs}
      serviceIcon={
        <span className="mr-2 text-red-500 text-lg">▶</span> // thay iconify nếu thích
      }
    />
  );
};

export default VidRequestConfig;
