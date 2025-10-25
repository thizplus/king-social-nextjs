// types/models/share.ts

/**
 * Share Platform Enum
 * Supported platforms for sharing
 */
export type SharePlatform = 'facebook' | 'twitter' | 'line' | 'copy_link';

/**
 * Share Model
 * Represents a video share action
 */
export interface Share {
  id: string;
  userId: string;
  videoId: string;
  platform: SharePlatform;
  createdAt: string;
}
