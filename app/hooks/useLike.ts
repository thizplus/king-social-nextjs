// hooks/useLike.ts
import { useState, useCallback, useEffect } from 'react';
import likeService from '@/services/likeService';
import type { LikeStatusData } from '@/services/likeService';

interface UseLikeOptions {
  autoFetch?: boolean; // Auto fetch like status on mount
}

/**
 * Custom hook for like functionality
 * Supports topics, videos, replies, and comments
 */


export const useLike = (contentType: 'topic' | 'video' | 'reply' | 'comment', contentId?: string, options: UseLikeOptions = {}) => {
  console.log('useLike contentType', contentType, contentId, options);
  const { autoFetch = false } = options;

  // State
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Loading states for specific operations
  const [isToggling, setIsToggling] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  /**
   * Update like status from API response
   */
  const updateLikeStatus = useCallback((data: LikeStatusData) => {
    setIsLiked(data.isLiked);
    setLikeCount(data.likeCount);
  }, []);

  /**
   * Fetch like status
   */
  const fetchLikeStatus = useCallback(async (id: string) => {
    console.log('🔍 fetchLikeStatus called for:', contentType, id);
    try {
      setIsFetching(true);
      setError(null);

      let response;
      switch (contentType) {
        case 'topic':
          response = await likeService.getTopicLikeStatus(id);
          break;
        case 'video':
          response = await likeService.getVideoLikeStatus(id);
          break;
        case 'reply':
          response = await likeService.getReplyLikeStatus(id);
          break;
        case 'comment':
          response = await likeService.getCommentLikeStatus(id);
          break;
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }

      console.log('📡 API Response:', response);

      if (response.success && response.data) {
        console.log('✅ Success - updating status:', response.data);
        updateLikeStatus(response.data);
        return {
          success: true,
          data: response.data
        };
      } else {
        // If unauthorized, set default values instead of showing error
        if (response.message?.includes('Unauthorized') || response.message?.includes('authorization')) {
          console.log('🔒 Unauthorized - setting defaults');
          setIsLiked(false);
          setLikeCount(0);
          setError(null);
          return {
            success: true, // Treat as success with default values
            data: { isLiked: false, likeCount: 0 }
          };
        }

        console.log('❌ Failed:', response.message);
        setError(response.message || 'Failed to fetch like status');
        return {
          success: false,
          error: response.message || 'Failed to fetch like status'
        };
      }
    } catch (error: unknown) {
      console.log('💥 Exception:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงสถานะ like';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsFetching(false);
    }
  }, [contentType, updateLikeStatus]);

  /**
   * Toggle like status
   */
  const toggleLike = useCallback(async (id: string) => {
    try {
      setIsToggling(true);
      setError(null);

      let response;
      switch (contentType) {
        case 'topic':
          response = await likeService.toggleTopicLike(id);
          break;
        case 'video':
          response = await likeService.toggleVideoLike(id);
          break;
        case 'reply':
          response = await likeService.toggleReplyLike(id);
          break;
        case 'comment':
          response = await likeService.toggleCommentLike(id);
          break;
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }

      if (response.success && response.data) {
        updateLikeStatus(response.data);
        return {
          success: true,
          data: response.data
        };
      } else {
        setError(response.message || 'Failed to toggle like');
        return {
          success: false,
          error: response.message || 'Failed to toggle like'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการ toggle like';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsToggling(false);
    }
  }, [contentType, updateLikeStatus]);

  /**
   * Like content
   */
  const like = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      switch (contentType) {
        case 'topic':
          response = await likeService.likeTopic(id);
          break;
        case 'video':
          response = await likeService.likeVideo(id);
          break;
        case 'reply':
          response = await likeService.likeReply(id);
          break;
        case 'comment':
          response = await likeService.likeComment(id);
          break;
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }

      if (response.success && response.data) {
        updateLikeStatus(response.data);
        return {
          success: true,
          data: response.data
        };
      } else {
        setError(response.message || 'Failed to like');
        return {
          success: false,
          error: response.message || 'Failed to like'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการ like';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, [contentType, updateLikeStatus]);

  /**
   * Unlike content
   */
  const unlike = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let response;
      switch (contentType) {
        case 'topic':
          response = await likeService.unlikeTopic(id);
          break;
        case 'video':
          response = await likeService.unlikeVideo(id);
          break;
        case 'reply':
          response = await likeService.unlikeReply(id);
          break;
        case 'comment':
          response = await likeService.unlikeComment(id);
          break;
        default:
          throw new Error(`Unsupported content type: ${contentType}`);
      }

      if (response.success && response.data) {
        updateLikeStatus(response.data);
        return {
          success: true,
          data: response.data
        };
      } else {
        setError(response.message || 'Failed to unlike');
        return {
          success: false,
          error: response.message || 'Failed to unlike'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการ unlike';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, [contentType, updateLikeStatus]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    setIsLiked(false);
    setLikeCount(0);
    setError(null);
    setIsLoading(false);
    setIsToggling(false);
    setIsFetching(false);
  }, []);

  // Auto fetch like status on mount if contentId is provided and autoFetch is true
  useEffect(() => {
    console.log('🚀 useEffect autoFetch:', { autoFetch, contentId });
    if (autoFetch && contentId) {
      console.log('🔥 Calling fetchLikeStatus...');
      fetchLikeStatus(contentId).catch(err => {
        // If fetch fails (e.g., not authenticated), silently set default values
        console.warn('💀 fetchLikeStatus failed, using defaults:', err);
        setIsLiked(false);
        setLikeCount(0);
        setError(null); // Don't show error for initial fetch
      });
    } else {
      console.log('❌ autoFetch conditions not met:', { autoFetch, contentId });
    }
  }, [autoFetch, contentId, fetchLikeStatus]);

  return {
    // State
    isLiked,
    likeCount,
    isLoading: isLoading || isToggling || isFetching,
    error,

    // Loading states
    isToggling,
    isFetching,
    isLiking: isLoading,

    // Actions
    fetchLikeStatus,
    toggleLike,
    like,
    unlike,
    clearError,
    reset,

    // Utilities
    updateLikeStatus
  };
};

/**
 * Hook specifically for topic likes
 */
export const useTopicLike = (topicId?: string, options?: UseLikeOptions) => {
  const result = useLike('topic', topicId, options);
  console.log('useTopicLike result:', { topicId, options, isLiked: result.isLiked, likeCount: result.likeCount });
  return result;
};

/**
 * Hook specifically for video likes
 */
export const useVideoLike = (videoId?: string, options?: UseLikeOptions) => {
  return useLike('video', videoId, options);
};

/**
 * Hook specifically for reply likes
 */
export const useReplyLike = (replyId?: string, options?: UseLikeOptions) => {
  return useLike('reply', replyId, options);
};

/**
 * Hook specifically for comment likes
 */
export const useCommentLike = (commentId?: string, options?: UseLikeOptions) => {
  return useLike('comment', commentId, options);
};

export default useLike;