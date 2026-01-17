// BankAccountCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BankAccountMutationResponse,
  useBankAccounts,
  useCreateBankAccount,
  useDeleteBankAccount,
  useUpdateBankAccount,
} from '@/graphql/hooks/bank-accounts';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { Badge } from '@/components/ui/badge';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema
const bankAccountSchema = z.object({
  id: z.string().optional(),
  bankCode: z.string().min(1, 'Mã ngân hàng là bắt buộc'),
  bankName: z.string().min(1, 'Tên ngân hàng là bắt buộc'),
  bankLogoUrl: z.string().optional().nullable(),
  apiType: z.string().optional().nullable(),
  accountNumber: z.string().min(1, 'Số tài khoản là bắt buộc'),
  accountName: z.string().min(1, 'Tên chủ tài khoản là bắt buộc'),
  branch: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  isDefault: z.boolean().optional().nullable(),
  note: z.string().optional().nullable(),
  sortOrder: z.coerce.number().optional().nullable(),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

// Alias để tương thích với CategoryPage
type BankAccount = BankAccountMutationResponse;

// 2. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'bankCode',
    label: 'Mã ngân hàng',
    type: 'text',
    placeholder: 'VD: VCB, TCB, BIDV',
    required: true,
  },
  {
    name: 'bankName',
    label: 'Tên ngân hàng',
    type: 'text',
    placeholder: 'VD: Vietcombank, Techcombank',
    required: true,
  },
  {
    name: 'bankLogoUrl',
    label: 'URL Logo ngân hàng',
    type: 'text',
    placeholder: 'https://example.com/logo.png',
    required: false,
  },
  {
    name: 'apiType',
    label: 'Loại API tích hợp',
    type: 'text',
    placeholder: 'manual, casso, sepay, vietqr',
    required: false,
  },
  {
    name: 'accountNumber',
    label: 'Số tài khoản',
    type: 'text',
    placeholder: '1234567890',
    required: true,
  },
  {
    name: 'accountName',
    label: 'Tên chủ tài khoản',
    type: 'text',
    placeholder: 'NGUYEN VAN A',
    required: true,
  },
  {
    name: 'branch',
    label: 'Chi nhánh',
    type: 'text',
    placeholder: 'Chi nhánh ngân hàng',
    required: false,
  },
  {
    name: 'active',
    label: 'Trạng thái hoạt động',
    type: 'checkbox',
    required: false,
  },
  {
    name: 'isDefault',
    label: 'Tài khoản mặc định',
    type: 'checkbox',
    required: false,
  },
  {
    name: 'note',
    label: 'Ghi chú',
    type: 'textarea',
    placeholder: 'Ghi chú nội bộ',
    required: false,
  },
  {
    name: 'sortOrder',
    label: 'Thứ tự hiển thị',
    type: 'number',
    placeholder: '0',
    required: false,
  },
];

// 3. Columns
const baseColumns: ColumnDef<BankAccount>[] = [
  {
    accessorKey: 'bankCode',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Mã ngân hàng
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm font-medium">
        {row.original.bankCode}
      </div>
    ),
  },
  {
    accessorKey: 'bankName',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên ngân hàng
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.bankName}</div>
    ),
  },
  {
    accessorKey: 'accountNumber',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Số tài khoản
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.accountNumber}</div>
    ),
  },
  {
    accessorKey: 'accountName',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên chủ TK
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.accountName}</div>,
  },
  {
    accessorKey: 'apiType',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">API Type</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.apiType || 'manual'}
      </div>
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
      <Badge variant={row.original.active ? 'primary' : 'secondary'}>
        {row.original.active ? 'Hoạt động' : 'Tạm dừng'}
      </Badge>
    ),
  },
  {
    accessorKey: 'isDefault',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Mặc định</div>
    ),
    enableSorting: false,
    cell: ({ row }) =>
      row.original.isDefault ? (
        <Badge variant="primary">Mặc định</Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
  },
];

// Component chính
export function BankAccountCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 10,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<BankAccount>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch bank accounts data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: bankAccountsData,
    loading: bankAccountsLoading,
    refetch,
  } = useBankAccounts(
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
  const [createBankAccount, { loading: creating }] = useCreateBankAccount({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateBankAccount, { loading: updating }] = useUpdateBankAccount({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteBankAccount, { loading: deleting }] = useDeleteBankAccount({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: BankAccountFormValues) => {
    await createBankAccount({
      bankCode: values.bankCode,
      bankName: values.bankName,
      bankLogoUrl: values.bankLogoUrl || null,
      apiType: values.apiType || 'manual',
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      branch: values.branch || null,
      isDefault: values.isDefault || false,
      note: values.note || null,
      sortOrder: values.sortOrder || 0,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: BankAccountFormValues,
  ) => {
    await updateBankAccount(String(id), {
      bankCode: values.bankCode,
      bankName: values.bankName,
      bankLogoUrl: values.bankLogoUrl || null,
      apiType: values.apiType || null,
      accountNumber: values.accountNumber,
      accountName: values.accountName,
      branch: values.branch || null,
      active: values.active !== undefined ? values.active : null,
      isDefault: values.isDefault || null,
      note: values.note || null,
      sortOrder: values.sortOrder || null,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteBankAccount(String(id));
  };

  // Map GraphQL response to BankAccount type
  const bankAccounts: BankAccount[] = useMemo(() => {
    return bankAccountsData?.bankAccounts?.items || [];
  }, [bankAccountsData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = bankAccountsData?.bankAccounts?.totalCount;

  // Transform initial values for edit form (convert boolean to boolean, null to null)
  const transformInitialValues = (item: BankAccount): BankAccountFormValues => {
    return {
      id: item.id,
      bankCode: item.bankCode,
      bankName: item.bankName,
      bankLogoUrl: item.bankLogoUrl,
      apiType: item.apiType,
      accountNumber: item.accountNumber,
      accountName: item.accountName,
      branch: item.branch,
      active: item.active,
      isDefault: item.isDefault,
      note: item.note,
      sortOrder: item.sortOrder,
    };
  };

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<BankAccount>
        data={bankAccounts}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục tài khoản ngân hàng"
        description="Quản lý danh sách tài khoản ngân hàng nhận tiền nạp"
        formSchema={bankAccountSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm ngân hàng, số tài khoản..."
        addDialogTitle="Thêm tài khoản ngân hàng mới"
        addDialogDescription="Điền thông tin để thêm tài khoản ngân hàng mới"
        editDialogTitle="Chỉnh sửa tài khoản ngân hàng"
        editDialogDescription="Cập nhật thông tin tài khoản ngân hàng"
        deleteDialogTitle="Xóa tài khoản ngân hàng"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?"
        isLoading={bankAccountsLoading || creating || updating || deleting}
        transformInitialValues={transformInitialValues}
      />
    </div>
  );
}
