// types/models/like.ts

/**
 * Like Model
 * Represents a like on a topic or video
 */
export interface Like {
  id: string;
  userId: string;
  topicId?: string | null;
  videoId?: string | null;
  createdAt: string;
}
