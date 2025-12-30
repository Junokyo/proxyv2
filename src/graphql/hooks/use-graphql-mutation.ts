/**
 * Custom GraphQL Mutation Hook
 * 
 * Enhanced wrapper around useMutation with better error handling and TypeScript support
 */

import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useCallback } from 'react';
import { handleGraphQLError } from '../utils/error-handler';

export interface UseGraphQLMutationOptions<TData, TVariables>
  extends Omit<UseMutationOptions<TData, TVariables>, 'mutation'> {
  mutation: DocumentNode;
  skipErrorToast?: boolean;
  onError?: (message: string, code?: string) => void;
  onSuccess?: (data: TData) => void;
}

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
export function useGraphQLMutation<TData = unknown, TVariables = Record<string, unknown>>(
  options: UseGraphQLMutationOptions<TData, TVariables>,
): [
  (
    options?: Parameters<UseMutationResult<TData, TVariables>['0']>[0],
  ) => Promise<{ data?: TData; errors?: unknown[] }>,
  UseMutationResult<TData, TVariables>,
] {
  const {
    skipErrorToast,
    onError,
    onSuccess,
    onCompleted,
    ...mutationOptions
  } = options;

  const [mutate, result] = useMutation<TData, TVariables>(mutationOptions);

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
          return { errors: response.errors };
        }

        if (response.data) {
          onSuccess?.(response.data);
          onCompleted?.(response.data);
        }

        return { data: response.data };
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

