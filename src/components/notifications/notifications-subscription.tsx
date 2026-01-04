/**
 * Notifications Subscription Component
 *
 * Component that subscribes to real-time notifications via GraphQL subscription
 * and adds them to the notification store
 */

import { keycloak } from '@/auth/lib/keycloak';
import { useKC } from '@/auth/providers/keycloak.provider';
import { useNotificationsSubscription } from '@/graphql/hooks/notifications';

/**
 * Component that handles GraphQL subscription for notifications
 * This component doesn't render anything - it just subscribes to notifications
 * and adds them to the notification store via the subscription hook
 */
export function NotificationsSubscription() {
  // const { authenticated, ready } = useKC();
  const { token } = keycloak; // Thêm import keycloak

  // Kiểm tra token có tồn tại không, không chỉ authenticated flag
  const shouldSkip = !token;
  // Only subscribe when user is authenticated and Keycloak is ready
  useNotificationsSubscription({
    skip: shouldSkip,
  });

  // This component doesn't render anything
  return null;
}
