// types/response/comment.ts

import type { Comment } from '../models/comment';

/**
 * Comment Response
 * Single comment data response
 */
export type CommentResponse = Comment;

/**
 * Comment List Response
 * Paginated list of comments
 */
export interface CommentListResponse {
  comments: CommentResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
