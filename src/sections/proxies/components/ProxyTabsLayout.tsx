// ProxyTabsLayout.tsx
'use client';

import { ReactNode, useCallback, useState } from 'react';

export type ProxyTabKey = string;

export interface ProxyTabConfig {
  key: ProxyTabKey;
  label: string;
  content: ReactNode; // component sẽ render khi chọn tab
}

interface ProxyTabsLayoutProps {
  title: string; // Unlimited Proxies / ISP Proxies / ...
  subtitle?: string; // câu mô tả ngắn
  rightLinkText?: string; // "Free upgrade configuration"
  onRightLinkClick?: () => void;

  /** card giới thiệu ngay dưới tabs (icon + mô tả) */
  introCard?: ReactNode;

  tabs: ProxyTabConfig[];
  defaultTabKey?: ProxyTabKey;
}

export const ProxyTabsLayout: React.FC<ProxyTabsLayoutProps> = ({
  title,
  subtitle,
  rightLinkText,
  onRightLinkClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  introCard,
  tabs,
  defaultTabKey,
}) => {
  const initialKey = defaultTabKey ?? tabs[0]?.key;
  const [activeTab, setActiveTab] = useState<ProxyTabKey>(initialKey);

  const handleChangeTab = useCallback((key: ProxyTabKey) => {
    setActiveTab(key);
  }, []);

  const active = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <div className="w-full">
      {/* HEADER + TABS */}
      <div className="flex items-center justify-between gap-4 px-5 pt-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>

          {subtitle && (
            <p className="text-xs text-slate-500 max-w-xl">{subtitle}</p>
          )}

          {/* Tabs */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleChangeTab(tab.key)}
                  className={`pb-2 border-b-2 text-sm font-medium transition
                    ${
                      active
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {rightLinkText && (
          <button
            type="button"
            onClick={onRightLinkClick}
            className="hidden sm:inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
          >
            {rightLinkText}
            <span className="text-[10px]">↗</span>
          </button>
        )}
      </div>

      {/* INTRO CARD (chung style cho Unlimited / ISP / Datacenter) */}
      {/* {introCard && (
        <div className="mt-4 px-5">
          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
            {introCard}
          </div>
        </div>
      )} */}

      {/* CONTENT VÙNG DƯỚI – riêng cho từng tab */}
      <div className="mt-4 px-5 pb-6 text-sm text-slate-700">
        {active?.content}
      </div>
    </div>
  );
};
