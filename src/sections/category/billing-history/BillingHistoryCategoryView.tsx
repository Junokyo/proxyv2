import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

const billingSchema = z.object({
  amount: z.number().min(0),
  paymentMethod: z.string().min(1),
  date: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['paid', 'pending', 'failed']).optional(),
});
type BillingForm = z.infer<typeof billingSchema>;

interface BillingItem {
  id: string;
  amount: number;
  paymentMethod: string;
  date: string;
  description?: string;
  status: 'paid' | 'pending' | 'failed';
}

const billingFormFields: FormFieldConfig[] = [
  { name: 'amount', label: 'Số tiền (VND)', type: 'number', required: true },
  { name: 'paymentMethod', label: 'Phương thức', type: 'select', required: true, options: [{ label: 'Card', value: 'card' }, { label: 'Bank', value: 'bank' }, { label: 'COD', value: 'cod' }] },
  { name: 'date', label: 'Ngày thanh toán', type: 'date' },
  { name: 'description', label: 'Ghi chú', type: 'text' },
  { name: 'status', label: 'Trạng thái', type: 'select', options: [{ label: 'Paid', value: 'paid' }, { label: 'Pending', value: 'pending' }, { label: 'Failed', value: 'failed' }] },
];

const billingColumns: ColumnDef<BillingItem>[] = [
  { accessorKey: 'date', header: ({ column }) => <DataGridColumnHeader title="Ngày" column={column} />, cell: ({ row }) => <div>{row.original.date}</div> },
  { accessorKey: 'amount', header: ({ column }) => <DataGridColumnHeader title="Số tiền" column={column} />, cell: ({ row }) => <div>{row.original.amount.toLocaleString()} VND</div> },
  { accessorKey: 'paymentMethod', header: ({ column }) => <DataGridColumnHeader title="Phương thức" column={column} />, cell: ({ row }) => <div>{row.original.paymentMethod}</div> },
  { accessorKey: 'status', header: ({ column }) => <DataGridColumnHeader title="Trạng thái" column={column} />, cell: ({ row }) => <div>{row.original.status}</div> },
  { accessorKey: 'description', header: ({ column }) => <DataGridColumnHeader title="Mô tả" column={column} />, cell: ({ row }) => <div>{row.original.description ?? '—'}</div> },
];

const billingSample: BillingItem[] = [
  { id: 'b1', amount: 150000, paymentMethod: 'card', date: '2025-11-01', description: 'Thanh toán gói Pro', status: 'paid' },
  { id: 'b2', amount: 50000, paymentMethod: 'bank', date: '2025-11-05', description: 'Gia hạn Basic', status: 'pending' },
  { id: 'b3', amount: 300000, paymentMethod: 'card', date: '2025-11-10', description: 'Mua IP dedicated', status: 'failed' },
];

export function BillingHistoryCategoryView() {
  const onAdd = async (v: BillingForm) => console.log('Add billing', v);
  const onEdit = async (id: string | number, v: BillingForm) => console.log('Edit billing', id, v);
  const onDelete = async (id: string | number) => console.log('Delete billing', id);

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<BillingItem>
        data={billingSample}
        columns={billingColumns}
        title="Lịch sử thanh toán"
        description="Danh sách giao dịch / thanh toán"
        formSchema={billingSchema}
        formFields={billingFormFields}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        searchKeys={['paymentMethod', 'description', 'status']}
        searchPlaceholder="Tìm giao dịch..."
        addDialogTitle="Thêm giao dịch"
        addDialogDescription="Nhập thông tin giao dịch"
        editDialogTitle="Chỉnh sửa giao dịch"
        editDialogDescription="Cập nhật giao dịch"
        deleteDialogTitle="Xóa giao dịch"
        deleteDialogDescription="Bạn có chắc muốn xóa giao dịch này?"
      />
    </div>
  );
}
