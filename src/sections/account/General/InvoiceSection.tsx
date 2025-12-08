import React, { useState } from 'react';

const MAX_LENGTH = 50;

const InvoiceSection: React.FC = () => {
  const [corpAccount, setCorpAccount] = useState('');
  const [details, setDetails] = useState('');

  const handleDetailsChange = (value: string) => {
    if (value.length <= MAX_LENGTH) setDetails(value);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">Invoice</h2>

      <div className="flex-1 space-y-4 text-sm">
        {/* Corporate account */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Corporate account
          </label>
          <input
            type="text"
            value={corpAccount}
            onChange={(e) => setCorpAccount(e.target.value)}
            placeholder="Please fill in"
            className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          />
        </div>

        {/* Invoice details */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Invoice details
          </label>
          <div className="relative">
            <textarea
              value={details}
              onChange={(e) => handleDetailsChange(e.target.value)}
              placeholder="Please fill in"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
            />
            <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] text-slate-400">
              {details.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="mt-5">
        <button className="rounded-lg bg-blue-500 px-6 py-2 text-xs font-semibold text-white hover:bg-blue-600 sm:text-sm">
          Save
        </button>
      </div>
    </div>
  );
};

export default InvoiceSection;
