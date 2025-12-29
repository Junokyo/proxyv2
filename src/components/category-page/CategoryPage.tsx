'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Pencil, Plus, Search, Settings2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTable } from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CategoryDeleteDialog } from './CategoryDeleteDialog';
import { CategoryFormDialog } from './CategoryFormDialog';
import { CategoryPageProps } from './types';

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
    defaultPageSize = 10,
    pageSizes = [5, 10, 25, 50, 100],
    toolbarActions,
    isLoading = false,
    onRowClick,
  } = props;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TData | null>(null);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery || searchKeys.length === 0) {
      return data;
    }

    const searchLower = searchQuery.toLowerCase();
    return data.filter((item) => {
      return searchKeys.some((key) => {
        const value = (item as any)[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchQuery, searchKeys]);

  // Add action columns to the provided columns
  const columnsWithActions = useMemo<ColumnDef<TData>[]>(() => {
    const actionColumn: ColumnDef<TData> = {
      id: 'actions',
      header: () => (
        <div className="text-accent-foreground font-normal text-[0.8125rem] leading-[calc(1.125/0.8125)]">
          Thao tác
        </div>
      ),
      enableSorting: false,
      cell: ({ row }: { row: Row<TData> }) => {
        return (
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
              onClick={() => {
                setSelectedItem(row.original);
                setEditDialogOpen(true);
              }}
              aria-label="Chỉnh sửa"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
              onClick={() => {
                setSelectedItem(row.original);
                setDeleteDialogOpen(true);
              }}
              aria-label="Xóa"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        );
      },
      size: 120,
    };

    return [...columns, actionColumn];
  }, [columns]);

  const table = useReactTable({
    columns: columnsWithActions,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row) => String(row.id),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
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
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* Extra toolbar actions passed from props */}
          {toolbarActions}
          {/* Column visibility uses the table instance directly */}
          <DataGridColumnVisibility
            table={table}
            trigger={
              <Button variant="outline" size="sm" className="sm:size-auto">
                <Settings2 className="h-4 w-4" />
                <span className="hidden sm:inline">Cột</span>
              </Button>
            }
          />
          <Button
            onClick={() => setAddDialogOpen(true)}
            size="sm"
            className="sm:size-auto"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Thêm mới</span>
          </Button>
        </div>
      </div>

      {/* Card contains only search + table */}
      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={filteredData.length}
        onRowClick={onRowClick}
      >
        <Card>
          <CardHeader className="px-3 sm:px-5">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </CardHeader>

          <CardTable>
            <ScrollArea className="w-full">
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
          <CardFooter className="px-3 sm:px-5">
            <DataGridPagination sizes={pageSizes} />
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
