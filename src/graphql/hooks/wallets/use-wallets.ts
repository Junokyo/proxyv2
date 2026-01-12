/**
 * Wallets Module Hooks
 *
 * Custom hooks for wallets operations
 */

import { BaseFilterOptions } from '@/graphql/interfaces/base/filter-option.interface';
import {
  CREATE_WALLET_MUTATION,
  UPDATE_WALLET_BALANCE_MUTATION,
} from '../../mutations/wallets';
import { GET_WALLET_BY_ID, GET_WALLETS_QUERY } from '../../queries/wallets';
import type {
  CreateWalletInput,
  CreateWalletVariables,
  GetWalletByIdResponse,
  GetWalletByIdVariables,
  UpdateWalletBalanceInput,
  UpdateWalletBalanceVariables,
  WalletsResponse,
} from '../../types/wallets.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch wallets list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useWallets({
 *   pagination: { page: 1, limit: 10 },
 *   searchQuery: 'user123'
 * });
 * ```
 */
export function useWallets(options?: BaseFilterOptions, skip?: boolean) {
  return useGraphQLQuery<WalletsResponse, BaseFilterOptions>({
    query: GET_WALLETS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to fetch a single wallet by ID
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useWallet('wallet-id-123');
 * ```
 */
export function useWallet(id: string, skip?: boolean) {
  return useGraphQLQuery<GetWalletByIdResponse, GetWalletByIdVariables>({
    query: GET_WALLET_BY_ID,
    variables: { id },
    skip: skip || !id,
  });
}

/**
 * Hook to create a new wallet
 *
 * @example
 * ```tsx
 * const [createWallet, { loading, error }] = useCreateWallet({
 *   onSuccess: () => {
 *     toast.success('Wallet created successfully');
 *     refetch();
 *   }
 * });
 *
 * createWallet({
 *   userId: 'user123',
 *   coin: 100,
 *   promotion: 10,
 *   active: true
 * });
 * ```
 */
export function useCreateWallet(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    {
      createWallet: {
        id: string;
        userId: string;
        coin: number;
        promotion: number;
        active: boolean;
      };
    },
    CreateWalletVariables
  >({
    mutation: CREATE_WALLET_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createWallet = (input: CreateWalletInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createWallet, result] as const;
}

/**
 * Hook to update wallet balance
 *
 * @example
 * ```tsx
 * const [updateWalletBalance, { loading, error }] = useUpdateWalletBalance({
 *   onSuccess: () => {
 *     toast.success('Wallet balance updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateWalletBalance({
 *   walletId: 'wallet-id-123',
 *   amount: 50,
 *   balanceType: 'coin'
 * });
 * ```
 */
export function useUpdateWalletBalance(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    {
      updateWalletBalance: {
        id: string;
        userId: string;
        coin: number;
        promotion: number;
        active: boolean;
      };
    },
    UpdateWalletBalanceVariables
  >({
    mutation: UPDATE_WALLET_BALANCE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateWalletBalance = (input: UpdateWalletBalanceInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [updateWalletBalance, result] as const;
}
