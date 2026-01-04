/**
 * Enhanced GraphQL Client Configuration
 *
 * Apollo Client setup with improved error handling, cache configuration, and TypeScript support
 */

import { keycloak } from '@/auth/lib/keycloak';
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const { VITE_GRAPHQL_ENDPOINT, VITE_GRAPHQL_WS_ENDPOINT } = import.meta.env;

// Ở môi trường deploy: cấu hình VITE_GRAPHQL_ENDPOINT = 'https://api.domain.com/graphql'
// Ở local dev: có thể bỏ trống, client sẽ dùng '/graphql' và đi qua proxy trong vite.config.ts
const GRAPHQL_URI = VITE_GRAPHQL_ENDPOINT || '/graphql';

// WebSocket endpoint - convert HTTP endpoint to WebSocket
// For dev: use ws://localhost:8080/graphql (goes through Vite proxy)
// For production: use wss:// with the same base URL
function getWebSocketUri(): string {
  if (VITE_GRAPHQL_WS_ENDPOINT) {
    return VITE_GRAPHQL_WS_ENDPOINT;
  }
  if (VITE_GRAPHQL_ENDPOINT) {
    // Convert https:// to wss://, http:// to ws://
    return VITE_GRAPHQL_ENDPOINT.replace(/^http/, 'ws');
  }
  // Development: use ws:// with the same path (goes through Vite proxy)
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  console.log('getWebSocketUri', `${protocol}//${host}/graphql`);

  return `${protocol}//${host}/graphql`;
}

/**
 * HTTP Link Configuration
 */
const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  // Add any additional HTTP link options here
  // credentials: 'include', // if needed for CORS
});

/**
 * WebSocket Link Configuration for Subscriptions
 * Includes Authorization header with Bearer token
 */
const wsClient = createClient({
  url: getWebSocketUri(),
  connectionParams: () => {
    const token = keycloak.token;
    if (!token) {
      console.warn(
        '[GraphQL Subscription] No token available for WebSocket connection',
      );
      return {};
    }
    console.log(
      '[GraphQL Subscription] Connecting with token:',
      `Bearer ${token.substring(0, 20)}...`,
    );
    return {
      Authorization: `Bearer ${token}`,
    };
  },
  shouldRetry: () => true,
});

// Log connection events
wsClient.on('opened', () => {
  console.log(
    '[GraphQL Subscription] WebSocket connection opened successfully',
  );
});

wsClient.on('closed', () => {
  console.log('[GraphQL Subscription] WebSocket connection closed');
});

wsClient.on('error', (error: Error) => {
  console.error('[GraphQL Subscription] WebSocket connection error:', error);
});

const wsLink = new GraphQLWsLink(wsClient);

/**
 * Split link: subscriptions go to WebSocket, queries/mutations go to HTTP
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

/**
 * Authentication Link
 * Automatically adds Bearer token to requests
 */
const authLink = setContext(async (_, { headers }) => {
  let token = keycloak.token;

  if (keycloak.authenticated && token) {
    // Kiểm tra và refresh token nếu sắp hết hạn
    try {
      const refreshed = await keycloak.updateToken(30); // Refresh nếu còn < 30s
      if (refreshed) {
        token = keycloak.token;
        console.log('[GraphQL Auth] Token refreshed');
      }
    } catch (error) {
      console.error('[GraphQL Auth] Token refresh failed:', error);
      // Nếu refresh fail, vẫn dùng token cũ (có thể sẽ bị reject bởi server)
    }
  }

  // Log token info (không log full token vì security)
  if (token) {
    const tokenParsed = keycloak.tokenParsed;
    console.log('[GraphQL Auth] Token parsed:', {
      exp: tokenParsed?.exp,
      iat: tokenParsed?.iat,
      username: tokenParsed?.preferred_username,
      roles: tokenParsed?.realm_access?.roles,
    });
    console.log(
      '[GraphQL Auth] Authorization header:',
      `Bearer ${token.substring(0, 20)}...`,
    );
  } else {
    console.warn('[GraphQL Auth] No token available!');
  }
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
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
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
 * Configured with auth, error handling, cache, and subscriptions
 */
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
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
});

/**
 * Helper function to clear cache
 */
export async function clearApolloCache(): Promise<void> {
  await apolloClient.clearStore();
}

/**
 * Helper function to reset cache
 */
export async function resetApolloCache(): Promise<void> {
  await apolloClient.resetStore();
}
