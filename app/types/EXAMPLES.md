# Type Definition Usage Examples

This document provides practical examples of how to use the TypeScript type definitions with various frontend frameworks and libraries.

## Table of Contents
- [Basic API Client](#basic-api-client)
- [React Examples](#react-examples)
- [Vue 3 Examples](#vue-3-examples)
- [Angular Examples](#angular-examples)
- [Axios Integration](#axios-integration)
- [Fetch API Integration](#fetch-api-integration)
- [Form Validation](#form-validation)
- [State Management](#state-management)

---

## Basic API Client

### Generic API Client with Types

```typescript
import type { ApiResponse, PaginatedResponse } from './types';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<TReq, TRes>(endpoint: string, data: TReq): Promise<ApiResponse<TRes>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async put<TReq, TRes>(endpoint: string, data: TReq): Promise<ApiResponse<TRes>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const api = new ApiClient('http://localhost:3000/api');
```

---

## React Examples

### Authentication Hook

```typescript
import { useState } from 'react';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types';
import { api } from './api-client';

export function useAuth() {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<LoginRequest, LoginResponse>('/auth/login', credentials);
      if (response.success) {
        setUser(response.data.user);
        api.setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<RegisterRequest, RegisterResponse>('/auth/register', data);
      if (response.success) {
        setUser(response.data.user);
        api.setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    api.setToken('');
    localStorage.removeItem('token');
  };

  return { user, loading, error, login, register, logout };
}
```

### Video List Component

```typescript
import { useState, useEffect } from 'react';
import type { VideoResponse, VideoQueryParams, VideoListResponse, PaginatedResponse } from './types';
import { api } from './api-client';

export function VideoList() {
  const [videos, setVideos] = useState<VideoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const fetchVideos = async (params: VideoQueryParams = {}) => {
    setLoading(true);
    try {
      const response = await api.get<VideoListResponse>('/videos', params);
      if (response.success) {
        setVideos(response.data.videos);
        setPagination(response.data.meta);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos({ page: 1, limit: 10, sortBy: 'newest' });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <video src={video.videoUrl} poster={video.thumbnailUrl} />
          <div>
            <span>{video.viewCount} views</span>
            <span>{video.likeCount} likes</span>
            <span>{video.commentCount} comments</span>
          </div>
        </div>
      ))}
      {pagination && (
        <div>
          Page {pagination.page} of {pagination.totalPages}
        </div>
      )}
    </div>
  );
}
```

### Forum Component with Topics

```typescript
import { useState, useEffect } from 'react';
import type { ForumResponse, TopicResponse, TopicListResponse, CreateTopicRequest } from './types';
import { api } from './api-client';

interface ForumDetailProps {
  forumId: string;
}

export function ForumDetail({ forumId }: ForumDetailProps) {
  const [forum, setForum] = useState<ForumResponse | null>(null);
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [newTopic, setNewTopic] = useState<CreateTopicRequest>({
    forumId,
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchForum();
    fetchTopics();
  }, [forumId]);

  const fetchForum = async () => {
    const response = await api.get<ForumResponse>(`/forums/${forumId}`);
    if (response.success) {
      setForum(response.data);
    }
  };

  const fetchTopics = async () => {
    const response = await api.get<TopicListResponse>(`/forums/${forumId}/topics`);
    if (response.success) {
      setTopics(response.data.topics);
    }
  };

  const createTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post<CreateTopicRequest, TopicResponse>('/topics', newTopic);
    if (response.success) {
      setTopics([response.data, ...topics]);
      setNewTopic({ forumId, title: '', content: '' });
    }
  };

  return (
    <div>
      {forum && (
        <div>
          <h1>{forum.name}</h1>
          <p>{forum.description}</p>
        </div>
      )}

      <form onSubmit={createTopic}>
        <input
          type="text"
          placeholder="Title"
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newTopic.content}
          onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
        />
        <button type="submit">Create Topic</button>
      </form>

      <div>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h3>{topic.title}</h3>
            <p>{topic.content}</p>
            <span>{topic.replyCount} replies</span>
            <span>{topic.viewCount} views</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Vue 3 Examples

### Composable for Videos

```typescript
// composables/useVideos.ts
import { ref, computed } from 'vue';
import type { VideoResponse, VideoQueryParams, VideoListResponse } from './types';
import { api } from './api-client';

export function useVideos() {
  const videos = ref<VideoResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const fetchVideos = async (params: VideoQueryParams = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get<VideoListResponse>('/videos', {
        ...params,
        page: currentPage.value,
      });
      if (response.success) {
        videos.value = response.data.videos;
        totalPages.value = response.data.meta.totalPages;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch videos';
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchVideos();
    }
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchVideos();
    }
  };

  return {
    videos,
    loading,
    error,
    currentPage,
    totalPages,
    fetchVideos,
    nextPage,
    previousPage,
  };
}
```

### Video List Component (Vue 3)

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useVideos } from './composables/useVideos';

const { videos, loading, error, fetchVideos, nextPage, previousPage, currentPage, totalPages } = useVideos();

onMounted(() => {
  fetchVideos({ sortBy: 'newest', limit: 10 });
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="video in videos" :key="video.id" class="video-card">
        <h3>{{ video.title }}</h3>
        <p>{{ video.description }}</p>
        <video :src="video.videoUrl" :poster="video.thumbnailUrl" controls />
        <div class="stats">
          <span>{{ video.viewCount }} views</span>
          <span>{{ video.likeCount }} likes</span>
          <span>{{ video.commentCount }} comments</span>
        </div>
      </div>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>
```

---

## Angular Examples

### Video Service

```typescript
// services/video.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type {
  VideoResponse,
  VideoListResponse,
  UploadVideoRequest,
  UpdateVideoRequest,
  VideoQueryParams,
  ApiResponse,
} from './types';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVideos(params?: VideoQueryParams): Observable<ApiResponse<VideoListResponse>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return this.http.get<ApiResponse<VideoListResponse>>(`${this.apiUrl}/videos`, { params: httpParams });
  }

  getVideo(id: string): Observable<ApiResponse<VideoResponse>> {
    return this.http.get<ApiResponse<VideoResponse>>(`${this.apiUrl}/videos/${id}`);
  }

  uploadVideo(data: UploadVideoRequest): Observable<ApiResponse<VideoResponse>> {
    return this.http.post<ApiResponse<VideoResponse>>(`${this.apiUrl}/videos`, data);
  }

  updateVideo(id: string, data: UpdateVideoRequest): Observable<ApiResponse<VideoResponse>> {
    return this.http.put<ApiResponse<VideoResponse>>(`${this.apiUrl}/videos/${id}`, data);
  }

  deleteVideo(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/videos/${id}`);
  }
}
```

### Video List Component (Angular)

```typescript
// components/video-list.component.ts
import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import type { VideoResponse, PaginationMeta } from './types';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
})
export class VideoListComponent implements OnInit {
  videos: VideoResponse[] = [];
  loading = false;
  error: string | null = null;
  pagination: PaginationMeta | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(page: number = 1): void {
    this.loading = true;
    this.videoService.getVideos({ page, limit: 10, sortBy: 'newest' }).subscribe({
      next: (response) => {
        if (response.success) {
          this.videos = response.data.videos;
          this.pagination = response.data.meta;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.pagination && this.pagination.hasNext) {
      this.loadVideos(this.pagination.page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination && this.pagination.hasPrevious) {
      this.loadVideos(this.pagination.page - 1);
    }
  }
}
```

---

## Axios Integration

```typescript
import axios, { AxiosInstance } from 'axios';
import type { ApiResponse, PaginatedResponse } from './types';

class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  async post<TReq, TRes>(url: string, data: TReq): Promise<ApiResponse<TRes>> {
    const response = await this.client.post<ApiResponse<TRes>>(url, data);
    return response.data;
  }

  async put<TReq, TRes>(url: string, data: TReq): Promise<ApiResponse<TRes>> {
    const response = await this.client.put<ApiResponse<TRes>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

export const apiService = new ApiService('http://localhost:3000/api');
```

---

## Form Validation

### Zod Integration

```typescript
import { z } from 'zod';
import type { RegisterRequest, CreateTopicRequest, CreateReplyRequest } from './types';

// Register form schema matching RegisterRequest
export const registerSchema = z.object({
  email: z.string().email('Invalid email').max(255),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/, 'Alphanumeric only'),
  password: z.string().min(8).max(72),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Create topic schema matching CreateTopicRequest
export const createTopicSchema = z.object({
  forumId: z.string().uuid(),
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(10000),
  thumbnail: z.string().url().optional(),
});

export type CreateTopicFormData = z.infer<typeof createTopicSchema>;

// Create reply schema matching CreateReplyRequest
export const createReplySchema = z.object({
  content: z.string().min(1).max(5000),
  parentId: z.string().uuid().nullable().optional(),
});

export type CreateReplyFormData = z.infer<typeof createReplySchema>;
```

### React Hook Form Integration

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from './validation';
import type { RegisterRequest, RegisterResponse } from './types';
import { api } from './api-client';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post<RegisterRequest, RegisterResponse>('/auth/register', data);
      if (response.success) {
        console.log('Registration successful!', response.data);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input {...register('username')} placeholder="Username" />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <input {...register('password')} type="password" placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <input {...register('firstName')} placeholder="First Name" />
        {errors.firstName && <span>{errors.firstName.message}</span>}
      </div>

      <div>
        <input {...register('lastName')} placeholder="Last Name" />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Register
      </button>
    </form>
  );
}
```

---

## State Management

### Redux Toolkit Example

```typescript
// store/slices/videoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { VideoResponse, VideoListResponse, VideoQueryParams } from './types';
import { api } from './api-client';

interface VideoState {
  videos: VideoResponse[];
  currentVideo: VideoResponse | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
}

const initialState: VideoState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (params: VideoQueryParams = {}) => {
    const response = await api.get<VideoListResponse>('/videos', params);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch videos');
    }
    return response.data;
  }
);

export const fetchVideo = createAsyncThunk(
  'videos/fetchVideo',
  async (id: string) => {
    const response = await api.get<VideoResponse>(`/videos/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch video');
    }
    return response.data;
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<VideoListResponse>) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch videos';
      })
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideo.fulfilled, (state, action: PayloadAction<VideoResponse>) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch video';
      });
  },
});

export const { clearCurrentVideo } = videoSlice.actions;
export default videoSlice.reducer;
```

---

## Additional Tips

### Type Guards

```typescript
import type { NotificationType } from './types';

function isVideoNotification(type: NotificationType): boolean {
  return type === 'video_like' || type === 'video_comment';
}

function isTopicNotification(type: NotificationType): boolean {
  return type === 'topic_reply' || type === 'topic_like';
}
```

### Utility Functions

```typescript
import type { User, UserSummary } from './types';

export function toUserSummary(user: User): UserSummary {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
```

---

These examples should cover most common use cases for integrating the type definitions into your frontend application!
