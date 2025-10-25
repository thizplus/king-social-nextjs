// types/models/comment.ts

/**
 * Comment User Summary
 * Minimal user info for comment responses
 */
export interface CommentUserSummary {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

/**
 * Comment Model
 * Represents a comment on a video (supports nested comments)
 */
export interface Comment {
  id: string;
  userId: string;
  user: CommentUserSummary;
  videoId: string;
  parentId?: string | null;
  content: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}
