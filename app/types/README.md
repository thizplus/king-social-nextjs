# TypeScript Type Definitions for Go Fiber Social Media Backend

Comprehensive TypeScript type definitions for all API routes in the Go Fiber social media backend.

## Overview

This type library provides complete TypeScript definitions that match the Go backend DTOs, ensuring type safety when building frontend applications.

## Directory Structure

```
types/
├── common.ts              # Base types (ApiResponse, PaginationMeta, etc.)
├── models/                # Domain entity models
│   ├── index.ts
│   ├── user.ts           # User model and enums
│   ├── forum.ts          # Forum model
│   ├── topic.ts          # Topic model
│   ├── reply.ts          # Reply model
│   ├── video.ts          # Video model
│   ├── comment.ts        # Comment model
│   ├── like.ts           # Like model
│   ├── share.ts          # Share model
│   ├── follow.ts         # Follow model
│   ├── notification.ts   # Notification model and enums
│   ├── report.ts         # Report model and enums
│   ├── activityLog.ts    # Activity log model
│   └── file.ts           # File model
├── request/               # Request DTOs
│   ├── index.ts
│   ├── auth.ts           # Authentication requests
│   ├── user.ts           # User management requests
│   ├── forum.ts          # Forum requests
│   ├── topic.ts          # Topic requests
│   ├── reply.ts          # Reply requests
│   ├── video.ts          # Video requests
│   ├── comment.ts        # Comment requests
│   ├── like.ts           # Like requests
│   ├── share.ts          # Share requests
│   ├── follow.ts         # Follow requests
│   ├── notification.ts   # Notification requests
│   ├── admin.ts          # Admin panel requests
│   └── file.ts           # File upload requests
├── response/              # Response DTOs
│   ├── index.ts
│   ├── auth.ts           # Authentication responses
│   ├── user.ts           # User responses
│   ├── forum.ts          # Forum responses
│   ├── topic.ts          # Topic responses
│   ├── reply.ts          # Reply responses
│   ├── video.ts          # Video responses
│   ├── comment.ts        # Comment responses
│   ├── like.ts           # Like responses
│   ├── share.ts          # Share responses
│   ├── follow.ts         # Follow responses
│   ├── notification.ts   # Notification responses
│   ├── admin.ts          # Admin panel responses
│   └── file.ts           # File responses
└── index.ts               # Main export file
```

## Installation & Usage

### Basic Import

```typescript
// Import everything
import * from './types';

// Import specific types
import { User, LoginRequest, LoginResponse, ApiResponse } from './types';

// Import from specific categories
import { User, Forum, Topic } from './types/models';
import { LoginRequest, RegisterRequest } from './types/request';
import { LoginResponse, UserListResponse } from './types/response';
```

### With API Client

```typescript
import { ApiResponse, LoginRequest, LoginResponse } from './types';

async function login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
}
```

### With React/Vue/Angular

```typescript
import { User, VideoListResponse, PaginatedResponse } from './types';
import { useState, useEffect } from 'react';

function VideoList() {
  const [videos, setVideos] = useState<PaginatedResponse<VideoListResponse>>();

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  return <div>{/* render videos */}</div>;
}
```

## Type Categories

### Common Types

- **ApiResponse<T>**: Standard API response wrapper
- **PaginatedResponse<T>**: Response with pagination metadata
- **PaginationMeta**: Pagination information
- **PaginationParams**: Query params for pagination
- **IDRequest**: Route parameter for IDs
- **BaseEntity**: Common entity fields

### Models

Entity models representing database records:

- **User**: User account with profile info
- **Forum**: Discussion forum/category
- **Topic**: Discussion topic in a forum
- **Reply**: Reply to a topic (supports nesting)
- **Video**: Video content
- **Comment**: Comment on a video (supports nesting)
- **Like**: Like on topic or video
- **Share**: Share action on video
- **Follow**: Follow relationship between users
- **Notification**: User notification
- **Report**: Content/user report
- **ActivityLog**: Admin activity log
- **File**: Uploaded file metadata

### Request Types

DTOs for API requests:

#### Authentication
- `LoginRequest`
- `RegisterRequest`
- `RefreshTokenRequest`
- `ForgotPasswordRequest`
- `ResetPasswordRequest`

#### User Management
- `CreateUserRequest`
- `UpdateUserRequest`
- `ChangePasswordRequest`

#### Forum System
- `CreateForumRequest`
- `UpdateForumRequest`
- `ReorderForumsRequest`
- `CreateTopicRequest`
- `UpdateTopicRequest`
- `CreateReplyRequest`
- `UpdateReplyRequest`

#### Video System
- `UploadVideoRequest`
- `UpdateVideoRequest`
- `VideoQueryParams`
- `CreateCommentRequest`
- `UpdateCommentRequest`

#### Social Features
- `LikeTopicRequest`
- `LikeVideoRequest`
- `ShareVideoRequest`
- `FollowUserRequest`

#### Notifications
- `MarkAsReadRequest`
- `NotificationQueryParams`

#### Admin Panel
- `AdminUserListRequest`
- `SuspendUserRequest`
- `UpdateUserRoleRequest`
- `CreateReportRequest`
- `ReviewReportRequest`
- `ReportQueryParams`

#### File Upload
- `UploadFileRequest`
- `FileFilterRequest`
- `DeleteFileRequest`

### Response Types

DTOs for API responses (match backend response structure):

- All entity responses (UserResponse, ForumResponse, etc.)
- List responses with pagination (UserListResponse, VideoListResponse, etc.)
- Specialized responses (LoginResponse, LikeStatusResponse, etc.)
- Admin dashboard responses (DashboardStatsResponse, etc.)

## Enums & Type Unions

### User System
```typescript
type UserRole = 'user' | 'admin';
```

### Video System
```typescript
type VideoSortBy = 'newest' | 'oldest' | 'popular';
```

### Social Features
```typescript
type SharePlatform = 'facebook' | 'twitter' | 'line' | 'copy_link';
```

### Notifications
```typescript
type NotificationType =
  | 'topic_reply'
  | 'topic_like'
  | 'video_like'
  | 'video_comment'
  | 'comment_reply'
  | 'new_follower';
```

### Reports
```typescript
type ReportType = 'topic' | 'reply' | 'video' | 'comment' | 'user';
type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';
type ReportReason = 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other';
```

### Files
```typescript
type FilePathType = 'custom' | 'structured';
```

## API Mapping

### Authentication Routes
- POST `/api/auth/register` → `RegisterRequest` → `RegisterResponse`
- POST `/api/auth/login` → `LoginRequest` → `LoginResponse`
- POST `/api/auth/refresh` → `RefreshTokenRequest` → `RefreshTokenResponse`
- POST `/api/auth/forgot-password` → `ForgotPasswordRequest`
- POST `/api/auth/reset-password` → `ResetPasswordRequest`
- POST `/api/auth/logout` → `LogoutResponse`

### User Routes
- GET `/api/users` → `UserListResponse`
- GET `/api/users/:id` → `UserResponse`
- PUT `/api/users/:id` → `UpdateUserRequest` → `UserResponse`
- POST `/api/users/change-password` → `ChangePasswordRequest`

### Forum Routes
- GET `/api/forums` → `ForumListResponse`
- GET `/api/forums/:id` → `ForumResponse`
- POST `/api/forums` → `CreateForumRequest` → `ForumResponse`
- PUT `/api/forums/:id` → `UpdateForumRequest` → `ForumResponse`
- POST `/api/forums/reorder` → `ReorderForumsRequest`

### Topic Routes
- GET `/api/topics` → `TopicListResponse`
- GET `/api/topics/:id` → `TopicDetailResponse`
- POST `/api/topics` → `CreateTopicRequest` → `TopicResponse`
- PUT `/api/topics/:id` → `UpdateTopicRequest` → `TopicResponse`
- DELETE `/api/topics/:id`

### Reply Routes
- GET `/api/topics/:topicId/replies` → `ReplyListResponse`
- POST `/api/topics/:topicId/replies` → `CreateReplyRequest` → `ReplyResponse`
- PUT `/api/replies/:id` → `UpdateReplyRequest` → `ReplyResponse`
- DELETE `/api/replies/:id`

### Video Routes
- GET `/api/videos` → `VideoListResponse`
- GET `/api/videos/:id` → `VideoResponse`
- POST `/api/videos` → `UploadVideoRequest` → `VideoResponse`
- PUT `/api/videos/:id` → `UpdateVideoRequest` → `VideoResponse`
- DELETE `/api/videos/:id`

### Comment Routes
- GET `/api/videos/:videoId/comments` → `CommentListResponse`
- POST `/api/comments` → `CreateCommentRequest` → `CommentResponse`
- PUT `/api/comments/:id` → `UpdateCommentRequest` → `CommentResponse`
- DELETE `/api/comments/:id`

### Like Routes
- POST `/api/likes/topic` → `LikeTopicRequest` → `LikeResponse`
- POST `/api/likes/video` → `LikeVideoRequest` → `LikeResponse`
- GET `/api/likes/topic/:topicId/status` → `LikeStatusResponse`
- GET `/api/likes/video/:videoId/status` → `LikeStatusResponse`

### Share Routes
- POST `/api/shares` → `ShareVideoRequest` → `ShareResponse`
- GET `/api/shares/video/:videoId/count` → `ShareCountResponse`

### Follow Routes
- POST `/api/follows` → `FollowUserRequest` → `FollowResponse`
- DELETE `/api/follows/:userId` → `FollowResponse`
- GET `/api/follows/:userId/status` → `FollowStatusResponse`
- GET `/api/users/:userId/followers` → `FollowListResponse`
- GET `/api/users/:userId/following` → `FollowingListResponse`
- GET `/api/users/:userId/stats` → `UserStatsResponse`

### Notification Routes
- GET `/api/notifications` → `NotificationListResponse`
- GET `/api/notifications/unread-count` → `UnreadCountResponse`
- PUT `/api/notifications/mark-read` → `MarkAsReadRequest` → `MarkAsReadResponse`
- DELETE `/api/notifications/:id`

### Admin Routes
- GET `/api/admin/dashboard/stats` → `DashboardStatsResponse`
- GET `/api/admin/dashboard/charts` → `DashboardChartsResponse`
- GET `/api/admin/users` → `AdminUserListResponse`
- PUT `/api/admin/users/:id/suspend` → `SuspendUserRequest`
- PUT `/api/admin/users/:id/role` → `UpdateUserRoleRequest`
- GET `/api/admin/reports` → `ReportListResponse`
- POST `/api/reports` → `CreateReportRequest` → `ReportResponse`
- PUT `/api/admin/reports/:id/review` → `ReviewReportRequest`
- GET `/api/admin/activity-logs` → `ActivityLogListResponse`

### File Routes
- POST `/api/files/upload` → `UploadFileRequest` → `UploadResponse`
- GET `/api/files` → `FileListResponse`
- GET `/api/files/:id` → `FileResponse`
- DELETE `/api/files/:id` → `DeleteFileResponse`

## Type Conventions

### Naming
- Models: Entity name (e.g., `User`, `Forum`, `Topic`)
- Requests: `{Action}{Entity}Request` (e.g., `CreateForumRequest`, `UpdateVideoRequest`)
- Responses: `{Entity}Response` or `{Entity}ListResponse` (e.g., `UserResponse`, `VideoListResponse`)
- Enums: PascalCase types (e.g., `UserRole`, `NotificationType`)

### Date/Time Fields
- All date/time fields are represented as `string` (ISO 8601 format)
- Backend sends: `"2024-01-15T10:30:00Z"`
- Frontend parses: `new Date(dateString)`

### UUID Fields
- All UUID fields are represented as `string`
- Backend format: `"550e8400-e29b-41d4-a716-446655440000"`

### Optional Fields
- Use `?` for optional fields: `avatar?: string`
- Use `| null` for nullable fields: `parentId?: string | null`

### Nested Objects
- Use `omitempty` pattern: `user?: UserSummary`
- Circular references handled with interfaces

## Best Practices

### 1. Type Safety
```typescript
// Good - type-safe API call
async function getVideos(params: VideoQueryParams): Promise<ApiResponse<VideoListResponse>> {
  const response = await api.get('/videos', { params });
  return response.data;
}

// Bad - no type safety
async function getVideos(params: any): Promise<any> {
  return api.get('/videos', { params });
}
```

### 2. Reusable Types
```typescript
// Good - reuse base types
interface UserCardProps {
  user: UserSummary;
}

// Bad - duplicate definitions
interface UserCardProps {
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
```

### 3. Discriminated Unions
```typescript
// Use type guards for enums
function getNotificationIcon(type: NotificationType): string {
  switch (type) {
    case 'topic_reply': return 'comment';
    case 'topic_like': return 'heart';
    case 'video_like': return 'heart';
    case 'video_comment': return 'comment';
    case 'comment_reply': return 'reply';
    case 'new_follower': return 'user-plus';
  }
}
```

### 4. Generic API Wrapper
```typescript
class ApiClient {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
  }

  async post<TReq, TRes>(url: string, data: TReq): Promise<ApiResponse<TRes>> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

// Usage
const client = new ApiClient();
const loginResult = await client.post<LoginRequest, LoginResponse>('/auth/login', credentials);
```

## Type Generation

These types were manually created to match the Go backend DTOs in:
- `domain/dto/` - Request/Response DTOs
- `domain/models/` - Entity models

### Mapping Rules

| Go Type | TypeScript Type |
|---------|----------------|
| `string` | `string` |
| `int`, `int64` | `number` |
| `bool` | `boolean` |
| `uuid.UUID` | `string` |
| `time.Time` | `string` |
| `*Type` (pointer) | `Type \| null` or `Type?` |
| `[]Type` | `Type[]` |
| `interface{}` | `unknown` or `any` |

## Contributing

When adding new API endpoints:

1. Add model types in `models/{entity}.ts`
2. Add request types in `request/{entity}.ts`
3. Add response types in `response/{entity}.ts`
4. Export from respective `index.ts` files
5. Update this README with API mapping

## License

This type library follows the same license as the main project.
