// types/response/notification.ts

import type { Notification } from '../models/notification';

/**
 * Notification Response
 * Single notification data response
 */
export type NotificationResponse = Notification;

/**
 * Notification List Response
 * Paginated list of notifications
 */
export interface NotificationListResponse {
  notifications: NotificationResponse[];
  totalCount: number;
  unreadCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Unread Count Response
 * Count of unread notifications
 */
export interface UnreadCountResponse {
  count: number;
}

/**
 * Mark As Read Response
 * Response after marking notifications as read
 */
export interface MarkAsReadResponse {
  message: string;
  count: number;
}
