'use client';

import { Icon } from '@iconify/react';

interface GiftInfoProps {
  currentMembership?: string;
}

const GiftInfo = ({ currentMembership = 'V0' }: GiftInfoProps) => {
  const residentialPackages = ['5GB', '10GB', '45GB', '120GB', '280GB'];
  const rotatingPackages = ['1GB', '10GB', '40GB', '100GB', '350GB', '650GB'];

  const giftRatios = [
    { level: 'V0', name: 'Starter', ratio: '0%', threshold: '$0' },
    { level: 'V1', name: 'Bronze', ratio: '5%', threshold: '$1,000' },
    { level: 'V2', name: 'Silver', ratio: '10%', threshold: '$3,000' },
    { level: 'V3', name: 'Gold', ratio: '15%', threshold: '$10,000' },
    { level: 'V4', name: 'Platinum', ratio: '20%', threshold: '$30,000' },
  ];

  const calculateExample = (packageSize: number, ratio: number) => {
    return packageSize + (packageSize * ratio) / 100;
  };

  // Find current tier info
  const currentTier = giftRatios.find((t) => t.level === currentMembership) || giftRatios[0];
  const currentRatioValue = parseInt(currentTier.ratio) || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
            <Icon icon="mdi:information-outline" className="text-xl text-teal-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Member Benefits Guide</h2>
            <p className="text-sm text-slate-500">Learn how to maximize your rewards</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Benefits Overview */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Icon icon="mdi:star-outline" className="text-amber-500" />
            How It Works
          </h3>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 leading-relaxed">
              Purchase designated packages and receive <span className="font-semibold">free bonus traffic</span>.
              The higher your membership level, the greater your gift ratio - up to <span className="font-semibold text-blue-900">20% bonus</span> on every purchase.
            </p>
          </div>
        </section>

        {/* Applicable Packages */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Icon icon="mdi:package-variant" className="text-indigo-500" />
            Eligible Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Residential Proxies */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Icon icon="mdi:wifi" className="text-teal-500" />
                <h4 className="text-sm font-medium text-slate-700">Residential Proxies</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {residentialPackages.map((pkg) => (
                  <span
                    key={pkg}
                    className="px-3 py-1.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors cursor-pointer"
                  >
                    {pkg}
                  </span>
                ))}
              </div>
            </div>

            {/* Rotating ISP Proxies */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Icon icon="mdi:rotate-3d-variant" className="text-indigo-500" />
                <h4 className="text-sm font-medium text-slate-700">Rotating ISP Proxies</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {rotatingPackages.map((pkg) => (
                  <span
                    key={pkg}
                    className="px-3 py-1.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    {pkg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Icon icon="mdi:calculator" className="text-amber-500" />
            Example Calculation
          </h3>
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 shrink-0 mt-0.5">
                <Icon icon="mdi:lightbulb-outline" className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-teal-800 mb-2">
                  As a <span className="font-semibold">{currentTier.level} ({currentTier.name})</span> member with{' '}
                  <span className="font-semibold">{currentTier.ratio}</span> gift ratio:
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-teal-200">
                  <span className="text-sm text-slate-600">280GB purchase</span>
                  <Icon icon="mdi:arrow-right" className="text-slate-400" />
                  <span className="text-sm font-bold text-teal-700">
                    {calculateExample(280, currentRatioValue)}GB received
                  </span>
                </div>
                <p className="text-xs text-teal-600 mt-2">
                  Formula: 280GB + (280GB x {currentTier.ratio}) = {calculateExample(280, currentRatioValue)}GB
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Ratio Table */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Icon icon="mdi:chart-timeline-variant" className="text-blue-500" />
            Membership Tiers
          </h3>
          <div className="overflow-hidden border border-slate-200 rounded-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tier Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Threshold
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Gift Ratio
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {giftRatios.map((item) => (
                  <tr
                    key={item.level}
                    className={`transition-colors ${
                      item.level === currentMembership
                        ? 'bg-blue-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                            item.level === currentMembership
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.level}
                        </span>
                        {item.level === currentMembership && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded-full uppercase">
                            Current
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-700">{item.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-600">{item.threshold}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-semibold ${
                          item.level === currentMembership
                            ? 'text-blue-600'
                            : 'text-teal-600'
                        }`}
                      >
                        {item.ratio}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Terms */}
        <section>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Icon icon="mdi:file-document-outline" className="text-slate-500" />
            Terms & Conditions
          </h3>
          <div className="p-4 bg-slate-50 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-slate-600">1</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                If an order is rejected, the accumulated amount will be deducted. Existing benefits remain unaffected,
                but subsequent upgrades will require recalculation of effective consumption.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-slate-600">2</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Member upgrade benefits cannot be combined with other promotional offers.
                The system automatically applies the most favorable pricing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GiftInfo;
