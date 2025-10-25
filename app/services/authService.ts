// app/services/authService.ts
import apiService from './apiService';
import { AUTH_API } from '@/constants/api';
import type { LoginRequest, RegisterRequest } from '@/types/request/auth';
import type { LoginResponse, RegisterResponse } from '@/types/response/auth';
import type { ApiResponse } from '@/types/common';

/**
 * Authentication Service
 * จัดการการเรียก API ที่เกี่ยวกับ Authentication
 */
const authService = {
  /**
   * ลงทะเบียนผู้ใช้ใหม่
   * @param data - ข้อมูลสำหรับการลงทะเบียน
   * @returns Promise<ApiResponse<RegisterResponse>>
   */
  register: async (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    return apiService.post<ApiResponse<RegisterResponse>>(AUTH_API.REGISTER, data);
  },

  /**
   * เข้าสู่ระบบ
   * @param data - ข้อมูล email และ password
   * @returns Promise<ApiResponse<LoginResponse>>
   */
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiService.post<ApiResponse<LoginResponse>>(AUTH_API.LOGIN, data);
  },
};

export default authService;
