// types/response/user.ts

import type { User, EnhancedProfile, AdminProfile /* , UserStats */ } from '../models/user'; // Commented out unused import
import type { PaginationMeta } from '../common';

/**
 * Enhanced Profile Response
 * Public profile view for user endpoints
 */
export type EnhancedProfileResponse = EnhancedProfile;

/**
 * Admin User Response
 * Full user data for admin endpoints
 */
export type AdminUserResponse = AdminProfile;

/**
 * User Response (Legacy)
 * Single user data response - keeping for compatibility
 */
export type UserResponse = User;

/**
 * Enhanced User List Response
 * Paginated list of users with enhanced profile format for admin
 */
export interface EnhancedUserListResponse {
  users: AdminUserResponse[];
  meta: PaginationMeta;
}

/**
 * User List Response (Legacy)
 * Paginated list of users - keeping for compatibility
 */
export interface UserListResponse {
  users: UserResponse[];
  meta: PaginationMeta;
}
