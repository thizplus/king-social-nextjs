// types/models/reply.ts

import type { UserSummary } from './user';

/**
 * Reply Model
 * Represents a reply to a topic (supports nested replies)
 */
export interface Reply {
  id: string;
  topicId: string;
  userId: string;
  user?: UserSummary;
  parentId?: string | null;
  content: string;
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
}
