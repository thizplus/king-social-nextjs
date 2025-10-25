// app/(main)/topic/create/page.tsx
"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, Upload, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import TipTapEditor from '@/components/common/editor/TipTapEditor';
import { useForum } from '@/hooks/useForum';
import { useTag } from '@/hooks/useTag';
import { useTopic } from '@/hooks/useTopic';
import type { Forum } from '@/types/models/forum';
// import type { Tag } from '@/types/models/tag';
// import type { CreateTopicRequest } from '@/types/request/topic';

interface CreateTopicForm {
  forumId: string;
  title: string;
  content: string;
  thumbnail?: string;
  tagIds: string[];
}

interface FormErrors {
  forumId?: string;
  title?: string;
  content?: string;
  thumbnail?: string;
}

export default function CreateTopicPage() {
  const router = useRouter();
  const { fetchActiveForums, isLoading: forumsLoading, error: forumsError } = useForum();
  const { tags, loading: tagsLoading, error: tagsError } = useTag();
  const { createTopic, isLoading: isCreating } = useTopic();

  const [forums, setForums] = useState<Forum[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const [formData, setFormData] = useState<CreateTopicForm>({
    forumId: '',
    title: '',
    content: '',
    thumbnail: '',
    tagIds: []
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Load forums and tags on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load forums
        const forumsResult = await fetchActiveForums();
        if (forumsResult.success && forumsResult.forums) {
          setForums(forumsResult.forums);
        }

        // Load tags (already auto-loaded by useTag hook)
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [fetchActiveForums]);

  // Validation
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    if (!formData.forumId) {
      errors.forumId = 'กรุณาเลือกหมวดหมู่';
    }

    if (!formData.title || formData.title.length < 5) {
      errors.title = 'หัวข้อต้องมีอย่างน้อย 5 ตัวอักษร';
    } else if (formData.title.length > 200) {
      errors.title = 'หัวข้อต้องไม่เกิน 200 ตัวอักษร';
    }

    if (!formData.content || formData.content.length < 10) {
      errors.content = 'เนื้อหาต้องมีอย่างน้อย 10 ตัวอักษร';
    } else if (formData.content.length > 10000) {
      errors.content = 'เนื้อหาต้องไม่เกิน 10,000 ตัวอักษร';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Handle input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle content change from TipTap editor
  const handleContentChange = useCallback((content: string) => {
    setFormData(prev => ({ ...prev, content }));
  }, []);

  // Handle forum selection
  const handleForumChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, forumId: value }));
  }, []);

  // Handle tag selection
  const handleTagToggle = useCallback((tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter(id => id !== tagId)
        : [...prev.tagIds, tagId]
    }));
  }, []);

  // Handle thumbnail upload
  const handleThumbnailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  }, []);

  // Remove thumbnail
  const removeThumbnail = useCallback(() => {
    setThumbnailFile(null);
    setThumbnailPreview('');
    setFormData(prev => ({ ...prev, thumbnail: '' }));
  }, []);

  // Submit form
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Step 1: Upload thumbnail if exists
      const thumbnailUrl = '';
      if (thumbnailFile) {
        // TODO: Implement file upload
        // const uploadedUrl = await uploadThumbnail(thumbnailFile);
        // thumbnailUrl = uploadedUrl;
        console.log('Would upload thumbnail:', thumbnailFile);
      }

      // Step 2: Create topic
      const topicData = {
        ...formData,
        thumbnail: thumbnailUrl
      };

      console.log('Creating topic:', topicData);

      // Call real API
      const result = await createTopic({
        forumId: topicData.forumId,
        title: topicData.title,
        content: topicData.content,
        thumbnail: topicData.thumbnail
        // tagIds: topicData.tagIds // Remove if not supported by API
      });

      if (result.success && result.topic) {
        console.log('Topic created successfully!', result.topic);
        // Redirect to topic detail page
        router.push(`/topic/${result.topic.id}`);
      } else {
        console.error('Failed to create topic:', result.error);
        // You can add error handling UI here
      }

    } catch (error) {
      console.error('Error creating topic:', error);
      // You can add error handling UI here
    }
  }, [formData, thumbnailFile, validateForm, createTopic, router]);

  // Cancel and go back
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb และ Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับ
          </Link>
          <div className="text-sm text-muted-foreground">
            <span>หน้าแรก</span> / <span className="text-foreground">สร้างกระทู้ใหม่</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            สร้างกระทู้ใหม่
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            แบ่งปันความคิดเห็นและประสบการณ์ของคุณกับชุมชน เขียนเนื้อหาที่น่าสนใจและมีประโยชน์
          </p>
        </div>

        {/* Error Loading Data */}
        {(forumsError || tagsError) && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">เกิดข้อผิดพลาดในการโหลดข้อมูล</span>
            </div>
            {forumsError && <p className="text-sm text-muted-foreground mt-1">Forums: {forumsError}</p>}
            {tagsError && <p className="text-sm text-muted-foreground mt-1">Tags: {tagsError}</p>}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <Card>
                  <CardHeader>
                    <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">หัวข้อกระทู้ *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="กรอกหัวข้อกระทู้..."
                        className={cn(formErrors.title && "border-destructive")}
                        disabled={isCreating}
                      />
                      {formErrors.title && (
                        <p className="text-sm text-destructive mt-1">{formErrors.title}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="content">เนื้อหา *</Label>
                      <div className={cn("border rounded-lg overflow-hidden", formErrors.content && "border-destructive")}>
                        <TipTapEditor
                          value={formData.content}
                          onChange={handleContentChange}
                          readOnly={isCreating}
                          placeholder="เขียนเนื้อหากระทู้ของคุณ..."
                          className="min-h-[400px]"
                        />
                      </div>
                      {formErrors.content && (
                        <p className="text-sm text-destructive mt-1">{formErrors.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Thumbnail */}
                <Card>
                  <CardHeader>
                    <CardTitle>รูปภาพประกอบ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {thumbnailPreview ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            width={400}
                            height={192}
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeThumbnail}
                            className="absolute top-2 right-2"
                            disabled={isCreating}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="thumbnail" className="cursor-pointer">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              คลิกเพื่อเลือกรูปภาพประกอบ
                            </p>
                          </div>
                        </label>
                        <input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                          className="hidden"
                          disabled={isCreating}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Forum Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    หมวดหมู่ *
                    {forumsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={formData.forumId}
                    onValueChange={handleForumChange}
                    disabled={isCreating || forumsLoading}
                  >
                    <SelectTrigger className={cn(formErrors.forumId && "border-destructive")}>
                      <SelectValue placeholder={forumsLoading ? "กำลังโหลด..." : "เลือกหมวดหมู่"} />
                    </SelectTrigger>
                    <SelectContent>
                      {forums.map((forum) => (
                        <SelectItem key={forum.id} value={forum.id}>
                          {forum.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.forumId && (
                    <p className="text-sm text-destructive mt-1">{formErrors.forumId}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    เลือกหมวดหมู่ที่เหมาะสมกับเนื้อหาของคุณ
                  </p>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    แท็ก
                    {tagsLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {tagsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">กำลังโหลดแท็ก...</span>
                    </div>
                  ) : tags && tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {tags
                        .filter(tag => tag.isActive)
                        .slice(0, 20) // แสดงแค่ 20 แท็กแรก
                        .map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => handleTagToggle(tag.id)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                              formData.tagIds.includes(tag.id)
                                ? "bg-primary text-foreground border-primary shadow-sm"
                                : "bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground/50"
                            )}
                            disabled={isCreating}
                            title={tag.description || tag.name}
                          >
                            #{tag.name}
                            {tag.usageCount && tag.usageCount > 0 && (
                              <span className="ml-1 text-xs opacity-70">
                                {tag.usageCount}
                              </span>
                            )}
                          </button>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>ไม่พบแท็กที่ใช้งานได้</p>
                    </div>
                  )}

                  {formData.tagIds.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">
                        แท็กที่เลือก ({formData.tagIds.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {formData.tagIds.map((tagId) => {
                          const tag = tags.find(t => t.id === tagId);
                          return tag ? (
                            <span key={tagId} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              #{tag.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-3">
                    เลือกแท็กที่เกี่ยวข้องกับเนื้อหาของคุณ (ไม่จำเป็น)
                  </p>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">💡 เคล็ดลับในการสร้างกระทู้</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ใช้หัวข้อที่ชัดเจนและน่าสนใจ</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>เขียนเนื้อหาที่มีประโยชน์และครบถ้วน</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>เลือกหมวดหมู่ที่เหมาะสมกับเนื้อหา</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>เพิ่มแท็กที่เกี่ยวข้องเพื่อให้ค้นหาได้ง่าย</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ใช้รูปภาพประกอบเพื่อเพิ่มความน่าสนใจ</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isCreating}
              className="w-full sm:w-auto min-w-[120px]"
            >
              <X className="h-4 w-4 mr-2" />
              ยกเลิก
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isCreating || forumsLoading || tagsLoading}
              className="w-full text-white sm:w-auto min-w-[200px]"
              size="lg"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังสร้างกระทู้...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  สร้างกระทู้
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}