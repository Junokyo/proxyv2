// WalletCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useCreateWallet,
  useUpdateWalletBalance,
  useWallets,
} from '@/graphql/hooks/wallets';
import { WalletMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';
import { WalletTransactionsDialog } from './components/WalletTransactionsDialog';

// 1. Schema - chỉ các fields theo yêu cầu
const walletSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID là bắt buộc'),
  coin: z.coerce.number().optional(),
  promotion: z.coerce.number().optional(),
  active: z.boolean().optional(),
});

type WalletFormValues = z.infer<typeof walletSchema>;

// Alias để tương thích với CategoryPage
type Wallet = WalletMutationResponse;

// 2. Các trường form - chỉ userId, coin, promotion, active (id tự động tạo)
const formFields: FormFieldConfig[] = [
  {
    name: 'userId',
    label: 'User ID',
    type: 'text',
    placeholder: 'Nhập User ID',
    required: true,
  },
  {
    name: 'coin',
    label: 'Coin',
    type: 'number',
    placeholder: 'Nhập số coin',
  },
  {
    name: 'promotion',
    label: 'Promotion',
    type: 'number',
    placeholder: 'Nhập số promotion',
  },
  {
    name: 'active',
    label: 'Active',
    type: 'checkbox',
  },
];

// 3. Columns - hiển thị các fields theo yêu cầu
const baseColumns: ColumnDef<Wallet>[] = [
  {
    accessorKey: 'userId',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">User ID</div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.userId}</div>,
  },
  {
    accessorKey: 'coin',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Coin</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.coin}</div>
    ),
  },
  {
    accessorKey: 'promotion',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Promotion
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.promotion}</div>
    ),
  },
  {
    accessorKey: 'active',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Active</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.active ? 'Yes' : 'No'}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Ngày tạo</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.createdAt).toLocaleDateString('vi-VN')}
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Cập nhật cuối
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.updatedAt).toLocaleDateString('vi-VN')}
      </div>
    ),
  },
];

// Component chính
export function WalletCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isTransactionsDialogOpen, setIsTransactionsDialogOpen] =
    useState(false);

  const columns: ColumnDef<Wallet>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch wallets data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: walletsData,
    loading: walletsLoading,
    refetch,
  } = useWallets(
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
  const [createWallet, { loading: creating }] = useCreateWallet({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateWalletBalance, { loading: updating }] = useUpdateWalletBalance({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: WalletFormValues) => {
    await createWallet({
      userId: values.userId,
      coin: values.coin,
      promotion: values.promotion,
      active: values.active,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: WalletFormValues,
  ) => {};

  const handleDelete = async (id: string | number) => {};

  // Map GraphQL response to Wallet type
  const wallets: Wallet[] = useMemo(() => {
    return (
      walletsData?.wallets?.items.map((item) => ({
        id: item.id,
        userId: item.userId,
        coin: item.coin,
        promotion: item.promotion,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        active: item.active,
      })) || []
    );
  }, [walletsData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = walletsData?.wallets?.totalCount;

  // Handle row click to open transactions dialog
  const handleRowClick = (wallet: Wallet) => {
    setSelectedWalletId(wallet.id);
    setSelectedUserId(wallet.userId);
    setIsTransactionsDialogOpen(true);
  };

  return (
    <>
      <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
        <CategoryPage<Wallet>
          data={wallets}
          columns={columns}
          table={table}
          totalCount={totalCount}
          title="Danh mục ví"
          description="Quản lý danh sách ví của người dùng"
          formSchema={walletSchema}
          formFields={formFields}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Tìm kiếm ví..."
          addDialogTitle="Thêm ví mới"
          addDialogDescription="Điền thông tin để tạo ví mới"
          isLoading={walletsLoading || creating || updating}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Wallet Transactions Dialog */}
      {selectedWalletId && (
        <WalletTransactionsDialog
          open={isTransactionsDialogOpen}
          onOpenChange={setIsTransactionsDialogOpen}
          walletId={selectedWalletId}
          userId={selectedUserId || undefined}
        />
      )}
    </>
  );
}
