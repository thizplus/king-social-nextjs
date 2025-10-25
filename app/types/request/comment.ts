// types/request/comment.ts

/**
 * Create Comment Request
 * Data required to create a comment on a video
 */
export interface CreateCommentRequest {
  videoId: string;
  content: string;
  parentId?: string | null;
}

/**
 * Update Comment Request
 * Data to update an existing comment
 */
export interface UpdateCommentRequest {
  content: string;
}
