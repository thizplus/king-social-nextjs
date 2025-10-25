// types/response/forum.ts

import type { Forum } from '../models/forum';
import type { ApiResponse } from '../common';

/**
 * Single Forum Response
 * Response for GET /forums/:id and GET /forums/slug/:slug
 */
export type GetForumResponse = ApiResponse<Forum>;

/**
 * Forums List Data
 * Data structure for GET /forums/ response
 */
export interface ForumsListData {
  forums: Forum[];
  total: number;
}

/**
 * Forums List Response
 * Response for GET /forums/
 */
export type GetForumsResponse = ApiResponse<ForumsListData>;
