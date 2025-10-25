// services/userService.ts

import apiService from './apiService';
import { USER_API } from '@/constants/api';
import type {
  ApiResponse,
  BackendPaginationParams,
  PaginatedResponse
} from '@/types/common';
import type {
  UpdateUserRequest,
  // EnhancedProfileUpdateRequest // Commented out unused import
} from '@/types/request/user';
import type {
  // UserResponse, // Commented out unused import
  // UserListResponse, // Commented out unused import
  EnhancedProfileResponse,
  EnhancedUserListResponse
} from '@/types/response/user';

/**
 * Enhanced User Service
 * ให้บริการจัดการข้อมูล User ในรูปแบบ Enhanced Profile พร้อม Social Features
 *
 * ✨ Enhanced Features:
 * - ✅ Enhanced Profile Management (GET, PUT, DELETE)
 * - ✅ Social Features (isFollowing, isFollowedBy, stats)
 * - ✅ Privacy Controls (isPrivate, isVerified)
 * - ✅ Rich Profile Data (bio, website, displayName)
 * - ✅ Real-time Stats (topics, videos, followers, following)
 * - ✅ Admin Enhanced User Listing (GET with pagination)
 * - ✅ Type Safety with TypeScript
 * - ✅ Comprehensive Error Handling
 * - ✅ Authentication via interceptors
 *
 * 🔄 Data Format Changes:
 * - displayName แทน firstName + lastName ใน public responses
 * - stats object แยก topics และ videos แทน posts
 * - เพิ่ม bio, website, isVerified, isPrivate
 * - เพิ่ม isFollowing, isFollowedBy สำหรับ social features
 * - Admin responses มีข้อมูลครบถ้วน, User responses มีเฉพาะข้อมูล public
 *
 * 📋 Validation Rules (Enhanced):
 * - firstName: optional, 1-50 characters
 * - lastName: optional, 1-50 characters
 * - avatar: optional, valid URL, max 500 characters
 * - bio: optional, max 500 characters ✨ NEW
 * - website: optional, valid URL, max 255 characters ✨ NEW
 * - isPrivate: optional, boolean ✨ NEW
 */

const userService = {
  // ===========================================
  // 🔒 PROTECTED ENDPOINTS (Authenticated Users)
  // ===========================================

  /**
   * 📖 ดึงข้อมูล Enhanced Profile ของผู้ใช้ที่ล็อกอินอยู่
   *
   * @returns Promise<ApiResponse<EnhancedProfileResponse>>
   *
   * @example
   * ```typescript
   * try {
   *   const response = await userService.getProfile();
   *   if (response.success) {
   *     console.log('Enhanced profile:', response.data);
   *     console.log('Display name:', response.data.displayName);
   *     console.log('Stats:', response.data.stats);
   *     console.log('Is verified:', response.data.isVerified);
   *     console.log('Is private:', response.data.isPrivate);
   *   }
   * } catch (error) {
   *   console.error('Failed to get profile:', error);
   * }
   * ```
   */
  getProfile: async (): Promise<ApiResponse<EnhancedProfileResponse>> => {
    return await apiService.get<ApiResponse<EnhancedProfileResponse>>(USER_API.PROFILE);
  },

  /**
   * ✏️ อัปเดตข้อมูล Enhanced Profile ของผู้ใช้ที่ล็อกอินอยู่
   *
   * @param data - ข้อมูลที่ต้องการอัปเดต (Enhanced Format)
   * @returns Promise<ApiResponse<EnhancedProfileResponse>>
   *
   * @example
   * ```typescript
   * try {
   *   const updateData = {
   *     firstName: 'John Updated',
   *     lastName: 'Doe Updated',
   *     avatar: 'https://example.com/new-avatar.jpg',
   *     bio: 'นี่คือ bio ใหม่ของผม',
   *     website: 'https://mywebsite.com',
   *     isPrivate: false
   *   };
   *
   *   const response = await userService.updateProfile(updateData);
   *   if (response.success) {
   *     console.log('Enhanced profile updated:', response.data);
   *     console.log('New display name:', response.data.displayName);
   *     console.log('New bio:', response.data.bio);
   *     console.log('Privacy setting:', response.data.isPrivate);
   *   }
   * } catch (error) {
   *   if (error.errors) {
   *     // Validation errors
   *     console.error('Validation errors:', error.errors);
   *   } else {
   *     console.error('Update failed:', error.message);
   *   }
   * }
   * ```
   */
  updateProfile: async (data: UpdateUserRequest): Promise<ApiResponse<EnhancedProfileResponse>> => {
    return await apiService.put<ApiResponse<EnhancedProfileResponse>>(USER_API.UPDATE_PROFILE, data);
  },

  /**
   * 🗑️ ลบ Account ของผู้ใช้ที่ล็อกอินอยู่
   *
   * @returns Promise<ApiResponse<null>>
   *
   * ⚠️ **หมายเหตุ**: การลบ account จะส่งผลต่อข้อมูลที่เกี่ยวข้องทั้งหมด
   *
   * @example
   * ```typescript
   * try {
   *   const response = await userService.deleteProfile();
   *   if (response.success) {
   *     console.log('Account deleted successfully');
   *     // Redirect to home or login page
   *     window.location.href = '/';
   *   }
   * } catch (error) {
   *   if (error.error === 'cannot delete user with active content') {
   *     console.error('Cannot delete account with active content');
   *   } else {
   *     console.error('Delete failed:', error.message);
   *   }
   * }
   * ```
   */
  deleteProfile: async (): Promise<ApiResponse<null>> => {
    return await apiService.delete<ApiResponse<null>>(USER_API.DELETE_PROFILE);
  },

  // ===========================================
  // 🔐 ADMIN ONLY ENDPOINTS
  // ===========================================

  /**
   * 📋 ดึงรายการผู้ใช้ทั้งหมดพร้อม Enhanced Format (Admin เท่านั้น)
   *
   * @param params - พารามิเตอร์สำหรับ pagination
   * @returns Promise<PaginatedResponse<EnhancedUserListResponse>>
   *
   * @example
   * ```typescript
   * try {
   *   // ดึงหน้าแรก 20 records
   *   const response = await userService.getUsers({
   *     offset: 0,
   *     limit: 20
   *   });
   *
   *   if (response.success) {
   *     console.log('Enhanced users:', response.data.users);
   *     response.data.users.forEach(user => {
   *       console.log(`${user.username}: ${user.stats.topics} topics, ${user.stats.videos} videos`);
   *       console.log(`Verified: ${user.isVerified}, Private: ${user.isPrivate}`);
   *       console.log(`Bio: ${user.bio}, Website: ${user.website}`);
   *     });
   *     console.log('Total:', response.meta.total);
   *     console.log('Has next page:', response.meta.hasNext);
   *   }
   * } catch (error) {
   *   if (error.status === 403) {
   *     console.error('Admin access required');
   *   } else {
   *     console.error('Failed to get users:', error.message);
   *   }
   * }
   * ```
   */
  getUsers: async (params?: BackendPaginationParams): Promise<PaginatedResponse<EnhancedUserListResponse>> => {
    const queryParams = {
      offset: params?.offset ?? 0,
      limit: params?.limit ?? 10
    };

    return await apiService.get<PaginatedResponse<EnhancedUserListResponse>>(
      USER_API.LIST,
      queryParams
    );
  },

  // ===========================================
  // 🛠️ UTILITY METHODS
  // ===========================================

  /**
   * 🔄 รีเฟรชข้อมูล Enhanced Profile หลังจากการอัปเดต
   *
   * @returns Promise<ApiResponse<EnhancedProfileResponse>>
   *
   * @example
   * ```typescript
   * // หลังจากอัปเดตข้อมูล
   * await userService.updateProfile(updateData);
   *
   * // รีเฟรชเพื่อให้แน่ใจว่าได้ข้อมูลล่าสุด
   * const refreshedProfile = await userService.refreshProfile();
   * console.log('Refreshed stats:', refreshedProfile.data.stats);
   * ```
   */
  refreshProfile: async (): Promise<ApiResponse<EnhancedProfileResponse>> => {
    return await userService.getProfile();
  },

  /**
   * 🔍 ตรวจสอบสถานะ Enhanced Profile ปัจจุบัน
   *
   * @returns Promise<boolean> - true ถ้า profile มีอยู่และไม่ใช่ private หรือเป็น owner
   *
   * @example
   * ```typescript
   * const isValid = await userService.validateProfile();
   * if (!isValid) {
   *   // Redirect to login or show error
   * }
   * ```
   */
  validateProfile: async (): Promise<boolean> => {
    try {
      const response = await userService.getProfile();
      return response.success && response.data !== undefined;
    } catch {
      return false;
    }
  },

  /**
   * 📊 ตรวจสอบสถิติผู้ใช้และความสัมพันธ์ทางสังคม
   *
   * @returns Promise<{stats: UserStats, social: {following: boolean, followedBy: boolean}} | null>
   *
   * @example
   * ```typescript
   * const socialInfo = await userService.getSocialInfo();
   * if (socialInfo) {
   *   console.log('Topics:', socialInfo.stats.topics);
   *   console.log('Videos:', socialInfo.stats.videos);
   *   console.log('Following this user:', socialInfo.social.following);
   * }
   * ```
   */
  getSocialInfo: async (): Promise<{
    stats: { topics: number; videos: number; followers: number; following: number };
    social: { following: boolean; followedBy: boolean };
  } | null> => {
    try {
      const response = await userService.getProfile();
      if (response.success && response.data) {
        return {
          stats: response.data.stats,
          social: {
            following: response.data.isFollowing,
            followedBy: response.data.isFollowedBy
          }
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * 📊 สร้าง URL สำหรับ Admin User List พร้อม pagination
   *
   * @param offset - จุดเริ่มต้น
   * @param limit - จำนวนต่อหน้า
   * @returns string - URL พร้อม query parameters
   *
   * @example
   * ```typescript
   * const url = userService.buildUserListUrl(20, 10);
   * // Result: '/users/?offset=20&limit=10'
   * ```
   */
  buildUserListUrl: (offset: number = 0, limit: number = 10): string => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString()
    });
    return `${USER_API.LIST}?${params.toString()}`;
  },

  // ===========================================
  // 🔧 ENHANCED VALIDATION & HELPER METHODS
  // ===========================================

  /**
   * ✅ ตรวจสอบความถูกต้องของข้อมูล Profile ก่อนส่ง
   *
   * @param data - ข้อมูลที่จะตรวจสอบ
   * @returns {isValid: boolean, errors: string[]}
   *
   * @example
   * ```typescript
   * const updateData = {
   *   bio: 'Very long bio that exceeds 500 characters...',
   *   website: 'invalid-url',
   *   firstName: ''
   * };
   *
   * const validation = userService.validateProfileData(updateData);
   * if (!validation.isValid) {
   *   console.error('Validation errors:', validation.errors);
   * }
   * ```
   */
  validateProfileData: (data: UpdateUserRequest): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // firstName validation
    if (data.firstName !== undefined) {
      if (data.firstName.length === 0 || data.firstName.length > 50) {
        errors.push('firstName must be between 1 and 50 characters');
      }
    }

    // lastName validation
    if (data.lastName !== undefined) {
      if (data.lastName.length === 0 || data.lastName.length > 50) {
        errors.push('lastName must be between 1 and 50 characters');
      }
    }

    // avatar validation
    if (data.avatar !== undefined) {
      try {
        new URL(data.avatar);
        if (data.avatar.length > 500) {
          errors.push('avatar URL must not exceed 500 characters');
        }
      } catch {
        errors.push('avatar must be a valid URL');
      }
    }

    // bio validation (NEW)
    if (data.bio !== undefined) {
      if (data.bio.length > 500) {
        errors.push('bio must not exceed 500 characters');
      }
    }

    // website validation (NEW)
    if (data.website !== undefined) {
      try {
        new URL(data.website);
        if (data.website.length > 255) {
          errors.push('website URL must not exceed 255 characters');
        }
      } catch {
        errors.push('website must be a valid URL');
      }
    }

    // isPrivate validation (NEW)
    if (data.isPrivate !== undefined) {
      if (typeof data.isPrivate !== 'boolean') {
        errors.push('isPrivate must be a boolean value');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * 🏷️ สร้าง displayName จาก firstName และ lastName
   *
   * @param firstName - ชื่อจริง
   * @param lastName - นามสกุล
   * @param username - username (fallback)
   * @returns string - displayName ที่จัดรูปแบบแล้ว
   *
   * @example
   * ```typescript
   * const displayName = userService.createDisplayName('John', 'Doe', 'johndoe');
   * // Result: 'John Doe'
   *
   * const displayName2 = userService.createDisplayName('', '', 'johndoe');
   * // Result: 'johndoe'
   * ```
   */
  createDisplayName: (firstName?: string, lastName?: string, username?: string): string => {
    const first = firstName?.trim() || '';
    const last = lastName?.trim() || '';

    if (first && last) {
      return `${first} ${last}`;
    } else if (first) {
      return first;
    } else if (last) {
      return last;
    } else {
      return username || 'Anonymous';
    }
  },

  /**
   * 📈 คำนวณเปอร์เซ็นต์ความสมบูรณ์ของ Profile
   *
   * @param profile - ข้อมูล Enhanced Profile
   * @returns number - เปอร์เซ็นต์ความสมบูรณ์ (0-100)
   *
   * @example
   * ```typescript
   * const profile = await userService.getProfile();
   * if (profile.success) {
   *   const completion = userService.calculateProfileCompletion(profile.data);
   *   console.log(`Profile is ${completion}% complete`);
   * }
   * ```
   */
  calculateProfileCompletion: (profile: EnhancedProfileResponse): number => {
    const fields = [
      profile.displayName,
      profile.avatar,
      profile.bio,
      profile.website
    ];

    const completedFields = fields.filter(field => field && field.trim().length > 0).length;
    return Math.round((completedFields / fields.length) * 100);
  },

  /**
   * 🎯 สร้างข้อมูลสำหรับแสดงผลใน UI
   *
   * @param profile - ข้อมูล Enhanced Profile
   * @returns object - ข้อมูลที่จัดรูปแบบสำหรับ UI
   *
   * @example
   * ```typescript
   * const profile = await userService.getProfile();
   * if (profile.success) {
   *   const uiData = userService.formatForUI(profile.data);
   *   console.log('UI Data:', uiData);
   * }
   * ```
   */
  formatForUI: (profile: EnhancedProfileResponse) => {
    return {
      // Basic info
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      avatar: profile.avatar || '/default-avatar.png',

      // Enhanced info
      bio: profile.bio || 'No bio yet',
      website: profile.website,
      hasWebsite: !!profile.website,

      // Status
      isVerified: profile.isVerified,
      isPrivate: profile.isPrivate,

      // Stats
      stats: {
        topics: profile.stats.topics || 0,
        videos: profile.stats.videos || 0,
        followers: profile.stats.followers || 0,
        following: profile.stats.following || 0,
        totalContent: (profile.stats.topics || 0) + (profile.stats.videos || 0)
      },

      // Social
      social: {
        isFollowing: profile.isFollowing,
        isFollowedBy: profile.isFollowedBy,
        connectionStatus: profile.isFollowing && profile.isFollowedBy ? 'mutual' :
                         profile.isFollowing ? 'following' :
                         profile.isFollowedBy ? 'follower' : 'none'
      },

      // Meta
      profileCompletion: userService.calculateProfileCompletion(profile),
      joinedDate: new Date(profile.createdAt).toLocaleDateString('th-TH'),
      lastUpdated: new Date(profile.updatedAt).toLocaleDateString('th-TH')
    };
  }
};

export default userService;