import React, { useState } from 'react';

const MAX_LENGTH = 50;

const InvoiceSection: React.FC = () => {
  const [corpAccount, setCorpAccount] = useState('');
  const [details, setDetails] = useState('');

  const handleDetailsChange = (value: string) => {
    if (value.length <= MAX_LENGTH) setDetails(value);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900">
        Invoice
      </h2>

      <div className="flex-1 space-y-4 text-sm">
        {/* Corporate account */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Corporate account
          </label>
          <input
            type="text"
            value={corpAccount}
            onChange={(e) => setCorpAccount(e.target.value)}
            placeholder="Please fill in"
            className="h-9 sm:h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-700 outline-none transition-colors focus:border-blue-500"
          />
        </div>

        {/* Invoice details */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Invoice details
          </label>
          <div className="relative">
            <textarea
              value={details}
              onChange={(e) => handleDetailsChange(e.target.value)}
              placeholder="Please fill in"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-slate-700 outline-none transition-colors focus:border-blue-500"
            />
            <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] sm:text-xs text-slate-400">
              {details.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="mt-5">
        <button className="w-full rounded-lg bg-blue-500 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-600 sm:w-auto sm:text-sm">
          Save
        </button>
      </div>
    </div>
  );
};

export default InvoiceSection;
