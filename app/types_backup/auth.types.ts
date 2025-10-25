// types/auth.types.ts

/**
 * ข้อมูลผู้ใช้ที่เก็บใน auth store
 */
export interface User {
    id: string;
    username: string;
    email: string;
    display_name: string;
    avatar?: string;
    role: 'user' | 'admin' | 'moderator';
    created_at?: string;
    updated_at?: string;
  }
  
  /**
   * ข้อมูลสำหรับการ login
   */
  export interface LoginRequest {
    username: string;
    password: string;
    remember?: boolean;
  }
  
  /**
   * ข้อมูลสำหรับการลงทะเบียน
   */
  export interface RegisterRequest {
    username: string;
    email: string;
    display_name: string;
    password: string;
    confirmPassword?: string; // ไม่ส่งไปยัง API แต่ใช้ตรวจสอบใน client
  }
  
  /**
   * ข้อมูลที่ได้รับจาก API เมื่อ login หรือ register สำเร็จ
   */
  export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
  }
  
  /**
   * สถานะของ auth store
   */
  export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken?: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  /**
   * ข้อมูลสำหรับการขอรีเซ็ตรหัสผ่าน
   */
  export interface ForgotPasswordRequest {
    email: string;
  }
  
  /**
   * ข้อมูลสำหรับการรีเซ็ตรหัสผ่าน
   */
  export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
  }
  
  /**
   * ข้อมูลสำหรับการเปลี่ยนรหัสผ่าน
   */
  export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  /**
   * ข้อมูลสำหรับการอัปเดตโปรไฟล์
   */
  export interface UpdateProfileRequest {
    display_name?: string;
    email?: string;
    avatar?: File | null;
    bio?: string;
  }
  
  /**
   * ผลลัพธ์จากการเรียกใช้ฟังก์ชันการยืนยันตัวตน
   */
  export interface AuthResult {
    success: boolean;
    message?: string;
    data?: unknown;
  }
  
  /**
   * Token ที่ถอดรหัสแล้ว
   */
  export interface DecodedToken {
    sub: string; // user id
    username: string;
    role: string;
    exp: number; // expiration timestamp
    iat: number; // issued at timestamp
  }