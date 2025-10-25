// app/hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/models/user';

/**
 * Custom hook for authentication
 * Provides convenient access to auth store with additional utilities
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
    updateUser,
  } = useAuthStore();

  /**
   * Login function
   * Sets user and token in the store
   */
  const login = (user: User, token: string) => {
    setAuth(user, token);
  };

  /**
   * Register function
   * Sets user and token in the store (same as login)
   */
  const register = (user: User, token: string) => {
    setAuth(user, token);
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: string[]): boolean => {
    return user?.role ? roles.includes(user.role) : false;
  };

  /**
   * Get user's full name
   */
  const getFullName = (): string => {
    if (!user) return '';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  };

  /**
   * Get user's initials for avatar
   */
  const getInitials = (): string => {
    if (!user) return '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  /**
   * Update current user profile
   */
  const updateProfile = (updates: Partial<User>) => {
    updateUser(updates);
  };

  return {
    // State
    user,
    token,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,

    // Utilities
    hasRole,
    hasAnyRole,
    getFullName,
    getInitials,
  };
};

export default useAuth;