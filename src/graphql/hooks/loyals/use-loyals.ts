/**
 * Loyals Module Hooks
 *
 * Custom hooks for loyals operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_LOYAL_MUTATION,
  DELETE_LOYAL_MUTATION,
  UPDATE_LOYAL_MUTATION,
} from '../../mutations/loyals';
import {
  GET_LOYALS_QUERY,
} from '../../queries/loyals';
import type {
  LoyalsResponse,
  CreateLoyalInput,
  CreateLoyalVariables,
  DeleteLoyalVariables,
  UpdateLoyalInputWithoutId,
  UpdateLoyalVariables,
} from '../../types/loyals.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch loyals list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useLoyals({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'Gold'
 * });
 * ```
 */
export function useLoyals(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<LoyalsResponse, BaseFilterOptions>({
    query: GET_LOYALS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new loyal
 *
 * @example
 * ```tsx
 * const [createLoyal, { loading, error }] = useCreateLoyal({
 *   onSuccess: () => {
 *     toast.success('Loyal created successfully');
 *     refetch();
 *   }
 * });
 *
 * createLoyal({
 *   name: 'Gold',
 *   value: '1000'
 * });
 * ```
 */
export function useCreateLoyal(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createLoyal: { id: string; name: string; value: string } },
    CreateLoyalVariables
  >({
    mutation: CREATE_LOYAL_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createLoyal = (input: CreateLoyalInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createLoyal, result] as const;
}

/**
 * Hook to update a loyal
 *
 * @example
 * ```tsx
 * const [updateLoyal, { loading, error }] = useUpdateLoyal({
 *   onSuccess: () => {
 *     toast.success('Loyal updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateLoyal('loyal-id-123', {
 *   name: 'Gold Updated'
 * });
 * ```
 */
export function useUpdateLoyal(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateLoyal: { id: string; name: string; value: string } },
    UpdateLoyalVariables
  >({
    mutation: UPDATE_LOYAL_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateLoyal = (id: string, input: UpdateLoyalInputWithoutId) => {
    return mutate({
      variables: {
        input: {
          ...input,
          id, // ID được thêm vào input cho mutation
        },
      },
    });
  };

  return [updateLoyal, result] as const;
}

/**
 * Hook to delete a loyal
 *
 * @example
 * ```tsx
 * const [deleteLoyal, { loading, error }] = useDeleteLoyal({
 *   onSuccess: () => {
 *     toast.success('Loyal deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteLoyal('loyal-id-123');
 * ```
 */
export function useDeleteLoyal(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteLoyal: boolean },
    DeleteLoyalVariables
  >({
    mutation: DELETE_LOYAL_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteLoyal = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteLoyal, result] as const;
}

