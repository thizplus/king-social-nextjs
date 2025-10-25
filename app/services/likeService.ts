// services/likeService.ts
import apiService from './apiService';
import { LIKE_API } from '@/constants/api';
import type { ApiResponse } from '@/types/common';

// Response interfaces
interface LikeStatusData {
  isLiked: boolean;
  likeCount: number;
}

/**
 * Like Service
 * Handles like/unlike operations for topics and videos
 */
const likeService = {
  // Topic Like Methods

  /**
   * Like a topic
   * @param topicId - UUID of the topic to like
   * @returns Promise with like status
   */
  likeTopic: async (topicId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.post<LikeStatusData>(LIKE_API.LIKE_TOPIC(topicId));
      return {
        success: true,
        message: 'Topic liked successfully',
        data
      };
    } catch (error) {
      console.error('Error liking topic:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to like topic',
        data: undefined
      };
    }
  },

  /**
   * Unlike a topic
   * @param topicId - UUID of the topic to unlike
   * @returns Promise with like status
   */
  unlikeTopic: async (topicId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.delete<LikeStatusData>(LIKE_API.UNLIKE_TOPIC(topicId));
      return {
        success: true,
        message: 'Topic unliked successfully',
        data
      };
    } catch (error) {
      console.error('Error unliking topic:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to unlike topic',
        data: undefined
      };
    }
  },

  /**
   * Get topic like status
   * @param topicId - UUID of the topic to check
   * @returns Promise with like status
   */
  getTopicLikeStatus: async (topicId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.get<LikeStatusData>(LIKE_API.GET_TOPIC_LIKE_STATUS(topicId));
      return {
        success: true,
        message: 'Topic like status retrieved successfully',
        data
      };
    } catch (error) {
      console.error('Error getting topic like status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get topic like status',
        data: undefined
      };
    }
  },

  /**
   * Toggle topic like status
   * @param topicId - UUID of the topic to toggle
   * @returns Promise with like status
   */
  toggleTopicLike: async (topicId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      // Try to like first
      const likeResponse = await likeService.likeTopic(topicId);

      if (likeResponse.success) {
        return likeResponse;
      }

      // If like failed due to "already liked", try to unlike
      if (likeResponse.message?.includes('already liked')) {
        const unlikeResponse = await likeService.unlikeTopic(topicId);
        return unlikeResponse;
      }

      // If other error, return the like error
      return likeResponse;
    } catch (error) {
      console.error('Error toggling topic like:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle topic like',
        data: undefined
      };
    }
  },

  // Video Like Methods

  /**
   * Like a video
   * @param videoId - UUID of the video to like
   * @returns Promise with like status
   */
  likeVideo: async (videoId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.post<LikeStatusData>(LIKE_API.LIKE_VIDEO(videoId));
      return {
        success: true,
        message: 'Video liked successfully',
        data
      };
    } catch (error) {
      console.error('Error liking video:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to like video',
        data: undefined
      };
    }
  },

  /**
   * Unlike a video
   * @param videoId - UUID of the video to unlike
   * @returns Promise with like status
   */
  unlikeVideo: async (videoId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.delete<LikeStatusData>(LIKE_API.UNLIKE_VIDEO(videoId));
      return {
        success: true,
        message: 'Video unliked successfully',
        data
      };
    } catch (error) {
      console.error('Error unliking video:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to unlike video',
        data: undefined
      };
    }
  },

  /**
   * Get video like status
   * @param videoId - UUID of the video to check
   * @returns Promise with like status
   */
  getVideoLikeStatus: async (videoId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.get<LikeStatusData>(LIKE_API.GET_VIDEO_LIKE_STATUS(videoId));
      return {
        success: true,
        message: 'Video like status retrieved successfully',
        data
      };
    } catch (error) {
      console.error('Error getting video like status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get video like status',
        data: undefined
      };
    }
  },

  /**
   * Toggle video like status
   * @param videoId - UUID of the video to toggle
   * @returns Promise with like status
   */
  toggleVideoLike: async (videoId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      // First get current status
      const statusResponse = await likeService.getVideoLikeStatus(videoId);

      if (!statusResponse.success || !statusResponse.data) {
        return {
          success: false,
          message: statusResponse.message || 'Failed to get current like status',
          data: undefined
        };
      }

      const { isLiked } = statusResponse.data;

      // Toggle based on current status
      if (isLiked) {
        return await likeService.unlikeVideo(videoId);
      } else {
        return await likeService.likeVideo(videoId);
      }
    } catch (error) {
      console.error('Error toggling video like:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle video like',
        data: undefined
      };
    }
  },

  // Reply Like Methods

  /**
   * Like a reply
   * @param replyId - UUID of the reply to like
   * @returns Promise with like status
   */
  likeReply: async (replyId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.post<LikeStatusData>(LIKE_API.LIKE_REPLY(replyId));
      return {
        success: true,
        message: 'Reply liked successfully',
        data
      };
    } catch (error) {
      console.error('Error liking reply:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to like reply',
        data: undefined
      };
    }
  },

  /**
   * Unlike a reply
   * @param replyId - UUID of the reply to unlike
   * @returns Promise with like status
   */
  unlikeReply: async (replyId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.delete<LikeStatusData>(LIKE_API.UNLIKE_REPLY(replyId));
      return {
        success: true,
        message: 'Reply unliked successfully',
        data
      };
    } catch (error) {
      console.error('Error unliking reply:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to unlike reply',
        data: undefined
      };
    }
  },

  /**
   * Get reply like status
   * @param replyId - UUID of the reply to check
   * @returns Promise with like status
   */
  getReplyLikeStatus: async (replyId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.get<LikeStatusData>(LIKE_API.GET_REPLY_LIKE_STATUS(replyId));
      return {
        success: true,
        message: 'Reply like status retrieved successfully',
        data
      };
    } catch (error) {
      console.error('Error getting reply like status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get reply like status',
        data: undefined
      };
    }
  },

  /**
   * Toggle reply like status
   * @param replyId - UUID of the reply to toggle
   * @returns Promise with like status
   */
  toggleReplyLike: async (replyId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      // First get current status
      const statusResponse = await likeService.getReplyLikeStatus(replyId);

      if (!statusResponse.success || !statusResponse.data) {
        return {
          success: false,
          message: statusResponse.message || 'Failed to get current like status',
          data: undefined
        };
      }

      const { isLiked } = statusResponse.data;

      // Toggle based on current status
      if (isLiked) {
        return await likeService.unlikeReply(replyId);
      } else {
        return await likeService.likeReply(replyId);
      }
    } catch (error) {
      console.error('Error toggling reply like:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle reply like',
        data: undefined
      };
    }
  },

  // Comment Like Methods

  /**
   * Like a comment
   * @param commentId - UUID of the comment to like
   * @returns Promise with like status
   */
  likeComment: async (commentId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.post<LikeStatusData>(LIKE_API.LIKE_COMMENT(commentId));
      return {
        success: true,
        message: 'Comment liked successfully',
        data
      };
    } catch (error) {
      console.error('Error liking comment:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to like comment',
        data: undefined
      };
    }
  },

  /**
   * Unlike a comment
   * @param commentId - UUID of the comment to unlike
   * @returns Promise with like status
   */
  unlikeComment: async (commentId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.delete<LikeStatusData>(LIKE_API.UNLIKE_COMMENT(commentId));
      return {
        success: true,
        message: 'Comment unliked successfully',
        data
      };
    } catch (error) {
      console.error('Error unliking comment:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to unlike comment',
        data: undefined
      };
    }
  },

  /**
   * Get comment like status
   * @param commentId - UUID of the comment to check
   * @returns Promise with like status
   */
  getCommentLikeStatus: async (commentId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      const data = await apiService.get<LikeStatusData>(LIKE_API.GET_COMMENT_LIKE_STATUS(commentId));
      return {
        success: true,
        message: 'Comment like status retrieved successfully',
        data
      };
    } catch (error) {
      console.error('Error getting comment like status:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get comment like status',
        data: undefined
      };
    }
  },

  /**
   * Toggle comment like status
   * @param commentId - UUID of the comment to toggle
   * @returns Promise with like status
   */
  toggleCommentLike: async (commentId: string): Promise<ApiResponse<LikeStatusData>> => {
    try {
      // First get current status
      const statusResponse = await likeService.getCommentLikeStatus(commentId);

      if (!statusResponse.success || !statusResponse.data) {
        return {
          success: false,
          message: statusResponse.message || 'Failed to get current like status',
          data: undefined
        };
      }

      const { isLiked } = statusResponse.data;

      // Toggle based on current status
      if (isLiked) {
        return await likeService.unlikeComment(commentId);
      } else {
        return await likeService.likeComment(commentId);
      }
    } catch (error) {
      console.error('Error toggling comment like:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to toggle comment like',
        data: undefined
      };
    }
  },

  /**
   * Validate topic/video ID
   * @param id Content ID
   * @returns Validation result
   */
  validateContentId: (id: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!id || id.trim().length === 0) {
      errors.push('Content ID cannot be empty');
    } else if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      errors.push('Content ID must be a valid UUID');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Format like count for display
   * @param count Like count
   * @returns Formatted string
   */
  formatLikeCount: (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  }
};

export default likeService;

// Export types
export type { LikeStatusData };