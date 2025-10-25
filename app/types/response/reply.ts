// types/response/reply.ts

import type { Reply } from '../models/reply';
import type { PaginationMeta } from '../common';

/**
 * Reply Response
 * Single reply data response
 */
export type ReplyResponse = Reply;

/**
 * Reply List Response
 * Paginated list of replies
 */
export interface ReplyListResponse {
  replies: ReplyResponse[];
  meta: PaginationMeta;
}
