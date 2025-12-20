export function ActionSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Exchange CDKey */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <span className="text-slate-500 text-base">🔑</span>
            Exchange CDKey
          </div>

          <div className="mt-3 flex flex-col sm:flex-row w-full gap-3">
            <input
              type="text"
              placeholder="CDKey"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
            />
            <button className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 whitespace-nowrap">
              Exchange
            </button>
          </div>
        </div>

        {/* Affiliate program */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span className="text-orange-500">🏆</span>
            Affiliate program
          </div>

          <p className="mt-1 text-sm text-slate-600">
            Invite friends and get{' '}
            <span className="text-orange-500 font-semibold">
              10% commission
            </span>
          </p>

          {/* Withdrawable */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Withdrawable</div>
              <div className="text-2xl font-semibold text-slate-900">$0</div>
            </div>

            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Extract ›
            </button>
          </div>

          {/* Invitation code */}
          <div className="mt-4">
            <label className="text-xs text-slate-500">Invitation code:</label>
            <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
              B9BL23XJ
              <button className="ml-auto text-slate-400 hover:text-slate-600 text-lg">
                📋
              </button>
            </div>
          </div>

          {/* Invitation link */}
          <div className="mt-3">
            <label className="text-xs text-slate-500">Invitation link:</label>
            <div className="mt-1 flex items-center gap-2 overflow-hidden rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
              <span className="truncate">
                https://www.lunaproxy.com/register?invitation_XXXXXX
              </span>
              <button className="text-slate-400 hover:text-slate-600 text-lg">
                📋
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-6">
        {/* Support contact */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Have any questions about our products or need a customized package?
          </div>

          <div className="mt-3 flex items-center gap-3 text-xl">
            <span className="text-slate-500 cursor-pointer hover:text-slate-700">
              📘
            </span>
            <span className="text-slate-500 cursor-pointer hover:text-slate-700">
              ❌
            </span>
            <span className="text-slate-500 cursor-pointer hover:text-slate-700">
              💬
            </span>
          </div>

          <button className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1">
            🎧 Let's talk
          </button>
        </div>

        {/* Promo banner */}
        {/* <div className="overflow-hidden rounded-xl shadow-sm">
          <img
            src="https://i.imgur.com/1QeS3Pk.png"
            alt="Promo Banner"
            className="w-full rounded-xl"
          />
        </div> */}
      </div>
    </div>
  );
}
