import { IspProxyListTable } from './isp-proxy-list-table';

type IspProxyListCardProps = {
  onBuyIp?: () => void;
};

export function IspProxyListCard({}: IspProxyListCardProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">Proxy List</div>

        {/* View more */}
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1">
          IP management
          <span>›</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200 mt-2" />
      <div className="bg-white p-5">
        <IspProxyListTable data={[]} />
      </div>
    </div>
  );
}
