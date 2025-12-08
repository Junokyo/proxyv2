// WhitelistLeftPanel.tsx
import React, { useCallback, useState } from 'react';
import { CardSection } from '@/sections/proxies/components/CardSection';

type ExtractionType = 'link' | 'direct';
type SessionType = 'Sticky IP' | 'Rotation IP';

export const WhitelistLeftPanel: React.FC = () => {
  const [extractionType, setExtractionType] = useState<ExtractionType>('link');
  const [amount, setAmount] = useState<number>(10);
  const [sessionType, setSessionType] = useState<SessionType>('Rotation IP');
  const [generatedLink, setGeneratedLink] = useState<string>(
    'Please order the Rotating ISP proxies first',
  );

  const isLinkExtraction = extractionType === 'link';

  const handleDecrease = useCallback(() => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const handleIncrease = useCallback(() => {
    setAmount((prev) => prev + 1);
  }, []);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value || 1);
      setAmount(value > 0 ? value : 1);
    },
    [],
  );

  /** Giả lập build link API dựa trên lựa chọn */
  const buildLink = useCallback(() => {
    const base = 'https://api.example.com/proxy/generate';
    const params = new URLSearchParams({
      type: extractionType === 'link' ? 'linkExtraction' : 'directGeneration',
      amount: String(amount),
      session: sessionType,
      region: 'global',
    });

    return `${base}?${params.toString()}`;
  }, [amount, extractionType, sessionType]);

  const handleGenerate = useCallback(() => {
    setGeneratedLink(buildLink());
  }, [buildLink]);

  const handleOpenLink = useCallback(() => {
    if (!generatedLink) return;
    if (typeof window !== 'undefined') {
      window.open(generatedLink, '_blank');
    }
  }, [generatedLink]);

  const handleCopyLink = useCallback(() => {
    if (!generatedLink) return;
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(generatedLink).catch(() => {
        // ignore lỗi nhỏ
      });
    }
  }, [generatedLink]);

  return (
    <div className="space-y-4">
      {/* Banner info */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        <span className="mr-2 text-blue-500">ℹ</span>
        Whitelist has been added, can be used directly{' '}
        <button
          type="button"
          className="ml-2 text-xs font-medium text-blue-600"
          onClick={() => {
            // TODO: hook vào router/modal của bạn
            console.log('View whitelist clicked');
          }}
        >
          View whitelist →
        </button>
      </div>

      {/* Proxy generator */}
      <CardSection title="Proxy generator">
        <div className="space-y-3">
          {/* Extraction type */}
          <div>
            <label className="mb-1 block text-[11px] text-slate-500">
              Extraction type
            </label>
            <div className="grid gap-2 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setExtractionType('link')}
                className={`flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium ${
                  isLinkExtraction
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className={`mr-2 inline-block h-3 w-3 rounded-full border ${
                    isLinkExtraction
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                Link Extraction
              </button>

              <button
                type="button"
                onClick={() => setExtractionType('direct')}
                className={`flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium ${
                  !isLinkExtraction
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span
                  className={`mr-2 inline-block h-3 w-3 rounded-full border ${
                    !isLinkExtraction
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                />
                Direct Generation
              </button>
            </div>
          </div>

          {/* Country / Region */}
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>Country/Region</span>
              <button
                type="button"
                className="text-blue-600"
                onClick={() => console.log('View country code clicked')}
              >
                View country code
              </button>
            </div>
            <select className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
              <option>🌐 Global</option>
            </select>
          </div>

          {/* Amount */}
          <div className="grid max-w-xs grid-cols-[auto_1fr_auto] items-center gap-2">
            <span className="text-[11px] text-slate-500">Amount</span>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-center"
            />
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={handleIncrease}
                className="h-4 rounded border border-slate-200 text-[11px] leading-none hover:bg-slate-50"
              >
                +
              </button>
              <button
                type="button"
                onClick={handleDecrease}
                className="h-4 rounded border border-slate-200 text-[11px] leading-none hover:bg-slate-50"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </CardSection>

      {/* Session settings */}
      <CardSection title="Session settings">
        <div>
          <label className="mb-1 block text-[11px] text-slate-500">
            Session type
          </label>
          <select
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs"
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
          className="mt-3 w-full rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-600"
        >
          Generate API links
        </button>

        <div className="mt-3 space-y-2">
          <label className="text-[11px] text-slate-500">Generate results</label>
          <input
            readOnly
            value={generatedLink}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleOpenLink}
              className="rounded-md bg-blue-500 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-blue-600"
            >
              Open link
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
            >
              Copy link
            </button>
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
              <button
                type="button"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] hover:bg-slate-50"
                onClick={() => console.log('Apply for Unblock clicked')}
              >
                Apply for Unblock
              </button>
              <button
                type="button"
                className="text-[11px] text-blue-600"
                onClick={() => console.log('View domain status clicked')}
              >
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
