// types/models/follow.ts

/**
 * Follow Model
 * Represents a follow relationship between users
 */
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

/**
 * Follower Info
 * Extended user info for follower/following lists
 */
export interface FollowerInfo {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  followedAt: string;
}

/**
 * Following Info
 * Extended user info for following lists
 */
export interface FollowingInfo {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  followedAt: string;
}
