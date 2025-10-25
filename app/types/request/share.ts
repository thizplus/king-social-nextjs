// types/request/share.ts

import type { SharePlatform } from '../models/share';

/**
 * Share Video Request
 * Request to share a video on a platform
 */
export interface ShareVideoRequest {
  videoId: string;
  platform: SharePlatform;
}
