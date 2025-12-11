'use client';

import { useState } from 'react';
import { ContactDialog } from '@/components/contact/ContactDialog';

export const CustomPlanCard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-6 pb-6 pt-6 shadow-sm">
        <div className="text-sm font-medium text-slate-700">Custom</div>
        <div className="mt-2 text-xl font-semibold text-slate-900">
          Get a quote
        </div>

        <ul className="mt-4 space-y-2 text-xs text-slate-600">
          <li>• Higher concurrency</li>
          <li>• Greater bandwidth</li>
          <li>• Better prices</li>
        </ul>

        <div className="mt-auto pt-6">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500 bg-blue-50 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100"
          >
            <span className="text-[12px]">📩</span>
            <span>Contact Us</span>
          </button>
        </div>
      </div>
      <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};
