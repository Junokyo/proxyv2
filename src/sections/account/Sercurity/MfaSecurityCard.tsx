import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Toggle: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`flex h-6 w-11 items-center rounded-full transition ${
      checked ? 'bg-blue-500' : 'bg-slate-300'
    }`}
  >
    <span
      className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
        checked ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

const MfaSecurityCard: React.FC = () => {
  const [mfaOn, setMfaOn] = useState(false);
  const [secureLoginOn, setSecureLoginOn] = useState(false);

  return (
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      {/* MFA device row */}
      <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-12 sm:w-12">
            <Icon
              icon="mdi:google-authenticator"
              className="h-5 w-5 text-blue-500 sm:h-6 sm:w-6"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-semibold text-slate-900">MFA device</p>
            <p className="text-xs text-slate-500">
              Add MFA to protect your account, supports Google Authenticator
            </p>
          </div>
        </div>

        <div className="flex shrink-0 sm:self-auto self-start">
          <Toggle checked={mfaOn} onChange={() => setMfaOn((v) => !v)} />
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Secure device login row */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 sm:h-12 sm:w-12">
            <Icon icon="mdi:laptop-mac" className="h-5 w-5 text-slate-500 sm:h-6 sm:w-6" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Secure device login
            </p>
            <p className="text-xs text-slate-500">
              Login requires two-factor authentication to protect your account
            </p>
          </div>
        </div>

        <div className="flex shrink-0 sm:self-auto self-start">
          <Toggle
            checked={secureLoginOn}
            onChange={() => setSecureLoginOn((v) => !v)}
          />
        </div>
      </div>
    </div>
  );
};

export default MfaSecurityCard;
