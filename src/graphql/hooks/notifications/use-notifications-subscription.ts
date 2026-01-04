/**
 * Notifications Subscription Hook
 *
 * Hook to subscribe to real-time notifications via GraphQL subscription
 */

import { useEffect } from 'react';
import { keycloak } from '@/auth/lib/keycloak';
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

  const { token } = keycloak; // Thêm import keycloak

  // Kiểm tra token có tồn tại không, không chỉ authenticated flag
  const shouldSkip = !token;

  const { data, error } =
    useSubscription<NotificationsReceivedSubscriptionData>(
      NOTIFICATIONS_RECEIVED_SUBSCRIPTION,
      {
        skip: shouldSkip,
        onSubscriptionData: ({ subscriptionData }) => {
          if (subscriptionData.data?.notificationsReceived) {
            const notificationData =
              subscriptionData.data.notificationsReceived;
            console.log(
              '[Notifications Subscription] Received notification:',
              notificationData,
            );

            // Map subscription notification type to notification provider type
            const notificationType = mapNotificationType(notificationData.type);

            // Parse timestamp
            const timestamp =
              typeof notificationData.timestamp === 'string'
                ? new Date(notificationData.timestamp)
                : new Date(notificationData.timestamp * 1000); // Convert Unix timestamp if needed

            // Add notification to store
            addNotification({
              type: notificationType,
              title: notificationData.title,
              description: notificationData.message,
              time: timeAgo(timestamp),
            });
          }
        },
        onError: (error) => {
          console.error(
            '[Notifications Subscription] Subscription error:',
            error,
          );
        },
        onComplete: () => {
          console.log('[Notifications Subscription] Subscription completed');
        },
      },
    );

  // Log subscription status
  useEffect(() => {
    if (options?.skip) {
      console.log('[Notifications Subscription] Subscription skipped');
      return;
    }

    if (error) {
      console.error('[Notifications Subscription] Subscription error:', error);
    }

    if (data) {
      console.log(
        '[Notifications Subscription] Subscription active, waiting for notifications...',
      );
    }
  }, [data, error, options?.skip]);

  return {
    data,
    error,
  };
}

/**
 * Map subscription notification type to notification provider type
 */
function mapNotificationType(
  type: string,
): 'topup' | 'message' | 'system' | 'other' {
  const normalizedType = type.toLowerCase();

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
  if (normalizedType === 'system' || normalizedType === 'alert') {
    return 'system';
  }

  return 'other';
}
