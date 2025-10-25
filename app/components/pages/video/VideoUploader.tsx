"use client";

import { useState, useRef } from "react";
import { Upload, X, Film, Check, Music, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function VideoUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // เลือกไฟล์วิดีโอ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      
      // สร้าง preview
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      
      // คืนค่าทรัพยากรเมื่อไม่ได้ใช้แล้ว
      return () => URL.revokeObjectURL(url);
    }
  };
  
  // เปิด file dialog
  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };
  
  // ล้างการเลือกไฟล์
  const handleClearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // จำลองการอัปโหลด
  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // จำลองความคืบหน้าการอัปโหลด
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadComplete(true);
            setUploading(false);
          }, 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };
  
  // เริ่มใหม่หลังจากอัปโหลดเสร็จ
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setDescription("");
    setTags("");
    setUploadComplete(false);
    setUploadProgress(0);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-6">อัปโหลดวิดีโอ</h1>
      
      {uploadComplete ? (
        <div className="text-center py-8">
          <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Check size={32} className="text-primary" />
          </div>
          <h2 className="text-xl font-medium mb-2">อัปโหลดสำเร็จ!</h2>
          <p className="text-muted-foreground mb-6">วิดีโอของคุณถูกอัปโหลดเรียบร้อยแล้ว</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleReset}>อัปโหลดวิดีโอใหม่</Button>
            <Button>ดูวิดีโอของฉัน</Button>
          </div>
        </div>
      ) : (
        <>
          {/* ส่วนเลือกไฟล์ */}
          {!file ? (
            <div
              className="border-2 border-dashed rounded-lg p-8 mb-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={handleSelectClick}
            >
              <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload size={28} className="text-primary" />
              </div>
              <h3 className="font-medium mb-2">เลือกหรือลากไฟล์วิดีโอมาที่นี่</h3>
              <p className="text-sm text-muted-foreground mb-4">รองรับไฟล์ MP4, MOV, AVI ไม่เกิน 100MB</p>
              <Button size="sm">เลือกไฟล์</Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="mb-6">
              {/* ตัวอย่างวิดีโอ */}
              <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden mb-4">
                {preview && (
                  <video
                    src={preview}
                    className="w-full h-full object-contain"
                    controls
                  />
                )}
                <button
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                  onClick={handleClearFile}
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* ข้อมูลไฟล์ */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Film size={20} />
                <div className="flex-1 truncate">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={handleClearFile}
                >
                  ลบ
                </Button>
              </div>
            </div>
          )}
          
          {/* ฟอร์มข้อมูลวิดีโอ */}
          {file && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">ชื่อวิดีโอ</Label>
                <Input
                  id="title"
                  placeholder="ใส่ชื่อวิดีโอของคุณ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">คำอธิบาย</Label>
                <Textarea
                  id="description"
                  placeholder="อธิบายเกี่ยวกับวิดีโอของคุณ"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-muted-foreground" />
                  <Label htmlFor="tags">แท็ก</Label>
                </div>
                <Input
                  id="tags"
                  placeholder="แท็กคั่นด้วยเครื่องหมายจุลภาค (เช่น vlog, ท่องเที่ยว, อาหาร)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-muted-foreground" />
                  <Label>เพลงประกอบ</Label>
                </div>
                <div className="border rounded-lg p-3 bg-muted/50">
                  <p className="text-sm font-medium">ใช้เสียงต้นฉบับ</p>
                  <p className="text-xs text-muted-foreground">เสียงจากวิดีโอของคุณ</p>
                </div>
              </div>
              
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">กำลังอัปโหลด...</span>
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" disabled={uploading} onClick={handleClearFile}>
                  ยกเลิก
                </Button>
                <Button disabled={uploading || !title} onClick={handleUpload}>
                  {uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}