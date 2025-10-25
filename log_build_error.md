# Build Log - Error Report

**Date:** 2025-10-25
**Command:** `npm run build`
**Status:** ❌ FAILED TO COMPILE

## Summary
Build failed due to TypeScript/ESLint errors. Total errors found across multiple files.

## Error Categories

### 1. Unused Variables/Imports (@typescript-eslint/no-unused-vars)
- `app/(main)/profile/page.tsx:7:3` - 'Grid3X3' is defined but never used
- `app/(main)/profile/page.tsx:61:7` - 'likedPosts' is assigned a value but never used
- `app/(main)/topic/create/page.tsx:9:10` - 'Textarea' is defined but never used
- `app/(main)/topic/create/page.tsx:21:15` - 'Tag' is defined but never used
- `app/(main)/topic/create/page.tsx:22:15` - 'CreateTopicRequest' is defined but never used
- `app/(main)/topic/create/page.tsx:42:57` - 'loadTags' is assigned a value but never used
- `app/components/layout/main/MobileHeader.tsx:28:10` - 'isMounted' is assigned a value but never used
- `app/components/layout/main/PrimaryNav.tsx:1:10` - 'CalendarDays' is defined but never used
- `app/components/layout/main/PrimaryNav.tsx:1:24` - 'MessagesSquare' is defined but never used
- `app/components/layout/main/PrimaryNav.tsx:1:40` - 'Search' is defined but never used
- `app/components/layout/main/PrimaryNav.tsx:1:48` - 'Users' is defined but never used
- `app/components/pages/topic/NestedReplyItem.tsx:86:12` - 'likeError' is assigned a value but never used
- `app/components/pages/topic/TopicContent.tsx:9:3` - 'MessageSquare' is defined but never used
- `app/components/pages/topic/TopicDetail.tsx:4:20` - 'useEffect' is defined but never used
- `app/components/pages/topic/TopicDetail.tsx:50:12` - 'likeError' is assigned a value but never used
- `app/components/pages/topic/TopicHeader.tsx:10:10` - 'cn' is defined but never used
- `app/components/pages/topic/TopicReplies.tsx:16:10` - 'cn' is defined but never used
- `app/components/pages/topic/TopicSidebar.tsx:14:3` - 'Clock' is defined but never used
- `app/components/pages/topic/TopicSidebar.tsx:19:10` - 'Badge' is defined but never used
- `app/hooks/useTopic.ts:4:22` - 'Reply' is defined but never used
- `app/services/replyService.ts:4:10` - 'API' is defined but never used
- `app/services/tagService.ts:31:3` - 'TagPopularityResponse' is defined but never used
- `app/services/userService.ts:12:3` - 'EnhancedProfileUpdateRequest' is defined but never used
- `app/services/userService.ts:15:3` - 'UserResponse' is defined but never used
- `app/services/userService.ts:16:3` - 'UserListResponse' is defined but never used
- `app/services/userService.ts:240:14` - 'error' is defined but never used
- `app/services/userService.ts:276:14` - 'error' is defined but never used
- `app/types/response/user.ts:3:52` - 'UserStats' is defined but never used

### 2. Const Preference (prefer-const)
- `app/(main)/topic/create/page.tsx:155:11` - 'thumbnailUrl' is never reassigned. Use 'const' instead

### 3. Image Optimization Warnings (@next/next/no-img-element)
- `app/(main)/topic/create/page.tsx:290:27` - Using `<img>` could result in slower LCP
- `app/components/common/editor/ImageNodeView.tsx:145:9` - Using `<img>` could result in slower LCP
- `app/components/common/editor/ImageUploadDialog.tsx:224:23` - Using `<img>` could result in slower LCP
- `app/components/pages/home/CategoryScroll.tsx:76:13` - Using `<img>` could result in slower LCP
- `app/components/pages/topic/TopicContent.tsx:111:13` - Using `<img>` could result in slower LCP
- `app/components/pages/topic/TopicDetail.tsx:232:15` - Using `<img>` could result in slower LCP

### 4. TypeScript Any Types (@typescript-eslint/no-explicit-any)
- `app/hooks/useForum.ts:40:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:43:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:86:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:126:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:168:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:211:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:251:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:291:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:328:21` - Unexpected any. Specify a different type
- `app/hooks/useTopic.ts:368:21` - Unexpected any. Specify a different type
- `app/services/tagService.ts:343:42` - Unexpected any. Specify a different type
- `app/services/tagService.ts:458:37` - Unexpected any. Specify a different type
- `app/types/response/tag.ts:98:15` - Unexpected any. Specify a different type
- `app/types/response/tag.ts:99:15` - Unexpected any. Specify a different type
- `app/types/response/tag.ts:177:10` - Unexpected any. Specify a different type
- `app/types/response/tag.ts:181:15` - Unexpected any. Specify a different type

### 5. Empty Interface Types (@typescript-eslint/no-empty-object-type)
- `app/types/response/admin.ts:88:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/admin.ts:106:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/comment.ts:9:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/file.ts:10:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/follow.ts:27:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/follow.ts:33:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/like.ts:9:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/notification.ts:9:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/reply.ts:10:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/tag.ts:10:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/tag.ts:16:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/user.ts:10:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/user.ts:16:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/user.ts:22:18` - Interface declaring no members is equivalent to its supertype
- `app/types/response/video.ts:10:18` - Interface declaring no members is equivalent to its supertype

### 6. React Hook Dependencies (react-hooks/exhaustive-deps)
- `app/components/pages/video/VideoFeed.tsx:322:6` - Missing dependencies: 'goToNextVideo' and 'goToPrevVideo'
- `app/components/pages/video/VideoFeed.tsx:348:6` - Missing dependencies: 'goToNextVideo' and 'goToPrevVideo'
- `app/hooks/blog/useImageUpload.ts:64:6` - Missing dependency: 'formatFileSize'
- `app/hooks/useForum.ts:438:6` - Missing dependency: 'baseHook'

## Build Process Info
- **Next.js Version:** 15.3.3
- **Environment:** .env detected
- **Compilation Time:** 11.0s (if successful)
- **Build Step:** Linting and checking validity of types

## Recommendations
1. Remove all unused imports and variables
2. Replace `<img>` tags with Next.js `<Image />` component
3. Replace `any` types with specific TypeScript types
4. Fix empty interfaces or remove them if not needed
5. Add missing dependencies to React hooks
6. Use `const` instead of `let` for variables that don't change

## Next Steps
Fix these errors and warnings to ensure a successful production build.