// UserCategoryView.tsx
'use client';

import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';
import { UserDetailModal } from './UserDetailModal';

// 1. Schema
const accountSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  status: z.boolean().optional(),
});
type AccountFormValues = z.infer<typeof accountSchema>;

// 2. Mở rộng kiểu dữ liệu Account để chứa thông tin chi tiết user
export interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;

  // thông tin chi tiết (optional vì có thể không dùng cho tất cả)
  purchasedAmount?: number; // ví dụ tổng dung lượng đã mua (GB)
  usedAmount?: number; // đã dùng (GB)
  balanceAmount?: number; // còn lại (GB)
  proxiesRemaining?: number;
  ipCount?: number;
  notes?: string;

  // Thông tin mở rộng cho modal
  walletBalance?: number; // Số dư ví
  totalProxiesPurchased?: number; // Tổng số proxy đã mua
  totalBandwidthUsed?: number; // Tổng băng thông đã dùng (GB)
  totalRequests?: number; // Tổng số request
  totalTraffic?: number; // Tổng traffic (GB)
  lastLoginIP?: string; // IP login gần nhất
  lastLoginTime?: string; // Thời gian login gần nhất
}

// 3. Các trường form
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
  { name: 'status', label: 'Trạng thái', type: 'checkbox' },
];

// 4. Columns gốc (không thay đổi)
const baseColumns: ColumnDef<Account>[] = [
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

// 5. Dữ liệu mẫu mở rộng
const sampleData: Account[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-01',
    purchasedAmount: 500,
    usedAmount: 120,
    balanceAmount: 380,
    proxiesRemaining: 20,
    ipCount: 5,
    notes: 'Gói doanh nghiệp',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-02',
    purchasedAmount: 100,
    usedAmount: 30,
    balanceAmount: 70,
    proxiesRemaining: 5,
    ipCount: 1,
  },
  // ... các bản ghi khác (giữ như cũ hoặc thêm thông tin)
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-03',
    purchasedAmount: 200,
    usedAmount: 200,
    balanceAmount: 0,
    proxiesRemaining: 0,
    ipCount: 2,
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-04',
    purchasedAmount: 1000,
    usedAmount: 400,
    balanceAmount: 600,
    proxiesRemaining: 80,
    ipCount: 10,
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-05',
    purchasedAmount: 50,
    usedAmount: 10,
    balanceAmount: 40,
    proxiesRemaining: 2,
    ipCount: 1,
  },
  {
    id: '6',
    name: 'Đỗ Thị F',
    email: 'dothif@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-06',
    purchasedAmount: 0,
    usedAmount: 0,
    balanceAmount: 0,
    proxiesRemaining: 0,
    ipCount: 0,
  },
  {
    id: '7',
    name: 'Vũ Văn G',
    email: 'vuvang@example.com',
    role: 'admin',
    status: true,
    createdAt: '2024-01-07',
    purchasedAmount: 300,
    usedAmount: 150,
    balanceAmount: 150,
    proxiesRemaining: 10,
    ipCount: 3,
  },
  {
    id: '8',
    name: 'Bùi Thị H',
    email: 'buithih@example.com',
    role: 'user',
    status: true,
    createdAt: '2024-01-08',
    purchasedAmount: 120,
    usedAmount: 20,
    balanceAmount: 100,
    proxiesRemaining: 6,
    ipCount: 2,
  },
  {
    id: '9',
    name: 'Phan Văn I',
    email: 'phanvani@example.com',
    role: 'user',
    status: false,
    createdAt: '2024-01-09',
    purchasedAmount: 80,
    usedAmount: 80,
    balanceAmount: 0,
    proxiesRemaining: 0,
    ipCount: 1,
  },
];

// 6. Component chính - click vào row để xem chi tiết
export function UserCategoryView() {
  const [selectedUser, setSelectedUser] = useState<Account | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Handler khi click vào row
  const handleRowClick = (user: Account) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  // Sử dụng baseColumns trực tiếp, không cần column view nữa
  const columns: ColumnDef<Account>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // handlers (bạn có thể replace bằng API thật)
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
        onRowClick={handleRowClick}
        searchKeys={['name', 'email', 'role']}
        searchPlaceholder="Tìm kiếm tài khoản..."
        addDialogTitle="Thêm tài khoản mới"
        addDialogDescription="Điền thông tin để thêm tài khoản mới"
        editDialogTitle="Chỉnh sửa tài khoản"
        editDialogDescription="Cập nhật thông tin tài khoản"
        deleteDialogTitle="Xóa tài khoản"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa tài khoản này?"
      />

      <UserDetailModal
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
}
