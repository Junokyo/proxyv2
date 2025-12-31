/**
 * Custom GraphQL Query Hook
 *
 * Enhanced wrapper around useQuery with better error handling and TypeScript support
 */

import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import type {
  QueryHookOptions,
  QueryResult,
} from '@apollo/client/react/types/types';
import { DocumentNode } from 'graphql';
import { handleGraphQLError } from '../utils/error-handler';

export interface UseGraphQLQueryOptions<
  TData,
  TVariables extends OperationVariables = OperationVariables,
> extends Omit<QueryHookOptions<TData, TVariables>, 'query' | 'onError'> {
  query: DocumentNode;
  skipErrorToast?: boolean;
  onError?: (message: string, code?: string) => void;
}

/**
 * Enhanced useQuery hook with automatic error handling
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useGraphQLQuery({
 *   query: GET_USERS_QUERY,
 *   variables: { page: 1 },
 *   skipErrorToast: false, // default: false
 *   onError: (message, code) => {
 *     console.error('Query error:', message, code);
 *   }
 * });
 * ```
 */
export function useGraphQLQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  options: UseGraphQLQueryOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const { skipErrorToast, onError, query, ...queryOptions } = options;

  const result = useQuery<TData, TVariables>(query, queryOptions);

  // Handle errors automatically
  useEffect(() => {
    if (result.error) {
      handleGraphQLError(result.error, {
        showToast: !skipErrorToast,
        onError,
      });
    }
  }, [result.error, skipErrorToast, onError]);

  return result;
}
