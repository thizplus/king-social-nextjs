// types/response/follow.ts

import type { Follow, FollowerInfo, FollowingInfo } from '../models/follow';

/**
 * Follow Response
 * Response after following/unfollowing a user
 */
export interface FollowResponse extends Partial<Follow> {
  followerId: string;
  followingId: string;
  message: string;
}

/**
 * Follow Status Response
 * Current follow status for a user
 */
export interface FollowStatusResponse {
  isFollowing: boolean;
}

/**
 * Follower Response
 * Single follower info
 */
export type FollowerResponse = FollowerInfo;

/**
 * Following Response
 * Single following info
 */
export type FollowingResponse = FollowingInfo;

/**
 * Follow List Response
 * Paginated list of followers
 */
export interface FollowListResponse {
  users: FollowerResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Following List Response
 * Paginated list of following users
 */
export interface FollowingListResponse {
  users: FollowingResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * User Stats Response
 * User follower/following statistics
 */
export interface UserStatsResponse {
  userId: string;
  followerCount: number;
  followingCount: number;
}
