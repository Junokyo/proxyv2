'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { TableProps } from '@/types/useTableTypes';
import { cn } from '@/lib/utils';
import useTable from '@/hooks/use-table';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryDeleteDialog } from './CategoryDeleteDialog';
import { CategoryFormDialog } from './CategoryFormDialog';
import { CategoryPageProps } from './types';

interface CustomPaginationProps {
  tableHook: TableProps;
  recordCount: number;
  sizes?: number[];
  isLoading?: boolean;
}

function CustomPagination({
  tableHook,
  recordCount,
  sizes = [5, 10, 25, 50, 100],
  isLoading,
}: CustomPaginationProps) {
  const { page, rowsPerPage, onChangePage } = tableHook;
  const pageCount = Math.ceil(recordCount / rowsPerPage);
  const from = page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, recordCount);

  const paginationInfo = `${from} - ${to} of ${recordCount}`;

  const btnBaseClasses = 'size-7 p-0 text-sm';
  const btnArrowClasses = btnBaseClasses + ' rtl:transform rtl:rotate-180';

  // Pagination limit logic
  const paginationMoreLimit = 5;
  const currentGroupStart =
    Math.floor(page / paginationMoreLimit) * paginationMoreLimit;
  const currentGroupEnd = Math.min(
    currentGroupStart + paginationMoreLimit,
    pageCount,
  );

  // Render page buttons based on the current group
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = currentGroupStart; i < currentGroupEnd; i++) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          mode="icon"
          variant="ghost"
          className={cn(btnBaseClasses, 'text-muted-foreground', {
            'bg-accent text-accent-foreground': page === i,
          })}
          onClick={() => {
            if (page !== i) {
              onChangePage(null, i);
            }
          }}
        >
          {i + 1}
        </Button>,
      );
    }
    return buttons;
  };

  // Render a "previous" ellipsis button if there are previous pages to show
  const renderEllipsisPrevButton = () => {
    if (currentGroupStart > 0) {
      return (
        <Button
          size="sm"
          mode="icon"
          className={btnBaseClasses}
          variant="ghost"
          onClick={() => onChangePage(null, currentGroupStart - 1)}
        >
          ...
        </Button>
      );
    }
    return null;
  };

  // Render a "next" ellipsis button if there are more pages to show after the current group
  const renderEllipsisNextButton = () => {
    if (currentGroupEnd < pageCount) {
      return (
        <Button
          className={btnBaseClasses}
          variant="ghost"
          size="sm"
          mode="icon"
          onClick={() => onChangePage(null, currentGroupEnd)}
        >
          ...
        </Button>
      );
    }
    return null;
  };

  return (
    <div
      data-slot="data-grid-pagination"
      className={cn(
        'flex flex-wrap flex-col sm:flex-row justify-between items-center gap-2.5 py-2.5 sm:py-0 grow',
      )}
    >
      <div className="flex flex-wrap items-center space-x-2.5 pb-2.5 sm:pb-0 order-2 sm:order-1">
        {isLoading ? (
          <Skeleton className="h-8 w-44" />
        ) : (
          <>
            <div className="text-sm text-muted-foreground">Rows per page</div>
            <Select
              value={`${rowsPerPage}`}
              indicatorPosition="right"
              onValueChange={(value) => {
                const newPageSize = Number(value);
                // Reset to page 0 and update rows per page
                tableHook.setPage(0);
                tableHook.setRowsPerPage(newPageSize);
              }}
            >
              <SelectTrigger className="w-fit" size="sm">
                <SelectValue placeholder={`${rowsPerPage}`} />
              </SelectTrigger>
              <SelectContent side="top" className="min-w-[50px]">
                {sizes?.map((size: number) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-2.5 pt-2.5 sm:pt-0 order-1 sm:order-2">
        {isLoading ? (
          <Skeleton className="h-8 w-60" />
        ) : (
          <>
            <div className="text-sm text-muted-foreground text-nowrap order-2 sm:order-1">
              {paginationInfo}
            </div>
            {pageCount > 1 && (
              <div className="flex items-center space-x-1 order-1 sm:order-2">
                <Button
                  size="sm"
                  mode="icon"
                  variant="ghost"
                  className={btnArrowClasses}
                  onClick={() => onChangePage(null, page - 1)}
                  disabled={page === 0}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Button>

                {renderEllipsisPrevButton()}

                {renderPageButtons()}

                {renderEllipsisNextButton()}

                <Button
                  size="sm"
                  mode="icon"
                  variant="ghost"
                  className={btnArrowClasses}
                  onClick={() => onChangePage(null, page + 1)}
                  disabled={page >= pageCount - 1}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function CategoryPage<TData extends { id: string | number }>(
  props: CategoryPageProps<TData>,
) {
  const {
    data,
    columns,
    title,
    description,
    formSchema,
    formFields,
    defaultFormValues = {},
    onAdd,
    onEdit,
    onDelete,
    addDialogTitle,
    addDialogDescription,
    editDialogTitle,
    editDialogDescription,
    deleteDialogTitle,
    deleteDialogDescription,
    deleteConfirmText,
    searchPlaceholder = 'Tìm kiếm...',
    searchKeys = [],
    onSearchChange,
    defaultPageSize = 5,
    pageSizes = [5, 10, 25, 50, 100],
    toolbarActions,
    isLoading = false,
    onRowClick,
    totalCount,
  } = props;

  // Use provided table instance or create a new one
  const internalTable = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: defaultPageSize,
  });
  const table = props.table || internalTable;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Handle search input change (local state only)
  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  // Handle search button click - trigger actual search
  const handleSearchClick = () => {
    setSearchQuery(searchInput);
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
  };

  // Sync searchInput with searchQuery when it changes externally
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TData | null>(null);

  // Use totalCount from server if provided, otherwise use data.length (client-side)
  // Note: For GraphQL search, filtering is done on server-side via searchQuery variable
  const recordCount = totalCount !== undefined ? totalCount : data.length;

  // Calculate total pages and ensure current page is valid
  const totalPages = Math.ceil(recordCount / table.rowsPerPage);

  // Reset page if current page exceeds total pages when rowsPerPage changes
  useEffect(() => {
    if (totalPages > 0 && table.page >= totalPages) {
      table.setPage(Math.max(0, totalPages - 1));
    }
  }, [table.rowsPerPage, totalPages, table.page, table]);

  // For server-side pagination (when totalCount is provided), data is already paginated
  // For client-side pagination, we slice the data
  const paginatedData = useMemo(() => {
    if (totalCount !== undefined) {
      // Server-side pagination: data is already paginated, use as-is
      return data;
    }
    // Client-side pagination: slice the data
    const start = table.page * table.rowsPerPage;
    const end = start + table.rowsPerPage;
    return data.slice(start, end);
  }, [data, table.page, table.rowsPerPage, totalCount]);

  // Add action columns to the provided columns
  const columnsWithActions = useMemo<ColumnDef<TData>[]>(() => {
    const actionColumn: ColumnDef<TData> = {
      id: 'actions',
      header: () => (
        <div className="text-accent-foreground font-normal text-sm">
          Thao tác
        </div>
      ),
      enableSorting: false,
      cell: ({ row }: { row: Row<TData> }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(row.original);
                setEditDialogOpen(true);
              }}
              aria-label="Chỉnh sửa"
            >
              <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(row.original);
                setDeleteDialogOpen(true);
              }}
              aria-label="Xóa"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        );
      },
      size: 100,
    };

    return [...columns, actionColumn];
  }, [columns]);

  const tableInstance = useReactTable({
    columns: columnsWithActions,
    data: paginatedData,
    pageCount: totalPages,
    getRowId: (row) => String(row.id),
    state: {
      pagination: {
        pageIndex: table.page,
        pageSize: table.rowsPerPage,
      },
      sorting,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: table.page,
          pageSize: table.rowsPerPage,
        });
        table.setPage(newPagination.pageIndex);
        table.setRowsPerPage(newPagination.pageSize);
      } else {
        table.setPage(updater.pageIndex);
        table.setRowsPerPage(updater.pageSize);
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const handleAdd = async (values: any) => {
    await onAdd(values);
    setAddDialogOpen(false);
  };

  const handleEdit = async (values: any) => {
    if (selectedItem) {
      await onEdit(selectedItem.id, values);
      setEditDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await onDelete(selectedItem.id);
      setDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <>
      {/* Top header row: title + actions (outside the Card) - Responsive */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          {/* Extra toolbar actions passed from props */}
          {toolbarActions}
          <Button
            onClick={() => setAddDialogOpen(true)}
            size="md"
            className="h-10 px-4 font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Card contains only search + table */}
      <DataGrid
        table={tableInstance}
        isLoading={isLoading}
        recordCount={recordCount}
        onRowClick={onRowClick}
      >
        <Card>
          <CardHeader className="px-4 sm:px-6 py-4">
            <div className="flex gap-2 w-full max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchInput}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchClick();
                    }
                  }}
                  className="pl-9 h-10 w-full"
                />
              </div>
              <Button
                onClick={handleSearchClick}
                size="md"
                className="h-10 px-4"
              >
                <Search className="h-4 w-4 mr-2" />
                Tìm kiếm
              </Button>
            </div>
          </CardHeader>

          <CardTable>
            <ScrollArea className="w-full">
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter className="px-4 sm:px-6 py-4">
            <CustomPagination
              tableHook={table}
              recordCount={recordCount}
              sizes={pageSizes}
              isLoading={isLoading}
            />
          </CardFooter>
        </Card>
      </DataGrid>

      {/* Add Dialog */}
      <CategoryFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        mode="add"
        initialValues={defaultFormValues}
        onSubmit={handleAdd}
        formSchema={formSchema}
        formFields={formFields}
        title={addDialogTitle}
        description={addDialogDescription}
        submitLabel="Thêm"
      />

      {/* Edit Dialog */}
      <CategoryFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        initialValues={selectedItem as any}
        onSubmit={handleEdit}
        formSchema={formSchema}
        formFields={formFields}
        title={editDialogTitle}
        description={editDialogDescription}
        submitLabel="Cập nhật"
      />

      {/* Delete Dialog */}
      <CategoryDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={deleteDialogTitle}
        description={deleteDialogDescription}
        itemName={
          selectedItem
            ? String((selectedItem as any).name || selectedItem.id)
            : undefined
        }
      />
    </>
  );
}
