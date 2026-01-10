/**
 * Wallet Transactions Module Hooks
 *
 * Custom hooks for wallet transaction operations
 */

import {
  GET_WALLET_TRANSACTION,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTION_STATS,
} from '../../queries/wallet-transactions';
import type {
  WalletTransactionResponse,
  WalletTransactionsResponse,
  WalletTransactionStatsResponse,
  WalletTransactionStatsVariables,
  WalletTransactionsVariables,
  WalletTransactionVariables,
} from '../../types/wallet-transactions.types';
import { useGraphQLQuery } from '../index';

/**
 * Hook to fetch wallet transaction statistics
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useWalletTransactionStats('wallet-id-123');
 * ```
 */
export function useWalletTransactionStats(walletId: string, skip?: boolean) {
  return useGraphQLQuery<
    WalletTransactionStatsResponse,
    WalletTransactionStatsVariables
  >({
    query: GET_WALLET_TRANSACTION_STATS,
    variables: { walletId },
    skip: skip || !walletId,
  });
}

/**
 * Hook to fetch wallet transactions list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useWalletTransactions({
 *   walletId: 'wallet-123',
 *   pagination: { page: 0, limit: 10 }
 * });
 * ```
 */
export function useWalletTransactions(
  options?: WalletTransactionsVariables,
  skip?: boolean,
) {
  return useGraphQLQuery<WalletTransactionsResponse, WalletTransactionsVariables>({
    query: GET_WALLET_TRANSACTIONS,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to fetch a single wallet transaction by ID
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useWalletTransaction('transaction-id-123');
 * ```
 */
export function useWalletTransaction(id: string, skip?: boolean) {
  return useGraphQLQuery<WalletTransactionResponse, WalletTransactionVariables>({
    query: GET_WALLET_TRANSACTION,
    variables: { id },
    skip: skip || !id,
  });
}

