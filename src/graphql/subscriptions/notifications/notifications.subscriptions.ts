/**
 * Notifications Subscriptions
 * 
 * GraphQL subscriptions for real-time notifications
 */

import { gql } from '../../utils/gql';

/**
 * Subscription for receiving real-time notifications
 */
export const NOTIFICATIONS_RECEIVED_SUBSCRIPTION = gql`
  subscription NotificationsReceived {
    notificationsReceived {
      type
      userID
      timestamp
      title
      message
      data
    }
  }
`;

