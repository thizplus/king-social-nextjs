// types/models/user.ts

/**
 * User Role Enum
 * Defines the possible roles a user can have
 */
export type UserRole = 'user' | 'admin';

/**
 * User Stats Object
 * Contains user activity statistics
 */
export interface UserStats {
  topics: number;
  videos: number;
  followers: number;
  following: number;
}

/**
 * User Model (Enhanced Profile Format)
 * Represents a user in the system with social features
 */
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  bio: string;
  website?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  isPrivate: boolean;
  followerCount: number;
  followingCount: number;
  suspendedUntil?: string | null;
  suspendReason?: string;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Enhanced Profile Response
 * Public profile view with social features and stats
 */
export interface EnhancedProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  isVerified: boolean;
  isPrivate: boolean;
  stats: UserStats;
  isFollowing: boolean;
  isFollowedBy: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Admin Profile Response
 * Full profile view for admin with all fields
 */
export interface AdminProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  website?: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  isPrivate: boolean;
  stats: UserStats;
  createdAt: string;
  updatedAt: string;
}

/**
 * User Summary
 * Minimal user info for nested responses
 */
export interface UserSummary {
  id: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio?: string;
  website?: string;
  role?: UserRole;
  isActive?: boolean;
  isVerified?: boolean;
  isPrivate?: boolean;
  stats?: UserStats;
  displayName?: string; // Optional computed field
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User Summary with Full Name
 * Extended user summary including full name
 */
export interface UserSummaryWithFullName {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
}
