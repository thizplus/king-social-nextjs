// types/request/notification.ts

import type { NotificationType } from '../models/notification';

/**
 * Mark As Read Request
 * Request to mark notifications as read
 */
export interface MarkAsReadRequest {
  notificationIds: string[];
}

/**
 * Notification Query Parameters
 * Filter and pagination params for notification list
 */
export interface NotificationQueryParams {
  type?: NotificationType;
  isRead?: boolean;
  page?: number;
  limit?: number;
}
