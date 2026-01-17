/**
 * Bank Accounts Module Hooks
 *
 * Custom hooks for bank accounts operations
 */

import { BankAccountsFilterOptions } from '@/graphql/types/bank-accounts.types';
import {
  CREATE_BANK_ACCOUNT_MUTATION,
  DELETE_BANK_ACCOUNT_MUTATION,
  UPDATE_BANK_ACCOUNT_MUTATION,
} from '../../mutations/bank-accounts';
import { GET_BANK_ACCOUNTS_QUERY } from '../../queries/bank-accounts';
import type {
  BankAccountsResponse,
  BankAccountMutationResponse,
  CreateBankAccountInput,
  CreateBankAccountVariables,
  DeleteBankAccountVariables,
  UpdateBankAccountInputWithoutId,
  UpdateBankAccountVariables,
} from '../../types/bank-accounts.types';
import { useGraphQLMutation, useGraphQLQuery } from '../index';

/**
 * Hook to fetch bank accounts list
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useBankAccounts({
 *   pagination: { page: 0, limit: 10 },
 *   searchQuery: 'Vietcombank',
 *   activeOnly: true
 * });
 * ```
 */
export function useBankAccounts(
  options?: BankAccountsFilterOptions,
  skip?: boolean,
) {
  return useGraphQLQuery<BankAccountsResponse, BankAccountsFilterOptions>({
    query: GET_BANK_ACCOUNTS_QUERY,
    variables: {
      ...options,
    },
    skip: skip || false,
  });
}

/**
 * Hook to create a new bank account
 *
 * @example
 * ```tsx
 * const [createBankAccount, { loading, error }] = useCreateBankAccount({
 *   onSuccess: () => {
 *     toast.success('Bank account created successfully');
 *     refetch();
 *   }
 * });
 *
 * createBankAccount({
 *   bankCode: 'VCB',
 *   bankName: 'Vietcombank',
 *   accountNumber: '1234567890',
 *   accountName: 'NGUYEN VAN A'
 * });
 * ```
 */
export function useCreateBankAccount(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { createBankAccount: BankAccountMutationResponse },
    CreateBankAccountVariables
  >({
    mutation: CREATE_BANK_ACCOUNT_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const createBankAccount = (input: CreateBankAccountInput) => {
    return mutate({
      variables: { input },
    });
  };

  return [createBankAccount, result] as const;
}

/**
 * Hook to update a bank account
 *
 * @example
 * ```tsx
 * const [updateBankAccount, { loading, error }] = useUpdateBankAccount({
 *   onSuccess: () => {
 *     toast.success('Bank account updated successfully');
 *     refetch();
 *   }
 * });
 *
 * updateBankAccount('bank-account-id-123', {
 *   bankName: 'Vietcombank Updated'
 * });
 * ```
 */
export function useUpdateBankAccount(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { updateBankAccount: BankAccountMutationResponse },
    UpdateBankAccountVariables
  >({
    mutation: UPDATE_BANK_ACCOUNT_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const updateBankAccount = (
    id: string,
    input: UpdateBankAccountInputWithoutId,
  ) => {
    return mutate({
      variables: {
        input: {
          ...input,
          id, // ID được thêm vào input cho mutation
        },
      },
    });
  };

  return [updateBankAccount, result] as const;
}

/**
 * Hook to delete a bank account
 *
 * @example
 * ```tsx
 * const [deleteBankAccount, { loading, error }] = useDeleteBankAccount({
 *   onSuccess: () => {
 *     toast.success('Bank account deleted successfully');
 *     refetch();
 *   }
 * });
 *
 * deleteBankAccount('bank-account-id-123');
 * ```
 */
export function useDeleteBankAccount(options?: {
  onSuccess?: () => void;
  onError?: (message: string, code?: string) => void;
}) {
  const [mutate, result] = useGraphQLMutation<
    { deleteBankAccount: boolean },
    DeleteBankAccountVariables
  >({
    mutation: DELETE_BANK_ACCOUNT_MUTATION,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  const deleteBankAccount = (id: string) => {
    return mutate({
      variables: { id },
    });
  };

  return [deleteBankAccount, result] as const;
}

// Export type for BankAccountMutationResponse
export type { BankAccountMutationResponse } from '../../types/bank-accounts.types';

