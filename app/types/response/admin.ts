// types/response/admin.ts

import type { Report } from '../models/report';
import type { ActivityLog } from '../models/activityLog';

/**
 * Dashboard Stats Response
 * Overall statistics for admin dashboard
 */
export interface DashboardStatsResponse {
  totalUsers: number;
  totalTopics: number;
  totalVideos: number;
  totalComments: number;
  totalReports: number;
  newUsersToday: number;
  activeUsers: number;
}

/**
 * Data Point
 * Single data point for charts
 */
export interface DataPoint {
  date: string;
  value: number;
}

/**
 * Forum Stats
 * Statistics for a forum
 */
export interface ForumStats {
  forumId: string;
  forumName: string;
  topicCount: number;
  replyCount: number;
}

/**
 * Dashboard Charts Response
 * Chart data for admin dashboard
 */
export interface DashboardChartsResponse {
  userGrowth: DataPoint[];
  contentActivity: DataPoint[];
  topForums: ForumStats[];
}

/**
 * Admin User Response
 * Extended user info for admin panel
 */
export interface AdminPanelUserResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  followerCount: number;
  followingCount: number;
  topicCount: number;
  videoCount: number;
  createdAt: string;
  lastLoginAt?: string | null;
  suspendedUntil?: string | null;
  suspendReason?: string;
}

/**
 * Admin User List Response
 * Paginated list of users for admin
 */
export interface AdminUserListResponse {
  users: AdminPanelUserResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Report Response
 * Single report data response
 */
export type ReportResponse = Report;

/**
 * Report List Response
 * Paginated list of reports
 */
export interface ReportListResponse {
  reports: ReportResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Activity Log Response
 * Single activity log entry
 */
export type ActivityLogResponse = ActivityLog;

/**
 * Activity Log List Response
 * Paginated list of activity logs
 */
export interface ActivityLogListResponse {
  logs: ActivityLogResponse[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
