// TopupCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useTopups,
  useCreateTopup,
  useDeleteTopup,
  useUpdateTopup,
} from '@/graphql/hooks/topups';
import { TopupMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - id, name, max, percent
const topupSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên khuyến mãi là bắt buộc'),
  max: z.number().min(0, 'Số tiền tối đa phải lớn hơn hoặc bằng 0'),
  percent: z.number().min(0, 'Phần trăm phải lớn hơn hoặc bằng 0'),
});

type TopupFormValues = z.infer<typeof topupSchema>;

// Alias để tương thích với CategoryPage
type Topup = TopupMutationResponse;

// 3. Các trường form - name, max, percent (id tự động tạo)
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên khuyến mãi',
    type: 'text',
    placeholder: 'Nhập tên khuyến mãi',
    required: true,
  },
  {
    name: 'max',
    label: 'Số tiền tối đa',
    type: 'number',
    placeholder: 'Nhập số tiền tối đa',
    required: true,
  },
  {
    name: 'percent',
    label: 'Phần trăm (%)',
    type: 'number',
    placeholder: 'Nhập phần trăm khuyến mãi',
    required: true,
  },
];

// 4. Columns - simplified headers without sorting
const baseColumns: ColumnDef<Topup>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên khuyến mãi
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'max',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Số tiền tối đa
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(row.original.max)}
      </div>
    ),
  },
  {
    accessorKey: 'percent',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Phần trăm (%)
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-medium">{row.original.percent}%</div>
    ),
  },
];

// Component chính
export function TopupCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<Topup>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch topups data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: topupsData,
    loading: topupsLoading,
    refetch,
  } = useTopups(
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
  const [createTopup, { loading: creating }] = useCreateTopup({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateTopup, { loading: updating }] = useUpdateTopup({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteTopup, { loading: deleting }] = useDeleteTopup({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations (id, name, max, percent)
  const handleAdd = async (values: TopupFormValues) => {
    await createTopup({
      name: values.name,
      max: values.max,
      percent: values.percent,
    });
  };

  const handleEdit = async (id: string | number, values: TopupFormValues) => {
    await updateTopup(String(id), {
      name: values.name,
      max: values.max,
      percent: values.percent,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteTopup(String(id));
  };

  // Map GraphQL response to Topup type (TopupMutationResponse)
  // Query chỉ trả về id, name, max, percent
  const topups: Topup[] = useMemo(() => {
    return (
      topupsData?.topups?.items.map((item) => ({
        id: item.id,
        name: item.name,
        max: item.max,
        percent: item.percent,
      })) || []
    );
  }, [topupsData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = topupsData?.topups?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Topup>
        data={topups}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục khuyến mãi nạp"
        description="Quản lý danh sách khuyến mãi nạp tiền"
        formSchema={topupSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm khuyến mãi..."
        addDialogTitle="Thêm khuyến mãi mới"
        addDialogDescription="Điền thông tin để thêm khuyến mãi nạp mới"
        editDialogTitle="Chỉnh sửa khuyến mãi"
        editDialogDescription="Cập nhật thông tin khuyến mãi nạp"
        deleteDialogTitle="Xóa khuyến mãi"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa khuyến mãi này?"
        isLoading={topupsLoading || creating || updating || deleting}
      />
    </div>
  );
}

