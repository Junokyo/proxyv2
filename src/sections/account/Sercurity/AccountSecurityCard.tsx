import React from 'react';
import { Icon } from '@iconify/react';

const AccountSecurityCard: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Account security
      </h2>

      <div className="h-px w-full bg-slate-100" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
            <Icon icon="mdi:lock-outline" className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-slate-800">Password</p>
            <p className="text-xs text-slate-500">Log in to your account</p>
          </div>
        </div>

        <button className="whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-500">
          Change
        </button>
      </div>
    </div>
  );
};

export default AccountSecurityCard;
