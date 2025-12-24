'use client';

import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
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
    if (tabFromUrl && TABS_DATA.some(tab => tab.value === tabFromUrl)) {
      setCurrentTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleChangeTab = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-4">
          Dịch vụ Facebook
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 overflow-x-auto">
          {TABS_DATA.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleChangeTab(tab.value)}
              className={
                'pb-3 px-2 text-sm transition font-medium whitespace-nowrap flex items-center gap-2 ' +
                (currentTab === tab.value
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-900')
              }
            >
              <Icon icon={tab.icon} className="h-4 w-4" />
              {tab.label}
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

