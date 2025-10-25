// types/models/activityLog.ts

import type { UserSummary } from './user';

/**
 * Activity Log Model
 * Represents an admin activity log entry
 */
export interface ActivityLog {
  id: string;
  admin: UserSummary;
  action: string;
  resourceType: string;
  resourceId: string;
  description: string;
  ipAddress: string;
  createdAt: string;
}
