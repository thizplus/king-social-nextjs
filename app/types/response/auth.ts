// types/response/auth.ts

import type { User } from '../models/user';

/**
 * Login Response
 * Response after successful login
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Register Response
 * Response after successful registration
 */
export interface RegisterResponse {
  token: string;
  user: User;
}

/**
 * Refresh Token Response
 * Response with new access and refresh tokens
 */
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

/**
 * Logout Response
 * Response after successful logout
 */
export interface LogoutResponse {
  message: string;
}
