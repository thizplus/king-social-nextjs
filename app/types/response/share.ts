// types/response/share.ts

import type { Share } from '../models/share';

/**
 * Share Response
 * Response after sharing a video
 */
export interface ShareResponse extends Share {
  message: string;
}

/**
 * Share Count Response
 * Share count for a video
 */
export interface ShareCountResponse {
  videoId: string;
  shareCount: number;
}
