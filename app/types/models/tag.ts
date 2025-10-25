// types/models/tag.ts

/**
 * Tag Color Type
 * Can be either predefined color names or hex codes
 */
export type TagColor =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'indigo'
  | 'gray'
  | 'orange'
  | 'teal'
  | string; // Allow hex codes like #ff5722

/**
 * Base Tag Interface
 * Core tag properties
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: TagColor;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Enhanced Tag Interface
 * Tag with additional metadata for detailed views
 */
export interface EnhancedTag extends Tag {
  // Statistics
  stats: {
    topicsCount: number;
    videosCount: number;
    totalUsage: number;
    recentUsage: number; // Usage in last 30 days
  };

  // Related data
  relatedTags?: Tag[];

  // Admin data (only for admin users)
  adminData?: {
    createdBy?: string;
    lastModifiedBy?: string;
    moderationNotes?: string;
  };
}

/**
 * Tag Usage Interface
 * For tracking tag usage in content
 */
export interface TagUsage {
  tagId: string;
  tag: Tag;
  contentType: 'topic' | 'video' | 'post';
  contentId: string;
  usedAt: string;
}

/**
 * Tag Stats Interface
 * Statistical information about tags
 */
export interface TagStats {
  totalTags: number;
  activeTags: number;
  inactiveTags: number;
  mostUsedTags: Tag[];
  recentlyCreatedTags: Tag[];
  topCategories: {
    color: TagColor;
    count: number;
  }[];
}

/**
 * Tag Search Result Interface
 * Search results with highlighting
 */
export interface TagSearchResult extends Tag {
  highlighted?: {
    name?: string;
    description?: string;
  };
  relevanceScore?: number;
}

/**
 * Tag Category Interface
 * For grouping tags by categories
 */
export interface TagCategory {
  id: string;
  name: string;
  color: TagColor;
  tags: Tag[];
  isActive: boolean;
  displayOrder: number;
}

/**
 * Tag Validation Rules
 */
export const TAG_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
  },
  slug: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-z0-9\-_]+$/,
  },
  description: {
    maxLength: 200,
  },
  colors: [
    'blue', 'green', 'red', 'yellow', 'purple',
    'pink', 'indigo', 'gray', 'orange', 'teal'
  ] as TagColor[],
} as const;

/**
 * Tag Display Helpers
 */
export const TAG_DISPLAY = {
  colors: {
    blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
  },
} as const;

export default Tag;