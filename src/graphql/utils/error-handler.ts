/**
 * GraphQL Error Handling Utilities
 * 
 * Centralized error handling for GraphQL operations
 */

import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { toast } from 'sonner';

export interface GraphQLErrorInfo {
  message: string;
  code?: string;
  extensions?: Record<string, unknown>;
}

/**
 * Extract user-friendly error message from Apollo Error
 */
export function extractErrorMessage(error: ApolloError | Error): string {
  if (error instanceof ApolloError) {
    // Handle GraphQL errors
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const graphQLError = error.graphQLErrors[0];
      return graphQLError.message || 'An error occurred';
    }

    // Handle network errors
    if (error.networkError) {
      return error.networkError.message || 'Network error occurred';
    }

    // Fallback to error message
    return error.message || 'An unexpected error occurred';
  }

  return error.message || 'An unexpected error occurred';
}

/**
 * Extract error code from Apollo Error
 */
export function extractErrorCode(error: ApolloError): string | undefined {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    return (
      graphQLError.extensions?.code as string | undefined ||
      graphQLError.extensions?.errorCode as string | undefined
    );
  }
  return undefined;
}

/**
 * Check if error is a specific GraphQL error code
 */
export function isErrorCode(error: ApolloError, code: string): boolean {
  return extractErrorCode(error) === code;
}

/**
 * Parse GraphQL errors into structured format
 */
export function parseGraphQLErrors(
  error: ApolloError,
): GraphQLErrorInfo[] {
  if (!error.graphQLErrors || error.graphQLErrors.length === 0) {
    return [
      {
        message: error.message || 'An unexpected error occurred',
      },
    ];
  }

  return error.graphQLErrors.map((err: GraphQLError) => ({
    message: err.message,
    code: (err.extensions?.code as string) || undefined,
    extensions: err.extensions as Record<string, unknown> | undefined,
  }));
}

/**
 * Show error toast notification
 */
export function showGraphQLError(error: ApolloError | Error): void {
  const message = extractErrorMessage(error);
  toast.error(message);
}

/**
 * Handle GraphQL error with custom callback
 */
export function handleGraphQLError(
  error: ApolloError | Error,
  options?: {
    onError?: (message: string, code?: string) => void;
    showToast?: boolean;
  },
): void {
  const message = extractErrorMessage(error);
  const code =
    error instanceof ApolloError ? extractErrorCode(error) : undefined;

  if (options?.showToast !== false) {
    showGraphQLError(error);
  }

  if (options?.onError) {
    options.onError(message, code);
  }
}

