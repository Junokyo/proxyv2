// CountryCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - chỉ id, name, code
const countrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên quốc gia là bắt buộc'),
  code: z.string().min(2, 'Mã quốc gia phải có ít nhất 2 ký tự'),
});

type CountryFormValues = z.infer<typeof countrySchema>;

// Alias để tương thích với CategoryPage
type Country = CountryMutationResponse;

// 3. Các trường form - chỉ name, code (id tự động tạo)
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

// 4. Columns - simplified headers without sorting
const baseColumns: ColumnDef<Country>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Tên quốc gia
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: 'code',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Mã</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.code}</div>
    ),
  },
];

// Component chính
export function CountryCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<Country>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch countries data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: countriesData,
    loading: countriesLoading,
    refetch,
  } = useCountries(
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

  // Handlers - sử dụng GraphQL mutations (chỉ id, name, code)
  const handleAdd = async (values: CountryFormValues) => {
    await createCountry({
      name: values.name,
      code: values.code,
      continent: '', // Default value - required by mutation but not in form
      region: undefined,
      status: true,
    });
  };

  const handleEdit = async (id: string | number, values: CountryFormValues) => {
    await updateCountry(String(id), {
      name: values.name,
      code: values.code,
      continent: '', // Default value - required by mutation but not in form
      region: undefined,
      status: true,
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

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = countriesData?.countries?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Country>
        data={countries}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục quốc gia"
        description="Quản lý danh sách quốc gia và proxy"
        formSchema={countrySchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
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
