// app/hooks/useForum.ts
import { useState, useCallback } from 'react';
import forumService from '@/services/forumService';
import type { Forum } from '@/types/models/forum';

/**
 * Custom hook for forum management
 * Provides direct API calls without global state (SSR-friendly)
 */
export const useForum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ดึงรายการฟอรัมทั้งหมดที่เปิดใช้งาน
   * @returns Promise with forums data
   */
  const fetchActiveForums = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await forumService.getActiveForums();

      if (response.success && response.data) {
        return {
          forums: response.data.forums,
          total: response.data.total,
          success: true,
        };
      } else {
        setError(response.message || 'Failed to fetch forums');
        return {
          forums: [],
          total: 0,
          success: false,
          error: response.message || 'Failed to fetch forums',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching forums:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลฟอรัม';
      setError(errorMessage);
      return {
        forums: [],
        total: 0,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงข้อมูลฟอรัมตาม ID
   * @param id Forum ID
   * @returns Promise with forum data
   */
  const fetchForumById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await forumService.getForumById(id);

      if (response.success && response.data) {
        return {
          forum: response.data,
          success: true,
        };
      } else {
        setError(response.message || 'Forum not found');
        return {
          forum: null,
          success: false,
          error: response.message || 'Forum not found',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching forum by ID:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลฟอรัม';
      setError(errorMessage);
      return {
        forum: null,
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * ดึงข้อมูลฟอรัมตาม Slug
   * @param slug Forum Slug
   * @returns Promise with forum data
   */
  const fetchForumBySlug = useCallback(async (slug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await forumService.getForumBySlug(slug);

      if (response.success && response.data) {
        return {
          forum: response.data,
          success: true,
        };
      } else {
        setError(response.message || 'Forum not found');
        return {
          forum: null,
          success: false,
          error: response.message || 'Forum not found',
        };
      }
    } catch (error: unknown) {
      console.error('Error fetching forum by slug:', error);
      const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลฟอรัม';
      setError(errorMessage);
      return {
        forum: null,
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
   * หาฟอรัมจากรายการตาม ID
   * @param forums รายการฟอรัม
   * @param id Forum ID
   */
  const findForumById = useCallback((forums: Forum[], id: string): Forum | undefined => {
    return forums.find(forum => forum.id === id);
  }, []);

  /**
   * หาฟอรัมจากรายการตาม Slug
   * @param forums รายการฟอรัม
   * @param slug Forum Slug
   */
  const findForumBySlug = useCallback((forums: Forum[], slug: string): Forum | undefined => {
    return forums.find(forum => forum.slug === slug);
  }, []);

  return {
    // State
    isLoading,
    error,

    // Actions
    fetchActiveForums,
    fetchForumById,
    fetchForumBySlug,
    clearError,

    // Utilities
    findForumById,
    findForumBySlug,
  };
};

export default useForum;