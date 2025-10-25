// app/services/forumService.ts
import apiService from './apiService';
import { FORUM_API } from '@/constants/api';
import type { GetForumsResponse, GetForumResponse } from '@/types/response/forum';

/**
 * Forum Service
 * จัดการการเรียก API ที่เกี่ยวกับ Forum (Public endpoints)
 */
const forumService = {
  /**
   * ดึงรายการฟอรัมทั้งหมดที่เปิดใช้งาน
   * GET /api/v1/forums
   * @returns Promise<GetForumsResponse>
   */
  getActiveForums: async (): Promise<GetForumsResponse> => {
    return apiService.get<GetForumsResponse>(FORUM_API.GET_ACTIVE);
  },

  /**
   * ดึงข้อมูลฟอรัมตาม ID
   * GET /api/v1/forums/:id
   * @param id - Forum ID
   * @returns Promise<GetForumResponse>
   */
  getForumById: async (id: string): Promise<GetForumResponse> => {
    return apiService.get<GetForumResponse>(FORUM_API.GET_BY_ID(id));
  },

  /**
   * ดึงข้อมูลฟอรัมตาม Slug
   * GET /api/v1/forums/slug/:slug
   * @param slug - Forum Slug
   * @returns Promise<GetForumResponse>
   */
  getForumBySlug: async (slug: string): Promise<GetForumResponse> => {
    return apiService.get<GetForumResponse>(FORUM_API.GET_BY_SLUG(slug));
  },
};

export default forumService;