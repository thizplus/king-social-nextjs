// types/request/user.ts

/**
 * Create User Request
 * Admin endpoint to create a new user
 */
export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Update User Request (Enhanced)
 * Update user profile information with new fields
 */
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  isPrivate?: boolean;
}

/**
 * Enhanced Profile Update Request
 * For social features and privacy settings
 */
export interface EnhancedProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  isPrivate?: boolean;
}

/**
 * Change Password Request
 * Request to change user password
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
