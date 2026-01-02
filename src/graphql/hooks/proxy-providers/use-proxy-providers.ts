/**
 * Proxy Providers Module Hooks
 *
 * Custom hooks for proxy providers operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_PROXY_PROVIDER_MUTATION,
  DELETE_PROXY_PROVIDER_MUTATION,
  UPDATE_PROXY_PROVIDER_MUTATION,
} from '../../mutations/proxy-providers';
import { GET_PROXY_PROVIDERS_QUERY } from '../../queries/proxy-providers';
import type {
  ProxyProvidersResponse,
  CreateProxyProviderInput,
  CreateProxyProviderVariables,
  DeleteProxyProviderVariables,
  UpdateProxyProviderInputWithoutId,
  UpdateProxyProviderVariables,
} from '../../types/proxy-providers.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch proxy providers list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useProxyProviders({
 *   pagination: { page: 0, limit: 10 },
 *   searchQuery: 'Provider Name'
 * });
 * ```
 */
export function useProxyProviders(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<ProxyProvidersResponse, BaseFilterOptions>({
    query: GET_PROXY_PROVIDERS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new proxy provider
 *
 * @example
 * ```tsx
 * const [createProxyProvider, { loading, error }] = useCreateProxyProvider({
 *   onSuccess: () => {
 *     toast.success('Proxy provider created successfully');
 *     refetch();
 *   }
 * });
 *
 * createProxyProvider({
 *   name: 'Provider Name',
 *   server: 'server.example.com',
 *   apiKey: 'api-key',
 *   userName: 'username',
 *   password: 'password',
 *   apiType: 1
 * });
 * ```
 */
export function useCreateProxyProvider(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    {
      createProxyProvider: {
        id: string;
        name: string;
        server: string;
        apiKey: string;
        userName: string;
        password: string;
        apiType: number;
      };
    },
    CreateProxyProviderInput
  >({
    mutation: CREATE_PROXY_PROVIDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createProxyProvider = (input: CreateProxyProviderInput) => {
    return mutate({
      variables: input,
    });
  };

  return [createProxyProvider, result] as const;
}

/**
 * Hook to update a proxy provider
 *
 * @example
 * ```tsx
 * const [updateProxyProvider, { loading, error }] = useUpdateProxyProvider({
 *   onSuccess: () => {
 *     toast.success('Proxy provider updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateProxyProvider('provider-id-123', {
 *   name: 'Updated Provider Name'
 * });
 * ```
 */
export function useUpdateProxyProvider(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    {
      updateProxyProvider: {
        id: string;
        name: string;
        server: string;
        apiKey: string;
        userName: string;
        password: string;
        apiType: number;
      };
    },
    { id: string } & UpdateProxyProviderInputWithoutId
  >({
    mutation: UPDATE_PROXY_PROVIDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateProxyProvider = (
    id: string,
    input: UpdateProxyProviderInputWithoutId,
  ) => {
    return mutate({
      variables: {
        id,
        ...input,
      },
    });
  };

  return [updateProxyProvider, result] as const;
}

/**
 * Hook to delete a proxy provider
 *
 * @example
 * ```tsx
 * const [deleteProxyProvider, { loading, error }] = useDeleteProxyProvider({
 *   onSuccess: () => {
 *     toast.success('Proxy provider deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteProxyProvider('provider-id-123');
 * ```
 */
export function useDeleteProxyProvider(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteProxyProvider: boolean },
    DeleteProxyProviderVariables
  >({
    mutation: DELETE_PROXY_PROVIDER_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteProxyProvider = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteProxyProvider, result] as const;
}

