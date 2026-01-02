// ProxyProviderCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useProxyProviders,
  useCreateProxyProvider,
  useDeleteProxyProvider,
  useUpdateProxyProvider,
} from '@/graphql/hooks/proxy-providers';
import { ProxyProviderMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema
const proxyProviderSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên nhà cung cấp là bắt buộc'),
  server: z.string().min(1, 'Server là bắt buộc'),
  apiKey: z.string().min(1, 'API Key là bắt buộc'),
  userName: z.string().min(1, 'Tên người dùng là bắt buộc'),
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
  apiType: z.number().min(0, 'API Type phải là số nguyên dương'),
});

type ProxyProviderFormValues = z.infer<typeof proxyProviderSchema>;

// Alias để tương thích với CategoryPage
type ProxyProvider = ProxyProviderMutationResponse;

// 3. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên nhà cung cấp',
    type: 'text',
    placeholder: 'Nhập tên nhà cung cấp',
    required: true,
  },
  {
    name: 'server',
    label: 'Server',
    type: 'text',
    placeholder: 'VD: server.example.com',
    required: true,
  },
  {
    name: 'apiKey',
    label: 'API Key',
    type: 'text',
    placeholder: 'Nhập API Key',
    required: true,
  },
  {
    name: 'userName',
    label: 'Tên người dùng',
    type: 'text',
    placeholder: 'Nhập tên người dùng',
    required: true,
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: 'password',
    placeholder: 'Nhập mật khẩu',
    required: true,
  },
  {
    name: 'apiType',
    label: 'Loại API',
    type: 'number',
    placeholder: 'VD: 1, 2, 3',
    required: true,
  },
];

// 4. Columns
const baseColumns: ColumnDef<ProxyProvider>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên nhà cung cấp
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'server',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Server</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.server}</div>
    ),
  },
  {
    accessorKey: 'apiType',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Loại API
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.apiType}</div>
    ),
  },
];

// Component chính
export function ProxyProviderCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<ProxyProvider>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch proxy providers data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: proxyProvidersData,
    loading: proxyProvidersLoading,
    refetch,
  } = useProxyProviders(
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
  const [createProxyProvider, { loading: creating }] = useCreateProxyProvider({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateProxyProvider, { loading: updating }] = useUpdateProxyProvider({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteProxyProvider, { loading: deleting }] = useDeleteProxyProvider({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: ProxyProviderFormValues) => {
    await createProxyProvider({
      name: values.name,
      server: values.server,
      apiKey: values.apiKey,
      userName: values.userName,
      password: values.password,
      apiType: values.apiType,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: ProxyProviderFormValues,
  ) => {
    await updateProxyProvider(String(id), {
      name: values.name,
      server: values.server,
      apiKey: values.apiKey,
      userName: values.userName,
      password: values.password,
      apiType: values.apiType,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteProxyProvider(String(id));
  };

  // Map GraphQL response to ProxyProvider type (ProxyProviderMutationResponse)
  const proxyProviders: ProxyProvider[] = useMemo(() => {
    return (
      proxyProvidersData?.proxyProviders?.items.map((item) => ({
        id: item.id,
        name: item.name,
        server: item.server,
        apiKey: item.apiKey,
        userName: item.userName,
        password: item.password,
        apiType: item.apiType,
      })) || []
    );
  }, [proxyProvidersData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = proxyProvidersData?.proxyProviders?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<ProxyProvider>
        data={proxyProviders}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục nhà cung cấp proxy"
        description="Quản lý danh sách nhà cung cấp proxy"
        formSchema={proxyProviderSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm nhà cung cấp proxy..."
        addDialogTitle="Thêm nhà cung cấp proxy mới"
        addDialogDescription="Điền thông tin để thêm nhà cung cấp proxy mới"
        editDialogTitle="Chỉnh sửa nhà cung cấp proxy"
        editDialogDescription="Cập nhật thông tin nhà cung cấp proxy"
        deleteDialogTitle="Xóa nhà cung cấp proxy"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa nhà cung cấp proxy này?"
        isLoading={
          proxyProvidersLoading || creating || updating || deleting
        }
      />
    </div>
  );
}

