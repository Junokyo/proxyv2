// PromotionCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useCreatePromotion,
  useDeletePromotion,
  usePromotions,
  useUpdatePromotion,
} from '@/graphql/hooks/promotions';
import { PromotionMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { CalendarDays } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import useTable from '@/hooks/use-table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - id, name, type, max, percent, fromDate, toDate
const promotionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tên khuyến mãi là bắt buộc'),
  type: z.coerce.number().int().min(0, 'Loại phải là số nguyên dương'),
  max: z.coerce.number().min(0, 'Giá trị tối đa phải lớn hơn hoặc bằng 0'),
  percent: z.coerce.number().min(0).max(100, 'Phần trăm phải từ 0 đến 100'),
  fromDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
  toDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
});

type PromotionFormValues = z.infer<typeof promotionSchema>;

// Alias để tương thích với CategoryPage
type Promotion = PromotionMutationResponse;

// 3. Các trường form
const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Tên khuyến mãi',
    type: 'text',
    placeholder: 'Nhập tên khuyến mãi',
    required: true,
  },
  {
    name: 'type',
    label: 'Loại',
    type: 'number',
    placeholder: 'Nhập loại',
    required: true,
  },
  {
    name: 'max',
    label: 'Giá trị tối đa',
    type: 'number',
    placeholder: 'Nhập giá trị tối đa',
    required: true,
  },
  {
    name: 'percent',
    label: 'Phần trăm (%)',
    type: 'number',
    placeholder: 'Nhập phần trăm',
    required: true,
  },
  {
    name: 'fromDate',
    label: 'Ngày bắt đầu',
    type: 'date',
    placeholder: 'Chọn ngày bắt đầu',
    required: true,
  },
  {
    name: 'toDate',
    label: 'Ngày kết thúc',
    type: 'date',
    placeholder: 'Chọn ngày kết thúc',
    required: true,
  },
];

// 4. Columns
const baseColumns: ColumnDef<Promotion>[] = [
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
    accessorKey: 'type',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Loại</div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="text-sm">{row.original.type}</div>,
  },
  {
    accessorKey: 'max',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Giá trị tối đa
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">{row.original.max.toLocaleString()}</div>
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
    cell: ({ row }) => <div className="text-sm">{row.original.percent}%</div>,
  },
  {
    accessorKey: 'fromDate',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Ngày bắt đầu
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="text-sm">{row.original.fromDate}</div>,
  },
  {
    accessorKey: 'toDate',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">
        Ngày kết thúc
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="text-sm">{row.original.toDate}</div>,
  },
];

// Helper function to convert dd/MM/yyyy to yyyy-MM-dd
function convertToISODate(dateStr: string): string {
  if (!dateStr) return '';
  // If already in yyyy-MM-dd format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Convert from dd/MM/yyyy to yyyy-MM-dd
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
}

// Component chính
export function PromotionCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [appliedFilterFromDate, setAppliedFilterFromDate] = useState('');
  const [appliedFilterToDate, setAppliedFilterToDate] = useState('');
  const [fromDatePickerOpen, setFromDatePickerOpen] = useState(false);
  const [toDatePickerOpen, setToDatePickerOpen] = useState(false);

  // Handle search - apply both search query and date filters
  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue);
    // Also apply date filters when search is triggered
    setAppliedFilterFromDate(filterFromDate);
    setAppliedFilterToDate(filterToDate);
  };

  const columns: ColumnDef<Promotion>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Build filter array for date range (convert dd/MM/yyyy to yyyy-MM-dd for API)
  // Only use applied filter dates (not the input values)
  const filters = useMemo(() => {
    const filterArray = [];
    if (appliedFilterFromDate) {
      const isoDate = convertToISODate(appliedFilterFromDate);
      if (isoDate) {
        filterArray.push({
          field: 'fromDate',
          operator: 'GTE' as const,
          value: isoDate,
        });
      }
    }
    if (appliedFilterToDate) {
      const isoDate = convertToISODate(appliedFilterToDate);
      if (isoDate) {
        filterArray.push({
          field: 'toDate',
          operator: 'LTE' as const,
          value: isoDate,
        });
      }
    }
    return filterArray.length > 0
      ? {
          filters: filterArray,
          logicalOperator: 'AND' as const,
        }
      : undefined;
  }, [appliedFilterFromDate, appliedFilterToDate]);

  // Fetch promotions data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: promotionsData,
    loading: promotionsLoading,
    refetch,
  } = usePromotions(
    {
      pagination: {
        page: table.page,
        limit: table.rowsPerPage,
      },
      searchQuery: searchQuery || undefined,
      sorts: [],
      filter: filters,
    },
    false,
  );

  // Refetch when pagination, search, or applied filters change
  useEffect(() => {
    refetch();
  }, [
    table.page,
    table.rowsPerPage,
    searchQuery,
    appliedFilterFromDate,
    appliedFilterToDate,
    refetch,
  ]);

  // Helper to parse date from dd/MM/yyyy to Date object
  const parseDateFromString = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return undefined;
  };

  // Helper to format Date to dd/MM/yyyy
  const formatDateToString = (date: Date | undefined): string => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // GraphQL mutations
  const [createPromotion, { loading: creating }] = useCreatePromotion({
    onSuccess: () => {
      refetch();
    },
  });

  const [updatePromotion, { loading: updating }] = useUpdatePromotion({
    onSuccess: () => {
      refetch();
    },
  });

  const [deletePromotion, { loading: deleting }] = useDeletePromotion({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: PromotionFormValues) => {
    await createPromotion({
      name: values.name,
      type: values.type,
      max: values.max,
      percent: values.percent,
      fromDate: values.fromDate,
      toDate: values.toDate,
    });
  };

  const handleEdit = async (
    id: string | number,
    values: PromotionFormValues,
  ) => {
    await updatePromotion(String(id), {
      name: values.name,
      type: values.type,
      max: values.max,
      percent: values.percent,
      fromDate: values.fromDate,
      toDate: values.toDate,
    });
  };

  const handleDelete = async (id: string | number) => {
    await deletePromotion(String(id));
  };

  // Map GraphQL response to Promotion type (PromotionMutationResponse)
  const promotions: Promotion[] = useMemo(() => {
    return (
      promotionsData?.promotions?.items.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        max: item.max,
        percent: item.percent,
        fromDate: item.fromDate,
        toDate: item.toDate,
      })) || []
    );
  }, [promotionsData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = promotionsData?.promotions?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Promotion>
        data={promotions}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục khuyến mãi"
        description="Quản lý danh sách khuyến mãi"
        formSchema={promotionSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={handleSearch}
        searchPlaceholder="Tìm kiếm khuyến mãi..."
        addDialogTitle="Thêm khuyến mãi mới"
        addDialogDescription="Điền thông tin để thêm khuyến mãi mới"
        editDialogTitle="Chỉnh sửa khuyến mãi"
        editDialogDescription="Cập nhật thông tin khuyến mãi"
        deleteDialogTitle="Xóa khuyến mãi"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa khuyến mãi này?"
        isLoading={promotionsLoading || creating || updating || deleting}
        toolbarActions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="filter-from-date"
                className="text-sm whitespace-nowrap"
              >
                Từ ngày:
              </Label>
              <div className="flex items-center gap-1">
                <Popover
                  open={fromDatePickerOpen}
                  onOpenChange={setFromDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        'h-9 w-9 p-0',
                        !filterFromDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarDays className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDateFromString(filterFromDate)}
                      onSelect={(date) => {
                        if (date) {
                          setFilterFromDate(formatDateToString(date));
                          setFromDatePickerOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  id="filter-from-date"
                  type="text"
                  value={filterFromDate}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Allow only digits and slashes, limit to 10 chars (dd/MM/yyyy)
                    value = value.replace(/[^\d/]/g, '').slice(0, 10);
                    // Auto-format as user types: dd/MM/yyyy
                    if (value.length > 2 && value[2] !== '/') {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                    }
                    if (value.length > 5 && value[5] !== '/') {
                      value = value.slice(0, 5) + '/' + value.slice(5);
                    }
                    setFilterFromDate(value);
                  }}
                  placeholder="dd/MM/yyyy"
                  className="w-[130px] h-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="filter-to-date"
                className="text-sm whitespace-nowrap"
              >
                Đến ngày:
              </Label>
              <div className="flex items-center gap-1">
                <Popover
                  open={toDatePickerOpen}
                  onOpenChange={setToDatePickerOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        'h-9 w-9 p-0',
                        !filterToDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarDays className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDateFromString(filterToDate)}
                      onSelect={(date) => {
                        if (date) {
                          setFilterToDate(formatDateToString(date));
                          setToDatePickerOpen(false);
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  id="filter-to-date"
                  type="text"
                  value={filterToDate}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Allow only digits and slashes, limit to 10 chars (dd/MM/yyyy)
                    value = value.replace(/[^\d/]/g, '').slice(0, 10);
                    // Auto-format as user types: dd/MM/yyyy
                    if (value.length > 2 && value[2] !== '/') {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                    }
                    if (value.length > 5 && value[5] !== '/') {
                      value = value.slice(0, 5) + '/' + value.slice(5);
                    }
                    setFilterToDate(value);
                  }}
                  placeholder="dd/MM/yyyy"
                  className="w-[130px] h-9"
                />
              </div>
            </div>
            {(appliedFilterFromDate || appliedFilterToDate) && (
              <button
                onClick={() => {
                  setFilterFromDate('');
                  setFilterToDate('');
                  setAppliedFilterFromDate('');
                  setAppliedFilterToDate('');
                }}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        }
      />
    </div>
  );
}
