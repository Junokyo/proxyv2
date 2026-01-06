/**
 * Notifications Subscription Hook
 *
 * Hook to subscribe to real-time notifications via GraphQL subscription
 */

import { useEffect, useRef, useState } from 'react';
import {
  createTokenStrategy,
  getTokenSourceFromEnv,
} from '@/graphql/subscriptions/token-strategy';
import { useSubscription } from '@apollo/client';
import { timeAgo } from '@/lib/helpers';
import { useNotification } from '@/providers/notification-provider';
import { NOTIFICATIONS_RECEIVED_SUBSCRIPTION } from '../../subscriptions/notifications';

/**
 * GraphQL Subscription Response Type
 */
interface NotificationsReceivedSubscriptionData {
  notificationsReceived: {
    type: string;
    userID: string;
    timestamp: string | number;
    title: string;
    message: string;
    data?: Record<string, unknown> | null;
  };
}

/**
 * Hook to subscribe to real-time notifications
 * Automatically adds notifications to the notification store when received
 *
 * @param options.skip - Skip the subscription (useful when user is not authenticated)
 */
export function useNotificationsSubscription(options?: { skip?: boolean }) {
  const { addNotification } = useNotification();
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const errorCountRef = useRef(0);
  const lastErrorTimeRef = useRef<number>(0);

  const tokenStrategy = createTokenStrategy(getTokenSourceFromEnv());
  const hasToken = !!tokenStrategy.getToken();
  const tokenReady = tokenStrategy.isTokenReady();
  const tokenSource = tokenStrategy.getTokenSource();

  // Only subscribe when token exists and is ready, and caller does not force skip
  const shouldSkip = options?.skip === true || !hasToken || !tokenReady;

  const { data, error, loading } =
    useSubscription<NotificationsReceivedSubscriptionData>(
      NOTIFICATIONS_RECEIVED_SUBSCRIPTION,
      {
        skip: shouldSkip,
        onSubscriptionData: ({ subscriptionData }) => {
          if (subscriptionData.data?.notificationsReceived) {
            const notificationData =
              subscriptionData.data.notificationsReceived;

            // Log notification receipt (only for debugging, not spam)
            if (process.env.NODE_ENV === 'development') {
              console.log(
                '[Notifications Subscription] Received notification:',
                {
                  type: notificationData.type,
                  title: notificationData.title,
                  userID: notificationData.userID,
                  timestamp: notificationData.timestamp,
                },
              );
            }

            // Map subscription notification type to notification provider type
            const notificationType = mapNotificationType(notificationData.type);

            // Parse timestamp - handle both string ISO dates and Unix timestamps
            let timestamp: Date;
            if (typeof notificationData.timestamp === 'string') {
              timestamp = new Date(notificationData.timestamp);
            } else {
              // Assume Unix timestamp in milliseconds or seconds
              const ts = notificationData.timestamp;
              timestamp = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
            }

            // Validate timestamp
            if (isNaN(timestamp.getTime())) {
              console.warn(
                '[Notifications Subscription] Invalid timestamp received:',
                notificationData.timestamp,
              );
              timestamp = new Date(); // Fallback to current time
            }

            // Add notification to store
            addNotification({
              type: notificationType,
              title: notificationData.title,
              description: notificationData.message,
              time: timeAgo(timestamp),
            });

            // Reset error count on successful data
            errorCountRef.current = 0;
            setLastError(null);
          }
        },
        onError: (error) => {
          const now = Date.now();
          errorCountRef.current += 1;

          // Prevent spam logging - only log if it's been more than 30 seconds since last error
          // or if it's a different error type
          const shouldLogError =
            now - lastErrorTimeRef.current > 30000 ||
            lastError?.message !== error.message;

          if (shouldLogError) {
            console.error('[Notifications Subscription] Subscription error:', {
              error: error.message,
              count: errorCountRef.current,
              tokenSource,
              hasToken,
              tokenReady,
              timestamp: new Date().toISOString(),
            });
            lastErrorTimeRef.current = now;
            setLastError(error);
          }
        },
        onComplete: () => {
          console.info('[Notifications Subscription] Subscription completed');
          setSubscriptionActive(false);
        },
      },
    );

  // Track subscription status and log important state changes
  useEffect(() => {
    const newActiveState = !shouldSkip && !loading && !error;
    const stateChanged = newActiveState !== subscriptionActive;

    if (stateChanged) {
      setSubscriptionActive(newActiveState);

      if (newActiveState) {
        console.info('[Notifications Subscription] Subscription activated', {
          tokenSource,
          hasToken,
          tokenReady,
          timestamp: new Date().toISOString(),
        });
      } else if (!shouldSkip) {
        console.warn('[Notifications Subscription] Subscription deactivated', {
          loading,
          hasError: !!error,
          tokenSource,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [
    shouldSkip,
    loading,
    error,
    subscriptionActive,
    tokenSource,
    hasToken,
    tokenReady,
  ]);

  // Log when subscription is skipped due to token issues
  useEffect(() => {
    if (options?.skip) {
      console.info(
        '[Notifications Subscription] Subscription skipped by option',
      );
      return;
    }

    if (!hasToken) {
      console.warn(
        '[Notifications Subscription] Subscription skipped - no token available',
      );
    } else if (!tokenReady) {
      console.info(
        '[Notifications Subscription] Waiting for token to be ready...',
      );
    }
  }, [options?.skip, hasToken, tokenReady]);

  return {
    data,
    error: lastError,
    loading,
    isActive: subscriptionActive,
    tokenSource,
    hasToken,
    tokenReady,
  };
}

/**
 * Map subscription notification type to notification provider type
 * According to requirements: notifications with type "notification" go to "system" tab
 */
function mapNotificationType(
  type: string,
): 'topup' | 'message' | 'system' | 'other' {
  const normalizedType = type.toLowerCase();

  // Priority mapping based on requirements
  if (normalizedType === 'notification') {
    return 'system'; // Explicit requirement: type "notification" -> system tab
  }

  if (
    normalizedType === 'topup' ||
    normalizedType === 'payment' ||
    normalizedType === 'deposit'
  ) {
    return 'topup';
  }

  if (normalizedType === 'message' || normalizedType === 'chat') {
    return 'message';
  }

  if (
    normalizedType === 'system' ||
    normalizedType === 'alert' ||
    normalizedType === 'info' ||
    normalizedType === 'warning'
  ) {
    return 'system';
  }

  // Default fallback
  console.warn(
    `[Notifications Subscription] Unknown notification type "${type}", mapping to "other"`,
  );
  return 'other';
}
