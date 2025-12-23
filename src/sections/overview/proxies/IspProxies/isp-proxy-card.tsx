import { IspProxyListTable } from './isp-proxy-list-table';

type IspProxyListCardProps = {
  onBuyIp?: () => void;
};

export function IspProxyListCard({}: IspProxyListCardProps) {
  return (
    <div className="w-full max-w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm overflow-x-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <div className="flex items-center gap-6 text-sm min-w-0">Proxy List</div>

        {/* View more */}
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
          IP management
          <span>›</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200 mt-2" />
      <div className="bg-white p-3 sm:p-5 w-full max-w-full min-w-0 overflow-x-hidden">
        <IspProxyListTable data={[]} />
      </div>
    </div>
  );
}
