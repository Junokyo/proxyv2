import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

const proxyPackageSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  price: z.number().min(0),
  durationDays: z.number().min(1),
  features: z.string().optional(),
  status: z.boolean().optional(),
});
type ProxyPackageForm = z.infer<typeof proxyPackageSchema>;

interface ProxyPackage {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  features?: string;
  status: boolean;
  createdAt: string;
}

const proxyPackageFormFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên gói',
    type: 'text',
    placeholder: 'Ví dụ: Basic',
    required: true,
  },
  {
    name: 'price',
    label: 'Giá (VND)',
    type: 'number',
    placeholder: '0',
    required: true,
  },
  {
    name: 'durationDays',
    label: 'Thời hạn (ngày)',
    type: 'number',
    placeholder: '30',
    required: true,
  },
  {
    name: 'features',
    label: 'Tính năng',
    type: 'textarea',
    placeholder: 'Mô tả các tính năng',
  },
  { name: 'status', label: 'Trạng thái', type: 'checkbox' },
];

const proxyPackageColumns: ColumnDef<ProxyPackage>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Tên gói" column={column} />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataGridColumnHeader title="Giá (VND)" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.price.toLocaleString()}</div>,
  },
  {
    accessorKey: 'durationDays',
    header: ({ column }) => (
      <DataGridColumnHeader title="Thời hạn (ngày)" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.durationDays} ngày</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataGridColumnHeader title="Trạng thái" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.status ? 'Active' : 'Inactive'}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataGridColumnHeader title="Ngày tạo" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },
];

const proxyPackageSample: ProxyPackage[] = [
  {
    id: 'p1',
    name: 'Basic',
    price: 50000,
    durationDays: 30,
    features: '1 IP chung, tốc độ thấp',
    status: true,
    createdAt: '2024-03-01',
  },
  {
    id: 'p2',
    name: 'Pro',
    price: 150000,
    durationDays: 30,
    features: '10 IP riêng, tốc độ cao',
    status: true,
    createdAt: '2024-03-05',
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 500000,
    durationDays: 365,
    features: 'IP dedicated, SLA',
    status: false,
    createdAt: '2024-05-01',
  },
];

export function ProxyPackageCategoryView() {
  const onAdd = async (values: ProxyPackageForm) =>
    console.log('Add proxy package', values);
  const onEdit = async (id: string | number, values: ProxyPackageForm) =>
    console.log('Edit', id, values);
  const onDelete = async (id: string | number) => console.log('Delete', id);

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<ProxyPackage>
        data={proxyPackageSample}
        columns={proxyPackageColumns}
        title="Gói proxy"
        description="Quản lý các gói proxy / subscription"
        formSchema={proxyPackageSchema}
        formFields={proxyPackageFormFields}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        searchKeys={['name', 'features']}
        searchPlaceholder="Tìm gói proxy..."
        addDialogTitle="Thêm gói proxy"
        addDialogDescription="Điền thông tin gói proxy"
        editDialogTitle="Chỉnh sửa gói proxy"
        editDialogDescription="Cập nhật thông tin gói proxy"
        deleteDialogTitle="Xóa gói proxy"
        deleteDialogDescription="Bạn muốn xóa gói proxy này chứ?"
      />
    </div>
  );
}
