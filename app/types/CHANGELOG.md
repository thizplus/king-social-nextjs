# Changelog

All notable changes to the TypeScript type definitions will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-02

### Added - Initial Release

#### Core Types
- Created `common.ts` with base types (ApiResponse, PaginationMeta, PaginationParams, etc.)
- Created `index.ts` as main export file
- Added TypeScript configuration (`tsconfig.json`)
- Added package configuration (`package.json`)

#### Model Types (13 entities)
- **User** - User model with UserRole enum, UserSummary, UserSummaryWithFullName
- **Forum** - Forum model with ForumOrder
- **Topic** - Topic model with forum and user relations
- **Reply** - Reply model with nested reply support
- **Video** - Video model with VideoSortBy enum and user relation
- **Comment** - Comment model with nested comment support and CommentUserSummary
- **Like** - Like model for topics and videos
- **Share** - Share model with SharePlatform enum
- **Follow** - Follow model with FollowerInfo and FollowingInfo
- **Notification** - Notification model with NotificationType enum and ActorSummary
- **Report** - Report model with ReportType, ReportStatus, and ReportReason enums
- **ActivityLog** - ActivityLog model for admin actions
- **File** - File model with FilePathType enum

#### Request Types (13 categories)
- **Auth Requests** - Login, Register, RefreshToken, ForgotPassword, ResetPassword
- **User Requests** - CreateUser, UpdateUser, ChangePassword
- **Forum Requests** - CreateForum, UpdateForum, ReorderForums
- **Topic Requests** - CreateTopic, UpdateTopic
- **Reply Requests** - CreateReply, UpdateReply
- **Video Requests** - UploadVideo, UpdateVideo, VideoQueryParams
- **Comment Requests** - CreateComment, UpdateComment
- **Like Requests** - LikeTopic, LikeVideo
- **Share Requests** - ShareVideo
- **Follow Requests** - FollowUser
- **Notification Requests** - MarkAsRead, NotificationQueryParams
- **Admin Requests** - AdminUserList, SuspendUser, UpdateUserRole, CreateReport, ReviewReport, ReportQueryParams
- **File Requests** - UploadFile, FileFilter, DeleteFile

#### Response Types (13 categories)
- **Auth Responses** - Login, Register, RefreshToken, Logout
- **User Responses** - User, UserList
- **Forum Responses** - Forum, ForumList
- **Topic Responses** - Topic, TopicList, TopicDetail
- **Reply Responses** - Reply, ReplyList
- **Video Responses** - Video, VideoList
- **Comment Responses** - Comment, CommentList
- **Like Responses** - Like, LikeStatus
- **Share Responses** - Share, ShareCount
- **Follow Responses** - Follow, FollowStatus, Follower, Following, FollowList, FollowingList, UserStats
- **Notification Responses** - Notification, NotificationList, UnreadCount, MarkAsRead
- **Admin Responses** - DashboardStats, DashboardCharts, AdminUser, AdminUserList, Report, ReportList, ActivityLog, ActivityLogList
- **File Responses** - File, FileList, Upload, DeleteFile

#### Documentation
- Created comprehensive README.md with:
  - Directory structure
  - Installation & usage guide
  - All type categories
  - Complete API mapping for 60+ endpoints
  - Type conventions and best practices
  - Contributing guidelines

- Created EXAMPLES.md with:
  - Generic API client implementation
  - React hooks and components examples
  - Vue 3 composables examples
  - Angular service examples
  - Axios integration
  - Fetch API integration
  - Form validation with Zod
  - Redux Toolkit state management
  - Type guards and utility functions

- Created QUICK_REFERENCE.md with:
  - Quick lookup tables organized by feature
  - All API endpoints with request/response types
  - Enum reference guide
  - Common patterns
  - Import cheat sheet
  - Field type mapping table

- Created SUMMARY.md with:
  - Complete project overview
  - File statistics (51 files total)
  - Coverage metrics (60+ endpoints)
  - Type statistics (100+ interfaces, 8 enums)
  - Quality metrics
  - Integration guide

- Created CHANGELOG.md (this file)

#### Type Safety Features
- All UUID fields mapped to `string`
- All time.Time fields mapped to `string` (ISO 8601)
- Proper nullable handling with `| null` and `?`
- Generic type support for API responses
- Discriminated unions for enums
- Nested object support (comments, replies)

#### Enums Defined (8 types)
1. UserRole - 'user' | 'admin'
2. VideoSortBy - 'newest' | 'oldest' | 'popular'
3. SharePlatform - 'facebook' | 'twitter' | 'line' | 'copy_link'
4. NotificationType - 6 types for different notifications
5. ReportType - 'topic' | 'reply' | 'video' | 'comment' | 'user'
6. ReportStatus - 'pending' | 'reviewing' | 'resolved' | 'rejected'
7. ReportReason - 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other'
8. FilePathType - 'custom' | 'structured'

### API Coverage (60+ endpoints)

#### Authentication (6 endpoints)
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- POST /api/auth/logout

#### Users (4 endpoints)
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- POST /api/users/change-password

#### Forums (5 endpoints)
- GET /api/forums
- GET /api/forums/:id
- POST /api/forums
- PUT /api/forums/:id
- POST /api/forums/reorder

#### Topics (4 endpoints)
- GET /api/topics
- GET /api/topics/:id
- POST /api/topics
- PUT /api/topics/:id
- DELETE /api/topics/:id

#### Replies (4 endpoints)
- GET /api/topics/:topicId/replies
- POST /api/topics/:topicId/replies
- PUT /api/replies/:id
- DELETE /api/replies/:id

#### Videos (5 endpoints)
- GET /api/videos
- GET /api/videos/:id
- POST /api/videos
- PUT /api/videos/:id
- DELETE /api/videos/:id

#### Comments (4 endpoints)
- GET /api/videos/:videoId/comments
- POST /api/comments
- PUT /api/comments/:id
- DELETE /api/comments/:id

#### Likes (4 endpoints)
- POST /api/likes/topic
- POST /api/likes/video
- GET /api/likes/topic/:topicId/status
- GET /api/likes/video/:videoId/status

#### Shares (2 endpoints)
- POST /api/shares
- GET /api/shares/video/:videoId/count

#### Follows (5 endpoints)
- POST /api/follows
- DELETE /api/follows/:userId
- GET /api/follows/:userId/status
- GET /api/users/:userId/followers
- GET /api/users/:userId/following
- GET /api/users/:userId/stats

#### Notifications (4 endpoints)
- GET /api/notifications
- GET /api/notifications/unread-count
- PUT /api/notifications/mark-read
- DELETE /api/notifications/:id

#### Admin (9 endpoints)
- GET /api/admin/dashboard/stats
- GET /api/admin/dashboard/charts
- GET /api/admin/users
- PUT /api/admin/users/:id/suspend
- PUT /api/admin/users/:id/role
- GET /api/admin/reports
- POST /api/reports
- PUT /api/admin/reports/:id/review
- GET /api/admin/activity-logs

#### Files (4 endpoints)
- POST /api/files/upload
- GET /api/files
- GET /api/files/:id
- DELETE /api/files/:id

### Framework Support
- React (with examples)
- Vue 3 (with examples)
- Angular (with examples)
- Any TypeScript framework

### HTTP Client Support
- Fetch API (with examples)
- Axios (with examples)
- Any HTTP client library

### Type Conversion Rules
| Go Type | TypeScript Type | Notes |
|---------|----------------|-------|
| string | string | Direct mapping |
| int, int64 | number | Direct mapping |
| bool | boolean | Direct mapping |
| uuid.UUID | string | Converted to string |
| time.Time | string | ISO 8601 format |
| *Type | Type \| null or Type? | Nullable/optional |
| []Type | Type[] | Array |
| interface{} | unknown | Generic type |

---

## Future Versions

### [Unreleased]
Future enhancements will be tracked here.

#### Planned Features
- Add utility type helpers
- Add type guards for all enums
- Add API client generator
- Add GraphQL type definitions (if applicable)
- Add WebSocket event types (if applicable)

#### Maintenance
- Keep types in sync with backend DTOs
- Update documentation as API evolves
- Add more usage examples

---

## Version Guidelines

### Major Version (X.0.0)
- Breaking changes to existing types
- Removal of deprecated types
- Major API restructuring

### Minor Version (0.X.0)
- New types added
- New features that don't break existing code
- Deprecation warnings

### Patch Version (0.0.X)
- Bug fixes in type definitions
- Documentation updates
- No functional changes

---

## Notes

- All types match backend DTOs exactly
- Documentation is comprehensive and includes examples
- Package is production-ready
- Fully typed with strict TypeScript
- Zero runtime dependencies
- Framework-agnostic design

---

**Maintained by**: Development Team
**Last Updated**: 2025-10-02
