import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Định nghĩa schema cho form validation
const accountSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  status: z.boolean().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

// 2. Định nghĩa kiểu dữ liệu
interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
}

// 3. Định nghĩa các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên',
    type: 'text',
    placeholder: 'Nhập tên',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Nhập email',
    required: true,
  },
  {
    name: 'role',
    label: 'Vai trò',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
      { label: 'Guest', value: 'guest' },
    ],
  },
  {
    name: 'status',
    label: 'Trạng thái',
    type: 'checkbox',
  },
];

// 4. Định nghĩa columns cho bảng
const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Tên" column={column} />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataGridColumnHeader title="Email" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataGridColumnHeader title="Vai trò" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataGridColumnHeader title="Ngày tạo" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },
];

// 5. Dữ liệu mẫu
const sampleData: Account[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-03',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-04',
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    name: 'Đỗ Thị F',
    email: 'dothif@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-06',
  },
  {
    id: '7',
    name: 'Vũ Văn G',
    email: 'vuvang@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-07',
  },
  {
    id: '8',
    name: 'Bùi Thị H',
    email: 'buithih@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-08',
  },
  {
    id: '9',
    name: 'Phan Văn I',
    email: 'phanvani@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-09',
  },
];

// 6. Component sử dụng
export function UserCategoryView() {
  const handleAdd = async (values: AccountFormValues) => {
    console.log('Adding:', values);
  };

  const handleEdit = async (id: string | number, values: AccountFormValues) => {
    console.log('Editing:', id, values);
  };

  const handleDelete = async (id: string | number) => {
    console.log('Deleting:', id);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <CategoryPage<Account>
        data={sampleData}
        columns={columns}
        title="Danh mục tài khoản"
        description="Quản lý danh sách tài khoản"
        formSchema={accountSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['name', 'email', 'role']}
        searchPlaceholder="Tìm kiếm tài khoản..."
        addDialogTitle="Thêm tài khoản mới"
        addDialogDescription="Điền thông tin để thêm tài khoản mới"
        editDialogTitle="Chỉnh sửa tài khoản"
        editDialogDescription="Cập nhật thông tin tài khoản"
        deleteDialogTitle="Xóa tài khoản"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa tài khoản này?"
      />
    </div>
  );
}

/**
 * Ví dụ cho các màn hình khác:
 *
 * 1. Gói proxy:
 *    - formFields: name, price, duration, features (textarea)
 *    - columns: name, price, duration, status
 *
 * 2. IP / Proxy List:
 *    - formFields: ip, port, type, country
 *    - columns: ip, port, type, country, status
 *
 * 3. Logs / Activity:
 *    - formFields: action, description, timestamp
 *    - columns: action, description, timestamp, user
 *
 * 4. History billing / Payment:
 *    - formFields: amount, paymentMethod, date, description
 *    - columns: amount, paymentMethod, date, status
 *
 * 5. Cấu hình / Settings:
 *    - formFields: key, value, type, description
 *    - columns: key, value, type, description
 */
