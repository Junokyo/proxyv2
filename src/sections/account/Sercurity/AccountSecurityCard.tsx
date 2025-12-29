import React from 'react';
import { Icon } from '@iconify/react';

const AccountSecurityCard: React.FC = () => {
  return (
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900">
        Account security
      </h2>

      <div className="h-px w-full bg-slate-100" />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-50 sm:h-12 sm:w-12">
            <Icon icon="mdi:lock-outline" className="h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-medium text-slate-800">Password</p>
            <p className="text-xs text-slate-500">Log in to your account</p>
          </div>
        </div>

        <button className="w-full whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-blue-500 hover:bg-blue-50 sm:w-auto sm:py-1.5">
          Change
        </button>
      </div>
    </div>
  );
};

export default AccountSecurityCard;
