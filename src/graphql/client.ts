/**
 * Enhanced GraphQL Client Configuration
 * 
 * Apollo Client setup with improved error handling, cache configuration, and TypeScript support
 */

import { keycloak } from '@/auth/lib/keycloak';
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { showGraphQLError } from './utils/error-handler';

const { VITE_GRAPHQL_ENDPOINT } = import.meta.env;

// Ở môi trường deploy: cấu hình VITE_GRAPHQL_ENDPOINT = 'https://api.domain.com/graphql'
// Ở local dev: có thể bỏ trống, client sẽ dùng '/graphql' và đi qua proxy trong vite.config.ts
const GRAPHQL_URI = VITE_GRAPHQL_ENDPOINT || '/graphql';

/**
 * HTTP Link Configuration
 */
const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  // Add any additional HTTP link options here
  // credentials: 'include', // if needed for CORS
});

/**
 * Authentication Link
 * Automatically adds Bearer token to requests
 */
const authLink = setContext((_, { headers }) => {
  const token = keycloak.token;

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

/**
 * Error Link
 * Handles GraphQL and network errors globally
 */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions,
      );

      // Handle specific error codes if needed
      const errorCode = extensions?.code as string | undefined;
      if (errorCode === 'UNAUTHENTICATED') {
        // Handle authentication errors
        // You might want to redirect to login or refresh token
        console.warn('User is not authenticated');
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Handle network errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Handle 401 Unauthorized
      console.warn('Unauthorized request - token may be expired');
    }
  }
});

/**
 * Cache Configuration
 * Optimized cache settings for better performance
 */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // Add field policies here for specific queries if needed
        // Example:
        // users: {
        //   keyArgs: ['filter'],
        //   merge(existing = [], incoming) {
        //     return incoming;
        //   },
        // },
      },
    },
  },
  // Add any additional cache configuration
});

/**
 * Apollo Client Instance
 * Configured with auth, error handling, and cache
 */
export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  link: from([errorLink, authLink, httpLink]),
  cache,
  // Default options for all queries
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all', // Return both data and errors
      fetchPolicy: 'cache-and-network', // Use cache but also fetch
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Use cache first, then network
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  // Enable Apollo DevTools in development
  connectToDevTools: import.meta.env.DEV,
});

/**
 * Helper function to clear cache
 */
export function clearApolloCache(): Promise<void> {
  return apolloClient.clearStore();
}

/**
 * Helper function to reset cache
 */
export function resetApolloCache(): Promise<void> {
  return apolloClient.resetStore();
}

