// app/hooks/useTag.ts
import { useState, useEffect, useCallback } from 'react';
import tagService from '@/services/tagService';
import type { Tag, EnhancedTag, TagColor } from '@/types/models/tag';
import type {
  CreateTagRequest,
  UpdateTagRequest,
  TagListQuery,
  TagSearchQuery,
  AdminTagListQuery,
  BulkTagOperationRequest
} from '@/types/request/tag';
// Unused imports - commented out
// import type {
//   TagListResponse,
//   EnhancedTagListResponse,
//   TagSearchResponse,
//   TagStatsResponse,
//   TagPopularityResponse
// } from '@/types/response/tag';

/**
 * Custom hook for tag management
 * Provides convenient access to tag data and operations
 */
export const useTag = () => {
  // State
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /**
   * Load tags
   */
  const loadTags = useCallback(async (query?: TagListQuery) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tagService.getTags(query);
      setTags(response.tags); // response is TagListResponse with { tags: Tag[], meta: PaginationMeta }
    } catch (err: unknown) {
      console.error('Tags load error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดแท็ก');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search tags
   */
  const searchTags = useCallback(async (query: TagSearchQuery) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tagService.searchTags(query);
      return response; // response is TagSearchResponse
    } catch (err: unknown) {
      console.error('Tags search error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการค้นหาแท็ก');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get tag by ID
   */
  const getTagById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tagService.getTagById(id);
      return response; // response is TagResponse
    } catch (err: unknown) {
      console.error('Get tag error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดแท็ก');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new tag (admin only)
   */
  const createTag = useCallback(async (data: CreateTagRequest) => {
    try {
      setCreating(true);
      setError(null);

      // Validate data before sending
      const validation = tagService.validateTagData(data);
      if (!validation.valid) {
        setError(validation.errors.map(e => e.message).join(', '));
        return false;
      }

      const response = await tagService.createTag(data);

      // Add new tag to local state
      setTags(prev => [...prev, response]);
      return true;
    } catch (err: unknown) {
      console.error('Tag creation error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการสร้างแท็ก');
      return false;
    } finally {
      setCreating(false);
    }
  }, []);

  /**
   * Update tag (admin only)
   */
  const updateTag = useCallback(async (id: string, data: UpdateTagRequest) => {
    try {
      setUpdating(true);
      setError(null);

      // Validate data before sending
      const validation = tagService.validateTagData(data, true);
      if (!validation.valid) {
        setError(validation.errors.map(e => e.message).join(', '));
        return false;
      }

      const response = await tagService.updateTag(id, data);

      // Update tag in local state
      setTags(prev =>
        prev.map(tag => (tag.id === id ? response : tag))
      );
      return true;
    } catch (err: unknown) {
      console.error('Tag update error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตแท็ก');
      return false;
    } finally {
      setUpdating(false);
    }
  }, []);

  /**
   * Delete tag (admin only)
   */
  const deleteTag = useCallback(async (id: string) => {
    try {
      setDeleting(true);
      setError(null);

      await tagService.deleteTag(id);

      // Remove tag from local state
      setTags(prev => prev.filter(tag => tag.id !== id));
      return true;
    } catch (err: unknown) {
      console.error('Tag deletion error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการลบแท็ก');
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  /**
   * Bulk tag operations (admin only)
   */
  const bulkOperation = useCallback(async (request: BulkTagOperationRequest) => {
    try {
      setUpdating(true);
      setError(null);

      const response = await tagService.bulkTagOperation(request);

      // Refresh tags after bulk operation
      await loadTags();
      return response;
    } catch (err: unknown) {
      console.error('Bulk operation error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดำเนินการ');
      return null;
    } finally {
      setUpdating(false);
    }
  }, [loadTags]);

  /**
   * Get popular tags
   */
  const getPopularTags = useCallback(async (limit?: number) => {
    try {
      const response = await tagService.getPopularTags(limit);

      if (response.success && response.data) {
        return response.data; // response.data contains { tags: Tag[], meta: PaginationMeta }
      } else {
        setError('Failed to get popular tags');
        return null;
      }
    } catch (err: unknown) {
      console.error('Popular tags error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดแท็กยอดนิยม');
      return null;
    }
  }, []);

  /**
   * Get tag stats
   */
  const getTagStats = useCallback(async () => {
    try {
      const response = await tagService.getTagStats();
      return response;
    } catch (err: unknown) {
      console.error('Tag stats error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดสถิติแท็ก');
      return null;
    }
  }, []);

  /**
   * Get tag recommendations
   */
  const getRecommendations = useCallback(async (contentType: string, contentId: string) => {
    try {
      const response = await tagService.getTagRecommendations(contentType, contentId);
      return response;
    } catch (err: unknown) {
      console.error('Tag recommendations error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดแท็กแนะนำ');
      return null;
    }
  }, []);

  /**
   * Refresh tags
   */
  const refreshTags = useCallback(async (query?: TagListQuery) => {
    return await loadTags(query);
  }, [loadTags]);

  /**
   * Filter tags by color
   */
  const filterByColor = useCallback((color: TagColor) => {
    return tagService.filterByColor(tags, color);
  }, [tags]);

  /**
   * Sort tags by usage
   */
  const sortByUsage = useCallback((descending = true) => {
    return tagService.sortByUsage(tags, descending);
  }, [tags]);

  /**
   * Sort tags alphabetically
   */
  const sortAlphabetically = useCallback((descending = false) => {
    return tagService.sortAlphabetically(tags, descending);
  }, [tags]);

  /**
   * Get tag cloud data
   */
  const getTagCloud = useCallback(() => {
    return tagService.calculateTagCloud(tags);
  }, [tags]);

  /**
   * Format tag for UI
   */
  const formatForUI = useCallback((tag: Tag) => {
    return tagService.formatForUI(tag);
  }, []);

  /**
   * Generate slug from name
   */
  const generateSlug = useCallback((name: string) => {
    return tagService.generateSlug(name);
  }, []);

  /**
   * Get CSS classes for tag
   */
  const getTagClasses = useCallback((color: TagColor) => {
    return tagService.getTagCSSClasses(color);
  }, []);

  /**
   * Validate tag data
   */
  const validateTag = useCallback((data: CreateTagRequest | UpdateTagRequest, isUpdate = false) => {
    return tagService.validateTagData(data, isUpdate);
  }, []);

  // Load tags on mount
  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return {
    // State
    tags: tags || [], // Ensure tags is never undefined
    loading,
    error,
    creating,
    updating,
    deleting,

    // Actions
    loadTags,
    searchTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    bulkOperation,
    refreshTags,

    // Data fetching
    getPopularTags,
    getTagStats,
    getRecommendations,

    // Utilities
    filterByColor,
    sortByUsage,
    sortAlphabetically,
    getTagCloud,
    formatForUI,
    generateSlug,
    getTagClasses,
    validateTag,

    // Computed
    hasTags: (tags || []).length > 0,
    isEmpty: (tags || []).length === 0 && !loading,
    hasError: !!error,
    totalTags: (tags || []).length,

    // Tag statistics
    activeTagsCount: (tags || []).filter(tag => tag.isActive).length,
    inactiveTagsCount: (tags || []).filter(tag => !tag.isActive).length,
    colorDistribution: (tags || []).reduce((acc, tag) => {
      acc[tag.color] = (acc[tag.color] || 0) + 1;
      return acc;
    }, {} as Record<TagColor, number>),
  };
};

/**
 * Hook for admin tag management
 * Extended functionality for admin users
 */
export const useAdminTag = () => {
  const [adminTags, setAdminTags] = useState<EnhancedTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load admin tags with enhanced data
   */
  const loadAdminTags = useCallback(async (query?: AdminTagListQuery) => {
    try {
      setLoading(true);
      setError(null);

      const response = await tagService.getAdminTags(query);
      setAdminTags(response.tags); // response is EnhancedTagListResponse with { tags: EnhancedTag[], meta: PaginationMeta }
    } catch (err: unknown) {
      console.error('Admin tags load error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดแท็ก (Admin)');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    adminTags,
    loading,
    error,
    loadAdminTags,
  };
};

export default useTag;