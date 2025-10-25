// types/models/forum.ts

/**
 * Forum Model
 * Represents a discussion forum/category
 */
export interface Forum {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  topicCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Forum Order
 * Used for reordering forums
 */
export interface ForumOrder {
  id: string;
  order: number;
}
