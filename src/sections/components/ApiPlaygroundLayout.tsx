// ApiPlaygroundLayout.tsx
import React, { useState } from 'react';

type FieldType = 'text' | 'textarea' | 'select' | 'switch' | 'multiText';

export interface PlaygroundField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: string[];
}

export interface CodeTab {
  key: string;
  label: string;
  code: string;
}

interface ApiPlaygroundLayoutProps {
  serviceIcon?: React.ReactNode;
  serviceName: string;
  balanceText: string;
  onAddBalance?: () => void;
  configTitle?: string;
  fields: PlaygroundField[];
  codeTabs: CodeTab[];
}

const ApiPlaygroundLayout: React.FC<ApiPlaygroundLayoutProps> = ({
  serviceIcon,
  serviceName,
  balanceText,
  onAddBalance,
  configTitle = 'Configuration',
  fields,
  codeTabs,
}) => {
  const [activeTabKey, setActiveTabKey] = useState(codeTabs[0]?.key);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [multiValues, setMultiValues] = useState<Record<string, string[]>>({});

  const activeTab = codeTabs.find((t) => t.key === activeTabKey);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: string, v: any) =>
    setFormState((prev) => ({ ...prev, [name]: v }));

  const handleMultiChange = (name: string, idx: number, v: string) => {
    setMultiValues((prev) => {
      const arr = prev[name] ? [...prev[name]] : [];
      arr[idx] = v;
      return { ...prev, [name]: arr };
    });
  };

  const handleMultiAdd = (name: string) => {
    setMultiValues((prev) => {
      const arr = prev[name] ? [...prev[name], ''] : [''];
      return { ...prev, [name]: arr };
    });
  };

  return (
    <div className="w-full rounded-2xl bg-white shadow-sm p-4 sm:p-6">
      {/* GRID 12 — md chia 6/6 */}
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT FORM PANEL */}
        <div className="col-span-12 md:col-span-6 border border-slate-100 rounded-xl">
          {/* Balance */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {serviceIcon}
              <div>
                <p className="text-xs font-medium text-slate-600">
                  {serviceName}
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {balanceText}
                </p>
              </div>
            </div>

            <button
              className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg"
              onClick={onAddBalance}
            >
              Add balance
            </button>
          </div>

          {/* FORM */}
          <div className="p-4 space-y-5">
            <h3 className="text-sm font-semibold mb-3">{configTitle}</h3>

            {fields.map((field) => {
              const label = (
                <label className="text-[11px] font-medium text-slate-600 mb-1 block">
                  {field.label}
                  {field.required && (
                    <span className="text-rose-500 ml-1">*</span>
                  )}
                </label>
              );

              if (field.type === 'text')
                return (
                  <div key={field.name}>
                    {label}
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border px-3 py-2 text-xs bg-slate-50"
                      value={formState[field.name] ?? ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  </div>
                );

              if (field.type === 'textarea')
                return (
                  <div key={field.name}>
                    {label}
                    <textarea
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full rounded-lg border px-3 py-2 text-xs bg-slate-50"
                      value={formState[field.name] ?? ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  </div>
                );

              if (field.type === 'select')
                return (
                  <div key={field.name}>
                    {label}
                    <select
                      className="w-full rounded-lg border px-3 py-2 text-xs bg-slate-50"
                      value={formState[field.name] ?? ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    >
                      <option value="">Please select</option>
                      {field.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                );

              if (field.type === 'switch') {
                const checked = formState[field.name] ?? false;

                return (
                  <div
                    key={field.name}
                    className="flex items-center justify-between"
                  >
                    {label}

                    <button
                      onClick={() => handleChange(field.name, !checked)}
                      className={`w-12 h-6 flex items-center rounded-full transition ${
                        checked ? 'bg-blue-500' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                          checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              // MULTI INPUT
              const arr = multiValues[field.name] ?? [''];

              return (
                <div key={field.name}>
                  {label}
                  <div className="space-y-2">
                    {arr.map((text, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full rounded-lg border px-3 py-2 text-xs bg-slate-50"
                        value={text}
                        onChange={(e) =>
                          handleMultiChange(field.name, idx, e.target.value)
                        }
                      />
                    ))}
                    <button
                      className="w-full border border-dashed py-2 text-xs rounded-lg text-slate-500"
                      onClick={() => handleMultiAdd(field.name)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-xs">
              Send request
            </button>
          </div>
        </div>

        {/* RIGHT CODE PANEL */}
        <div className="col-span-12 md:col-span-6 bg-[#151c2f] rounded-xl text-slate-100">
          {/* Tabs */}
          <div className="flex gap-2 px-4 py-3 border-b border-slate-700 text-xs">
            {codeTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTabKey(tab.key)}
                className={`px-3 py-1 rounded-full ${
                  activeTabKey === tab.key
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="px-4 py-4 text-[11px] sm:text-xs font-mono whitespace-pre-wrap text-green-300">
            {activeTab?.code}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPlaygroundLayout;
