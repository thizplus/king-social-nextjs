// app/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/models/user';

/**
 * Auth State Interface
 * Authentication Store State Definition
 */
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

/**
 * Authentication Store
 * Global state management for authentication
 * Uses zustand with persist middleware to save to localStorage
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      token: null,
      isAuthenticated: false,

      // Set authentication data (login/register)
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      // Clear authentication data (logout)
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      // Update user data
      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'auth-storage', // Storage key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);