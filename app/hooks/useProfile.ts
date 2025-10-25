// app/hooks/useProfile.ts
import { useState, useEffect, useCallback } from 'react';
import userService from '@/services/userService';
import type { EnhancedProfileResponse } from '@/types/response/user';
import type { UpdateUserRequest } from '@/types/request/user';

/**
 * Custom hook for profile management
 * Provides convenient access to profile data and operations
 */
export const useProfile = () => {
  // State
  const [profile, setProfile] = useState<EnhancedProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  /**
   * Load profile data
   */
  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await userService.getProfile();

      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        setError('Failed to load profile');
      }
    } catch (err: unknown) {
      console.error('Profile load error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูลโปรไฟล์');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update profile data
   */
  const updateProfile = useCallback(async (data: UpdateUserRequest) => {
    try {
      setUpdating(true);
      setError(null);

      // Validate data before sending
      const validation = userService.validateProfileData(data);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return false;
      }

      const response = await userService.updateProfile(data);

      if (response.success && response.data) {
        setProfile(response.data);
        return true;
      } else {
        setError('Failed to update profile');
        return false;
      }
    } catch (err: unknown) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์');
      return false;
    } finally {
      setUpdating(false);
    }
  }, []);

  /**
   * Refresh profile data
   */
  const refreshProfile = useCallback(async () => {
    return await loadProfile();
  }, [loadProfile]);

  /**
   * Get social information
   */
  const getSocialInfo = useCallback(async () => {
    try {
      return await userService.getSocialInfo();
    } catch (err) {
      console.error('Failed to get social info:', err);
      return null;
    }
  }, []);

  /**
   * Check if profile is valid
   */
  const validateProfile = useCallback(async () => {
    try {
      return await userService.validateProfile();
    } catch (err) {
      console.error('Profile validation error:', err);
      return false;
    }
  }, []);

  /**
   * Format profile for UI display
   */
  const getUIData = useCallback(() => {
    if (!profile) return null;
    return userService.formatForUI(profile);
  }, [profile]);

  /**
   * Calculate profile completion percentage
   */
  const getProfileCompletion = useCallback(() => {
    if (!profile) return 0;
    return userService.calculateProfileCompletion(profile);
  }, [profile]);

  /**
   * Get display name
   */
  const getDisplayName = useCallback(() => {
    if (!profile) return '';
    return profile.displayName || profile.username || 'Anonymous';
  }, [profile]);

  /**
   * Get user stats
   */
  const getStats = useCallback(() => {
    if (!profile) return { topics: 0, videos: 0, followers: 0, following: 0 };
    return profile.stats;
  }, [profile]);

  /**
   * Check if following
   */
  const isFollowing = useCallback(() => {
    return profile?.isFollowing || false;
  }, [profile]);

  /**
   * Check if followed by
   */
  const isFollowedBy = useCallback(() => {
    return profile?.isFollowedBy || false;
  }, [profile]);

  /**
   * Check if verified
   */
  const isVerified = useCallback(() => {
    return profile?.isVerified || false;
  }, [profile]);

  /**
   * Check if private
   */
  const isPrivate = useCallback(() => {
    return profile?.isPrivate || false;
  }, [profile]);

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    // State
    profile,
    loading,
    error,
    updating,

    // Actions
    loadProfile,
    updateProfile,
    refreshProfile,
    getSocialInfo,
    validateProfile,

    // Computed
    getUIData,
    getProfileCompletion,
    getDisplayName,
    getStats,
    isFollowing,
    isFollowedBy,
    isVerified,
    isPrivate,

    // Utils
    hasProfile: !!profile,
    isEmpty: !profile && !loading,
    hasError: !!error,
  };
};

export default useProfile;