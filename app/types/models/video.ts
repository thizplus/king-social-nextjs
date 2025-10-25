// types/models/video.ts

import type { UserSummary } from './user';

/**
 * Video Sort Options
 */
export type VideoSortBy = 'newest' | 'oldest' | 'popular';

/**
 * Video Model
 * Represents a video uploaded by a user
 */
export interface Video {
  id: string;
  userId: string;
  user?: UserSummary;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  width: number;
  height: number;
  fileSize: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
