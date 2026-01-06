/**
 * Token Strategy for GraphQL Subscriptions
 *
 * Manages token retrieval and readiness for WebSocket subscriptions
 */

import { keycloak } from '@/auth/lib/keycloak';
import { useAuthStore } from '@/auth/store/auth.store';

export interface TokenStrategy {
  getToken(): string | null;
  isTokenReady(): boolean;
  getTokenSource(): 'keycloak' | 'store' | 'none';
}

/**
 * Environment-based token strategy
 * Determines which token source to use based on environment and availability
 */
export function getTokenSourceFromEnv(): 'keycloak' | 'store' {
  // Priority: keycloak > store
  if (keycloak.token && keycloak.authenticated) {
    return 'keycloak';
  }

  const storeState = useAuthStore.getState();
  if (storeState.token && storeState.tokenReady) {
    return 'store';
  }

  return 'store'; // Default fallback
}

/**
 * Creates a token strategy based on the specified source
 */
export function createTokenStrategy(source: 'keycloak' | 'store'): TokenStrategy {
  if (source === 'keycloak') {
    return {
      getToken: () => keycloak.token || null,
      isTokenReady: () => !!(keycloak.authenticated && keycloak.token),
      getTokenSource: () => 'keycloak',
    };
  }

  // Store strategy
  return {
    getToken: () => {
      const state = useAuthStore.getState();
      return state.token || null;
    },
    isTokenReady: () => {
      const state = useAuthStore.getState();
      return state.tokenReady;
    },
    getTokenSource: () => 'store',
  };
}
