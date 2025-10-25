// types/request/auth.ts

/**
 * Login Request
 * Credentials for user authentication
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register Request
 * Data required to create a new user account
 */
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Refresh Token Request
 * Request to refresh access token
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Forgot Password Request
 * Request to send password reset email
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset Password Request
 * Request to reset password with token
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
