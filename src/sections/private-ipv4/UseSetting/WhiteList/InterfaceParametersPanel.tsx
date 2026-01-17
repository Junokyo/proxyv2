import React from 'react';

export const InterfaceParametersPanel: React.FC = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">
        Interface Parameters
      </h2>

      {/* Interface annotation table */}
      <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 text-xs">
        <div className="bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700">
          Interface annotation
        </div>
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr className="border-t border-slate-200">
              <th className="px-3 py-2">Parameter Name</th>
              <th className="px-3 py-2">Parameter Type</th>
              <th className="px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2">type</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">FORMAT:TXT JSON</td>
            </tr>
            <tr className="border-t border-slate-100 bg-slate-50/60">
              <td className="px-3 py-2">sb</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">Custom delimiters</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2">regions</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">COUNTRY</td>
            </tr>
            <tr className="border-t border-slate-100 bg-slate-50/60">
              <td className="px-3 py-2">ip_si</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">IP MODE(5:Sticky IP,6:Rotation IP)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Example */}
      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
        <div className="mb-1 font-semibold text-slate-700">Example</div>
        <pre className="whitespace-pre-wrap text-[11px] text-slate-600">
          {`{"Code":0,"Success":true,"Msg":"Successfully extracted","RequestIp":"request address","Data":[{"ip":"13.229.125.57","port":10715}]}`}
        </pre>
      </div>

      {/* Result annotation table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
        <div className="bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-700">
          Result annotation
        </div>
        <table className="w-full text-left text-[11px]">
          <thead className="bg-slate-50 text-slate-500">
            <tr className="border-t border-slate-200">
              <th className="px-3 py-2">Parameter Name</th>
              <th className="px-3 py-2">Parameter Type</th>
              <th className="px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2">code</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">Status Code</td>
            </tr>
            <tr className="border-t border-slate-100 bg-slate-50/60">
              <td className="px-3 py-2">data</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">IP-list</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2">success</td>
              <td className="px-3 py-2">String</td>
              <td className="px-3 py-2">
                True indicates success and false indicates failure
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
