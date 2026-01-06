/**
 * Proxy Types Module Hooks
 *
 * Custom hooks for proxy types operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_PROXY_TYPE_MUTATION,
  DELETE_PROXY_TYPE_MUTATION,
  UPDATE_PROXY_TYPE_MUTATION,
} from '../../mutations/proxy-types';
import { GET_PROXY_TYPES_QUERY } from '../../queries/proxy-types';
import type {
  ProxyTypesResponse,
  CreateProxyTypeInput,
  CreateProxyTypeVariables,
  DeleteProxyTypeVariables,
  UpdateProxyTypeInputWithoutId,
  UpdateProxyTypeVariables,
} from '../../types/proxy-types.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch proxy types list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useProxyTypes({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'HTTP'
 * });
 * ```
 */
export function useProxyTypes(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<ProxyTypesResponse, BaseFilterOptions>({
    query: GET_PROXY_TYPES_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new proxy type
 *
 * @example
 * ```tsx
 * const [createProxyType, { loading, error }] = useCreateProxyType({
 *   onSuccess: () => {
 *     toast.success('Proxy type created successfully');
 *     refetch();
 *   }
 * });
 *
 * createProxyType({
 *   name: 'HTTP Proxy',
 *   type: 'HTTP'
 * });
 * ```
 */
export function useCreateProxyType(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createProxyType: { id: string; name: string; type: string } },
    CreateProxyTypeVariables
  >({
    mutation: CREATE_PROXY_TYPE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createProxyType = (input: CreateProxyTypeInput) => {
    return mutate({
      variables: {
        name: input.name,
        type: input.type,
      },
    });
  };

  return [createProxyType, result] as const;
}

/**
 * Hook to update a proxy type
 *
 * @example
 * ```tsx
 * const [updateProxyType, { loading, error }] = useUpdateProxyType({
 *   onSuccess: () => {
 *     toast.success('Proxy type updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateProxyType('proxy-type-id-123', {
 *   name: 'HTTPS Proxy',
 *   type: 'HTTPS'
 * });
 * ```
 */
export function useUpdateProxyType(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateProxyType: { id: string; name: string; type: string } },
    UpdateProxyTypeVariables
  >({
    mutation: UPDATE_PROXY_TYPE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateProxyType = (
    id: string,
    input: UpdateProxyTypeInputWithoutId,
  ) => {
    return mutate({
      variables: {
        id,
        name: input.name,
        type: input.type,
      },
    });
  };

  return [updateProxyType, result] as const;
}

/**
 * Hook to delete a proxy type
 *
 * @example
 * ```tsx
 * const [deleteProxyType, { loading, error }] = useDeleteProxyType({
 *   onSuccess: () => {
 *     toast.success('Proxy type deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteProxyType('proxy-type-id-123');
 * ```
 */
export function useDeleteProxyType(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteProxyType: boolean },
    DeleteProxyTypeVariables
  >({
    mutation: DELETE_PROXY_TYPE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteProxyType = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteProxyType, result] as const;
}

