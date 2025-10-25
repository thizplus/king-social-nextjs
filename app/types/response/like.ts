// types/response/like.ts

import type { Like } from '../models/like';

/**
 * Like Response
 * Single like data response
 */
export type LikeResponse = Like;

/**
 * Like Status Response
 * Current like status for a resource
 */
export interface LikeStatusResponse {
  isLiked: boolean;
  likeCount: number;
}
