// API Endpoint Constants
// Auto-generated from Go Fiber route files

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// ============================================================================
// AUTHENTICATION & AUTHORIZATION
// ============================================================================

export const AUTH_API = {
  // Public endpoints
  REGISTER: '/auth/register',                      // POST /api/v1/auth/register
  LOGIN: '/auth/login',                            // POST /api/v1/auth/login
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export const USER_API = {
  // Protected endpoints (authenticated users)
  PROFILE: '/users/profile',                       // GET /api/v1/users/profile
  UPDATE_PROFILE: '/users/profile',                // PUT /api/v1/users/profile
  DELETE_PROFILE: '/users/profile',                // DELETE /api/v1/users/profile

  // Admin endpoints
  LIST: '/users/',                                 // GET /api/v1/users/ (admin only)
}

// ============================================================================
// ADMIN MANAGEMENT
// ============================================================================

export const ADMIN_API = {
  // Dashboard
  DASHBOARD_STATS: '/admin/dashboard/stats',       // GET /api/v1/admin/dashboard/stats
  DASHBOARD_CHARTS: '/admin/dashboard/charts',     // GET /api/v1/admin/dashboard/charts

  // User Management
  USERS: '/admin/users',                           // GET /api/v1/admin/users
  USER_BY_ID: (id: string) => `/admin/users/${id}`,        // GET /api/v1/admin/users/:id
  SUSPEND_USER: (id: string) => `/admin/users/${id}/suspend`,   // PUT /api/v1/admin/users/:id/suspend
  ACTIVATE_USER: (id: string) => `/admin/users/${id}/activate`, // PUT /api/v1/admin/users/:id/activate
  DELETE_USER: (id: string) => `/admin/users/${id}`,            // DELETE /api/v1/admin/users/:id
  UPDATE_USER_ROLE: (id: string) => `/admin/users/${id}/role`,  // PUT /api/v1/admin/users/:id/role

  // Report Management
  REPORTS: '/admin/reports',                       // GET /api/v1/admin/reports
  REPORT_BY_ID: (id: string) => `/admin/reports/${id}`,         // GET /api/v1/admin/reports/:id
  REVIEW_REPORT: (id: string) => `/admin/reports/${id}/review`, // PUT /api/v1/admin/reports/:id/review

  // Activity Logs
  ACTIVITY_LOGS: '/admin/activity-logs',           // GET /api/v1/admin/activity-logs
}

// ============================================================================
// REPORTS
// ============================================================================

export const REPORT_API = {
  // Protected endpoints
  CREATE: '/reports',                              // POST /api/v1/reports
}

// ============================================================================
// VIDEOS
// ============================================================================

export const VIDEO_API = {
  // Public endpoints
  LIST: '/videos',                                 // GET /api/v1/videos
  GET_BY_ID: (id: string) => `/videos/${id}`,     // GET /api/v1/videos/:id
  GET_USER_VIDEOS: (userId: string) => `/videos/user/${userId}`, // GET /api/v1/videos/user/:userId

  // Protected endpoints (authenticated users)
  CREATE: '/videos',                               // POST /api/v1/videos
  UPDATE: (id: string) => `/videos/${id}`,        // PUT /api/v1/videos/:id
  DELETE: (id: string) => `/videos/${id}`,        // DELETE /api/v1/videos/:id
}

export const ADMIN_VIDEO_API = {
  // Admin endpoints
  LIST: '/admin/videos',                           // GET /api/v1/admin/videos
  HIDE: (id: string) => `/admin/videos/${id}/hide`,       // PUT /api/v1/admin/videos/:id/hide
  SHOW: (id: string) => `/admin/videos/${id}/show`,       // PUT /api/v1/admin/videos/:id/show
  DELETE: (id: string) => `/admin/videos/${id}`,          // DELETE /api/v1/admin/videos/:id
}

// ============================================================================
// COMMENTS
// ============================================================================

export const COMMENT_API = {
  // Public endpoints
  GET_BY_VIDEO: (videoId: string) => `/videos/${videoId}/comments`, // GET /api/v1/videos/:id/comments

  // Protected endpoints (authenticated users)
  CREATE: '/comments',                             // POST /api/v1/comments
  UPDATE: (id: string) => `/comments/${id}`,      // PUT /api/v1/comments/:id
  DELETE: (id: string) => `/comments/${id}`,      // DELETE /api/v1/comments/:id
}

export const ADMIN_COMMENT_API = {
  // Admin endpoints
  DELETE: (id: string) => `/admin/comments/${id}`, // DELETE /api/v1/admin/comments/:id
}

// ============================================================================
// FORUMS
// ============================================================================

export const FORUM_API = {
  // Public endpoints
  GET_ACTIVE: '/forums',                           // GET /api/v1/forums
  GET_BY_ID: (id: string) => `/forums/${id}`,     // GET /api/v1/forums/:id
  GET_BY_SLUG: (slug: string) => `/forums/slug/${slug}`, // GET /api/v1/forums/slug/:slug
}

export const ADMIN_FORUM_API = {
  // Admin endpoints
  CREATE: '/admin/forums',                         // POST /api/v1/admin/forums
  LIST: '/admin/forums',                           // GET /api/v1/admin/forums
  UPDATE: (id: string) => `/admin/forums/${id}`,  // PUT /api/v1/admin/forums/:id
  DELETE: (id: string) => `/admin/forums/${id}`,  // DELETE /api/v1/admin/forums/:id
  REORDER: '/admin/forums/reorder',                // PUT /api/v1/admin/forums/reorder
}

// ============================================================================
// TOPICS
// ============================================================================

export const TOPIC_API = {
  // Public endpoints
  LIST: '/topics',                                 // GET /api/v1/topics
  SEARCH: '/topics/search',                        // GET /api/v1/topics/search
  GET_BY_ID: (id: string) => `/topics/${id}`,     // GET /api/v1/topics/:id
  GET_REPLIES: (id: string) => `/topics/${id}/replies`, // GET /api/v1/topics/:id/replies
  GET_BY_FORUM: (forumId: string) => `/forums/${forumId}/topics`, // GET /api/v1/forums/:id/topics (legacy)
  GET_BY_FORUM_SLUG: (slug: string) => `/forums/slug/${slug}/topics`, // GET /api/v1/forums/slug/:slug/topics (new)

  // Protected endpoints (authenticated users)
  CREATE: '/topics',                               // POST /api/v1/topics
  UPDATE: (id: string) => `/topics/${id}`,        // PUT /api/v1/topics/:id
  DELETE: (id: string) => `/topics/${id}`,        // DELETE /api/v1/topics/:id
  CREATE_REPLY: (id: string) => `/topics/${id}/replies`, // POST /api/v1/topics/:id/replies
}

export const ADMIN_TOPIC_API = {
  // Admin endpoints
  PIN: (id: string) => `/admin/topics/${id}/pin`,         // PUT /api/v1/admin/topics/:id/pin
  UNPIN: (id: string) => `/admin/topics/${id}/unpin`,     // PUT /api/v1/admin/topics/:id/unpin
  LOCK: (id: string) => `/admin/topics/${id}/lock`,       // PUT /api/v1/admin/topics/:id/lock
  UNLOCK: (id: string) => `/admin/topics/${id}/unlock`,   // PUT /api/v1/admin/topics/:id/unlock
  DELETE: (id: string) => `/admin/topics/${id}`,          // DELETE /api/v1/admin/topics/:id
}

// ============================================================================
// REPLIES
// ============================================================================

export const REPLY_API = {
  // Protected endpoints (authenticated users)
  UPDATE: (id: string) => `/replies/${id}`,       // PUT /api/v1/replies/:id
  DELETE: (id: string) => `/replies/${id}`,       // DELETE /api/v1/replies/:id
}

export const ADMIN_REPLY_API = {
  // Admin endpoints
  DELETE: (id: string) => `/admin/replies/${id}`, // DELETE /api/v1/admin/replies/:id
}

// ============================================================================
// LIKES
// ============================================================================

export const LIKE_API = {
  // Topic likes (protected)
  LIKE_TOPIC: (id: string) => `/topics/${id}/like`,           // POST /api/v1/topics/:id/like
  UNLIKE_TOPIC: (id: string) => `/topics/${id}/like`,         // DELETE /api/v1/topics/:id/like
  GET_TOPIC_LIKE_STATUS: (id: string) => `/topics/${id}/like`, // GET /api/v1/topics/:id/like

  // Video likes (protected)
  LIKE_VIDEO: (id: string) => `/videos/${id}/like`,           // POST /api/v1/videos/:id/like
  UNLIKE_VIDEO: (id: string) => `/videos/${id}/like`,         // DELETE /api/v1/videos/:id/like
  GET_VIDEO_LIKE_STATUS: (id: string) => `/videos/${id}/like`, // GET /api/v1/videos/:id/like

  // Reply likes (protected)
  LIKE_REPLY: (id: string) => `/replies/${id}/like`,          // POST /api/v1/replies/:id/like
  UNLIKE_REPLY: (id: string) => `/replies/${id}/like`,        // DELETE /api/v1/replies/:id/like
  GET_REPLY_LIKE_STATUS: (id: string) => `/replies/${id}/like`, // GET /api/v1/replies/:id/like

  // Comment likes (protected)
  LIKE_COMMENT: (id: string) => `/comments/${id}/like`,       // POST /api/v1/comments/:id/like
  UNLIKE_COMMENT: (id: string) => `/comments/${id}/like`,     // DELETE /api/v1/comments/:id/like
  GET_COMMENT_LIKE_STATUS: (id: string) => `/comments/${id}/like`, // GET /api/v1/comments/:id/like
}

// ============================================================================
// SHARES
// ============================================================================

export const SHARE_API = {
  // Video shares
  SHARE_VIDEO: (id: string) => `/videos/${id}/share`,         // POST /api/v1/videos/:id/share (protected)
  GET_SHARE_COUNT: (id: string) => `/videos/${id}/share/count`, // GET /api/v1/videos/:id/share/count (public)
}

// ============================================================================
// FOLLOWS
// ============================================================================

export const FOLLOW_API = {
  // Public endpoints (optional auth for isFollowing status)
  GET_FOLLOWERS: (userId: string) => `/users/${userId}/followers`,   // GET /api/v1/users/:userId/followers
  GET_FOLLOWING: (userId: string) => `/users/${userId}/following`,   // GET /api/v1/users/:userId/following
  GET_USER_STATS: (userId: string) => `/users/${userId}/stats`,      // GET /api/v1/users/:userId/stats

  // Protected endpoints (authenticated users)
  FOLLOW_USER: (userId: string) => `/users/${userId}/follow`,        // POST /api/v1/users/:userId/follow
  UNFOLLOW_USER: (userId: string) => `/users/${userId}/follow`,      // DELETE /api/v1/users/:userId/follow
  GET_FOLLOW_STATUS: (userId: string) => `/users/${userId}/follow/status`, // GET /api/v1/users/:userId/follow/status
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const NOTIFICATION_API = {
  // Protected endpoints (all require authentication)
  LIST: '/notifications',                          // GET /api/v1/notifications
  GET_UNREAD_COUNT: '/notifications/unread/count', // GET /api/v1/notifications/unread/count
  MARK_AS_READ: (id: string) => `/notifications/${id}/read`,  // PUT /api/v1/notifications/:id/read
  MARK_MULTIPLE_AS_READ: '/notifications/read',    // PUT /api/v1/notifications/read
  MARK_ALL_AS_READ: '/notifications/read-all',     // PUT /api/v1/notifications/read-all
  DELETE: (id: string) => `/notifications/${id}`,  // DELETE /api/v1/notifications/:id
}

// ============================================================================
// FILES
// ============================================================================

export const FILE_API = {
  // Protected endpoints
  UPLOAD: '/files/upload',                         // POST /api/v1/files/upload
  LIST: '/files/',                                 // GET /api/v1/files/ (admin only)
  GET_USER_FILES: '/files/my',                     // GET /api/v1/files/my
  GET_BY_ID: (id: string) => `/files/${id}`,      // GET /api/v1/files/:id
  DELETE: (id: string) => `/files/${id}`,         // DELETE /api/v1/files/:id (owner only)
}

// ============================================================================
// TASKS
// ============================================================================

export const TASK_API = {
  // Protected endpoints
  CREATE: '/tasks',                                // POST /api/v1/tasks
  LIST: '/tasks/',                                 // GET /api/v1/tasks/ (admin only)
  GET_USER_TASKS: '/tasks/my',                     // GET /api/v1/tasks/my
  GET_BY_ID: (id: string) => `/tasks/${id}`,      // GET /api/v1/tasks/:id
  UPDATE: (id: string) => `/tasks/${id}`,         // PUT /api/v1/tasks/:id (owner only)
  DELETE: (id: string) => `/tasks/${id}`,         // DELETE /api/v1/tasks/:id (owner only)
}

// ============================================================================
// JOBS
// ============================================================================

export const JOB_API = {
  // Admin endpoints (all require admin access)
  CREATE: '/jobs',                                 // POST /api/v1/jobs
  LIST: '/jobs/',                                  // GET /api/v1/jobs
  GET_BY_ID: (id: string) => `/jobs/${id}`,       // GET /api/v1/jobs/:id
  UPDATE: (id: string) => `/jobs/${id}`,          // PUT /api/v1/jobs/:id
  DELETE: (id: string) => `/jobs/${id}`,          // DELETE /api/v1/jobs/:id
  START: (id: string) => `/jobs/${id}/start`,     // POST /api/v1/jobs/:id/start
  STOP: (id: string) => `/jobs/${id}/stop`,       // POST /api/v1/jobs/:id/stop
}

// ============================================================================
// WEBSOCKET
// ============================================================================

export const WEBSOCKET_API = {
  // WebSocket endpoint (optional authentication)
  CONNECT: '/ws',                                  // GET /ws (WebSocket upgrade)
}

// ============================================================================
// TAGS
// ============================================================================

export const TAG_API = {
  // Public endpoints
  LIST: '/tags',                                   // GET /api/v1/tags
  SEARCH: '/tags/search',                          // GET /api/v1/tags/search
  GET_BY_ID: (id: string) => `/tags/${id}`,       // GET /api/v1/tags/:id
}

export const ADMIN_TAG_API = {
  // Admin endpoints
  LIST: '/admin/tags',                             // GET /api/v1/admin/tags
  CREATE: '/admin/tags',                           // POST /api/v1/admin/tags
  UPDATE: (id: string) => `/admin/tags/${id}`,    // PUT /api/v1/admin/tags/:id
  DELETE: (id: string) => `/admin/tags/${id}`,    // DELETE /api/v1/admin/tags/:id
}

// ============================================================================
// HEALTH & ROOT
// ============================================================================

export const HEALTH_API = {
  // Public endpoints
  HEALTH: '/health',                               // GET /health
  ROOT: '/',                                       // GET /
}

// ============================================================================
// COMBINED API OBJECT
// ============================================================================

export const API = {
  // Authentication & Authorization
  AUTH: AUTH_API,

  // User Management
  USER: USER_API,

  // Admin
  ADMIN: ADMIN_API,

  // Reports
  REPORT: REPORT_API,

  // Videos
  VIDEO: VIDEO_API,
  ADMIN_VIDEO: ADMIN_VIDEO_API,

  // Comments
  COMMENT: COMMENT_API,
  ADMIN_COMMENT: ADMIN_COMMENT_API,

  // Forums & Topics
  FORUM: FORUM_API,
  ADMIN_FORUM: ADMIN_FORUM_API,
  TOPIC: TOPIC_API,
  ADMIN_TOPIC: ADMIN_TOPIC_API,

  // Replies
  REPLY: REPLY_API,
  ADMIN_REPLY: ADMIN_REPLY_API,

  // Likes & Shares
  LIKE: LIKE_API,
  SHARE: SHARE_API,

  // Follows
  FOLLOW: FOLLOW_API,

  // Notifications
  NOTIFICATION: NOTIFICATION_API,

  // Files
  FILE: FILE_API,

  // Tasks & Jobs
  TASK: TASK_API,
  JOB: JOB_API,

  // WebSocket
  WEBSOCKET: WEBSOCKET_API,

  // Tags
  TAG: TAG_API,
  ADMIN_TAG: ADMIN_TAG_API,

  // Health
  HEALTH: HEALTH_API,

  // Base URL
  BASE_URL: API_BASE_URL
};

export default API;
