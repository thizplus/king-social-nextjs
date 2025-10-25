// types/models/topic.ts

import type { Forum } from './forum';
import type { UserSummary } from './user';

/**
 * Topic Model
 * Represents a discussion topic in a forum
 */
export interface Topic {
  id: string;
  forumId: string;
  forum?: Forum;
  userId: string;
  user?: UserSummary;
  title: string;
  content: string;
  thumbnail?: string;
  viewCount: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}
