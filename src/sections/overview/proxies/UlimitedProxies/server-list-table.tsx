import { JSX } from 'react';
import { EmptyState } from '../../components/empty-state';

type ServerRow = {
  server: string;
  bandwidth: string | number;
  status: string;
  expiry: string;
  operate?: JSX.Element | string;
};

type ServerTableProps = {
  data: ServerRow[];
};

const headers = [
  'Server',
  'Bandwidth (Mbps)',
  'Status',
  'Expiry Time',
  'Operate',
];

export function ServerListTable({ data }: ServerTableProps) {
  const onBuyServer = () => {
    alert('Buy Server clicked');
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden sm:overflow-x-auto">
      <table className="table-fixed sm:table-auto w-full min-w-0 sm:min-w-max border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-600">
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 sm:px-4 py-2 font-medium border-b border-slate-200 text-left whitespace-normal sm:whitespace-nowrap break-words"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-10 text-slate-400"
              >
                <EmptyState
                  icon="solar:document-linear"
                  pinIcon="mdi:pin"
                  message="No server available, please buy server"
                  buttonLabel="Buy Server"
                  onButtonClick={onBuyServer}
                />
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50 transition text-slate-700"
              >
                <td className="px-3 sm:px-4 py-2 border-b border-slate-100 whitespace-normal sm:whitespace-nowrap break-words">
                  {row.server}
                </td>
                <td className="px-3 sm:px-4 py-2 border-b border-slate-100 whitespace-normal sm:whitespace-nowrap break-words">
                  {row.bandwidth}
                </td>
                <td className="px-3 sm:px-4 py-2 border-b border-slate-100 whitespace-normal sm:whitespace-nowrap break-words">
                  {row.status}
                </td>
                <td className="px-3 sm:px-4 py-2 border-b border-slate-100 whitespace-normal sm:whitespace-nowrap break-words">
                  {row.expiry}
                </td>
                <td className="px-3 sm:px-4 py-2 border-b border-slate-100 whitespace-normal sm:whitespace-nowrap break-words">
                  {row.operate ?? '--'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
