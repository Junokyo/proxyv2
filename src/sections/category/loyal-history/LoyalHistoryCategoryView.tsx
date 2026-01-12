// LoyalHistoryCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '@/auth/store/auth.store';
import {
  useLoyalHistories,
  useCreateLoyalHistory,
  useDeleteLoyalHistory,
  useUpdateLoyalHistory,
} from '@/graphql/hooks/loyal-histories';
import { LoyalHistoryMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema
const loyalHistorySchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID là bắt buộc'),
  loyalLevelId: z.string().min(1, 'Loyal Level ID là bắt buộc'),
  coin: z.number().min(0, 'Coin phải lớn hơn hoặc bằng 0'),
  dateInput: z.string().optional(),
});

type LoyalHistoryFormValues = z.infer<typeof loyalHistorySchema>;

// Alias để tương thích với CategoryPage
type LoyalHistory = LoyalHistoryMutationResponse;

// 3. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'userId',
    label: 'User ID',
    type: 'text',
    placeholder: 'Nhập User ID',
    required: true,
  },
  {
    name: 'loyalLevelId',
    label: 'Loyal Level ID',
    type: 'text',
    placeholder: 'Nhập Loyal Level ID',
    required: true,
  },
  {
    name: 'coin',
    label: 'Coin',
    type: 'number',
    placeholder: 'Nhập số coin',
    required: true,
  },
];

// 4. Columns
const baseColumns: ColumnDef<LoyalHistory>[] = [
  {
    accessorKey: 'userId',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        User ID
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.userId}</div>
    ),
  },
  {
    accessorKey: 'loyalLevelId',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Loyal Level ID
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.loyalLevelId}</div>
    ),
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
    accessorKey: 'dateInput',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Ngày nhập
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.dateInput}</div>
    ),
  },
];

// Component chính
export function LoyalHistoryCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Get userId from auth store to trigger refetch when it changes
  const userId = useAuthStore((state) => state.user?.id);

  const columns: ColumnDef<LoyalHistory>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch loyal histories data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  // userId is automatically included from auth store in the hook
  const {
    data: loyalHistoriesData,
    loading: loyalHistoriesLoading,
    refetch,
  } = useLoyalHistories(
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

  // Refetch when pagination, search, or userId changes
  useEffect(() => {
    refetch();
  }, [table.page, table.rowsPerPage, searchQuery, userId, refetch]);

  // GraphQL mutations
  const [createLoyalHistory, { loading: creating }] = useCreateLoyalHistory({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateLoyalHistory, { loading: updating }] = useUpdateLoyalHistory({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteLoyalHistory, { loading: deleting }] = useDeleteLoyalHistory({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: LoyalHistoryFormValues) => {
    await createLoyalHistory({
      userId: values.userId,
      loyalLevelId: values.loyalLevelId,
      coin: values.coin,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: LoyalHistoryFormValues,
  ) => {
    await updateLoyalHistory(String(id), {
      loyalLevelId: values.loyalLevelId,
      coin: values.coin,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteLoyalHistory(String(id));
  };

  // Map GraphQL response to LoyalHistory type
  const loyalHistories: LoyalHistory[] = useMemo(() => {
    return (
      loyalHistoriesData?.loyalHistories?.items.map((item) => ({
        id: item.id,
        userId: item.userId,
        loyalLevelId: item.loyalLevelId,
        coin: item.coin,
        dateInput: item.dateInput,
      })) || []
    );
  }, [loyalHistoriesData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = loyalHistoriesData?.loyalHistories?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<LoyalHistory>
        data={loyalHistories}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục lịch sử loyal"
        description="Quản lý danh sách lịch sử loyal"
        formSchema={loyalHistorySchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm lịch sử loyal..."
        addDialogTitle="Thêm lịch sử loyal mới"
        addDialogDescription="Điền thông tin để thêm lịch sử loyal mới"
        editDialogTitle="Chỉnh sửa lịch sử loyal"
        editDialogDescription="Cập nhật thông tin lịch sử loyal"
        deleteDialogTitle="Xóa lịch sử loyal"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa lịch sử loyal này?"
        isLoading={
          loyalHistoriesLoading || creating || updating || deleting
        }
      />
    </div>
  );
}

