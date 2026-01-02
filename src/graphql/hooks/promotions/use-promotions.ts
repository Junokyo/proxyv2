/**
 * Promotions Module Hooks
 *
 * Custom hooks for promotions operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_PROMOTION_MUTATION,
  DELETE_PROMOTION_MUTATION,
  UPDATE_PROMOTION_MUTATION,
} from '../../mutations/promotions';
import {
  GET_PROMOTIONS_QUERY,
} from '../../queries/promotions';
import type {
  PromotionsResponse,
  CreatePromotionInput,
  CreatePromotionVariables,
  DeletePromotionVariables,
  UpdatePromotionInputWithoutId,
  UpdatePromotionVariables,
} from '../../types/promotions.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch promotions list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = usePromotions({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'Summer Sale'
 * });
 * ```
 */
export function usePromotions(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<PromotionsResponse, BaseFilterOptions>({
    query: GET_PROMOTIONS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new promotion
 *
 * @example
 * ```tsx
 * const [createPromotion, { loading, error }] = useCreatePromotion({
 *   onSuccess: () => {
 *     toast.success('Promotion created successfully');
 *     refetch();
 *   }
 * });
 *
 * createPromotion({
 *   name: 'Summer Sale',
 *   type: 1,
 *   max: 1000,
 *   percent: 20,
 *   fromDate: '2024-01-01',
 *   toDate: '2024-12-31'
 * });
 * ```
 */
export function useCreatePromotion(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createPromotion: { id: string; name: string; type: number; max: number; percent: number; fromDate: string; toDate: string } },
    CreatePromotionVariables
  >({
    mutation: CREATE_PROMOTION_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createPromotion = (input: CreatePromotionInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createPromotion, result] as const;
}

/**
 * Hook to update a promotion
 *
 * @example
 * ```tsx
 * const [updatePromotion, { loading, error }] = useUpdatePromotion({
 *   onSuccess: () => {
 *     toast.success('Promotion updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updatePromotion('promotion-id-123', {
 *   name: 'Summer Sale Updated'
 * });
 * ```
 */
export function useUpdatePromotion(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updatePromotion: { id: string; name: string; type: number; max: number; percent: number; fromDate: string; toDate: string } },
    UpdatePromotionVariables
  >({
    mutation: UPDATE_PROMOTION_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updatePromotion = (id: string, input: UpdatePromotionInputWithoutId) => {
    return mutate({
      variables: {
        input: {
          ...input,
          id, // ID được thêm vào input cho mutation
        },
      },
    });
  };

  return [updatePromotion, result] as const;
}

/**
 * Hook to delete a promotion
 *
 * @example
 * ```tsx
 * const [deletePromotion, { loading, error }] = useDeletePromotion({
 *   onSuccess: () => {
 *     toast.success('Promotion deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deletePromotion('promotion-id-123');
 * ```
 */
export function useDeletePromotion(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deletePromotion: boolean },
    DeletePromotionVariables
  >({
    mutation: DELETE_PROMOTION_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deletePromotion = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deletePromotion, result] as const;
}

