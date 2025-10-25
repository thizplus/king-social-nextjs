// types/video.ts หรือ types/index.ts

// User interface
export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isVerified?: boolean;
    followerCount?: number;
    followingCount?: number;
  }
  
  // Video interface
  export interface Video {
    id: string;
    url: string;
    title: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    views?: number;
    duration?: number;
    user: User;
    tags: string[];
    createdAt?: string;
    updatedAt?: string;
    thumbnailUrl?: string;
    isLiked?: boolean;
    isFollowing?: boolean;
    isBookmarked?: boolean;
  }

  
  
  // Video player related types
  export interface VideoPlayerState {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    isLoading: boolean;
    hasError: boolean;
    isFullscreen: boolean;
  }
  
  // Video feed related types
  export interface VideoFeedState {
    videos: Video[];
    currentVideoIndex: number;
    loading: boolean;
    hasMore: boolean;
    error?: string;
  }
  
  // API response types
  export interface VideoResponse {
    videos: Video[];
    hasMore: boolean;
    nextCursor?: string;
    total?: number;
  }
  
  export interface VideoApiError {
    message: string;
    code: string;
    status: number;
  }
  
  // Component props types
  export interface VideoPlayerProps {
    video: Video;
    isActive: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    onVideoEnd?: () => void;
    onVideoPlay?: () => void;
    onVideoPause?: () => void;
    onVideoError?: (error: Error) => void;
  }
  
  export interface VideoControlsProps {
    video: Video;
    onLike?: (videoId: string) => void;
    onComment?: (videoId: string) => void;
    onShare?: (videoId: string) => void;
    onBookmark?: (videoId: string) => void;
    onFollow?: (userId: string) => void;
  }
  
  export interface VideoInfoProps {
    video: Video;
    onUserClick?: (userId: string) => void;
    onTagClick?: (tag: string) => void;
  }
  
  // Gesture/Touch related types
  export interface TouchGesture {
    startY: number;
    currentY: number;
    deltaY: number;
    velocity: number;
    timestamp: number;
  }
  
  export interface SwipeDirection {
    UP: 'up';
    DOWN: 'down';
    NONE: 'none';
  }
  
  // Video statistics
  export interface VideoStats {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    watchTime?: number;
    engagement?: number;
  }
  
  // Video metadata
  export interface VideoMetadata {
    width: number;
    height: number;
    duration: number;
    format: string;
    size: number;
    bitrate?: number;
    framerate?: number;
  }
  
  // Comment related types
  export interface Comment {
    id: string;
    content: string;
    user: User;
    createdAt: string;
    likes: number;
    replies?: Comment[];
    isLiked?: boolean;
  }
  
  export interface CommentResponse {
    comments: Comment[];
    hasMore: boolean;
    total: number;
  }
  
  // Pagination types
  export interface PaginationParams {
    limit?: number;
    offset?: number;
    cursor?: string;
  }
  
  // Search types
  export interface SearchFilters {
    tags?: string[];
    duration?: {
      min?: number;
      max?: number;
    };
    dateRange?: {
      start?: string;
      end?: string;
    };
    user?: string;
  }
  
  export interface SearchParams extends PaginationParams {
    query: string;
    filters?: SearchFilters;
    sortBy?: 'relevance' | 'date' | 'views' | 'likes';
  }
  
  // Enum types
  export enum VideoQuality {
    LOW = '360p',
    MEDIUM = '720p',
    HIGH = '1080p',
    HD = '1440p',
    UHD = '2160p'
  }
  
  export enum VideoFormat {
    MP4 = 'mp4',
    WEBM = 'webm',
    AVI = 'avi',
    MOV = 'mov'
  }
  
  export enum PlaybackSpeed {
    SLOW = 0.5,
    NORMAL = 1,
    FAST = 1.25,
    FASTER = 1.5,
    FASTEST = 2
  }