// types/response/tag.ts

import type { Tag, EnhancedTag, TagStats, TagSearchResult, TagUsage } from '../models/tag';
import type { PaginationMeta } from '../common';

/**
 * Tag Response
 * Single tag data response
 */
export type TagResponse = Tag;

/**
 * Enhanced Tag Response
 * Enhanced tag with additional metadata
 */
export type EnhancedTagResponse = EnhancedTag;

/**
 * Tag List Response
 * Paginated list of tags
 */
export interface TagListResponse {
  tags: TagResponse[];
  meta: PaginationMeta;
}

/**
 * Enhanced Tag List Response
 * Paginated list of enhanced tags
 */
export interface EnhancedTagListResponse {
  tags: EnhancedTagResponse[];
  meta: PaginationMeta;
}

/**
 * Tag Search Response
 * Search results with metadata
 */
export interface TagSearchResponse {
  results: TagSearchResult[];
  meta: PaginationMeta & {
    query: string;
    totalMatches: number;
    searchTime: number;
    suggestions?: string[];
  };
}

/**
 * Tag Stats Response
 * Statistical information about tags
 */
export interface TagStatsResponse extends TagStats {
  generatedAt: string;
  period?: {
    startDate: string;
    endDate: string;
  };
}

/**
 * Tag Usage Response
 * Tag usage data with pagination
 */
export interface TagUsageResponse {
  usage: TagUsage[];
  meta: PaginationMeta;
  summary: {
    totalUsage: number;
    uniqueContent: number;
    contentTypes: {
      topics: number;
      videos: number;
      posts: number;
    };
  };
}

/**
 * Tag Creation Response
 * Response after creating a new tag
 */
export interface TagCreationResponse extends TagResponse {
  created: true;
  message: string;
}

/**
 * Tag Update Response
 * Response after updating a tag
 */
export interface TagUpdateResponse extends TagResponse {
  updated: true;
  message: string;
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
}

/**
 * Tag Deletion Response
 * Response after deleting a tag
 */
export interface TagDeletionResponse {
  deleted: true;
  tagId: string;
  message: string;
  affectedContent?: {
    topics: number;
    videos: number;
    posts: number;
  };
}

/**
 * Bulk Tag Operation Response
 * Response after bulk operations
 */
export interface BulkTagOperationResponse {
  success: boolean;
  message: string;
  results: {
    successful: string[];
    failed: {
      tagId: string;
      error: string;
    }[];
  };
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

/**
 * Tag Assignment Response
 * Response after assigning tags to content
 */
export interface TagAssignmentResponse {
  success: boolean;
  message: string;
  contentId: string;
  contentType: string;
  assignedTags: TagResponse[];
  removedTags?: TagResponse[];
}

/**
 * Tag Merge Response
 * Response after merging tags
 */
export interface TagMergeResponse {
  success: boolean;
  message: string;
  targetTag: TagResponse;
  mergedTags: {
    id: string;
    name: string;
    usageCount: number;
  }[];
  totalUsageTransferred: number;
}

/**
 * Tag Export Response
 * Response with exported tag data
 */
export interface TagExportResponse {
  success: boolean;
  format: string;
  filename: string;
  downloadUrl?: string;
  data?: unknown; // For JSON format
  summary: {
    totalTags: number;
    exportedAt: string;
    filters?: Record<string, unknown>;
  };
}

/**
 * Tag Import Response
 * Response after importing tag data
 */
export interface TagImportResponse {
  success: boolean;
  message: string;
  summary: {
    total: number;
    created: number;
    updated: number;
    skipped: number;
    failed: number;
  };
  errors?: {
    row: number;
    field: string;
    message: string;
  }[];
  createdTags: TagResponse[];
  updatedTags: TagResponse[];
}

/**
 * Tag Validation Response
 * Response for tag validation
 */
export interface TagValidationResponse {
  valid: boolean;
  errors: {
    field: string;
    message: string;
    code: string;
  }[];
  suggestions?: {
    field: string;
    suggestion: string;
  }[];
}

/**
 * Tag Popularity Response
 * Popular tags with usage metrics
 */
export interface TagPopularityResponse {
  popularTags: (TagResponse & {
    rank: number;
    usageGrowth: number;
    trendScore: number;
  })[];
  period: {
    startDate: string;
    endDate: string;
  };
  meta: {
    totalTags: number;
    averageUsage: number;
    medianUsage: number;
  };
}

/**
 * Tag Recommendation Response
 * Recommended tags for content
 */
export interface TagRecommendationResponse {
  recommendations: (TagResponse & {
    relevanceScore: number;
    reason: string;
    confidence: number;
  })[];
  contentId: string;
  contentType: string;
  algorithm: string;
  generatedAt: string;
}

export default TagResponse;