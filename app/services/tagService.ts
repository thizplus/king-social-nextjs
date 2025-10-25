// app/services/tagService.ts
import apiService from './apiService';
import { TAG_API, ADMIN_TAG_API } from '@/constants/api';
import type { Tag, TagColor } from '@/types/models/tag';
import type {
  TagListResponse,
  TagResponse,
  TagSearchResponse,
  TagStatsResponse,
  TagRecommendationResponse,
  BulkTagOperationResponse,
  EnhancedTagListResponse
} from '@/types/response/tag';
import type {
  CreateTagRequest,
  UpdateTagRequest,
  TagSearchQuery,
  TagListQuery,
  AdminTagListQuery,
  BulkTagOperationRequest
} from '@/types/request/tag';

/**
 * Tag Service
 * จัดการการเรียก API ที่เกี่ยวกับ Tag
 */
const tagService = {
  /**
   * ดึงรายการแท็กทั้งหมด
   * GET /api/v1/tags
   * @param query - Tag list query parameters
   * @returns Promise<TagListResponse>
   */
  getTags: async (query?: TagListQuery): Promise<TagListResponse> => {
    return apiService.get<TagListResponse>(TAG_API.LIST, query);
  },

  /**
   * ดึงแท็กยอดนิยม (เรียงตาม usage count)
   * GET /api/v1/tags?sort=usage_count&order=desc
   * @param limit - จำนวนแท็กที่ต้องการ
   * @returns Promise<API Response with TagListResponse>
   */
  getPopularTags: async (limit?: number): Promise<{
    success: boolean;
    message: string;
    data: TagListResponse;
  }> => {
    const params: Record<string, string> = {
      sort: 'usage_count',
      order: 'desc'
    };
    if (limit) {
      params.limit = limit.toString();
    }

    // Return the full API response like forumService does
    return apiService.get<{
      success: boolean;
      message: string;
      data: TagListResponse;
    }>(TAG_API.LIST, params);
  },

  /**
   * ค้นหาแท็ก
   * GET /api/v1/tags/search
   * @param query - Search query
   * @returns Promise<TagSearchResponse>
   */
  searchTags: async (query: TagSearchQuery): Promise<TagSearchResponse> => {
    return apiService.get<TagSearchResponse>(TAG_API.SEARCH, query);
  },

  /**
   * ดึงข้อมูลแท็กตาม ID
   * GET /api/v1/tags/:id
   * @param id - Tag ID
   * @returns Promise<TagResponse>
   */
  getTagById: async (id: string): Promise<TagResponse> => {
    return apiService.get<TagResponse>(TAG_API.GET_BY_ID(id));
  },

  /**
   * สร้างแท็กใหม่ (Admin only)
   * POST /api/v1/admin/tags
   * @param data - Tag data
   * @returns Promise<TagResponse>
   */
  createTag: async (data: CreateTagRequest): Promise<TagResponse> => {
    return apiService.post<TagResponse>(ADMIN_TAG_API.CREATE, data);
  },

  /**
   * อัปเดตแท็ก (Admin only)
   * PUT /api/v1/admin/tags/:id
   * @param id - Tag ID
   * @param data - Updated tag data
   * @returns Promise<TagResponse>
   */
  updateTag: async (id: string, data: UpdateTagRequest): Promise<TagResponse> => {
    return apiService.put<TagResponse>(ADMIN_TAG_API.UPDATE(id), data);
  },

  /**
   * ลบแท็ก (Admin only)
   * DELETE /api/v1/admin/tags/:id
   * @param id - Tag ID
   * @returns Promise<void>
   */
  deleteTag: async (id: string): Promise<void> => {
    return apiService.delete(ADMIN_TAG_API.DELETE(id));
  },

  /**
   * ดึงสถิติแท็ก
   * @returns Promise<TagStatsResponse>
   */
  getTagStats: async (): Promise<TagStatsResponse> => {
    // Assuming this endpoint exists or can be derived from tag list
    return apiService.get<TagStatsResponse>(`${TAG_API.LIST}/stats`);
  },

  /**
   * ดึงแท็กแนะนำสำหรับเนื้อหา
   * @param contentType - ประเภทเนื้อหา
   * @param contentId - ID ของเนื้อหา
   * @returns Promise<TagRecommendationResponse>
   */
  getTagRecommendations: async (
    contentType: string,
    contentId: string
  ): Promise<TagRecommendationResponse> => {
    return apiService.get<TagRecommendationResponse>(
      `${TAG_API.LIST}/recommendations`,
      { contentType, contentId }
    );
  },

  /**
   * ดำเนินการ bulk operation กับแท็ก (Admin only)
   * @param request - Bulk operation request
   * @returns Promise<BulkTagOperationResponse>
   */
  bulkTagOperation: async (request: BulkTagOperationRequest): Promise<BulkTagOperationResponse> => {
    return apiService.post<BulkTagOperationResponse>(`${ADMIN_TAG_API.LIST}/bulk`, request);
  },

  /**
   * ดึงรายการแท็กสำหรับ Admin (with enhanced data)
   * GET /api/v1/admin/tags
   * @param query - Admin tag list query parameters
   * @returns Promise<EnhancedTagListResponse>
   */
  getAdminTags: async (query?: AdminTagListQuery): Promise<EnhancedTagListResponse> => {
    return apiService.get<EnhancedTagListResponse>(ADMIN_TAG_API.LIST, query);
  },

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Generate slug from tag name
   */
  generateSlug: (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s\-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  /**
   * Get CSS classes for tag color
   */
  getTagCSSClasses: (color: string): string => {
    // Return classes based on color
    return `text-[${color}] border-[${color}]`;
  },

  /**
   * Format tag for UI display
   */
  formatForUI: (tag: Tag): Tag & {
    displayName: string;
    slug: string;
    cssClasses: string;
    formattedUsageCount: string;
    isNew: boolean;
    isPopular: boolean;
  } => {
    const now = new Date();
    const createdAt = new Date(tag.createdAt);
    const isNew = (now.getTime() - createdAt.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
    const isPopular = tag.usageCount > 10;

    return {
      ...tag,
      displayName: tag.name,
      slug: tag.slug || tagService.generateSlug(tag.name),
      cssClasses: tagService.getTagCSSClasses(tag.color),
      formattedUsageCount: tag.usageCount > 0 ? tag.usageCount.toString() : '0',
      isNew,
      isPopular
    };
  },

  /**
   * Validate tag data
   */
  validateTagData: (data: CreateTagRequest | UpdateTagRequest, isUpdate = false): {
    valid: boolean;
    errors: { field: string; message: string }[]
  } => {
    const errors: { field: string; message: string }[] = [];

    if (!isUpdate || data.name !== undefined) {
      if (!data.name || data.name.trim().length === 0) {
        errors.push({ field: 'name', message: 'ชื่อแท็กไม่สามารถเป็นค่าว่างได้' });
      } else if (data.name.length > 50) {
        errors.push({ field: 'name', message: 'ชื่อแท็กต้องไม่เกิน 50 ตัวอักษร' });
      }
    }

    if (!isUpdate || data.description !== undefined) {
      if (data.description && data.description.length > 200) {
        errors.push({ field: 'description', message: 'คำอธิบายต้องไม่เกิน 200 ตัวอักษร' });
      }
    }

    if (!isUpdate || data.color !== undefined) {
      if (!data.color || !/^#[0-9A-F]{6}$/i.test(data.color)) {
        errors.push({ field: 'color', message: 'สีต้องเป็นรูปแบบ hex color code (#xxxxxx)' });
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  /**
   * Filter tags by color
   */
  filterByColor: (tags: Tag[], color: TagColor): Tag[] => {
    return tags.filter(tag => tag.color === color);
  },

  /**
   * Sort tags by usage count
   */
  sortByUsage: (tags: Tag[], descending = true): Tag[] => {
    return [...tags].sort((a, b) => {
      return descending ? b.usageCount - a.usageCount : a.usageCount - b.usageCount;
    });
  },

  /**
   * Sort tags alphabetically
   */
  sortAlphabetically: (tags: Tag[], descending = false): Tag[] => {
    return [...tags].sort((a, b) => {
      return descending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    });
  },

  /**
   * Calculate tag cloud data
   */
  calculateTagCloud: (tags: Tag[]): (Tag & { weight: number })[] => {
    const maxUsage = Math.max(...tags.map(tag => tag.usageCount));
    return tags.map(tag => ({
      ...tag,
      weight: maxUsage > 0 ? (tag.usageCount / maxUsage) : 0
    }));
  }
};

export default tagService;