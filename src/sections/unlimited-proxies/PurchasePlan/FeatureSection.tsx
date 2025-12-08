export const FeaturesSection: React.FC = () => {
  const left = ['Unlimited traffic', 'Exclusive proxies servers'];
  const right = ['Real residential proxies', 'Unlimited concurrent requests'];
  const right2 = ['Unlimited IPs', 'Country distribution around the world'];

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-900">
        <span>Features you can use with each plan</span>
        <button className="text-[11px] text-blue-500 hover:text-blue-600">
          Restricted Websites ↗
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[left, right, right2].map((col, idx) => (
          <ul key={idx} className="space-y-2 text-xs text-slate-700">
            {col.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[3px] h-3 w-3 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
