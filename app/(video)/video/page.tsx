"use client"

import { useEffect } from 'react'
import VideoFeed from '@/components/pages/video/VideoFeed'

export default function Page() {
  // ปรับ body style เพื่อให้เหมาะสมกับหน้า video เต็มจอ
  useEffect(() => {
    // ตั้งค่า style เมื่อ component mount
    document.body.style.overflow = 'hidden'
    
    // คืนค่า style เมื่อ component unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <VideoFeed />
  )
}