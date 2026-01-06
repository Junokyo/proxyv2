/**
 * Topups Module Hooks
 *
 * Custom hooks for topups operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_TOPUP_MUTATION,
  DELETE_TOPUP_MUTATION,
  UPDATE_TOPUP_MUTATION,
} from '../../mutations/topups';
import { GET_TOPUPS_QUERY } from '../../queries/topups';
import type {
  TopupsResponse,
  CreateTopupInput,
  CreateTopupVariables,
  DeleteTopupVariables,
  UpdateTopupInputWithoutId,
  UpdateTopupVariables,
} from '../../types/topups.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch topups list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useTopups({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'Promotion'
 * });
 * ```
 */
export function useTopups(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<TopupsResponse, BaseFilterOptions>({
    query: GET_TOPUPS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new topup
 *
 * @example
 * ```tsx
 * const [createTopup, { loading, error }] = useCreateTopup({
 *   onSuccess: () => {
 *     toast.success('Topup created successfully');
 *     refetch();
 *   }
 * });
 *
 * createTopup({
 *   name: 'New Year Promotion',
 *   max: 1000000,
 *   percent: 10
 * });
 * ```
 */
export function useCreateTopup(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createTopup: { id: string; name: string; max: number; percent: number } },
    CreateTopupVariables
  >({
    mutation: CREATE_TOPUP_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createTopup = (input: CreateTopupInput) => {
    return mutate({
      variables: {
        name: input.name,
        max: input.max,
        percent: input.percent,
      },
    });
  };

  return [createTopup, result] as const;
}

/**
 * Hook to update a topup
 *
 * @example
 * ```tsx
 * const [updateTopup, { loading, error }] = useUpdateTopup({
 *   onSuccess: () => {
 *     toast.success('Topup updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateTopup('topup-id-123', {
 *   name: 'Updated Promotion',
 *   max: 2000000,
 *   percent: 15
 * });
 * ```
 */
export function useUpdateTopup(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateTopup: { id: string; name: string; max: number; percent: number } },
    UpdateTopupVariables
  >({
    mutation: UPDATE_TOPUP_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateTopup = (id: string, input: UpdateTopupInputWithoutId) => {
    return mutate({
      variables: {
        id,
        name: input.name,
        max: input.max,
        percent: input.percent,
      },
    });
  };

  return [updateTopup, result] as const;
}

/**
 * Hook to delete a topup
 *
 * @example
 * ```tsx
 * const [deleteTopup, { loading, error }] = useDeleteTopup({
 *   onSuccess: () => {
 *     toast.success('Topup deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteTopup('topup-id-123');
 * ```
 */
export function useDeleteTopup(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteTopup: boolean },
    DeleteTopupVariables
  >({
    mutation: DELETE_TOPUP_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteTopup = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteTopup, result] as const;
}

