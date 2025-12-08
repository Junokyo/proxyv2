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
    <table className="table-auto w-full border-collapse text-sm">
      <thead>
        <tr className="bg-slate-50 text-slate-600">
          {headers.map((h) => (
            <th
              key={h}
              className="px-4 py-2 font-medium border-b border-slate-200 text-left"
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
              <td className="px-4 py-2 border-b border-slate-100">
                {row.server}
              </td>
              <td className="px-4 py-2 border-b border-slate-100">
                {row.bandwidth}
              </td>
              <td className="px-4 py-2 border-b border-slate-100">
                {row.status}
              </td>
              <td className="px-4 py-2 border-b border-slate-100">
                {row.expiry}
              </td>
              <td className="px-4 py-2 border-b border-slate-100">
                {row.operate ?? '--'}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
