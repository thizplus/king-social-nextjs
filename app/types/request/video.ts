// types/request/video.ts

import type { VideoSortBy } from '../models/video';

/**
 * Upload Video Request
 * Data required to upload a new video
 */
export interface UploadVideoRequest {
  title: string;
  description?: string;
  videoFileId: string;
  thumbnailId?: string;
  duration?: number;
  width?: number;
  height?: number;
}

/**
 * Update Video Request
 * Data to update an existing video
 */
export interface UpdateVideoRequest {
  title?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Video Query Parameters
 * Filter and pagination params for video list
 */
export interface VideoQueryParams {
  page?: number;
  limit?: number;
  userId?: string;
  sortBy?: VideoSortBy;
  isActive?: boolean;
}
