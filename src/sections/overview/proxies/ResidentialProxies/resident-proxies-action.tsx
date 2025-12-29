/**
 * Action Section component
 * Displays action buttons and options for residential proxies
 */
export function ActionSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column */}
      <div className="flex flex-col gap-6">
        {/* Exchange CDKey */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-white to-yellow-50/50 p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-white text-xl shadow-md">
              🔑
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Exchange CDKey
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-3">
            <input
              type="text"
              placeholder="Enter your CDKey"
              className="flex-1 rounded-xl border-2 border-amber-200 px-4 py-3 text-sm text-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all"
            />
            <button className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-5 py-3 text-sm font-bold text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
              Exchange Now
            </button>
          </div>
        </div>

        {/* Affiliate program */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/50 p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400"></div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white text-xl shadow-md">
              🏆
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Affiliate Program
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 mb-5">
            Invite friends and get{' '}
            <span className="text-amber-600 font-bold text-lg">
              10% commission
            </span>{' '}
            on their purchases!
          </p>

          {/* Withdrawable */}
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-100 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-600 mb-1">
                  Available Balance
                </div>
                <div className="text-3xl font-bold text-slate-900">$0</div>
              </div>

              <button className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 px-4 py-2 text-sm font-bold text-white hover:from-yellow-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all">
                Withdraw →
              </button>
            </div>
          </div>

          {/* Invitation code */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-slate-600 mb-2 block">
              Your Invitation Code:
            </label>
            <div className="flex items-center gap-2 rounded-xl border-2 border-amber-200 bg-white px-4 py-3 text-sm font-mono font-semibold text-slate-900">
              B9BL23XJ
              <button className="ml-auto flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors">
                <span className="text-base">📋</span>
                <span className="text-xs font-bold">Copy</span>
              </button>
            </div>
          </div>

          {/* Invitation link */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-2 block">
              Your Invitation Link:
            </label>
            <div className="flex items-center gap-2 overflow-hidden rounded-xl border-2 border-amber-200 bg-white px-4 py-3">
              <span className="truncate text-sm text-slate-700">
                https://www.lunaproxy.com/register?invitation_XXXXXX
              </span>
              <button className="flex-shrink-0 text-amber-600 hover:text-amber-700 transition-colors">
                <span className="text-base">📋</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Support contact */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-white to-blue-50/50 p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-amber-400 to-yellow-400"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl shadow-md">
              💬
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Need Help?
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 mb-5">
            Have any questions about our products or need a customized package?
          </p>

          <div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors text-2xl">
              📘
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 hover:bg-red-200 transition-colors text-2xl">
              ❌
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 hover:bg-green-200 transition-colors text-2xl">
              💬
            </button>
          </div>

          <button className="w-full rounded-xl border-2 border-amber-400 bg-gradient-to-r from-yellow-500 to-amber-600 px-5 py-3 text-sm sm:text-base font-bold text-white hover:from-yellow-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            <span className="text-xl">🎧</span>
            Let's Talk
          </button>
        </div>

        {/* Quick Stats Card */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 sm:p-6 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-xl shadow-md">
              📊
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Quick Stats
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-100">
              <span className="text-sm font-medium text-slate-600">
                Active Services
              </span>
              <span className="text-lg font-bold text-amber-600">0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-100">
              <span className="text-sm font-medium text-slate-600">
                Total Usage
              </span>
              <span className="text-lg font-bold text-amber-600">0 GB</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-100">
              <span className="text-sm font-medium text-slate-600">
                Referrals
              </span>
              <span className="text-lg font-bold text-amber-600">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
