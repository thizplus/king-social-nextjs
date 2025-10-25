// src/components/editor/ImageUploadDialog.tsx (Updated)
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Upload, 
  Link, 
  Loader2, 
  ImageIcon, 
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useImageUpload, useDragDrop } from '@/hooks/blog/useImageUpload';
import type { ImageInfo } from '@/types/editor';

interface ImageUploadData {
  url: string;
  alt?: string;
  title?: string;
  imageInfo?: ImageInfo;
}

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageUploaded: (data: ImageUploadData) => void;
}

export const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  open,
  onOpenChange,
  onImageUploaded
}) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  
  // Alt text and title states
  const [altText, setAltText] = useState('');
  const [titleText, setTitleText] = useState('');

  // Use image upload hook
  const {
    isUploading,
    uploadProgress,
    error,
    success,
    uploadFile,
    uploadFromURL,
    validateFile,
    resetState,
    createPreview,
    formatFileSize
  } = useImageUpload({
    onSuccess: (url, info) => {
      // Wait a moment to show success message
      setTimeout(() => {
        onImageUploaded({
          url,
          alt: altText.trim() || undefined,
          title: titleText.trim() || undefined,
          imageInfo: info
        });
        handleClose();
      }, 1000);
    }
  });

  // Use drag and drop hook
  const { isDragOver, dragProps } = useDragDrop(
    (files) => {
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    }
  );

  const resetLocalState = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl('');
    setAltText('');
    setTitleText('');
  }, []);

  const handleClose = useCallback(() => {
    if (!isUploading) {
      resetState();
      resetLocalState();
      onOpenChange(false);
    }
  }, [isUploading, resetState, resetLocalState, onOpenChange]);

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    resetState();

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return; // Error is already set by validateFile
    }

    setSelectedFile(file);

    // Create preview
    try {
      const preview = await createPreview(file);
      setPreviewUrl(preview);
      
      // Auto-generate alt text from filename if empty
      if (!altText) {
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setAltText(fileName.replace(/[_-]/g, ' '));
      }
    } catch (err) {
      console.error('Failed to create preview:', err);
    }
  }, [validateFile, createPreview, resetState, altText]);

  // Handle file input change
  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Handle file upload
  const handleFileUpload = useCallback(async () => {
    if (!selectedFile) {
      return;
    }
    await uploadFile(selectedFile);
  }, [selectedFile, uploadFile]);

  // Handle URL upload
  const handleUrlUpload = useCallback(async () => {
    if (!imageUrl.trim()) {
      return;
    }
    await uploadFromURL(imageUrl.trim());
  }, [imageUrl, uploadFromURL]);

  // Handle URL validation on input
  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);
    
    // Reset error when user starts typing
    if (error && value !== imageUrl) {
      resetState();
    }
  }, [imageUrl, error, resetState]);

  // Auto-generate alt text from URL
  const handleUrlAltGenerate = useCallback(() => {
    if (imageUrl && !altText) {
      try {
        const url = new URL(imageUrl);
        const fileName = url.pathname.split('/').pop()?.split('.').slice(0, -1).join('') || '';
        if (fileName) {
          setAltText(fileName.replace(/[_-]/g, ' '));
        }
      } catch (e) {
        // Invalid URL, ignore
        console.error('Invalid URL:', e);
      }
    }
  }, [imageUrl, altText]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>เพิ่มรูปภาพ</DialogTitle>
          <DialogDescription>
            อัพโหลดรูปภาพจากคอมพิวเตอร์หรือจาก URL พร้อมกำหนดข้อมูลรูปภาพ
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              อัพโหลดไฟล์
            </TabsTrigger>
            <TabsTrigger value="url" disabled={isUploading}>
              <Link className="w-4 h-4 mr-2" />
              จาก URL
            </TabsTrigger>
          </TabsList>

          {/* File Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              {/* Drop Zone */}
              <Card
                className={cn(
                  "border-2 border-dashed transition-colors cursor-pointer hover:border-primary/50",
                  selectedFile ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                  isDragOver && "border-primary bg-primary/10"
                )}
                {...dragProps}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <CardContent className="flex flex-col items-center justify-center py-8">
                  {previewUrl ? (
                    <div className="space-y-4 text-center">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={800}
                        height={192}
                        className="max-w-full max-h-48 rounded-lg shadow-md"
                      />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">{selectedFile?.name}</p>
                        <p>{formatFileSize(selectedFile?.size || 0)}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          resetState();
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        เปลี่ยนรูป
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium">คลิกหรือลากไฟล์มาวางที่นี่</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          รองรับ JPG, PNG, GIF, WebP (สูงสุด 10MB)
                        </p>
                      </div>
                      <Button type="button" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        เลือกไฟล์
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </TabsContent>

          {/* URL Upload Tab */}
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">URL ของรูปภาพ</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  onBlur={handleUrlAltGenerate}
                  disabled={isUploading}
                />
                <p className="text-xs text-muted-foreground">
                  ใส่ URL ที่ชี้ไปยังรูปภาพโดยตรง
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Information Section */}
        <div className="space-y-4 border-t pt-4">
          <div className="space-y-2">
            <Label htmlFor="alt-text">Alt Text (คำอธิบายรูปภาพ) *</Label>
            <Input
              id="alt-text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="อธิบายสิ่งที่อยู่ในรูปภาพ..."
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              สำคัญสำหรับการเข้าถึงและ SEO - อธิบายสิ่งที่เห็นในรูปภาพ
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title-text">Title (คำอธิบายเพิ่มเติม)</Label>
            <Input
              id="title-text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="ข้อมูลเพิ่มเติมที่จะแสดงเมื่อ hover..."
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              แสดงเป็น tooltip เมื่อผู้ใช้เอาเมาส์ไปวางบนรูปภาพ
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">กำลังอัพโหลด... {uploadProgress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            disabled={isUploading}
          >
            ยกเลิก
          </Button>
          <Button 
            onClick={activeTab === 'upload' ? handleFileUpload : handleUrlUpload}
            disabled={
              isUploading || 
              (activeTab === 'upload' && !selectedFile) ||
              (activeTab === 'url' && !imageUrl.trim()) ||
              !altText.trim() // Require alt text
            }
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังอัพโหลด...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                อัพโหลด
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};