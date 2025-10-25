// hooks/blog/useImageUpload.ts
'use client';

import { useState, useCallback } from 'react';
import type { ImageInfo } from '@/types/editor';

interface UseImageUploadOptions {
  onSuccess?: (url: string, info?: ImageInfo) => void;
  onError?: (error: string) => void;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

interface UseImageUploadReturn {
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  success: string | null;
  uploadFile: (file: File) => Promise<void>;
  uploadFromURL: (url: string) => Promise<void>;
  validateFile: (file: File) => { isValid: boolean; error?: string };
  resetState: () => void;
  createPreview: (file: File) => Promise<string>;
  formatFileSize: (bytes: number) => string;
}

export const useImageUpload = (options: UseImageUploadOptions = {}): UseImageUploadReturn => {
  const {
    onSuccess,
    onError,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(null);
    setUploadProgress(0);
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const validateFile = useCallback((file: File) => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      const error = `ประเภทไฟล์ไม่รองรับ กรุณาเลือกไฟล์ภาพ (JPG, PNG, GIF, WebP)`;
      setError(error);
      onError?.(error);
      return { isValid: false, error };
    }

    // Check file size
    if (file.size > maxFileSize) {
      const error = `ไฟล์ใหญ่เกินไป (สูงสุด ${formatFileSize(maxFileSize)})`;
      setError(error);
      onError?.(error);
      return { isValid: false, error };
    }

    return { isValid: true };
  }, [allowedTypes, maxFileSize, onError, formatFileSize]);

  const createPreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to create preview'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }, []);

  const simulateUpload = useCallback((progressCallback: (progress: number) => void) => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          progressCallback(progress);
          clearInterval(interval);
          resolve();
        } else {
          progressCallback(progress);
        }
      }, 200);
    });
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      setSuccess(null);
      setUploadProgress(0);

      // Validate file
      const validation = validateFile(file);
      if (!validation.isValid) {
        return;
      }

      // Simulate upload progress
      await simulateUpload(setUploadProgress);

      // TODO: Replace with actual upload implementation
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // For now, create a mock URL
      const mockUrl = URL.createObjectURL(file);
      const imageInfo: ImageInfo = {
        size: file.size,
        format: file.type,
        url: mockUrl
      };

      setSuccess('อัพโหลดสำเร็จ!');
      onSuccess?.(mockUrl, imageInfo);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัพโหลด';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, simulateUpload, onSuccess, onError]);

  const uploadFromURL = useCallback(async (url: string) => {
    try {
      setIsUploading(true);
      setError(null);
      setSuccess(null);
      setUploadProgress(0);

      // Validate URL
      try {
        new URL(url);
      } catch {
        const errorMessage = 'URL ไม่ถูกต้อง';
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      // Simulate upload progress
      await simulateUpload(setUploadProgress);

      // TODO: Replace with actual URL validation and upload
      // For now, use the URL directly
      const imageInfo: ImageInfo = {
        url: url
      };

      setSuccess('เพิ่มรูปภาพสำเร็จ!');
      onSuccess?.(url, imageInfo);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการเพิ่มรูปภาพ';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [simulateUpload, onSuccess, onError]);

  return {
    isUploading,
    uploadProgress,
    error,
    success,
    uploadFile,
    uploadFromURL,
    validateFile,
    resetState,
    createPreview,
    formatFileSize,
  };
};

interface UseDragDropOptions {
  onDrop?: (files: FileList) => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
}

interface UseDragDropReturn {
  isDragOver: boolean;
  dragProps: {
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
}

export const useDragDrop = (
  onFilesDropped: (files: File[]) => void,
  options: UseDragDropOptions = {}
): UseDragDropReturn => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    options.onDragEnter?.();
  }, [options]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    options.onDragLeave?.();
  }, [options]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length > 0) {
      onFilesDropped(imageFiles);
      options.onDrop?.(e.dataTransfer.files);
    }
  }, [onFilesDropped, options]);

  return {
    isDragOver,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};