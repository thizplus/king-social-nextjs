// types/common.ts

/**
 * Base API Response wrapper
 * Wraps all API responses with success/message/data structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * Pagination metadata
 * Matches backend PaginationMeta structure
 */
export interface PaginationMeta {
  total: number;
  offset: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Paginated API Response
 * Used for endpoints that return lists with pagination
 */
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
  error?: string;
}

/**
 * Pagination Query Parameters
 * Standard pagination params for GET requests
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Backend Pagination Parameters (ตรงกับ Backend)
 * จริงๆ Backend ใช้ offset/limit
 */
export interface BackendPaginationParams {
  offset?: number;
  limit?: number;
}

/**
 * ID Request Parameter
 * Used for route parameters that require an ID
 */
export interface IDRequest {
  id: string;
}

/**
 * Base Entity
 * Common fields for all entities
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
