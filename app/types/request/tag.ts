// types/request/tag.ts

import type { TagColor } from '../models/tag';

/**
 * Create Tag Request
 * For creating new tags (admin only)
 */
export interface CreateTagRequest {
  name: string;
  description?: string;
  color: TagColor;
  isActive?: boolean;
}

/**
 * Update Tag Request
 * For updating existing tags (admin only)
 */
export interface UpdateTagRequest {
  name?: string;
  description?: string;
  color?: TagColor;
  isActive?: boolean;
}

/**
 * Tag List Query Parameters
 * For filtering and searching tags
 */
export interface TagListQuery {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filters
  color?: TagColor;
  isActive?: boolean;

  // Sorting
  sortBy?: 'name' | 'usageCount' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';

  // Include related data
  includeStats?: boolean;
  includeRelated?: boolean;
}

/**
 * Tag Search Query Parameters
 * For advanced tag searching
 */
export interface TagSearchQuery {
  // Search term (required)
  q: string;

  // Pagination
  page?: number;
  limit?: number;

  // Filters
  color?: TagColor;
  isActive?: boolean;
  minUsageCount?: number;

  // Search options
  exactMatch?: boolean;
  includeDescription?: boolean;

  // Results options
  includeHighlighting?: boolean;
  includeStats?: boolean;
}

/**
 * Admin Tag List Query Parameters
 * Extended query options for admin endpoints
 */
export interface AdminTagListQuery extends TagListQuery {
  // Admin-specific filters
  createdBy?: string;
  lastModifiedBy?: string;

  // Date filters
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;

  // Usage filters
  minUsageCount?: number;
  maxUsageCount?: number;

  // Include admin data
  includeAdminData?: boolean;
  includeModerationNotes?: boolean;
}

/**
 * Tag Usage Query Parameters
 * For getting tag usage statistics
 */
export interface TagUsageQuery {
  // Time period
  startDate?: string;
  endDate?: string;

  // Content type filter
  contentType?: 'topic' | 'video' | 'post' | 'all';

  // Grouping
  groupBy?: 'day' | 'week' | 'month';

  // Pagination
  page?: number;
  limit?: number;
}

/**
 * Bulk Tag Operation Request
 * For performing bulk operations on tags
 */
export interface BulkTagOperationRequest {
  tagIds: string[];
  operation: 'activate' | 'deactivate' | 'delete' | 'updateColor';
  data?: {
    isActive?: boolean;
    color?: TagColor;
  };
}

/**
 * Tag Assignment Request
 * For assigning tags to content
 */
export interface TagAssignmentRequest {
  contentType: 'topic' | 'video' | 'post';
  contentId: string;
  tagIds: string[];
}

/**
 * Tag Merge Request
 * For merging multiple tags into one
 */
export interface TagMergeRequest {
  sourceTagIds: string[];
  targetTagId: string;
  deleteSourceTags?: boolean;
}

/**
 * Tag Export Request
 * For exporting tag data
 */
export interface TagExportRequest {
  format: 'json' | 'csv' | 'xlsx';
  includeStats?: boolean;
  includeUsageData?: boolean;
  filters?: TagListQuery;
}

/**
 * Tag Import Request
 * For importing tag data
 */
export interface TagImportRequest {
  format: 'json' | 'csv';
  data: string | File;
  options?: {
    skipDuplicates?: boolean;
    updateExisting?: boolean;
    validateNames?: boolean;
  };
}

export default CreateTagRequest;