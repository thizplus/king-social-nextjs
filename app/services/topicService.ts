// app/services/topicService.ts
import apiService from './apiService';
import { TOPIC_API } from '@/constants/api';
import type { BackendPaginationParams } from '@/types/common';
import type { CreateTopicRequest, UpdateTopicRequest } from '@/types/request/topic';
import type {
  GetTopicsResponse,
  SearchTopicsResponse,
  GetTopicByIdResponse,
  GetTopicRepliesResponse,
  GetTopicsByForumResponse,
  CreateTopicResponse,
  UpdateTopicResponse,
  DeleteTopicResponse,
  CreateReplyResponse,
} from '@/types/response/topic';

/**
 * Topic Service
 * จัดการการเรียก API ที่เกี่ยวกับ Topic
 */
const topicService = {
  /**
   * ดึงรายการหัวข้อทั้งหมด (Public)
   * GET /api/v1/topics
   * @param params - Backend pagination parameters (offset, limit)
   * @returns Promise<GetTopicsResponse>
   */
  getTopics: async (params?: BackendPaginationParams): Promise<GetTopicsResponse> => {
    return apiService.get<GetTopicsResponse>(TOPIC_API.LIST, params);
  },

  /**
   * ค้นหาหัวข้อ (Public)
   * GET /api/v1/topics/search
   * @param query - Search query
   * @param params - Backend pagination parameters
   * @returns Promise<SearchTopicsResponse>
   */
  searchTopics: async (
    query: string,
    params?: BackendPaginationParams
  ): Promise<SearchTopicsResponse> => {
    return apiService.get<SearchTopicsResponse>(TOPIC_API.SEARCH, {
      q: query,
      ...params,
    });
  },

  /**
   * ดึงข้อมูลหัวข้อตาม ID (Public)
   * GET /api/v1/topics/:id
   * @param id - Topic ID
   * @returns Promise<GetTopicByIdResponse>
   */
  getTopicById: async (id: string): Promise<GetTopicByIdResponse> => {
    return apiService.get<GetTopicByIdResponse>(TOPIC_API.GET_BY_ID(id));
  },

  /**
   * ดึงคำตอบของหัวข้อ (Public)
   * GET /api/v1/topics/:id/replies
   * @param id - Topic ID
   * @param params - Backend pagination parameters
   * @returns Promise<GetTopicRepliesResponse>
   */
  getTopicReplies: async (
    id: string,
    params?: BackendPaginationParams
  ): Promise<GetTopicRepliesResponse> => {
    return apiService.get<GetTopicRepliesResponse>(TOPIC_API.GET_REPLIES(id), params);
  },

  /**
   * ดึงรายการหัวข้อในฟอรัม (Public) - รองรับทั้ง ID และ Slug
   * GET /api/v1/forums/:id/topics
   * @param forumId - Forum ID
   * @param params - Backend pagination parameters
   * @returns Promise<GetTopicsByForumResponse>
   */
  getTopicsByForum: async (
    forumId: string,
    params?: BackendPaginationParams
  ): Promise<GetTopicsByForumResponse> => {
    return apiService.get<GetTopicsByForumResponse>(
      TOPIC_API.GET_BY_FORUM(forumId),
      params
    );
  },

  /**
   * ดึงรายการหัวข้อในฟอรัมตาม Slug (Public) - New endpoint
   * GET /api/v1/forums/slug/:slug/topics
   * @param slug - Forum Slug
   * @param params - Backend pagination parameters
   * @returns Promise<GetTopicsByForumResponse>
   */
  getTopicsByForumSlug: async (
    slug: string,
    params?: BackendPaginationParams
  ): Promise<GetTopicsByForumResponse> => {
    return apiService.get<GetTopicsByForumResponse>(
      TOPIC_API.GET_BY_FORUM_SLUG(slug),
      params
    );
  },

  /**
   * สร้างหัวข้อใหม่ (Protected)
   * POST /api/v1/topics
   * @param data - Topic data
   * @returns Promise<CreateTopicResponse>
   */
  createTopic: async (data: CreateTopicRequest): Promise<CreateTopicResponse> => {
    return apiService.post<CreateTopicResponse>(TOPIC_API.CREATE, data);
  },

  /**
   * แก้ไขหัวข้อ (Protected)
   * PUT /api/v1/topics/:id
   * @param id - Topic ID
   * @param data - Updated topic data
   * @returns Promise<UpdateTopicResponse>
   */
  updateTopic: async (
    id: string,
    data: UpdateTopicRequest
  ): Promise<UpdateTopicResponse> => {
    return apiService.put<UpdateTopicResponse>(TOPIC_API.UPDATE(id), data);
  },

  /**
   * ลบหัวข้อ (Protected)
   * DELETE /api/v1/topics/:id
   * @param id - Topic ID
   * @returns Promise<DeleteTopicResponse>
   */
  deleteTopic: async (id: string): Promise<DeleteTopicResponse> => {
    return apiService.delete<DeleteTopicResponse>(TOPIC_API.DELETE(id));
  },

  /**
   * สร้างคำตอบ (Protected)
   * POST /api/v1/topics/:id/replies
   * @param topicId - Topic ID
   * @param content - Reply content
   * @returns Promise<CreateReplyResponse>
   */
  createReply: async (topicId: string, content: string, parentId?: string): Promise<CreateReplyResponse> => {
    const payload: { content: string; parentId?: string } = {
      content,
    };

    if (parentId) {
      payload.parentId = parentId;
    }

    return apiService.post<CreateReplyResponse>(TOPIC_API.CREATE_REPLY(topicId), payload);
  },
};

export default topicService;