// UserCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useUsers,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from '@/graphql/hooks/users';
import { UserMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';
import {
  BalanceActionsPopover,
  BalanceOperationsDialog,
} from './components';

// 1. Schema - matching GraphQL mutations
// Note: roles is handled as string in form (comma-separated) and converted to array
const userSchema = z.object({
  id: z.string().optional(),
  providerId: z.string().min(1, 'Provider ID là bắt buộc'),
  username: z.string().min(1, 'Tên người dùng là bắt buộc'),
  email: z.string().email('Email không hợp lệ'),
  balance: z.number().optional().or(z.string().transform((val) => (val === '' ? undefined : Number(val)))),
  roles: z.string().optional(), // Stored as comma-separated string in form
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  loyalLevelId: z.string().optional(),
  active: z.boolean().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

// Alias để tương thích với CategoryPage
type User = UserMutationResponse;

// 2. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'providerId',
    label: 'Provider ID',
    type: 'text',
    placeholder: 'Nhập Provider ID',
    required: true,
  },
  {
    name: 'username',
    label: 'Tên người dùng',
    type: 'text',
    placeholder: 'Nhập tên người dùng',
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
    name: 'balance',
    label: 'Số dư',
    type: 'number',
    placeholder: 'Nhập số dư',
    required: false,
  },
  {
    name: 'roles',
    label: 'Vai trò',
    type: 'text',
    placeholder: 'Nhập vai trò (phân cách bằng dấu phẩy)',
    required: false,
  },
  {
    name: 'phone',
    label: 'Số điện thoại',
    type: 'text',
    placeholder: 'Nhập số điện thoại',
    required: false,
  },
  {
    name: 'avatarUrl',
    label: 'URL Avatar',
    type: 'text',
    placeholder: 'Nhập URL avatar',
    required: false,
  },
  {
    name: 'loyalLevelId',
    label: 'Loyal Level ID',
    type: 'text',
    placeholder: 'Nhập Loyal Level ID',
    required: false,
  },
  {
    name: 'active',
    label: 'Kích hoạt',
    type: 'checkbox',
    required: false,
  },
];

// 3. Columns
const baseColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên người dùng
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.username}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Email</div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: 'balance',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Số dư</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div>{row.original.balance?.toLocaleString('vi-VN') || '0'}</div>
    ),
  },
  {
    accessorKey: 'roles',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Vai trò</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div>{row.original.roles?.join(', ') || '-'}</div>
    ),
  },
  {
    accessorKey: 'active',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Trạng thái
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div>
        {row.original.active ? (
          <span className="text-green-600">Hoạt động</span>
        ) : (
          <span className="text-red-600">Không hoạt động</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Ngày tạo
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString('vi-VN')
          : '-'}
      </div>
    ),
  },
];

// Component chính
export function UserCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [balanceDialogOpen, setBalanceDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [operationType, setOperationType] = useState<'add' | 'deduct' | null>(
    null
  );

  const columns: ColumnDef<User>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch users data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: usersData,
    loading: usersLoading,
    refetch,
  } = useUsers(
    {
      pagination: {
        page: table.page,
        limit: table.rowsPerPage,
      },
      searchQuery: searchQuery || undefined,
      sorts: [],
    },
    false,
  );

  // Refetch when pagination or search changes
  useEffect(() => {
    refetch();
  }, [table.page, table.rowsPerPage, searchQuery, refetch]);

  // GraphQL mutations
  const [createUser, { loading: creating }] = useCreateUser({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateUser, { loading: updating }] = useUpdateUser({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteUser, { loading: deleting }] = useDeleteUser({
    onSuccess: () => {
      refetch();
    },
  });

  // Helper function to convert roles string to array
  const parseRoles = (rolesString?: string): string[] | undefined => {
    if (!rolesString || rolesString.trim() === '') return undefined;
    return rolesString.split(',').map((r) => r.trim()).filter((r) => r.length > 0);
  };

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: UserFormValues) => {
    await createUser({
      providerId: values.providerId,
      username: values.username,
      email: values.email,
      balance: typeof values.balance === 'number' ? values.balance : undefined,
      roles: parseRoles(values.roles),
      phone: values.phone || undefined,
      avatarUrl: values.avatarUrl || undefined,
      loyalLevelId: values.loyalLevelId || undefined,
      active: values.active,
    });
  };

  const handleEdit = async (id: string | number, values: UserFormValues) => {
    await updateUser(String(id), {
      username: values.username,
      email: values.email,
      phone: values.phone || undefined,
      avatarUrl: values.avatarUrl || undefined,
      loyalLevelId: values.loyalLevelId || undefined,
      active: values.active,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteUser(String(id));
  };

  // Map GraphQL response to User type (UserMutationResponse)
  // Note: We keep roles as array for display, but will convert to string for form
  const users: User[] = useMemo(() => {
    return (
      usersData?.users?.items.map((item) => ({
        id: item.id,
        providerId: item.providerId,
        username: item.username,
        email: item.email,
        balance: item.balance,
        roles: item.roles,
        lastLogin: item.lastLogin,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        phone: item.phone,
        avatarUrl: item.avatarUrl,
        loyalLevelId: item.loyalLevelId,
        active: item.active,
      })) || []
    );
  }, [usersData]);

  // Transform user data for form (convert roles array to comma-separated string)
  const transformUserForForm = (user: User): Record<string, any> => {
    return {
      ...user,
      roles: user.roles && user.roles.length > 0 ? user.roles.join(', ') : '',
      balance: user.balance ?? '',
    };
  };

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = usersData?.users?.totalCount;

  // Handle balance operations
  const handleAddBalance = (user: User) => {
    setSelectedUserId(user.id);
    setSelectedUsername(user.username);
    setOperationType('add');
    setBalanceDialogOpen(true);
  };

  const handleDeductBalance = (user: User) => {
    setSelectedUserId(user.id);
    setSelectedUsername(user.username);
    setOperationType('deduct');
    setBalanceDialogOpen(true);
  };

  const handleBalanceOperationSuccess = () => {
    refetch();
  };

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<User>
        data={users}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục người dùng"
        description="Quản lý danh sách người dùng"
        formSchema={userSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm người dùng..."
        addDialogTitle="Thêm người dùng mới"
        addDialogDescription="Điền thông tin để thêm người dùng mới"
        editDialogTitle="Chỉnh sửa người dùng"
        editDialogDescription="Cập nhật thông tin người dùng"
        deleteDialogTitle="Xóa người dùng"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa người dùng này?"
        isLoading={usersLoading || creating || updating || deleting}
        transformInitialValues={transformUserForForm}
        customActions={(user) => (
          <BalanceActionsPopover
            onAddBalance={() => handleAddBalance(user)}
            onDeductBalance={() => handleDeductBalance(user)}
          />
        )}
      />

      <BalanceOperationsDialog
        open={balanceDialogOpen}
        onOpenChange={setBalanceDialogOpen}
        userId={selectedUserId}
        username={selectedUsername}
        operationType={operationType}
        onSuccess={handleBalanceOperationSuccess}
      />
    </div>
  );
}
