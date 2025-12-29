'use client';

import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'react-router-dom';
import LiveStreamBoost from './LiveStreamBoost/LiveStreamBoost';
import LiveStreamVipBoost from './LiveStreamVipBoost/LiveStreamVipBoost';
import PostLikeBoost from './PostLikeBoost/PostLikeBoost';
import ReelsViewBoost from './ReelsViewBoost/ReelsViewBoost';

const TABS_DATA = [
  { value: 'livestream', label: 'Tăng mắt live stream', icon: 'mdi:eye' },
  { value: 'livestream-vip', label: 'Tăng mắt live vip', icon: 'mdi:star' },
  { value: 'post-like', label: 'Tăng like bài viết', icon: 'mdi:thumb-up' },
  { value: 'reels-view', label: 'Tăng view reels', icon: 'mdi:play-circle' },
];

export default function FacebookServicesView() {
  const [searchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState('livestream');

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && TABS_DATA.some((tab) => tab.value === tabFromUrl)) {
      setCurrentTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4 px-1">
          Dịch vụ Facebook
        </h1>

        {/* Tabs - Mobile Optimized */}
        <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-200 overflow-x-auto scrollbar-hide -mx-1 px-1">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'pb-2.5 sm:pb-3 px-3 sm:px-4 text-xs sm:text-sm transition font-medium whitespace-nowrap flex items-center gap-1.5 sm:gap-2 min-h-[44px] ' +
                (currentTab === tab.value
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900 active:text-slate-900')
              }
            >
              <Icon
                icon={tab.icon}
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
              />
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">
                {tab.label.replace('Tăng ', '')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-600">
        {currentTab === 'livestream' && <LiveStreamBoost />}
        {currentTab === 'livestream-vip' && <LiveStreamVipBoost />}
        {currentTab === 'post-like' && <PostLikeBoost />}
        {currentTab === 'reels-view' && <ReelsViewBoost />}
      </div>
    </div>
  );
}
