// types/models/notification.ts

/**
 * Notification Type Enum
 * Types of notifications that can be sent
 */
export type NotificationType =
  | 'topic_reply'
  | 'topic_like'
  | 'video_like'
  | 'video_comment'
  | 'comment_reply'
  | 'new_follower';

/**
 * Actor Summary
 * Minimal user info for notification actor
 */
export interface ActorSummary {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
}

/**
 * Notification Model
 * Represents a notification sent to a user
 */
export interface Notification {
  id: string;
  userId: string;
  actor: ActorSummary;
  type: NotificationType;
  resourceId?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}
