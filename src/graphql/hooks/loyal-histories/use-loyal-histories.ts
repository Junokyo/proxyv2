/**
 * Loyal Histories Module Hooks
 *
 * Custom hooks for loyal histories operations
 */

import { useAuthStore } from '@/auth/store/auth.store';
import {
  CREATE_LOYAL_HISTORY_MUTATION,
  DELETE_LOYAL_HISTORY_MUTATION,
  UPDATE_LOYAL_HISTORY_MUTATION,
} from '../../mutations/loyal-histories';
import { GET_LOYAL_HISTORIES_QUERY } from '../../queries/loyal-histories';
import type {
  CreateLoyalHistoryVariables,
  DeleteLoyalHistoryVariables,
  LoyalHistoriesFilterOptions,
  LoyalHistoriesResponse,
  LoyalHistoryMutationResponse,
  UpdateLoyalHistoryInputWithoutId,
  UpdateLoyalHistoryVariables,
} from '../../types/loyal-histories.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch loyal histories list
 * Automatically includes userId from authentication store
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useLoyalHistories({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'search term'
 * });
 * ```
 */
export function useLoyalHistories(
  options?: LoyalHistoriesFilterOptions,
  skip?: boolean,
) {
  // Get userId from authentication store
  const userId = useAuthStore((state) => state.user?.id);

  return useGraphQLQuery<LoyalHistoriesResponse, LoyalHistoriesFilterOptions>({
    query: GET_LOYAL_HISTORIES_QUERY,
    variables: {
      ...options,
      userId: userId || options?.userId, // Use userId from auth store, or from options if provided
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new loyal history
 *
 * @example
 * ```tsx
 * const [createLoyalHistory, { loading, error }] = useCreateLoyalHistory({
 *   onSuccess: () => {
 *     toast.success('Loyal history created successfully');
 *     refetch();
 *   }
 * });
 *
 * createLoyalHistory({
 *   userId: 'user-id-123',
 *   loyalLevelId: 'level-id-123',
 *   coin: 100.5
 * });
 * ```
 */
export function useCreateLoyalHistory(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createLoyalHistory: LoyalHistoryMutationResponse },
    CreateLoyalHistoryVariables
  >({
    mutation: CREATE_LOYAL_HISTORY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createLoyalHistory = (input: CreateLoyalHistoryVariables) => {
    return mutate({
      variables: input,
    });
  };

  return [createLoyalHistory, result] as const;
}

/**
 * Hook to update a loyal history
 *
 * @example
 * ```tsx
 * const [updateLoyalHistory, { loading, error }] = useUpdateLoyalHistory({
 *   onSuccess: () => {
 *     toast.success('Loyal history updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateLoyalHistory('history-id-123', {
 *   loyalLevelId: 'level-id-456',
 *   coin: 200.5
 * });
 * ```
 */
export function useUpdateLoyalHistory(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateLoyalHistory: LoyalHistoryMutationResponse },
    UpdateLoyalHistoryVariables
  >({
    mutation: UPDATE_LOYAL_HISTORY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateLoyalHistory = (
    id: string,
    input: UpdateLoyalHistoryInputWithoutId,
  ) => {
    return mutate({
      variables: {
        id,
        ...input,
      },
    });
  };

  return [updateLoyalHistory, result] as const;
}

/**
 * Hook to delete a loyal history
 *
 * @example
 * ```tsx
 * const [deleteLoyalHistory, { loading, error }] = useDeleteLoyalHistory({
 *   onSuccess: () => {
 *     toast.success('Loyal history deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteLoyalHistory('history-id-123');
 * ```
 */
export function useDeleteLoyalHistory(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteLoyalHistory: boolean },
    DeleteLoyalHistoryVariables
  >({
    mutation: DELETE_LOYAL_HISTORY_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteLoyalHistory = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteLoyalHistory, result] as const;
}

