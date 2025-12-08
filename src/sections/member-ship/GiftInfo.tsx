import React from 'react';

interface GiftInfoProps {
  currentMembership?: string;
}

const GiftInfo = ({ currentMembership = 'VA' }: GiftInfoProps) => {
  const residentialPackages = ['5GB', '10GB', '45GB', '120GB', '280GB'];
  const rotatingPackages = ['1GB', '10GB', '40GB', '100GB', '350GB', '650GB'];

  const giftRatios = [
    { level: 'Vo', ratio: '0%' },
    { level: 'VA', ratio: '20%' },
    { level: 'VB', ratio: '15%' },
    { level: 'VC', ratio: '10%' },
    { level: 'VD', ratio: '5%' },
  ];

  const calculateExample = (packageSize: number, ratio: number) => {
    return packageSize + (packageSize * ratio) / 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Member Introduction
      </h2>

      {/* Benefits description */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Benefits description
        </h3>
        <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
          Purchase designated packages and enjoy free top-up. The higher the
          membership level, the higher the gift ratio, up to 20%
        </p>
      </div>

      {/* Applicable packages */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Applicable packages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Residential Proxies */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">
              Residential Proxies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {residentialPackages.map((pkg) => (
                <span
                  key={pkg}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {pkg}
                </span>
              ))}
            </div>
          </div>

          {/* Rotating ISP Proxies */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">
              Rotating ISP Proxies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {rotatingPackages.map((pkg) => (
                <span
                  key={pkg}
                  className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  {pkg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Example description */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">
          Example description (For example {currentMembership} members)
        </h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
          <p className="text-gray-700 mb-2">
            If a {currentMembership} member purchases a 280G package, the actual
            number of GB received is:
          </p>
          <div className="text-lg font-mono text-green-700 bg-white p-3 rounded-lg inline-block">
            280G + (280G × 20%) = {calculateExample(280, 20)}G
          </div>
        </div>
      </div>

      {/* Gift ratio table */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Gift ratio (Based on membership level)
        </h3>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gift Ratio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {giftRatios.map((item) => (
                <tr key={item.level} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.level === currentMembership
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-gray-900">
                    {item.ratio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms and conditions */}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              If the order is rejected, the accumulated amount corresponding to
              the order will be deducted, and the existing rights and interests
              will not be affected, but the subsequent upgrade will require
              recalculation of effective consumption.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              The consumption amount of this member upgrade activity will not be
              combined with other platform promotions, and the lowest unit price
              activity will be automatically used. The actual effective order
              amount shall prevail.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GiftInfo;
