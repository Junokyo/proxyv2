/**
 * Notifications Subscription Component
 *
 * Component that subscribes to real-time notifications via GraphQL subscription
 * and adds them to the notification store
 *
 * Ensures subscription is only activated after token is ready
 * Handles token management and subscription lifecycle
 */

import { useEffect, useMemo, useState } from 'react';
import { keycloak } from '@/auth/lib/keycloak';
import { useAuthStore } from '@/auth/store/auth.store';
import { getWebSocketUri } from '@/graphql/client';
import { useNotificationsSubscription } from '@/graphql/hooks/notifications';
import {
  createTokenStrategy,
  getTokenSourceFromEnv,
} from '@/graphql/subscriptions/token-strategy';

/**
 * Component that handles GraphQL subscription for notifications
 * This component doesn't render anything - it just subscribes to notifications
 * and adds them to the notification store via the subscription hook
 *
 * Subscription is only activated when:
 * - Token is available and ready (from keycloak or store)
 * - Token is valid (not expired)
 * - Component is mounted
 */
export function NotificationsSubscription() {
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoize token strategy to prevent unnecessary re-renders
  const tokenStrategy = useMemo(
    () => createTokenStrategy(getTokenSourceFromEnv()),
    [],
  );
  const hasToken = !!tokenStrategy.getToken();
  const tokenReady = tokenStrategy.isTokenReady();
  const tokenSource = tokenStrategy.getTokenSource();

  // Get store state for reactive updates
  const { token: storeToken, tokenReady: storeTokenReady } = useAuthStore();
  const storeHasToken = !!storeToken;

  // Debug token state and compare store vs keycloak tokens
  useEffect(() => {
    const token = tokenStrategy.getToken();
    const keycloakToken = keycloak.token;
    const storeToken = useAuthStore.getState().token;

    console.log('🔑 [Token Comparison]', {
      tokenSource,
      hasToken,
      tokenReady,
      storeTokenReady,
      storeHasToken,
      keycloakTokenLength: keycloakToken?.length || 0,
      storeTokenLength: storeToken?.length || 0,
      tokensMatch: keycloakToken === storeToken,
      keycloakAuthenticated: keycloak.authenticated,
      keycloakTokenPrefix: keycloakToken?.substring(0, 50) || 'null',
      storeTokenPrefix: storeToken?.substring(0, 50) || 'null',
    });

    // Check if token is expired
    if (keycloakToken && keycloak.tokenParsed) {
      const now = Date.now() / 1000;
      const exp = keycloak.tokenParsed.exp;
      const iat = keycloak.tokenParsed.iat;
      console.log('⏰ [Token Expiry Check]', {
        currentTime: now,
        issuedAt: iat,
        expiresAt: exp,
        timeToExpiry: exp ? exp - now : 'unknown',
        isExpired: exp ? now > exp : 'unknown',
      });
    }
  }, [
    tokenStrategy,
    tokenSource,
    hasToken,
    tokenReady,
    storeTokenReady,
    storeHasToken,
  ]);

  // Subscription should be skipped if:
  // 1. Token is not available
  // 2. Token is not ready
  // 3. Component not yet initialized
  // Wait for token readiness like queries/mutations do
  const shouldSkip = !hasToken || !tokenReady || !isInitialized;

  console.log('🚨 [Skip Logic]', {
    shouldSkip,
    hasToken,
    tokenReady,
    isInitialized,
  });

  console.log('🎯 [Subscription Call] Calling useNotificationsSubscription', {
    shouldSkip,
    endpoint: getWebSocketUri(),
  });

  const subscriptionState = useNotificationsSubscription({
    skip: shouldSkip,
  });
  console.log('🎯 [Subscription Result]', subscriptionState);

  // Debug logging
  useEffect(() => {
    console.log('🔍 [Debug] Subscription state:', {
      shouldSkip,
      hasToken,
      tokenReady,
      tokenSource,
      isInitialized,
      subscriptionActive: subscriptionState.isActive,
      subscriptionLoading: subscriptionState.loading,
      subscriptionError: !!subscriptionState.error,
    });
  }, [
    shouldSkip,
    hasToken,
    tokenReady,
    tokenSource,
    isInitialized,
    subscriptionState,
  ]);

  // Initialize component and wait for token readiness (like queries/mutations)
  // This mimics tokenReadinessLink behavior for subscriptions
  useEffect(() => {
    console.log(
      '🔄 [Notifications Subscription] Component MOUNTED - Checking token readiness',
    );

    // Check if token is already ready (immediate)
    const initialState = useAuthStore.getState();
    if (initialState.tokenReady) {
      console.info(
        '[Notifications Subscription] Token already ready - Starting subscription immediately',
        {
          storeTokenReady: initialState.tokenReady,
          storeHasToken: !!initialState.token,
          timestamp: new Date().toISOString(),
        },
      );
      setIsInitialized(true);
      return;
    }

    // Token not ready - wait like queries/mutations do (polling every 50ms)
    console.info(
      '[Notifications Subscription] Token not ready - Waiting like queries/mutations...',
      {
        currentTokenReady: initialState.tokenReady,
        timestamp: new Date().toISOString(),
      },
    );

    let timeoutId: NodeJS.Timeout | null = null;
    let checkCount = 0;

    const checkTokenReady = () => {
      checkCount++;
      const currentState = useAuthStore.getState();

      if (currentState.tokenReady) {
        console.info(
          '[Notifications Subscription] Token became ready - Starting subscription',
          {
            storeTokenReady: currentState.tokenReady,
            storeHasToken: !!currentState.token,
            checksPerformed: checkCount,
            timestamp: new Date().toISOString(),
          },
        );
        setIsInitialized(true);
        if (timeoutId) clearTimeout(timeoutId);
        return;
      }

      // Continue polling every 50ms (same as tokenReadinessLink)
      timeoutId = setTimeout(checkTokenReady, 50);
    };

    // Start polling
    timeoutId = setTimeout(checkTokenReady, 50);

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // Only run once on mount

  // Log token status changes for debugging
  useEffect(() => {
    if (!isInitialized) return;

    console.info('[Notifications Subscription] Token status update', {
      tokenSource,
      hasToken,
      tokenReady,
      subscriptionActive: subscriptionState.isActive,
      timestamp: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionState.isActive, isInitialized]);

  // Log subscription state for monitoring
  useEffect(() => {
    if (!isInitialized) return;

    if (subscriptionState.error && subscriptionState.error !== null) {
      console.error(
        '[Notifications Subscription] Component detected subscription error:',
        {
          error: subscriptionState.error.message,
          tokenSource,
          hasToken,
          tokenReady,
        },
      );
    }
  }, [
    subscriptionState.error,
    tokenSource,
    hasToken,
    tokenReady,
    isInitialized,
  ]);

  // Debug: Render subscription status for development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          maxWidth: '300px',
        }}
      >
        <div>📡 Subscription Debug:</div>
        <div>Store Token: {storeHasToken ? '✅' : '❌'}</div>
        <div>Store Token Ready: {storeTokenReady ? '✅' : '❌'}</div>
        <div>Initialized: {isInitialized ? '✅' : '❌'}</div>
        <div>Active: {subscriptionState.isActive ? '✅' : '❌'}</div>
        <div>Loading: {subscriptionState.loading ? '⏳' : '✅'}</div>
        <div>Error: {subscriptionState.error ? '❌' : '✅'}</div>
        <div>Endpoint: {getWebSocketUri()}</div>
        <div style={{ color: '#666', fontSize: '10px' }}>
          VITE_GRAPHQL_ENDPOINT:{' '}
          {import.meta.env.VITE_GRAPHQL_ENDPOINT || 'not set'}
        </div>
        <div style={{ color: '#666', fontSize: '10px' }}>
          VITE_GRAPHQL_WS_ENDPOINT:{' '}
          {import.meta.env.VITE_GRAPHQL_WS_ENDPOINT || 'not set'}
        </div>
        <div style={{ color: '#ff6b6b', fontSize: '10px' }}>
          Error: auth.errors.unauthorized - Token rejected by server
        </div>
        <div style={{ color: '#ffa500', fontSize: '10px', marginTop: '5px' }}>
          {shouldSkip
            ? '⏸️ Waiting for store token...'
            : '▶️ Subscription active'}
        </div>
        {subscriptionState.error && (
          <div style={{ color: '#ff6b6b', fontSize: '10px' }}>
            {subscriptionState.error.message}
          </div>
        )}
        <button
          onClick={() => {
            console.log('🔄 Manual subscription test...');
            window.location.reload(); // Force reload to test
          }}
          style={{
            marginTop: '5px',
            padding: '2px 5px',
            fontSize: '10px',
            background: '#007bff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          Test Reload
        </button>
      </div>
    );
  }

  // This component doesn't render anything - it just manages the subscription
  return null;
}
