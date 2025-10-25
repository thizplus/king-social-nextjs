// types/response/topic.ts

import type { Topic } from '../models/topic';
import type { Reply } from '../models/reply';
import type { ApiResponse, PaginationMeta } from '../common';

/**
 * Topics List Data (ตาม Backend Response)
 */
export interface TopicsListData {
  topics: Topic[];
  meta: PaginationMeta;
}

/**
 * Topic Search Data (สันนิษฐานตาม Backend pattern)
 */
export interface TopicSearchData {
  topics: Topic[];
  meta: PaginationMeta;
}

/**
 * Replies List Data
 */
export interface RepliesListData {
  replies: Reply[];
  meta: PaginationMeta;
}

/**
 * Topic Detail Data (with replies)
 */
export interface TopicDetailData {
  topic: Topic;
  replies: Reply[];
}

/**
 * API Response Types (ตรงกับ Backend)
 */
export type GetTopicsResponse = ApiResponse<TopicsListData>;
export type SearchTopicsResponse = ApiResponse<TopicSearchData>;
export type GetTopicByIdResponse = ApiResponse<TopicDetailData>;
export type GetTopicRepliesResponse = ApiResponse<RepliesListData>;
export type GetTopicsByForumResponse = ApiResponse<TopicsListData>;
export type CreateTopicResponse = ApiResponse<Topic>;
export type UpdateTopicResponse = ApiResponse<Topic>;
export type DeleteTopicResponse = ApiResponse<{ success: boolean }>;
export type CreateReplyResponse = ApiResponse<Reply>;
