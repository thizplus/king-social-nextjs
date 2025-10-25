// types/response/video.ts

import type { Video } from '../models/video';
import type { PaginationMeta } from '../common';

/**
 * Video Response
 * Single video data response
 */
export type VideoResponse = Video;

/**
 * Video List Response
 * Paginated list of videos
 */
export interface VideoListResponse {
  videos: VideoResponse[];
  meta: PaginationMeta;
}
