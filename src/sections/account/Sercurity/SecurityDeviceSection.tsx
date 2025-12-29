import React, { useState } from 'react';
import { Icon } from '@iconify/react';

type TabKey = 'device' | 'event';

interface SecurityDeviceRow {
  id: string;
  type: string;
  country: string;
  state: string;
  city: string;
  loginIp: string;
}

const MOCK_DEVICES: SecurityDeviceRow[] = [
  {
    id: '40d3f3b0ad04bf631c147aef1c...',
    type: 'web',
    country: 'VN',
    state: 'Ho Chi Minh',
    city: 'Ho Chi Minh City',
    loginIp: '14.187.186.220',
  },
  {
    id: '1ef3c31f79154f62d4728f737d2...',
    type: 'web',
    country: 'VN',
    state: 'Ho Chi Minh',
    city: 'Ho Chi Minh City',
    loginIp: '171.224.240.57',
  },
];

const SecurityDeviceSection: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('device');
  const [devices, setDevices] = useState<SecurityDeviceRow[]>(MOCK_DEVICES);

  const handleDelete = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="w-full rounded-lg md:rounded-xl lg:rounded-2xl bg-white p-4 shadow-sm md:p-5 lg:p-6">
      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('device')}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:px-4 ${
            tab === 'device'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          Security device
        </button>
        <button
          type="button"
          onClick={() => setTab('event')}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:px-4 ${
            tab === 'event'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          Event Log
        </button>
      </div>

      {tab === 'device' ? (
        <div>
          {/* Header */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-700">
            <span className="font-semibold">Security device management</span>
            <Icon
              icon="mdi:information-outline"
              className="h-4 w-4 shrink-0 text-amber-400"
            />
            <span className="text-amber-500">Not enabled</span>
          </div>

          {/* Table - Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-[11px] font-medium text-slate-500 sm:text-xs">
                <tr>
                  <th className="px-4 py-3">Security device</th>
                  <th className="px-4 py-3">Device type</th>
                  <th className="px-4 py-3">Country/Region</th>
                  <th className="px-4 py-3">State/Province</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Login IP</th>
                  <th className="px-4 py-3">Operate</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {devices.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={idx % 2 === 1 ? 'bg-slate-50/60' : ''}
                  >
                    <td className="px-4 py-3 break-all">{row.id}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.country}</td>
                    <td className="px-4 py-3">{row.state}</td>
                    <td className="px-4 py-3">{row.city}</td>
                    <td className="px-4 py-3">{row.loginIp}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="text-slate-400 transition-colors hover:text-red-500"
                      >
                        <Icon
                          icon="mdi:trash-can-outline"
                          className="h-4 w-4"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
                {devices.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-xs text-slate-500"
                    >
                      No security device yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block space-y-3 lg:hidden">
            {devices.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500 sm:text-sm">
                No security device yet
              </div>
            ) : (
              devices.map((row, idx) => (
                <div
                  key={row.id}
                  className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-500">
                          Security device
                        </p>
                        <p className="mt-1 break-all text-xs font-medium text-slate-900">
                          {row.id}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="shrink-0 text-slate-400 transition-colors hover:text-red-500"
                      >
                        <Icon
                          icon="mdi:trash-can-outline"
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-slate-500">Device type</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {row.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Country/Region</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {row.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">State/Province</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {row.state}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">City</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {row.city}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-slate-500">Login IP</p>
                        <p className="mt-1 font-medium text-slate-900">
                          {row.loginIp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        // Event Log tab – placeholder
        <div className="py-10 text-center text-xs text-slate-500 sm:text-sm">
          No event log yet
        </div>
      )}
    </div>
  );
};

export default SecurityDeviceSection;
