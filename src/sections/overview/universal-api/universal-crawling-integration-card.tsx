import { useState } from 'react';
import Iconify from '@/components/iconify';

const LANG_TABS = [
  'cURL',
  'Go',
  'Node',
  'PHP',
  'Python',
  'Java',
  'C#',
  'Ruby',
] as const;

type LangKey = (typeof LANG_TABS)[number];

const CODE_SNIPPETS: Record<LangKey, string> = {
  cURL: `curl --request POST --url https://unlocker-api.lunaproxy.com/request \\
  --header "Authorization: Bearer ***************" \\
  --header "content-type: application/json" \\
  --data '{"url": "https://www.google.com/","type":"html","js_render":false}'`,
  Go: `// Go example\npackage main\n\nfunc main() {}`,
  Node: `// Node.js example\nconst axios = require("axios");`,
  PHP: `<?php\n// PHP example\n?>`,
  Python: `# Python example\nimport requests`,
  Java: `// Java example`,
  'C#': `// C# example`,
  Ruby: `# Ruby example`,
};

export default function UniversalCrawlingIntegrationCard() {
  const [currentLang, setCurrentLang] = useState<LangKey>('cURL');
  const code = CODE_SNIPPETS[currentLang];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row gap-6">
      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Icon + Title */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl">
            <Iconify
              icon="ant-design:code-outlined"
              width={28}
              className="text-blue-500"
            />
          </div>

          <div>
            <div className="text-[18px] font-semibold text-slate-900">
              Integration with Universal Crawling API
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Quick-start guide to integrate your crawling API into any stack.
            </p>
          </div>
        </div>

        {/* Steps */}
        <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
          <li>Enter Universal Crawling API User Credentials Token.</li>
          <li>
            Add your target{' '}
            <a
              href="https://www.google.com/"
              className="text-indigo-600 hover:underline"
            >
              https://www.google.com/
            </a>
            .
          </li>
          <li>
            Select rendering type{' '}
            <span className="text-indigo-600">html/png</span>.
          </li>
          <li>
            Run the code in your terminal or insert it into your code base.
          </li>
        </ol>

        {/* CTA */}
        <button className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800">
          Start free trial
          <span>›</span>
        </button>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:max-w-xl rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-3 pt-2">
          {LANG_TABS.map((lang) => {
            const active = currentLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={
                  'px-3 py-2 text-xs font-medium rounded-t-md transition ' +
                  (active
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800')
                }
              >
                {lang}
              </button>
            );
          })}
        </div>

        {/* Code block */}
        <div className="relative bg-[#071b4b] text-slate-50 text-xs font-mono p-4 min-h-[180px]">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md bg-white/10 px-2 py-1 text-[11px] text-slate-100 hover:bg-white/20"
          >
            <Iconify icon="mdi:content-copy" width={14} />
            <span className="ml-1">Copy</span>
          </button>

          <pre className="whitespace-pre-wrap break-all pr-10">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
