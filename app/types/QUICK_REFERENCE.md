# Quick Reference Guide

Quick lookup table for all types organized by feature.

## Authentication & Users

### Types
```typescript
// Models
User, UserRole, UserSummary

// Requests
LoginRequest, RegisterRequest, RefreshTokenRequest
ForgotPasswordRequest, ResetPasswordRequest
CreateUserRequest, UpdateUserRequest, ChangePasswordRequest

// Responses
LoginResponse, RegisterResponse, RefreshTokenResponse, LogoutResponse
UserResponse, UserListResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| POST | `/api/auth/login` | `LoginRequest` | `LoginResponse` |
| POST | `/api/auth/register` | `RegisterRequest` | `RegisterResponse` |
| POST | `/api/auth/refresh` | `RefreshTokenRequest` | `RefreshTokenResponse` |
| POST | `/api/auth/forgot-password` | `ForgotPasswordRequest` | - |
| POST | `/api/auth/reset-password` | `ResetPasswordRequest` | - |
| POST | `/api/auth/logout` | - | `LogoutResponse` |
| GET | `/api/users` | - | `UserListResponse` |
| GET | `/api/users/:id` | - | `UserResponse` |
| PUT | `/api/users/:id` | `UpdateUserRequest` | `UserResponse` |
| POST | `/api/users/change-password` | `ChangePasswordRequest` | - |

---

## Forums & Topics

### Types
```typescript
// Models
Forum, ForumOrder, Topic

// Requests
CreateForumRequest, UpdateForumRequest, ReorderForumsRequest
CreateTopicRequest, UpdateTopicRequest

// Responses
ForumResponse, ForumListResponse
TopicResponse, TopicListResponse, TopicDetailResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/forums` | - | `ForumListResponse` |
| GET | `/api/forums/:id` | - | `ForumResponse` |
| POST | `/api/forums` | `CreateForumRequest` | `ForumResponse` |
| PUT | `/api/forums/:id` | `UpdateForumRequest` | `ForumResponse` |
| POST | `/api/forums/reorder` | `ReorderForumsRequest` | - |
| GET | `/api/topics` | - | `TopicListResponse` |
| GET | `/api/topics/:id` | - | `TopicDetailResponse` |
| POST | `/api/topics` | `CreateTopicRequest` | `TopicResponse` |
| PUT | `/api/topics/:id` | `UpdateTopicRequest` | `TopicResponse` |
| DELETE | `/api/topics/:id` | - | - |

---

## Replies

### Types
```typescript
// Models
Reply

// Requests
CreateReplyRequest, UpdateReplyRequest

// Responses
ReplyResponse, ReplyListResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/topics/:topicId/replies` | - | `ReplyListResponse` |
| POST | `/api/topics/:topicId/replies` | `CreateReplyRequest` | `ReplyResponse` |
| PUT | `/api/replies/:id` | `UpdateReplyRequest` | `ReplyResponse` |
| DELETE | `/api/replies/:id` | - | - |

---

## Videos & Comments

### Types
```typescript
// Models
Video, VideoSortBy, Comment, CommentUserSummary

// Requests
UploadVideoRequest, UpdateVideoRequest, VideoQueryParams
CreateCommentRequest, UpdateCommentRequest

// Responses
VideoResponse, VideoListResponse
CommentResponse, CommentListResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/videos` | `VideoQueryParams` | `VideoListResponse` |
| GET | `/api/videos/:id` | - | `VideoResponse` |
| POST | `/api/videos` | `UploadVideoRequest` | `VideoResponse` |
| PUT | `/api/videos/:id` | `UpdateVideoRequest` | `VideoResponse` |
| DELETE | `/api/videos/:id` | - | - |
| GET | `/api/videos/:videoId/comments` | - | `CommentListResponse` |
| POST | `/api/comments` | `CreateCommentRequest` | `CommentResponse` |
| PUT | `/api/comments/:id` | `UpdateCommentRequest` | `CommentResponse` |
| DELETE | `/api/comments/:id` | - | - |

---

## Social Features (Likes, Shares, Follows)

### Types
```typescript
// Models
Like, Share, SharePlatform, Follow, FollowerInfo, FollowingInfo

// Requests
LikeTopicRequest, LikeVideoRequest
ShareVideoRequest
FollowUserRequest

// Responses
LikeResponse, LikeStatusResponse
ShareResponse, ShareCountResponse
FollowResponse, FollowStatusResponse, FollowerResponse, FollowingResponse
FollowListResponse, FollowingListResponse, UserStatsResponse
```

### API Endpoints

#### Likes
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| POST | `/api/likes/topic` | `LikeTopicRequest` | `LikeResponse` |
| POST | `/api/likes/video` | `LikeVideoRequest` | `LikeResponse` |
| GET | `/api/likes/topic/:topicId/status` | - | `LikeStatusResponse` |
| GET | `/api/likes/video/:videoId/status` | - | `LikeStatusResponse` |

#### Shares
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| POST | `/api/shares` | `ShareVideoRequest` | `ShareResponse` |
| GET | `/api/shares/video/:videoId/count` | - | `ShareCountResponse` |

#### Follows
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| POST | `/api/follows` | `FollowUserRequest` | `FollowResponse` |
| DELETE | `/api/follows/:userId` | - | `FollowResponse` |
| GET | `/api/follows/:userId/status` | - | `FollowStatusResponse` |
| GET | `/api/users/:userId/followers` | - | `FollowListResponse` |
| GET | `/api/users/:userId/following` | - | `FollowingListResponse` |
| GET | `/api/users/:userId/stats` | - | `UserStatsResponse` |

---

## Notifications

### Types
```typescript
// Models
Notification, NotificationType, ActorSummary

// Requests
MarkAsReadRequest, NotificationQueryParams

// Responses
NotificationResponse, NotificationListResponse
UnreadCountResponse, MarkAsReadResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/notifications` | `NotificationQueryParams` | `NotificationListResponse` |
| GET | `/api/notifications/unread-count` | - | `UnreadCountResponse` |
| PUT | `/api/notifications/mark-read` | `MarkAsReadRequest` | `MarkAsReadResponse` |
| DELETE | `/api/notifications/:id` | - | - |

---

## Admin Panel

### Types
```typescript
// Models
Report, ReportType, ReportStatus, ReportReason
ActivityLog

// Requests
AdminUserListRequest, SuspendUserRequest, UpdateUserRoleRequest
ReportQueryParams, CreateReportRequest, ReviewReportRequest

// Responses
DashboardStatsResponse, DashboardChartsResponse, DataPoint, ForumStats
AdminUserResponse, AdminUserListResponse
ReportResponse, ReportListResponse
ActivityLogResponse, ActivityLogListResponse
```

### API Endpoints

#### Dashboard
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/admin/dashboard/stats` | - | `DashboardStatsResponse` |
| GET | `/api/admin/dashboard/charts` | - | `DashboardChartsResponse` |

#### User Management
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/admin/users` | `AdminUserListRequest` | `AdminUserListResponse` |
| PUT | `/api/admin/users/:id/suspend` | `SuspendUserRequest` | - |
| PUT | `/api/admin/users/:id/role` | `UpdateUserRoleRequest` | - |

#### Reports
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/admin/reports` | `ReportQueryParams` | `ReportListResponse` |
| POST | `/api/reports` | `CreateReportRequest` | `ReportResponse` |
| PUT | `/api/admin/reports/:id/review` | `ReviewReportRequest` | - |

#### Activity Logs
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| GET | `/api/admin/activity-logs` | - | `ActivityLogListResponse` |

---

## File Upload

### Types
```typescript
// Models
File, FilePathType

// Requests
UploadFileRequest, FileFilterRequest, DeleteFileRequest

// Responses
FileResponse, FileListResponse, UploadResponse, DeleteFileResponse
```

### API Endpoints
| Method | Endpoint | Request Type | Response Type |
|--------|----------|--------------|---------------|
| POST | `/api/files/upload` | `UploadFileRequest` (multipart) | `UploadResponse` |
| GET | `/api/files` | `FileFilterRequest` | `FileListResponse` |
| GET | `/api/files/:id` | - | `FileResponse` |
| DELETE | `/api/files/:id` | - | `DeleteFileResponse` |

---

## Common Enums Reference

```typescript
// User Roles
type UserRole = 'user' | 'admin';

// Video Sorting
type VideoSortBy = 'newest' | 'oldest' | 'popular';

// Share Platforms
type SharePlatform = 'facebook' | 'twitter' | 'line' | 'copy_link';

// Notification Types
type NotificationType =
  | 'topic_reply'    // Someone replied to my topic
  | 'topic_like'     // Someone liked my topic
  | 'video_like'     // Someone liked my video
  | 'video_comment'  // Someone commented on my video
  | 'comment_reply'  // Someone replied to my comment
  | 'new_follower';  // Someone followed me

// Report Types
type ReportType = 'topic' | 'reply' | 'video' | 'comment' | 'user';

// Report Status
type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';

// Report Reasons
type ReportReason = 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';

// File Path Types
type FilePathType = 'custom' | 'structured';
```

---

## Common Patterns

### Generic API Response
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

### Paginated Response
```typescript
interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
  error?: string;
}

interface PaginationMeta {
  total: number;
  offset: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### Query Parameters
```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}
```

---

## Type Guards & Helpers

```typescript
// Check if user is admin
function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

// Check if user is active
function isActiveUser(user: User): boolean {
  return user.isActive && (!user.suspendedUntil || new Date(user.suspendedUntil) < new Date());
}

// Check notification type
function isVideoNotification(type: NotificationType): boolean {
  return type === 'video_like' || type === 'video_comment';
}

function isTopicNotification(type: NotificationType): boolean {
  return type === 'topic_reply' || type === 'topic_like';
}

// Format user full name
function getUserFullName(user: { firstName: string; lastName: string }): string {
  return `${user.firstName} ${user.lastName}`;
}

// Convert User to UserSummary
function toUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  };
}
```

---

## Quick Import Cheat Sheet

```typescript
// Common types
import { ApiResponse, PaginatedResponse, PaginationMeta, PaginationParams } from './types';

// User system
import { User, UserRole, UserSummary } from './types';
import { LoginRequest, RegisterRequest, UpdateUserRequest } from './types';
import { LoginResponse, RegisterResponse, UserListResponse } from './types';

// Forum system
import { Forum, Topic, Reply } from './types';
import { CreateForumRequest, CreateTopicRequest, CreateReplyRequest } from './types';
import { ForumListResponse, TopicListResponse, TopicDetailResponse } from './types';

// Video system
import { Video, Comment, VideoSortBy } from './types';
import { UploadVideoRequest, CreateCommentRequest, VideoQueryParams } from './types';
import { VideoListResponse, CommentListResponse } from './types';

// Social features
import { Like, Share, Follow, SharePlatform } from './types';
import { LikeVideoRequest, ShareVideoRequest, FollowUserRequest } from './types';
import { LikeStatusResponse, ShareResponse, FollowListResponse } from './types';

// Notifications
import { Notification, NotificationType } from './types';
import { NotificationQueryParams, MarkAsReadRequest } from './types';
import { NotificationListResponse, UnreadCountResponse } from './types';

// Admin
import { Report, ReportType, ReportStatus, ActivityLog } from './types';
import { CreateReportRequest, ReviewReportRequest, AdminUserListRequest } from './types';
import { DashboardStatsResponse, ReportListResponse, AdminUserListResponse } from './types';

// Files
import { File, FilePathType } from './types';
import { UploadFileRequest, FileFilterRequest } from './types';
import { UploadResponse, FileListResponse } from './types';
```

---

## Field Type Mappings

| Backend (Go) | Frontend (TypeScript) | Example |
|--------------|----------------------|---------|
| `string` | `string` | `"hello"` |
| `int`, `int64` | `number` | `42` |
| `bool` | `boolean` | `true` |
| `uuid.UUID` | `string` | `"550e8400-e29b-41d4-a716-446655440000"` |
| `time.Time` | `string` | `"2024-01-15T10:30:00Z"` |
| `*Type` | `Type \| null` or `Type?` | `null` or `undefined` |
| `[]Type` | `Type[]` | `[...]` |
| `interface{}` | `unknown` or `any` | - |

---

This quick reference should help you find the right types quickly!
