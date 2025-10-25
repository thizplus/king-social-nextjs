// types/request/forum.ts

import type { ForumOrder } from '../models/forum';

/**
 * Create Forum Request
 * Data required to create a new forum
 */
export interface CreateForumRequest {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
}

/**
 * Update Forum Request
 * Data to update an existing forum
 */
export interface UpdateForumRequest {
  name?: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

/**
 * Reorder Forums Request
 * Batch update forum order
 */
export interface ReorderForumsRequest {
  forumOrders: ForumOrder[];
}
