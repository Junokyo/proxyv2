import React, { useState } from 'react';
import { useKC } from '@/auth/providers/keycloak.provider';

const AccountSettingsSection: React.FC = () => {
  const { user } = useKC();

  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'User';

  const primaryRole =
    user?.roles && user.roles.length > 0
      ? user.roles[0]
      : user?.isAdmin
        ? 'Admin'
        : 'User';

  const handleSave = () => {
    // TODO: Wire up with API to actually update email & password
    // Hiện tại chỉ là UI placeholder
    // eslint-disable-next-line no-console
    console.log('Save account settings', { email, password });
  };

  return (
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      <h2 className="mb-4 text-sm md:text-base font-semibold text-slate-900">
        Account settings
      </h2>

      <div className="space-y-4 md:space-y-5 text-sm">
        {/* Account */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Account
          </label>
          <input
            type="text"
            value={displayName}
            disabled
            className="h-9 sm:h-10 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs sm:text-sm text-slate-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 sm:h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Password
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="h-9 sm:h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-xs sm:text-sm text-slate-700 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="h-9 sm:h-10 w-full sm:w-auto whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 sm:px-6 text-xs sm:text-sm font-medium text-slate-700 transition-colors hover:border-blue-500 hover:bg-blue-50"
            >
              Change password
            </button>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-slate-600">
            Role
          </label>
          <input
            type="text"
            value={primaryRole}
            disabled
            className="h-9 sm:h-10 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs sm:text-sm text-slate-500 outline-none"
          />
          {user?.roles && user.roles.length > 1 && (
            <p className="mt-1.5 text-xs text-slate-500 break-words">
              Other roles: {user.roles.slice(1).join(', ')}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto rounded-lg bg-blue-500 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;
