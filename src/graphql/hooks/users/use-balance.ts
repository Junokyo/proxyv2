/**
 * Balance Operations Hooks
 *
 * Custom hooks for user balance operations
 */

import {
  ADD_BALANCE_MUTATION,
  DEDUCT_BALANCE_MUTATION,
} from '../../mutations/users';
import type {
  AddBalanceInput,
  AddBalanceVariables,
  BalanceOperationResponse,
  DeductBalanceInput,
  DeductBalanceVariables,
} from '../../types/users.types';
import { useGraphQLMutation } from '../index';

/**
 * Hook to add balance to a user
 *
 * @example
 * ```tsx
 * const [addBalance, { loading, error }] = useAddBalance({
 *   onSuccess: (data) => {
 *     toast.success(`Đã nạp ${data.addBalance.amount} VND. Số dư mới: ${data.addBalance.newBalance} VND`);
 *     refetch();
 *   }
 * });
 *
 * addBalance({
 *   userId: 'user-id-123',
 *   amount: 100000,
 *   description: 'Nạp tiền từ admin',
 *   reference: 'REF123'
 * });
 * ```
 */
export function useAddBalance(options?: {
  onSuccess?: (data: { addBalance: BalanceOperationResponse }) => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { addBalance: BalanceOperationResponse },
    AddBalanceVariables
  >({
    mutation: ADD_BALANCE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const addBalance = (input: AddBalanceInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [addBalance, result] as const;
}

/**
 * Hook to deduct balance from a user
 *
 * @example
 * ```tsx
 * const [deductBalance, { loading, error }] = useDeductBalance({
 *   onSuccess: (data) => {
 *     toast.success(`Đã trừ ${data.deductBalance.amount} VND. Số dư mới: ${data.deductBalance.newBalance} VND`);
 *     refetch();
 *   }
 * });
 *
 * deductBalance({
 *   userId: 'user-id-123',
 *   amount: 50000,
 *   description: 'Trừ tiền từ admin',
 *   reference: 'REF456'
 * });
 * ```
 */
export function useDeductBalance(options?: {
  onSuccess?: (data: { deductBalance: BalanceOperationResponse }) => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deductBalance: BalanceOperationResponse },
    DeductBalanceVariables
  >({
    mutation: DEDUCT_BALANCE_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deductBalance = (input: DeductBalanceInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [deductBalance, result] as const;
}

