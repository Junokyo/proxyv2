/**
 * Overview Module Hooks
 * 
 * Custom hooks for overview/proxies operations
 */

import { useGraphQLQuery, useGraphQLMutation } from '../index';
import {
  GET_PROXIES_QUERY,
  GET_PROXY_BY_ID_QUERY,
  GET_PROXIES_STATS_QUERY,
} from '../../queries/overview';
import {
  CREATE_PROXY_MUTATION,
  UPDATE_PROXY_MUTATION,
  DELETE_PROXY_MUTATION,
  BULK_DELETE_PROXIES_MUTATION,
} from '../../mutations/overview';
import { PaginationInput } from '../../types';

/**
 * Hook to fetch proxies list
 * 
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useProxies({
 *   pagination: { page: 1, pageSize: 10 },
 *   filter: { type: 'residential' }
 * });
 * ```
 */
export function useProxies(options?: {
  pagination?: PaginationInput;
  filter?: Record<string, unknown>;
  skip?: boolean;
}) {
  return useGraphQLQuery({
    query: GET_PROXIES_QUERY,
    variables: {
      pagination: options?.pagination,
      filter: options?.filter,
    },
    skip: options?.skip,
  });
}

/**
 * Hook to fetch a single proxy by ID
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useProxy('proxy-id-123');
 * ```
 */
export function useProxy(id: string, skip?: boolean) {
  return useGraphQLQuery({
    query: GET_PROXY_BY_ID_QUERY,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to fetch proxies statistics
 * 
 * @example
 * ```tsx
 * const { data, loading, error } = useProxiesStats();
 * ```
 */
export function useProxiesStats() {
  return useGraphQLQuery({
    query: GET_PROXIES_STATS_QUERY,
  });
}

/**
 * Hook to create a new proxy
 * 
 * @example
 * ```tsx
 * const [createProxy, { loading, error }] = useCreateProxy({
 *   onSuccess: (data) => {
 *     toast.success('Proxy created successfully');
 *     refetch(); // Refetch the list
 *   }
 * });
 * 
 * createProxy({
 *   variables: {
 *     input: {
 *       title: 'New Proxy',
 *       price: '10.00',
 *       unit: '/GB'
 *     }
 *   }
 * });
 * ```
 */
export function useCreateProxy(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: CREATE_PROXY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to update a proxy
 * 
 * @example
 * ```tsx
 * const [updateProxy, { loading }] = useUpdateProxy({
 *   onSuccess: () => {
 *     toast.success('Proxy updated');
 *   }
 * });
 * 
 * updateProxy({
 *   variables: {
 *     id: 'proxy-id',
 *     input: { title: 'Updated Title' }
 *   }
 * });
 * ```
 */
export function useUpdateProxy(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: UPDATE_PROXY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to delete a proxy
 * 
 * @example
 * ```tsx
 * const [deleteProxy, { loading }] = useDeleteProxy({
 *   onSuccess: () => {
 *     toast.success('Proxy deleted');
 *     refetch();
 *   }
 * });
 * 
 * deleteProxy({
 *   variables: { id: 'proxy-id' }
 * });
 * ```
 */
export function useDeleteProxy(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: DELETE_PROXY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to bulk delete proxies
 * 
 * @example
 * ```tsx
 * const [bulkDeleteProxies, { loading }] = useBulkDeleteProxies({
 *   onSuccess: () => {
 *     toast.success('Proxies deleted');
 *     refetch();
 *   }
 * });
 * 
 * bulkDeleteProxies({
 *   variables: { ids: ['id1', 'id2', 'id3'] }
 * });
 * ```
 */
export function useBulkDeleteProxies(options?: {
  onSuccess?: (data: unknown) => void;
  onError?: (message: string, code?: string) => void;
}) {
  return useGraphQLMutation({
    mutation: BULK_DELETE_PROXIES_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

