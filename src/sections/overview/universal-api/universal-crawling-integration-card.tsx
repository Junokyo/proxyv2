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
    <div className="relative w-full overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/30 p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>

      {/* LEFT */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex-shrink-0">
            <Iconify
              icon="solar:code-bold-duotone"
              width={32}
              className="text-white"
            />
          </div>

          <div className="flex-1">
            <div className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Integration with Universal Crawling API
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Quick-start guide to integrate your crawling API into any stack.
            </p>
          </div>
        </div>

        {/* Steps with better styling */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold flex-shrink-0">1</div>
            <div className="text-sm text-slate-700">Enter Universal Crawling API User Credentials Token.</div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold flex-shrink-0">2</div>
            <div className="text-sm text-slate-700">
              Add your target{' '}
              <a
                href="https://www.google.com/"
                className="text-amber-600 hover:text-amber-700 font-semibold underline"
              >
                https://www.google.com/
              </a>
              .
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold flex-shrink-0">3</div>
            <div className="text-sm text-slate-700">
              Select rendering type{' '}
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-800 font-semibold text-xs">html/png</span>.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xs font-bold flex-shrink-0">4</div>
            <div className="text-sm text-slate-700">Run the code in your terminal or insert it into your code base.</div>
          </div>
        </div>

        {/* CTA */}
        <button className="self-start inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-5 py-3 text-sm font-bold text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all">
          <span>Start Free Trial</span>
          <span className="text-base">→</span>
        </button>
      </div>

      {/* RIGHT - Code Block */}
      <div className="w-full lg:max-w-xl rounded-2xl border-2 border-amber-200 bg-slate-900 overflow-hidden flex flex-col shadow-xl">
        {/* Tabs with horizontal scroll on mobile */}
        <div className="flex border-b-2 border-amber-500/30 bg-slate-800 px-2 pt-2 overflow-x-auto">
          {LANG_TABS.map((lang) => {
            const active = currentLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={
                  'px-3 py-2 text-xs font-bold rounded-t-lg transition whitespace-nowrap ' +
                  (active
                    ? 'text-white bg-slate-900 border-b-2 border-amber-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700')
                }
              >
                {lang}
              </button>
            );
          })}
        </div>

        {/* Code block with gradient accent */}
        <div className="relative bg-slate-900 text-slate-50 text-xs font-mono p-4 min-h-[180px] sm:min-h-[200px] overflow-x-auto">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg z-10 transition-all"
          >
            <Iconify icon="solar:copy-bold" width={14} />
            <span>Copy</span>
          </button>

          <pre className="whitespace-pre-wrap break-all pr-20 text-green-400">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
