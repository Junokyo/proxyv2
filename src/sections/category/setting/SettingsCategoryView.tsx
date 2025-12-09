import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(0),
  type: z.enum(['string', 'number', 'boolean', 'json']).optional(),
  description: z.string().optional(),
});
type SettingForm = z.infer<typeof settingSchema>;

interface SettingItem {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  updatedAt?: string;
}

const settingFormFields: FormFieldConfig[] = [
  { name: 'key', label: 'Key', type: 'text', required: true, placeholder: 'app.maxConnections' },
  { name: 'value', label: 'Value', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'select', options: [{ label: 'String', value: 'string' }, { label: 'Number', value: 'number' }, { label: 'Boolean', value: 'boolean' }, { label: 'JSON', value: 'json' }] },
  { name: 'description', label: 'Mô tả', type: 'textarea' },
];

const settingColumns: ColumnDef<SettingItem>[] = [
  { accessorKey: 'key', header: ({ column }) => <DataGridColumnHeader title="Key" column={column} />, cell: ({ row }) => <div className="font-medium">{row.original.key}</div> },
  { accessorKey: 'value', header: ({ column }) => <DataGridColumnHeader title="Value" column={column} />, cell: ({ row }) => <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.original.value}</div> },
  { accessorKey: 'type', header: ({ column }) => <DataGridColumnHeader title="Type" column={column} />, cell: ({ row }) => <div>{row.original.type}</div> },
  { accessorKey: 'description', header: ({ column }) => <DataGridColumnHeader title="Mô tả" column={column} />, cell: ({ row }) => <div>{row.original.description ?? '—'}</div> },
  { accessorKey: 'updatedAt', header: ({ column }) => <DataGridColumnHeader title="Cập nhật" column={column} />, cell: ({ row }) => <div>{row.original.updatedAt ?? '—'}</div> },
];

const settingSample: SettingItem[] = [
  { id: 's1', key: 'app.maxConnections', value: '100', type: 'number', description: 'Giới hạn kết nối đồng thời', updatedAt: '2025-10-01' },
  { id: 's2', key: 'feature.enableBeta', value: 'true', type: 'boolean', description: 'Bật tính năng beta', updatedAt: '2025-11-01' },
  { id: 's3', key: 'ui.theme', value: 'dark', type: 'string', description: 'Theme mặc định', updatedAt: '2025-12-01' },
];

export function SettingsCategoryView() {
  const onAdd = async (v: SettingForm) => console.log('Add setting', v);
  const onEdit = async (id: string | number, v: SettingForm) => console.log('Edit setting', id, v);
  const onDelete = async (id: string | number) => console.log('Delete setting', id);

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <CategoryPage<SettingItem>
        data={settingSample}
        columns={settingColumns}
        title="Cấu hình / Settings"
        description="Các cấu hình hệ thống - chỉnh cẩn thận"
        formSchema={settingSchema}
        formFields={settingFormFields}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        searchKeys={['key', 'description']}
        searchPlaceholder="Tìm key hoặc mô tả..."
        addDialogTitle="Thêm cấu hình"
        addDialogDescription="Thêm key cấu hình mới"
        editDialogTitle="Chỉnh sửa cấu hình"
        editDialogDescription="Cập nhật giá trị cấu hình"
        deleteDialogTitle="Xóa cấu hình"
        deleteDialogDescription="Xác nhận xóa key cấu hình?"
      />
    </div>
  );
}
