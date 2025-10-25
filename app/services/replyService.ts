// services/replyService.ts

import apiService from './apiService';
import { REPLY_API } from '@/constants/api'; // Removed unused API import
import type { ApiResponse } from '@/types/common';
import type { Reply } from '@/types/models/reply';

/**
 * Update Reply Request
 */
export interface UpdateReplyRequest {
  content: string;
}

/**
 * Reply Service
 * Handles reply-related API operations (update, delete)
 */
const replyService = {
  /**
   * Update reply content
   * @param id Reply ID
   * @param data Update data
   * @returns Promise with updated reply
   */
  updateReply: async (id: string, data: UpdateReplyRequest): Promise<ApiResponse<Reply>> => {
    try {
      // Validate content
      if (!data.content || data.content.trim().length === 0) {
        throw new Error('เนื้อหาไม่สามารถเป็นค่าว่างได้');
      }

      if (data.content.length > 5000) {
        throw new Error('เนื้อหาต้องไม่เกิน 5000 ตัวอักษร');
      }

      return await apiService.put<ApiResponse<Reply>>(REPLY_API.UPDATE(id), {
        content: data.content.trim()
      });
    } catch (error) {
      console.error('Update reply error:', error);
      throw error;
    }
  },

  /**
   * Delete reply
   * @param id Reply ID
   * @returns Promise with deletion result
   */
  deleteReply: async (id: string): Promise<ApiResponse<null>> => {
    try {
      await apiService.delete<null>(REPLY_API.DELETE(id));
      return {
        success: true,
        message: 'Reply deleted successfully',
        data: null
      };
    } catch (error) {
      console.error('Delete reply error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete reply',
        data: null
      };
    }
  },

  /**
   * Validate reply content
   * @param content Reply content
   * @returns Validation result
   */
  validateReplyContent: (content: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!content || content.trim().length === 0) {
      errors.push('เนื้อหาไม่สามารถเป็นค่าว่างได้');
    } else if (content.length < 1) {
      errors.push('เนื้อหาต้องมีอย่างน้อย 1 ตัวอักษร');
    } else if (content.length > 5000) {
      errors.push('เนื้อหาต้องไม่เกิน 5000 ตัวอักษร');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Format reply for UI display
   * @param reply Reply object
   * @returns Formatted reply
   */
  formatForUI: (reply: Reply) => {
    return {
      ...reply,
      displayContent: reply.content,
      authorName: reply.user
        ? (reply.user.displayName || `${reply.user.firstName} ${reply.user.lastName}`.trim() || reply.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
        : 'ผู้ใช้ไม่ระบุชื่อ',
      canEdit: false, // This will be determined by auth context
      canDelete: false, // This will be determined by auth context
      isOwner: false, // This will be determined by auth context
      formattedCreatedAt: reply.createdAt,
      formattedUpdatedAt: reply.updatedAt,
      hasReplies: reply.replies && reply.replies.length > 0,
      replyCount: reply.replies ? reply.replies.length : 0
    };
  },

  /**
   * Check if content has been modified
   * @param original Original content
   * @param current Current content
   * @returns True if content has been modified
   */
  isContentModified: (original: string, current: string): boolean => {
    return original.trim() !== current.trim();
  },

  /**
   * Get content excerpt for display
   * @param content Full content
   * @param maxLength Maximum length (default: 100)
   * @returns Content excerpt
   */
  getContentExcerpt: (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength).trim() + '...';
  }
};

export default replyService;