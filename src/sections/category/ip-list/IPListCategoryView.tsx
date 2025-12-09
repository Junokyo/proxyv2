import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

const ipSchema = z.object({
  ip: z.string().min(1),
  port: z.number().min(1),
  type: z.enum(['http', 'https', 'socks5']).optional(),
  country: z.string().optional(),
  status: z.boolean().optional(),
});
type IpForm = z.infer<typeof ipSchema>;

interface IpItem {
  id: string;
  ip: string;
  port: number;
  type: 'http' | 'https' | 'socks5';
  country?: string;
  status: boolean;
  lastChecked?: string;
}

const ipFormFields: FormFieldConfig[] = [
  { name: 'ip', label: 'IP', type: 'text', required: true, placeholder: '1.2.3.4' },
  { name: 'port', label: 'Port', type: 'number', required: true, placeholder: '8080' },
  { name: 'type', label: 'Loại', type: 'select', options: [{ label: 'HTTP', value: 'http' }, { label: 'HTTPS', value: 'https' }, { label: 'SOCKS5', value: 'socks5' }] },
  { name: 'country', label: 'Quốc gia', type: 'text', placeholder: 'VN' },
  { name: 'status', label: 'Hoạt động', type: 'checkbox' },
];

const ipColumns: ColumnDef<IpItem>[] = [
  { accessorKey: 'ip', header: ({ column }) => <DataGridColumnHeader title="IP" column={column} />, cell: ({ row }) => <div>{row.original.ip}</div> },
  { accessorKey: 'port', header: ({ column }) => <DataGridColumnHeader title="Port" column={column} />, cell: ({ row }) => <div>{row.original.port}</div> },
  { accessorKey: 'type', header: ({ column }) => <DataGridColumnHeader title="Loại" column={column} />, cell: ({ row }) => <div>{row.original.type}</div> },
  { accessorKey: 'country', header: ({ column }) => <DataGridColumnHeader title="Quốc gia" column={column} />, cell: ({ row }) => <div>{row.original.country ?? '—'}</div> },
  { accessorKey: 'status', header: ({ column }) => <DataGridColumnHeader title="Trạng thái" column={column} />, cell: ({ row }) => <div>{row.original.status ? 'Up' : 'Down'}</div> },
  { accessorKey: 'lastChecked', header: ({ column }) => <DataGridColumnHeader title="Kiểm tra lần cuối" column={column} />, cell: ({ row }) => <div>{row.original.lastChecked ?? '—'}</div> },
];

const ipSample: IpItem[] = [
  { id: 'ip1', ip: '103.21.58.1', port: 8080, type: 'http', country: 'VN', status: true, lastChecked: '2025-12-01 10:30' },
  { id: 'ip2', ip: '45.77.34.2', port: 1080, type: 'socks5', country: 'US', status: false, lastChecked: '2025-11-30 08:12' },
  { id: 'ip3', ip: '195.12.45.9', port: 3128, type: 'https', country: 'DE', status: true, lastChecked: '2025-12-05 12:00' },
];

export function IPListCategoryView() {
  const onAdd = async (v: IpForm) => console.log('Add IP', v);
  const onEdit = async (id: string | number, v: IpForm) => console.log('Edit IP', id, v);
  const onDelete = async (id: string | number) => console.log('Delete IP', id);

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <CategoryPage<IpItem>
        data={ipSample}
        columns={ipColumns}
        title="Danh sách IP / Proxy"
        description="Quản lý các IP/proxy dùng trong hệ thống"
        formSchema={ipSchema}
        formFields={ipFormFields}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        searchKeys={['ip', 'country', 'type']}
        searchPlaceholder="Tìm IP, quốc gia, loại..."
        addDialogTitle="Thêm IP / Proxy"
        addDialogDescription="Thêm IP hoặc proxy mới"
        editDialogTitle="Chỉnh sửa IP / Proxy"
        editDialogDescription="Cập nhật thông tin IP/proxy"
        deleteDialogTitle="Xóa IP / Proxy"
        deleteDialogDescription="Bạn có muốn xóa IP này?"
      />
    </div>
  );
}
