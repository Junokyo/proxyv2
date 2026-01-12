/**
 * Orders Module Hooks
 *
 * Custom hooks for orders operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_ORDER_MUTATION,
  DELETE_ORDER_MUTATION,
  UPDATE_ORDER_MUTATION,
} from '../../mutations/orders';
import {
  GET_ORDERS_QUERY,
  GET_ORDER_BY_ID,
} from '../../queries/orders';
import type {
  OrdersResponse,
  CreateOrderInput,
  CreateOrderVariables,
  DeleteOrderVariables,
  GetOrderByIdResponse,
  GetOrderByIdVariables,
  OrderMutationResponse,
  UpdateOrderVariables,
} from '../../types/orders.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch orders list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useOrders({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'user123'
 * });
 * ```
 */
export function useOrders(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<OrdersResponse, BaseFilterOptions>({
    query: GET_ORDERS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to fetch a single order by ID
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useOrder('order-id-123');
 * ```
 */
export function useOrder(id: string, skip?: boolean) {
  return useGraphQLQuery<GetOrderByIdResponse, GetOrderByIdVariables>({
    query: GET_ORDER_BY_ID,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to create a new order
 *
 * @example
 * ```tsx
 * const [createOrder, { loading, error }] = useCreateOrder({
 *   onSuccess: () => {
 *     toast.success('Order created successfully');
 *     refetch();
 *   }
 * });
 *
 * createOrder({
 *   userId: 'user123',
 *   sum: 100.50
 * });
 * ```
 */
export function useCreateOrder(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createOrder: OrderMutationResponse },
    CreateOrderVariables
  >({
    mutation: CREATE_ORDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createOrder = (input: CreateOrderInput) => {
    return mutate({
      variables: {
        userId: input.userId,
        sum: input.sum,
      },
    });
  };

  return [createOrder, result] as const;
}

/**
 * Hook to update an order
 *
 * @example
 * ```tsx
 * const [updateOrder, { loading, error }] = useUpdateOrder({
 *   onSuccess: () => {
 *     toast.success('Order updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateOrder('order-id-123', 200.75);
 * ```
 */
export function useUpdateOrder(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateOrder: OrderMutationResponse },
    UpdateOrderVariables
  >({
    mutation: UPDATE_ORDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateOrder = (id: string, sum: number) => {
    return mutate({
      variables: {
        id,
        sum,
      },
    });
  };

  return [updateOrder, result] as const;
}

/**
 * Hook to delete an order
 *
 * @example
 * ```tsx
 * const [deleteOrder, { loading, error }] = useDeleteOrder({
 *   onSuccess: () => {
 *     toast.success('Order deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteOrder('order-id-123');
 * ```
 */
export function useDeleteOrder(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteOrder: boolean },
    DeleteOrderVariables
  >({
    mutation: DELETE_ORDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteOrder = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteOrder, result] as const;
}

