// hooks/useReply.ts

import { useState, useCallback } from 'react';
import replyService, { type UpdateReplyRequest } from '@/services/replyService';
import type { Reply } from '@/types/models/reply';

/**
 * Custom hook for reply management
 * Provides reply operations (update, delete)
 */
export const useReply = () => {
  // const [loading, setLoading] = useState(false); // Unused variable
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null); // Track which reply is being updated
  const [deleting, setDeleting] = useState<string | null>(null); // Track which reply is being deleted

  /**
   * Update reply content
   * @param id Reply ID
   * @param data Update data
   * @returns Promise with updated reply
   */
  const updateReply = useCallback(async (id: string, data: UpdateReplyRequest) => {
    try {
      setUpdating(id);
      setError(null);

      // Validate content before sending
      const validation = replyService.validateReplyContent(data.content);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        return {
          success: false,
          error: validation.errors.join(', '),
          reply: null
        };
      }

      const response = await replyService.updateReply(id, data);

      if (response.success && response.data) {
        return {
          success: true,
          reply: response.data,
          message: 'แก้ไขความคิดเห็นสำเร็จ'
        };
      } else {
        const errorMessage = response.message || 'ไม่สามารถแก้ไขความคิดเห็นได้';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
          reply: null
        };
      }
    } catch (err: unknown) {
      console.error('Update reply error:', err);
      const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการแก้ไขความคิดเห็น';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        reply: null
      };
    } finally {
      setUpdating(null);
    }
  }, []);

  /**
   * Delete reply
   * @param id Reply ID
   * @returns Promise with deletion result
   */
  const deleteReply = useCallback(async (id: string) => {
    try {
      setDeleting(id);
      setError(null);

      const response = await replyService.deleteReply(id);

      if (response.success) {
        return {
          success: true,
          message: 'ลบความคิดเห็นสำเร็จ'
        };
      } else {
        const errorMessage = response.message || 'ไม่สามารถลบความคิดเห็นได้';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage
        };
      }
    } catch (err: unknown) {
      console.error('Delete reply error:', err);
      const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบความคิดเห็น';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setDeleting(null);
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check if reply can be edited (validation only, not auth)
   * @param content Content to validate
   * @returns Validation result
   */
  const canUpdateContent = useCallback((content: string) => {
    return replyService.validateReplyContent(content);
  }, []);

  /**
   * Format reply for UI
   * @param reply Reply object
   * @returns Formatted reply
   */
  const formatReply = useCallback((reply: Reply) => {
    return replyService.formatForUI(reply);
  }, []);

  /**
   * Check if content has been modified
   * @param original Original content
   * @param current Current content
   * @returns True if content has been modified
   */
  const isContentModified = useCallback((original: string, current: string) => {
    return replyService.isContentModified(original, current);
  }, []);

  /**
   * Get content excerpt
   * @param content Full content
   * @param maxLength Maximum length
   * @returns Content excerpt
   */
  const getContentExcerpt = useCallback((content: string, maxLength?: number) => {
    return replyService.getContentExcerpt(content, maxLength);
  }, []);

  return {
    // State
    // loading, // Unused variable - commented out
    error,
    updating,
    deleting,

    // Actions
    updateReply,
    deleteReply,
    clearError,

    // Utilities
    canUpdateContent,
    formatReply,
    isContentModified,
    getContentExcerpt,

    // Computed
    isUpdating: (id: string) => updating === id,
    isDeleting: (id: string) => deleting === id,
    hasError: !!error,
    isOperating: updating !== null || deleting !== null
  };
};

export default useReply;