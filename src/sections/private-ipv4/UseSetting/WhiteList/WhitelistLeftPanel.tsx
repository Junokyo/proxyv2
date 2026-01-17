import React, { useCallback, useMemo, useState } from 'react';
import { CardSection } from '@/sections/proxies/components/CardSection';

type ExtractionType = 'link' | 'direct';
type SessionType = 'Sticky IP' | 'Rotation IP';

export const WhitelistLeftPanel: React.FC = () => {
  const [extractionType, setExtractionType] = useState<ExtractionType>('link');
  const [amount, setAmount] = useState<number>(10);
  const [sessionType, setSessionType] = useState<SessionType>('Sticky IP');
  const [generatedLink, setGeneratedLink] = useState<string>(
    'Please order the Private IPv4 proxies first',
  );

  const handleDecrease = useCallback(() => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const handleIncrease = useCallback(() => {
    setAmount((prev) => prev + 1);
  }, []);

  const buildLink = useMemo(
    () =>
      `https://unlocker-api.example.com/link?type=${extractionType}&amount=${amount}&session=${encodeURIComponent(
        sessionType,
      )}`,
    [extractionType, amount, sessionType],
  );

  const handleGenerate = useCallback(() => {
    setGeneratedLink(buildLink);
  }, [buildLink]);

  const handleOpen = useCallback(() => {
    if (!generatedLink) return;
    if (typeof window !== 'undefined') {
      window.open(generatedLink, '_blank');
    }
  }, [generatedLink]);

  const handleCopy = useCallback(() => {
    if (!generatedLink) return;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(generatedLink).catch(() => {});
    }
  }, [generatedLink]);

  const isLinkExtraction = extractionType === 'link';

  return (
    <div className="space-y-4">
      {/* Banner info */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] text-slate-500">
            i
          </div>
          <span>Whitelist has been added, can be used directly</span>
        </div>
        <button className="ml-4 whitespace-nowrap text-xs font-medium text-blue-600">
          View whitelist &rarr;
        </button>
      </div>

      {/* Proxy generator */}
      <CardSection title="Proxy generator">
        <div className="space-y-4">
          {/* Extraction type */}
          <div>
            <div className="mb-1 text-[11px] text-slate-500">
              Extraction type
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setExtractionType('link')}
                className={`flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium ${
                  isLinkExtraction
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className={`mr-2 inline-flex h-3 w-3 items-center justify-center rounded-full border text-[10px] ${
                    isLinkExtraction
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isLinkExtraction && '✓'}
                </span>
                Link Extraction
              </button>

              <button
                type="button"
                onClick={() => setExtractionType('direct')}
                className={`flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium ${
                  !isLinkExtraction
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className={`mr-2 inline-flex h-3 w-3 items-center justify-center rounded-full border text-[10px] ${
                    !isLinkExtraction
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {!isLinkExtraction && '✓'}
                </span>
                Direct Generation
              </button>
            </div>
          </div>

          {/* Country */}
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Country</span>
              <button className="text-blue-600">View country code</button>
            </div>
            <select className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs">
              <option>🇺🇸 United States</option>
              <option>🇬🇧 United Kingdom</option>
              <option>🇩🇪 Germany</option>
              <option>🇫🇷 France</option>
              <option>🇯🇵 Japan</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">Amount</span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleDecrease}
                className="h-8 w-8 rounded-l-md border border-slate-200 bg-white text-xs hover:bg-slate-50"
              >
                -
              </button>
              <input
                type="number"
                className="h-8 w-16 border-y border-slate-200 bg-slate-50 text-center text-xs outline-none"
                value={amount}
                onChange={(e) => {
                  const v = Number(e.target.value || 1);
                  setAmount(v > 0 ? v : 1);
                }}
              />
              <button
                type="button"
                onClick={handleIncrease}
                className="h-8 w-8 rounded-r-md border border-slate-200 bg-white text-xs hover:bg-slate-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </CardSection>

      {/* Session settings + generate */}
      <CardSection title="Session settings">
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Session type
            </label>
            <select
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value as SessionType)}
            >
              <option>Sticky IP</option>
              <option>Rotation IP</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="mt-1 w-full rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
          >
            Generate API links
          </button>

          <div className="mt-3 space-y-2">
            <label className="text-[11px] text-slate-500">
              Generate results
            </label>
            <input
              readOnly
              value={generatedLink}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleOpen}
                className="rounded-md bg-blue-500 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600"
              >
                Open link
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
              >
                Copy link
              </button>
            </div>
          </div>
        </div>
      </CardSection>

      {/* Advanced settings */}
      <CardSection title="Advanced settings">
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-[11px] text-slate-500">
              Unblock targets
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[11px] hover:bg-slate-50">
                Apply for Unblock
              </button>
              <button className="text-[11px] text-blue-600">
                View domain status
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Some domain names do not support access, but they can be accessed
            normally after submission for review.
          </p>
        </div>
      </CardSection>
    </div>
  );
};
