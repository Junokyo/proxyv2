/**
 * Custom GraphQL Lazy Query Hook
 *
 * Enhanced wrapper around useLazyQuery with better error handling
 */

import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import type {
  LazyQueryHookOptions,
  LazyQueryResultTuple,
} from '@apollo/client/react/types/types';
import { DocumentNode } from 'graphql';
import { handleGraphQLError } from '../utils/error-handler';

export interface UseGraphQLLazyQueryOptions<
  TData,
  TVariables extends OperationVariables = OperationVariables,
> extends Omit<LazyQueryHookOptions<TData, TVariables>, 'query' | 'onError'> {
  query: DocumentNode;
  skipErrorToast?: boolean;
  onError?: (message: string, code?: string) => void;
}

/**
 * Enhanced useLazyQuery hook with automatic error handling
 *
 * @example
 * ```tsx
 * const [loadUsers, { data, loading, error }] = useGraphQLLazyQuery({
 *   query: GET_USERS_QUERY,
 *   onError: (message, code) => void {
 *     console.error('Query error:', message, code);
 *   }
 * });
 *
 * const handleLoad = () => {
 *   loadUsers({ variables: { page: 1 } });
 * };
 * ```
 */
export function useGraphQLLazyQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  options: UseGraphQLLazyQueryOptions<TData, TVariables>,
): LazyQueryResultTuple<TData, TVariables> {
  const { skipErrorToast, onError, query, ...queryOptions } = options;

  const [loadQuery, result] = useLazyQuery<TData, TVariables>(
    query,
    queryOptions,
  );

  // Handle errors automatically
  useEffect(() => {
    if (result.error) {
      handleGraphQLError(result.error, {
        showToast: !skipErrorToast,
        onError,
      });
    }
  }, [result.error, skipErrorToast, onError]);

  return [loadQuery, result];
}
