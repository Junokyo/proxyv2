/**
 * Custom GraphQL Mutation Hook
 *
 * Enhanced wrapper around useMutation with better error handling and TypeScript support
 */

import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
/**
 * Enhanced useMutation hook with automatic error handling
 *
 * @example
 * ```tsx
 * const [createUser, { loading, error }] = useGraphQLMutation({
 *   mutation: CREATE_USER_MUTATION,
 *   onSuccess: (data) => {
 *     toast.success('User created successfully');
 *   },
 *   onError: (message, code) => {
 *     console.error('Mutation error:', message, code);
 *   }
 * });
 *
 * const handleCreate = () => {
 *   createUser({ variables: { name: 'John' } });
 * };
 * ```
 */
import type { OperationVariables } from '@apollo/client';
import type {
  MutationHookOptions,
  MutationTuple,
} from '@apollo/client/react/types/types';
import { DocumentNode } from 'graphql';
import { handleGraphQLError } from '../utils/error-handler';

export interface UseGraphQLMutationOptions<TData, TVariables>
  extends Omit<MutationHookOptions<TData, TVariables>, 'mutation' | 'onError'> {
  mutation: DocumentNode;
  skipErrorToast?: boolean;
  onError?: (message: string, code?: string) => void;
  onSuccess?: (data: TData) => void;
}

export function useGraphQLMutation<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  options: UseGraphQLMutationOptions<TData, TVariables>,
): [
  (
    options?: Parameters<MutationTuple<TData, TVariables>[0]>[0],
  ) => Promise<{ data?: TData; errors?: unknown[] }>,
  MutationTuple<TData, TVariables>[1],
] {
  const {
    skipErrorToast,
    onError,
    onSuccess,
    onCompleted,
    mutation,
    ...mutationOptions
  } = options;

  const [mutate, result] = useMutation<TData, TVariables>(
    mutation,
    mutationOptions,
  );

  const enhancedMutate = useCallback(
    async (
      mutateOptions?: Parameters<typeof mutate>[0],
    ): Promise<{ data?: TData; errors?: unknown[] }> => {
      try {
        const response = await mutate({
          ...mutateOptions,
        });

        if (response.errors && response.errors.length > 0) {
          // Handle GraphQL errors
          const error = response.errors[0] as Error;
          handleGraphQLError(error, {
            showToast: !skipErrorToast,
            onError,
          });
          return { errors: [...response.errors] };
        }

        if (response.data) {
          onSuccess?.(response.data);
          onCompleted?.(response.data);
        }

        return { data: response.data ?? undefined };
      } catch (error) {
        handleGraphQLError(error as Error, {
          showToast: !skipErrorToast,
          onError,
        });
        return { errors: [error] };
      }
    },
    [mutate, skipErrorToast, onError, onSuccess, onCompleted],
  );

  return [enhancedMutate, result];
}
