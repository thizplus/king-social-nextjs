"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
//import { useRouter } from 'next/navigation'
import VideoPlayer from '@/components/pages/video/VideoPlayer'
import VideoInfo from '@/components/pages/video/VideoInfo'
import VideoComments from '@/components/pages/video/VideoComments'
import VideoControls from '@/components/pages/video/VideoControls'
import { Video } from '@/types/models/video'

export default function Page() {
  // ใช้ useParams แทน props ใน client component
  const params = useParams()
  const videoId = params.videoId as string
  
  //const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [video, setVideo] = useState<Video | null>(null);
  
  // Mock data for now
  useEffect(() => {
    if (!videoId) return;
    
    // ในกรณีจริง จะมีการเรียก API ตรงนี้
    const mockVideo: Video = {
      id: videoId,
      userId: "user123",
      title: "ตัวอย่างวิดีโอ",
      description: "คำอธิบายวิดีโอสั้นๆ",
      videoUrl: "https://cdn.pixabay.com/vimeo/538770712/preview-140366.mp4?width=640&hash=9e26f6b8fdf5ca18acb8c2517e9ee71f6d1c1ad6",
      thumbnailUrl: "https://i.pravatar.cc/640",
      duration: 120,
      width: 640,
      height: 360,
      fileSize: 1024000,
      viewCount: 1245,
      likeCount: 1245,
      commentCount: 88,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: "user123",
        username: "username123",
        displayName: "User Demo",
        avatar: "https://i.pravatar.cc/300",
        firstName: "User",
        lastName: "Demo"
      }
    }
    
    setVideo(mockVideo)
    setLoading(false)
  }, [videoId])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-muted-foreground">Video not found</p>
      </div>
    )
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 relative">
        <VideoPlayer video={video} isActive={true} />
        
        <div className="absolute right-4 bottom-24 z-10">
          <VideoControls video={video} />
        </div>
        
        <div className="absolute bottom-4 left-4 right-12 z-10">
          <VideoInfo video={video} />
        </div>
      </div>
      
      <div className="h-[40vh] bg-background rounded-t-3xl overflow-hidden">
        <VideoComments videoId={videoId} />
      </div>
    </div>
  )
}