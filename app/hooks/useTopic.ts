// app/hooks/useTopic.ts
import { useState, useCallback } from 'react';
import topicService from '@/services/topicService';
import type { Topic } from '@/types/models'; // Removed unused Reply import
import type { BackendPaginationParams } from '@/types/common';
import type { CreateTopicRequest, UpdateTopicRequest } from '@/types/request/topic';

/**
 * Custom hook for topic management
 * Provides direct API calls without global state (SSR-friendly)
 */
export const useTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ดึงรายการหัวข้อทั้งหมด
   * @param params Backend pagination parameters (offset, limit)
   * @returns Promise with topics data
   */
  const fetchTopics = useCallback(async (params?: BackendPaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.getTopics(params);

      if (response.success && response.data) {
        return {
          topics: response.data.topics,
          meta: response.data.meta,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to fetch topics');
        return {
          topics: [],
          meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
          success: false,
          error: response.message || 'Failed to fetch topics',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching topics:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลหัวข้อ';
      setError(errorMessage);
      return {
        topics: [],
        meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ค้นหาหัวข้อ
   * @param query Search query
   * @param params Backend pagination parameters
   * @returns Promise with search results
   */
  const searchTopics = useCallback(async (query: string, params?: BackendPaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.searchTopics(query, params);

      if (response.success && response.data) {
        return {
          topics: response.data.topics,
          meta: response.data.meta,
          success: true,
        };
      } else {
        setError(response.message || 'Search failed');
        return {
          topics: [],
          meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
          success: false,
          error: response.message || 'Search failed',
        };
      }
    } catch (error: unknown) {
      console.error('Error searching topics:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการค้นหา';
      setError(errorMessage);
      return {
        topics: [],
        meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงข้อมูลหัวข้อตาม ID
   * @param id Topic ID
   * @returns Promise with topic data
   */
  const fetchTopicById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.getTopicById(id);

      if (response.success && response.data && response.data.topic) {
        return {
          topic: response.data.topic,
          success: true,
        };
      } else {
        setError(response.message || 'Topic not found');
        return {
          topic: null,
          success: false,
          error: response.message || 'Topic not found',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching topic:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลหัวข้อ';
      setError(errorMessage);
      return {
        topic: null,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงคำตอบของหัวข้อ
   * @param id Topic ID
   * @param params Backend pagination parameters
   * @returns Promise with replies data
   */
  const fetchTopicReplies = useCallback(async (id: string, params?: BackendPaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.getTopicReplies(id, params);

      if (response.success && response.data) {
        return {
          replies: response.data.replies,
          meta: response.data.meta,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to fetch replies');
        return {
          replies: [],
          meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
          success: false,
          error: response.message || 'Failed to fetch replies',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching replies:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงคำตอบ';
      setError(errorMessage);
      return {
        replies: [],
        meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงรายการหัวข้อในฟอรัม (ใช้ Forum ID)
   * @param forumId Forum ID
   * @param params Backend pagination parameters
   * @returns Promise with topics data
   */
  const fetchTopicsByForum = useCallback(async (forumId: string, params?: BackendPaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.getTopicsByForum(forumId, params);

      if (response.success && response.data) {
        return {
          topics: response.data.topics,
          meta: response.data.meta,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to fetch forum topics');
        return {
          topics: [],
          meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
          success: false,
          error: response.message || 'Failed to fetch forum topics',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching forum topics:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงหัวข้อในฟอรัม';
      setError(errorMessage);
      return {
        topics: [],
        meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงรายการหัวข้อในฟอรัม (ใช้ Forum Slug) - New endpoint
   * @param slug Forum Slug
   * @param params Backend pagination parameters
   * @returns Promise with topics data
   */
  const fetchTopicsByForumSlug = useCallback(async (slug: string, params?: BackendPaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.getTopicsByForumSlug(slug, params);

      if (response.success && response.data) {
        return {
          topics: response.data.topics,
          meta: response.data.meta,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to fetch forum topics by slug');
        return {
          topics: [],
          meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
          success: false,
          error: response.message || 'Failed to fetch forum topics by slug',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching forum topics by slug:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงหัวข้อในฟอรัม (Slug)';
      setError(errorMessage);
      return {
        topics: [],
        meta: { total: 0, offset: 0, limit: 20, page: 1, totalPages: 0, hasNext: false, hasPrevious: false },
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * สร้างหัวข้อใหม่
   * @param data Topic data
   * @returns Promise with created topic
   */
  const createTopic = useCallback(async (data: CreateTopicRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.createTopic(data);

      if (response.success && response.data) {
        return {
          topic: response.data,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to create topic');
        return {
          topic: null,
          success: false,
          error: response.message || 'Failed to create topic',
        };
      }
    } catch (error: unknown) {
      console.error('Error creating topic:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการสร้างหัวข้อ';
      setError(errorMessage);
      return {
        topic: null,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * แก้ไขหัวข้อ
   * @param id Topic ID
   * @param data Updated topic data
   * @returns Promise with updated topic
   */
  const updateTopic = useCallback(async (id: string, data: UpdateTopicRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.updateTopic(id, data);

      if (response.success && response.data) {
        return {
          topic: response.data,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to update topic');
        return {
          topic: null,
          success: false,
          error: response.message || 'Failed to update topic',
        };
      }
    } catch (error: unknown) {
      console.error('Error updating topic:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการแก้ไขหัวข้อ';
      setError(errorMessage);
      return {
        topic: null,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ลบหัวข้อ
   * @param id Topic ID
   * @returns Promise with deletion result
   */
  const deleteTopic = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.deleteTopic(id);

      if (response.success) {
        return {
          success: true,
        };
      } else {
        setError(response.message || 'Failed to delete topic');
        return {
          success: false,
          error: response.message || 'Failed to delete topic',
        };
      }
    } catch (error: unknown) {
      console.error('Error deleting topic:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการลบหัวข้อ';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * สร้างคำตอบ
   * @param topicId Topic ID
   * @param content Reply content
   * @param parentId Parent reply ID (optional, for nested replies)
   * @returns Promise with created reply
   */
  const createReply = useCallback(async (topicId: string, content: string, parentId?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await topicService.createReply(topicId, content, parentId);

      if (response.success && response.data) {
        return {
          reply: response.data,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to create reply');
        return {
          reply: null,
          success: false,
          error: response.message || 'Failed to create reply',
        };
      }
    } catch (error: unknown) {
      console.error('Error creating reply:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการตอบกลับ';
      setError(errorMessage);
      return {
        reply: null,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ล้าง error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * หาหัวข้อจากรายการตาม ID
   * @param topics รายการหัวข้อ
   * @param id Topic ID
   */
  const findTopicById = useCallback((topics: Topic[], id: string): Topic | undefined => {
    return topics.find(topic => topic.id === id);
  }, []);

  return {
    // State
    isLoading,
    error,

    // Actions
    fetchTopics,
    searchTopics,
    fetchTopicById,
    fetchTopicReplies,
    fetchTopicsByForum,
    fetchTopicsByForumSlug, // New slug-based function
    createTopic,
    updateTopic,
    deleteTopic,
    createReply,
    clearError,

    // Utilities
    findTopicById,
  };
};

export default useTopic;