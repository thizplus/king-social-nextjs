// types/models/report.ts

import type { UserSummary } from './user';

/**
 * Report Type Enum
 * Types of content that can be reported
 */
export type ReportType = 'topic' | 'reply' | 'video' | 'comment' | 'user';

/**
 * Report Status Enum
 * Status of a report
 */
export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';

/**
 * Report Reason Enum
 * Reasons for reporting content
 */
export type ReportReason = 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';

/**
 * Report Model
 * Represents a report of inappropriate content
 */
export interface Report {
  id: string;
  reporterId: string;
  reporter: UserSummary;
  type: ReportType;
  resourceId: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  reviewedBy?: string | null;
  reviewer?: UserSummary | null;
  reviewNote?: string;
  createdAt: string;
  updatedAt: string;
}
