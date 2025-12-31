// CountryCategoryView.tsx
'use client';

import { useMemo } from 'react';
import {
  useCountries,
  useCreateCountry,
  useDeleteCountry,
  useUpdateCountry,
} from '@/graphql/hooks/countries';
import { CountryMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
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
];

// Component chính
export function CountryCategoryView() {
  const table = useTable({ defaultRowsPerPage: 5 });
  console.log('table', table.page, table.rowsPerPage);

  const columns: ColumnDef<Country>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch countries data using GraphQL query
  const {
    data: countriesData,
    loading: countriesLoading,
    refetch,
  } = useCountries(
    {
      pagination: {
        page: table.page * table.rowsPerPage,
        limit: table.rowsPerPage,
      },
      searchQuery: '',
      sorts: [],
    },
    false,
  );

  // GraphQL mutations
  const [createCountry, { loading: creating }] = useCreateCountry({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateCountry, { loading: updating }] = useUpdateCountry({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteCountry, { loading: deleting }] = useDeleteCountry({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: CountryFormValues) => {
    await createCountry({
      name: values.name,
      code: values.code,
      continent: values.continent,
      region: values.region || undefined,
      status: values.status ?? true,
    });
  };

  const handleEdit = async (id: string | number, values: CountryFormValues) => {
    await updateCountry(String(id), {
      name: values.name,
      code: values.code,
      continent: values.continent,
      region: values.region || undefined,
      status: values.status ?? true,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deleteCountry(String(id));
  };

  // Map GraphQL response to Country type (CountryMutationResponse)
  // Query chỉ trả về id, name, code nên các fields khác dùng default values
  const countries: Country[] = useMemo(() => {
    return (
      countriesData?.countries?.items.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        continent: '', // Default value vì query không trả về
        region: undefined,
        status: true, // Default value
        createdAt: '', // Default value
        proxyCount: undefined,
        ipCount: undefined,
      })) || []
    );
  }, [countriesData]);

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Country>
        data={countries}
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
