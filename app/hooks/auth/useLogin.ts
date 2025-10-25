// app/hooks/auth/useLogin.ts
'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import type { LoginRequest } from '@/types/request/auth';

/**
 * Login Form Schema
 * Validation schema for login form
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(1, 'กรุณากรอกรหัสผ่าน'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * useLogin Hook
 * Handle login form logic and API calls
 */
const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: loginUser } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      // Prepare data for API
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      // Call login API
      const response = await authService.login(loginData);

      if (response.success && response.data) {
        // Login user in store
        loginUser(response.data.user, response.data.token);

        // Redirect to main app
        router.push('/');
      } else {
        setError(response.message || 'การเข้าสู่ระบบล้มเหลว');
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
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

export default useLogin;