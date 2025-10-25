// types/request/admin.ts

import type { ReportType, ReportStatus, ReportReason } from '../models/report';

/**
 * Admin User List Request
 * Query params for admin user list
 */
export interface AdminUserListRequest {
  search?: string;
  role?: 'user' | 'admin';
  isActive?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Suspend User Request
 * Request to suspend a user
 */
export interface SuspendUserRequest {
  reason: string;
  duration: number; // in days
}

/**
 * Update User Role Request
 * Request to update user role
 */
export interface UpdateUserRoleRequest {
  role: 'user' | 'admin';
}

/**
 * Report Query Parameters
 * Filter params for report list
 */
export interface ReportQueryParams {
  type?: ReportType;
  status?: ReportStatus;
  page?: number;
  limit?: number;
}

/**
 * Create Report Request
 * Request to create a new report
 */
export interface CreateReportRequest {
  type: ReportType;
  resourceId: string;
  reason: ReportReason;
  description: string;
}

/**
 * Review Report Request
 * Request to review a report (admin only)
 */
export interface ReviewReportRequest {
  status: 'resolved' | 'rejected';
  reviewNote: string;
}
