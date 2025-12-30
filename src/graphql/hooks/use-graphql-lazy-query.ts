/**
 * Custom GraphQL Lazy Query Hook
 * 
 * Enhanced wrapper around useLazyQuery with better error handling
 */

import {
  useLazyQuery,
  UseLazyQueryOptions,
  UseLazyQueryResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useEffect } from 'react';
import { handleGraphQLError } from '../utils/error-handler';

export interface UseGraphQLLazyQueryOptions<TData, TVariables>
  extends Omit<UseLazyQueryOptions<TData, TVariables>, 'query'> {
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
export function useGraphQLLazyQuery<TData = unknown, TVariables = Record<string, unknown>>(
  options: UseGraphQLLazyQueryOptions<TData, TVariables>,
): [
  (
    options?: Parameters<UseLazyQueryResult<TData, TVariables>['0']>[0],
  ) => void,
  UseLazyQueryResult<TData, TVariables>,
] {
  const { skipErrorToast, onError, ...queryOptions } = options;

  const [loadQuery, result] = useLazyQuery<TData, TVariables>(queryOptions);

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

