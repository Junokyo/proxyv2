// LoyalCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useLoyals,
  useCreateLoyal,
  useDeleteLoyal,
  useUpdateLoyal,
} from '@/graphql/hooks/loyals';
import { LoyalMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - chỉ id, name, value
const loyalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên hạng thành viên là bắt buộc'),
  value: z.string().min(1, 'Giá trị là bắt buộc'),
});

type LoyalFormValues = z.infer<typeof loyalSchema>;

// Alias để tương thích với CategoryPage
type Loyal = LoyalMutationResponse;

// 3. Các trường form - chỉ name, value (id tự động tạo)
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên hạng thành viên',
    type: 'text',
    placeholder: 'Nhập tên hạng thành viên',
    required: true,
  },
  {
    name: 'value',
    label: 'Giá trị',
    type: 'text',
    placeholder: 'Nhập giá trị',
    required: true,
  },
];

// 4. Columns - simplified headers without sorting
const baseColumns: ColumnDef<Loyal>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên hạng thành viên
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'value',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Giá trị</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.value}</div>
    ),
  },
];

// Component chính
export function LoyalCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<Loyal>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch loyals data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: loyalsData,
    loading: loyalsLoading,
    refetch,
  } = useLoyals(
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
  const [createLoyal, { loading: creating }] = useCreateLoyal({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateLoyal, { loading: updating }] = useUpdateLoyal({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteLoyal, { loading: deleting }] = useDeleteLoyal({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations (chỉ id, name, value)
  const handleAdd = async (values: LoyalFormValues) => {
    await createLoyal({
      name: values.name,
      value: values.value,
    });
  };

  const handleEdit = async (id: string | number, values: LoyalFormValues) => {
    await updateLoyal(String(id), {
      name: values.name,
      value: values.value,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteLoyal(String(id));
  };

  // Map GraphQL response to Loyal type (LoyalMutationResponse)
  // Query chỉ trả về id, name, value nên các fields khác dùng default values
  const loyals: Loyal[] = useMemo(() => {
    return (
      loyalsData?.loyals?.items.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
      })) || []
    );
  }, [loyalsData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = loyalsData?.loyals?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Loyal>
        data={loyals}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục hạng thành viên"
        description="Quản lý danh sách hạng thành viên"
        formSchema={loyalSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm hạng thành viên..."
        addDialogTitle="Thêm hạng thành viên mới"
        addDialogDescription="Điền thông tin để thêm hạng thành viên mới"
        editDialogTitle="Chỉnh sửa hạng thành viên"
        editDialogDescription="Cập nhật thông tin hạng thành viên"
        deleteDialogTitle="Xóa hạng thành viên"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa hạng thành viên này?"
        isLoading={loyalsLoading || creating || updating || deleting}
      />
    </div>
  );
}

