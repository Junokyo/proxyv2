// OrderCategoryView.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useOrders,
  useCreateOrder,
  useDeleteOrder,
  useUpdateOrder,
} from '@/graphql/hooks/orders';
import { OrderMutationResponse } from '@/graphql/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import useTable from '@/hooks/use-table';
import { CategoryPage, FormFieldConfig } from '@/components/category-page';

// 1. Schema - id, userId, sum
const orderSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID là bắt buộc'),
  sum: z.number().min(0, 'Tổng tiền phải lớn hơn hoặc bằng 0'),
});

type OrderFormValues = z.infer<typeof orderSchema>;

// Alias để tương thích với CategoryPage
type Order = OrderMutationResponse;

// 3. Các trường form - userId, sum (id tự động tạo)
const formFields: FormFieldConfig[] = [
  {
    name: 'userId',
    label: 'User ID',
    type: 'text',
    placeholder: 'Nhập User ID',
    required: true,
  },
  {
    name: 'sum',
    label: 'Tổng tiền',
    type: 'number',
    placeholder: 'Nhập tổng tiền',
    required: true,
  },
];

// 4. Columns
const baseColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">ID</div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
  },
  {
    accessorKey: 'userId',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">User ID</div>
    ),
    enableSorting: false,
    cell: ({ row }) => <div className="font-medium">{row.original.userId}</div>,
  },
  {
    accessorKey: 'sum',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Tổng tiền</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(row.original.sum)}
      </div>
    ),
  },
  {
    accessorKey: 'dateOrder',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Ngày đặt hàng</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.dateOrder).toLocaleDateString('vi-VN')}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Ngày tạo</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.createdAt).toLocaleDateString('vi-VN')}
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: () => (
      <div className="text-accent-foreground font-normal text-sm">Ngày cập nhật</div>
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.updatedAt).toLocaleDateString('vi-VN')}
      </div>
    ),
  },
];

// Component chính
export function OrderCategoryView() {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const columns: ColumnDef<Order>[] = useMemo(() => {
    return baseColumns;
  }, []);

  // Fetch orders data using GraphQL query
  // GraphQL pagination: page is 0-based, limit is the number of items per page
  const {
    data: ordersData,
    loading: ordersLoading,
    refetch,
  } = useOrders(
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
  const [createOrder, { loading: creating }] = useCreateOrder({
    onSuccess: () => {
      refetch();
    },
  });

  const [updateOrder, { loading: updating }] = useUpdateOrder({
    onSuccess: () => {
      refetch();
    },
  });

  const [deleteOrder, { loading: deleting }] = useDeleteOrder({
    onSuccess: () => {
      refetch();
    },
  });

  // Handlers - sử dụng GraphQL mutations
  const handleAdd = async (values: OrderFormValues) => {
    await createOrder({
      userId: values.userId,
      sum: values.sum,
    });
  };

  const handleEdit = async (id: string | number, values: OrderFormValues) => {
    await updateOrder(String(id), values.sum);
  };

  const handleDelete = async (id: string | number) => {
    await deleteOrder(String(id));
  };

  // Map GraphQL response to Order type (OrderMutationResponse)
  const orders: Order[] = useMemo(() => {
    return (
      ordersData?.orders?.items.map((item) => ({
        id: item.id,
        userId: item.userId,
        sum: item.sum,
        dateOrder: item.dateOrder,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })) || []
    );
  }, [ordersData]);

  // Get totalCount from GraphQL response for server-side pagination
  const totalCount = ordersData?.orders?.totalCount;

  return (
    <div className="w-full py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
      <CategoryPage<Order>
        data={orders}
        columns={columns}
        table={table}
        totalCount={totalCount}
        title="Danh mục đơn hàng"
        description="Quản lý danh sách đơn hàng"
        formSchema={orderSchema}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Tìm kiếm đơn hàng..."
        addDialogTitle="Thêm đơn hàng mới"
        addDialogDescription="Điền thông tin để thêm đơn hàng mới"
        editDialogTitle="Chỉnh sửa đơn hàng"
        editDialogDescription="Cập nhật thông tin đơn hàng"
        deleteDialogTitle="Xóa đơn hàng"
        deleteDialogDescription="Bạn có chắc chắn muốn xóa đơn hàng này?"
        isLoading={ordersLoading || creating || updating || deleting}
      />
    </div>
  );
}

