// CountryCategoryView.tsx
'use client';

import { useMemo } from 'react';
import {
  useCountries,
  useCreateCountry,
  useDeleteCountry,
  useUpdateCountry,
} from '@/graphql/hooks/countries';
// 2. Import Country type từ GraphQL
import { CountryMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema
const countrySchema = z.object({
  name: z.string().min(1, 'Tên quốc gia là bắt buộc'),
  code: z.string().min(2, 'Mã quốc gia phải có ít nhất 2 ký tự'),
  continent: z.string().min(1, 'Châu lục là bắt buộc'),
  region: z.string().optional(),
  status: z.boolean().optional(),
});

type CountryFormValues = z.infer<typeof countrySchema>;

// Alias để tương thích với CategoryPage
type Country = CountryMutationResponse;

// 3. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên quốc gia',
    type: 'text',
    placeholder: 'Nhập tên quốc gia',
    required: true,
  },
  {
    name: 'code',
    label: 'Mã quốc gia',
    type: 'text',
    placeholder: 'VD: US, VN, JP',
    required: true,
  },
  {
    name: 'continent',
    label: 'Châu lục',
    type: 'select',
    required: true,
    options: [
      { label: 'Châu Á', value: 'Asia' },
      { label: 'Châu Âu', value: 'Europe' },
      { label: 'Châu Mỹ', value: 'Americas' },
      { label: 'Châu Phi', value: 'Africa' },
      { label: 'Châu Đại Dương', value: 'Oceania' },
      { label: 'Châu Nam Cực', value: 'Antarctica' },
    ],
  },
  {
    name: 'region',
    label: 'Khu vực',
    type: 'text',
    placeholder: 'Nhập khu vực (tùy chọn)',
  },
  { name: 'status', label: 'Trạng thái', type: 'checkbox' },
];

// 4. Columns
const baseColumns: ColumnDef<Country>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataGridColumnHeader title="Tên quốc gia" column={column} />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => <DataGridColumnHeader title="Mã" column={column} />,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.code}</div>
    ),
  },
  {
    accessorKey: 'continent',
    header: ({ column }) => (
      <DataGridColumnHeader title="Châu lục" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.continent}</div>,
  },
  {
    accessorKey: 'region',
    header: ({ column }) => (
      <DataGridColumnHeader title="Khu vực" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.region || '-'}</div>,
  },
  {
    accessorKey: 'proxyCount',
    header: ({ column }) => (
      <DataGridColumnHeader title="Số Proxy" column={column} />
    ),
    cell: ({ row }) => (
      <div>{row.original.proxyCount?.toLocaleString() || 0}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataGridColumnHeader title="Ngày tạo" column={column} />
    ),
    cell: ({ row }) => <div>{row.original.createdAt}</div>,
  },
];

// Component chính
export function CountryCategoryView() {
  // GraphQL hooks với Bearer token header tự động
  const {
    data,
    loading: countriesLoading,
    refetch,
  } = useCountries({
    filter: {
      logicalOperator: 'AND',
      filters: [
        {
          field: 'name',
          operator: 'CONTAINS',
          value: '',
        },
      ],
    },
    sorts: [
      {
        field: 'name',
        order: 'ASC',
      },
    ],
    pagination: {
      page: 1,
      limit: 10,
    },
  });

  const [createCountry, { loading: creating }] = useCreateCountry();

  const [updateCountry, { loading: updating }] = useUpdateCountry();

  const [deleteCountry, { loading: deleting }] = useDeleteCountry();

  const columns: ColumnDef<Country>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: CountryFormValues) => {
    await createCountry({
      variables: {
        input: {
          name: values.name,
          code: values.code,
          continent: values.continent,
          region: values.region || undefined,
          status: values.status || false,
        },
      },
      onSuccess: () => refetch(),
    });
  };

  const handleEdit = async (id: string | number, values: CountryFormValues) => {
    await updateCountry({
      variables: {
        id: String(id),
        input: {
          name: values.name,
          code: values.code,
          continent: values.continent,
          region: values.region || undefined,
          status: values.status,
        },
      },
      onSuccess: () => refetch(),
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteCountry({
      variables: { id: String(id) },
      onSuccess: () => refetch(),
    });
  };

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Country>
        data={
          data?.countries?.items.map(
            (item: { id: string; name: string; code: string }) => ({
              ...item,
              continent: '', // Placeholder since query doesn't return this
              region: '', // Placeholder since query doesn't return this
              status: true, // Placeholder since query doesn't return this
              createdAt: '', // Placeholder since query doesn't return this
            }),
          ) || []
        }
        columns={columns}
        title="Danh mục quốc gia"
        description="Quản lý danh sách quốc gia và proxy"
        formSchema={countrySchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['name', 'code']}
        searchPlaceholder="Tìm kiếm quốc gia..."
        addDialogTitle="Thêm quốc gia mới"
        addDialogDescription="Điền thông tin để thêm quốc gia mới"
        editDialogTitle="Chỉnh sửa quốc gia"
        editDialogDescription="Cập nhật thông tin quốc gia"
        deleteDialogTitle="Xóa quốc gia"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa quốc gia này?"
        isLoading={countriesLoading || creating || updating || deleting}
      />
    </div>
  );
}
