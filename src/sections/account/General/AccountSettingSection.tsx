import React, { useState } from 'react';
import { useKC } from '@/auth/providers/keycloak.provider';

const AccountSettingsSection: React.FC = () => {
  const [email, setEmail] = useState('chickendev@gmail.com');
  const [phoneCode, setPhoneCode] = useState('+1');
  const [phone, setPhone] = useState('');

  const { user } = useKC();

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'User';

  const displayEmail = user?.email || '';

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Account settings
      </h2>

      <div className="space-y-4 text-sm">
        {/* Account */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">
            Account
          </label>
          <input
            type="text"
            value={displayName}
            disabled
            className="h-9 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500 outline-none"
          />
        </div>

        {/* Email + button */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr),auto]">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              value={displayEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button className="h-9 w-full rounded-lg border border-blue-500 bg-white px-3 text-xs font-medium text-blue-500 hover:bg-blue-50 sm:w-auto">
              Email verify
            </button>
          </div>
        </div>

        {/* Phone + button */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              Phone number
            </label>
            <div className="flex gap-2">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="h-9 w-24 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 outline-none"
              >
                <option value="+1">+1</option>
                <option value="+84">+84</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                placeholder="Please fill in"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:border-blue-500 sm:w-auto">
              Bind phone number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;
