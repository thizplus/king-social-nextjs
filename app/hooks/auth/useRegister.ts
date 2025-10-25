// app/hooks/auth/useRegister.ts
'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterRequest } from '@/types/request/auth';

/**
 * Register Form Schema
 * Validation schema for registration form
 */
const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  username: z
    .string()
    .min(3, 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร')
    .max(20, 'ชื่อผู้ใช้ไม่เกิน 20 ตัวอักษร')
    .regex(/^[a-zA-Z0-9_]+$/, 'ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _'),
  firstName: z
    .string()
    .min(1, 'กรุณากรอกชื่อจริง')
    .max(50, 'ชื่อจริงไม่เกิน 50 ตัวอักษร'),
  lastName: z
    .string()
    .min(1, 'กรุณากรอกนามสกุล')
    .max(50, 'นามสกุลไม่เกิน 50 ตัวอักษร'),
  password: z
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, 'รหัสผ่านต้องมีตัวอักษรเล็ก ใหญ่ ตัวเลข และสัญลักษณ์พิเศษ'),
  confirmPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่าน'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * useRegister Hook
 * Handle registration form logic and API calls
 */
const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      // Prepare data for API (exclude confirmPassword)
      const registerData: RegisterRequest = {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      };

      // Call register API
      const response = await authService.register(registerData);

      if (response.success && response.data) {
        // Register user in store (auto login after registration)
        registerUser(response.data.user, response.data.token);

        // Redirect to main app
        router.push('/');
      } else {
        setError(response.message || 'การลงทะเบียนล้มเหลว');
      }
    } catch (err) {
      console.error('Registration error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    isLoading,
    error,
    onSubmit,
  };
};

export default useRegister;