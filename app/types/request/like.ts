// types/request/like.ts

/**
 * Like Topic Request
 * Request to like/unlike a topic
 */
export interface LikeTopicRequest {
  topicId: string;
}

/**
 * Like Video Request
 * Request to like/unlike a video
 */
export interface LikeVideoRequest {
  videoId: string;
}
