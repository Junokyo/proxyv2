import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

const logSchema = z.object({
  action: z.string().min(1),
  description: z.string().optional(),
  timestamp: z.string().optional(),
  user: z.string().optional(),
});
type LogForm = z.infer<typeof logSchema>;

interface LogItem {
  id: string;
  action: string;
  description?: string;
  timestamp: string;
  user?: string;
  ip?: string;
}

const logFormFields: FormFieldConfig[] = [
  { name: 'action', label: 'Hành động', type: 'text', required: true },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
  { name: 'timestamp', label: 'Thời gian', type: 'date' },
  { name: 'user', label: 'Người dùng', type: 'text' },
];

const logColumns: ColumnDef<LogItem>[] = [
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataGridColumnHeader title="Thời gian" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.timestamp}</div>,
  },
  {
    accessorKey: 'action',
    header: ({ column }) => (
      <DataGridColumnHeader title="Hành động" column={column} />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.action}</div>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataGridColumnHeader title="Mô tả" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.description ?? '—'}</div>,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataGridColumnHeader title="Người" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.user ?? 'system'}</div>,
  },
  {
    accessorKey: 'ip',
    header: ({ column }) => <DataGridColumnHeader title="IP" column={column} />,
    cell: ({ row }) => <div>{row.original.ip ?? '—'}</div>,
  },
];

const logSample: LogItem[] = [
  {
    id: 'l1',
    action: 'Login',
    description: 'Đăng nhập thành công',
    timestamp: '2025-12-05 09:00',
    user: 'admin',
    ip: '103.21.58.1',
  },
  {
    id: 'l2',
    action: 'Create proxy',
    description: 'Thêm gói Pro',
    timestamp: '2025-12-06 12:10',
    user: 'operator',
  },
  {
    id: 'l3',
    action: 'Delete IP',
    description: 'Xóa IP không hợp lệ',
    timestamp: '2025-12-07 15:42',
    user: 'admin',
    ip: '45.77.34.2',
  },
];

export function LogsCategoryView() {
  const onAdd = async (v: LogForm) => console.log('Add log', v);
  const onEdit = async (id: string | number, v: LogForm) =>
    console.log('Edit log', id, v);
  const onDelete = async (id: string | number) => console.log('Delete log', id);

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <CategoryPage<LogItem>
        data={logSample}
        columns={logColumns}
        title="Logs / Activity"
        description="Lịch sử hoạt động của hệ thống"
        formSchema={logSchema}
        formFields={logFormFields}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        searchKeys={['action', 'description', 'user', 'ip']}
        searchPlaceholder="Tìm theo hành động, người dùng, IP..."
        addDialogTitle="Thêm log"
        addDialogDescription="Thêm bản ghi hoạt động (thường hệ thống sẽ tự thêm)"
        editDialogTitle="Chỉnh sửa log"
        editDialogDescription="Cập nhật nội dung log"
        deleteDialogTitle="Xóa log"
        deleteDialogDescription="Xóa bản ghi này?"
      />
    </div>
  );
}
