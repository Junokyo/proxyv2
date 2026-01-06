// ProxyTypeCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useProxyTypes,
  useCreateProxyType,
  useDeleteProxyType,
  useUpdateProxyType,
} from '@/graphql/hooks/proxy-types';
import { ProxyTypeMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - chỉ id, name, type
const proxyTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên loại proxy là bắt buộc'),
  type: z.string().min(1, 'Loại proxy là bắt buộc'),
});

type ProxyTypeFormValues = z.infer<typeof proxyTypeSchema>;

// Alias để tương thích với CategoryPage
type ProxyType = ProxyTypeMutationResponse;

// 3. Các trường form - chỉ name, type (id tự động tạo)
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên loại proxy',
    type: 'text',
    placeholder: 'Nhập tên loại proxy',
    required: true,
  },
  {
    name: 'type',
    label: 'Loại proxy',
    type: 'text',
    placeholder: 'VD: HTTP, HTTPS, SOCKS5',
    required: true,
  },
];

// 4. Columns - simplified headers without sorting
const baseColumns: ColumnDef<ProxyType>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên loại proxy
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'type',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Loại</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.type}</div>
    ),
  },
];

// Component chính
export function ProxyTypeCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<ProxyType>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch proxy types data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: proxyTypesData,
    loading: proxyTypesLoading,
    refetch,
  } = useProxyTypes(
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
  const [createProxyType, { loading: creating }] = useCreateProxyType({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateProxyType, { loading: updating }] = useUpdateProxyType({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteProxyType, { loading: deleting }] = useDeleteProxyType({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations (chỉ id, name, type)
  const handleAdd = async (values: ProxyTypeFormValues) => {
    await createProxyType({
      name: values.name,
      type: values.type,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: ProxyTypeFormValues,
  ) => {
    await updateProxyType(String(id), {
      name: values.name,
      type: values.type,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteProxyType(String(id));
  };

  // Map GraphQL response to ProxyType type (ProxyTypeMutationResponse)
  // Query chỉ trả về id, name, type nên các fields khác dùng default values
  const proxyTypes: ProxyType[] = useMemo(() => {
    return (
      proxyTypesData?.proxyTypes?.items.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
      })) || []
    );
  }, [proxyTypesData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = proxyTypesData?.proxyTypes?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<ProxyType>
        data={proxyTypes}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục loại proxy"
        description="Quản lý danh sách loại proxy"
        formSchema={proxyTypeSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm loại proxy..."
        addDialogTitle="Thêm loại proxy mới"
        addDialogDescription="Điền thông tin để thêm loại proxy mới"
        editDialogTitle="Chỉnh sửa loại proxy"
        editDialogDescription="Cập nhật thông tin loại proxy"
        deleteDialogTitle="Xóa loại proxy"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa loại proxy này?"
        isLoading={proxyTypesLoading || creating || updating || deleting}
      />
    </div>
  );
}

