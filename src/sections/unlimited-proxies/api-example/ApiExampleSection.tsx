'use client';

import React, { useState } from 'react';
import { ProxyGeneratorLayout } from '@/sections/proxies/components/ProxyGeneratorLayout';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

export const LANGUAGES = [
  { value: 'shell', label: 'Shell' },
  { value: 'python', label: 'Python' },
  { value: 'node', label: 'Node.js' },
  { value: 'php', label: 'PHP' },
  { value: 'go', label: 'Golang' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
];

export default function APIExampleSection() {
  const [language, setLanguage] = useState('shell');
  const [protocol, setProtocol] = useState('http');
  const [destination, setDestination] = useState('http://myip.lunaproxy.io');

  return (
    <ProxyGeneratorLayout
      left={<LeftContent />}
      right={
        <RightContent
          language={language}
          setLanguage={setLanguage}
          protocol={protocol}
          setProtocol={setProtocol}
          destination={destination}
          setDestination={setDestination}
        />
      }
    />
  );
}
