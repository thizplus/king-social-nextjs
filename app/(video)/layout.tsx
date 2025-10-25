"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import VideoHeader from '@/components/layout/video/Header'
import VideoBottomNav from '@/components/layout/video/BottomNav'
import VideoSidebar from '@/components/layout/video/Sidebar'

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  
  // ตรวจสอบว่าอยู่ที่หน้า /video/ หรือไม่ - ง่ายขึ้น
  const isVideoFeedPage = pathname === '/video'
  
  // ซ่อน/แสดง header เมื่อเลื่อนหน้าจอ
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // เลื่อนลง - ซ่อน header
        setShowHeader(false)
      } else {
        // เลื่อนขึ้น - แสดง header
        setShowHeader(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className={`flex bg-black text-white ${
      isVideoFeedPage 
        ? 'h-screen overflow-hidden' 
        : 'min-h-screen'
    }`}>
      {/* Sidebar - แสดงเฉพาะบน Desktop */}
      <div className="hidden md:block">
        <VideoSidebar />
      </div>
      
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col relative">
        {/* Header Component - แสดงเฉพาะบน Mobile */}
        <VideoHeader showHeader={showHeader} />

        {/* Main Content */}
        <main className={`flex-1 w-full ${
          isVideoFeedPage 
            ? 'h-full md:h-full md:pb-0'
            : 'pt-16 md:pt-0 pb-20 md:pb-0'
        }`}>
          <div className={`w-full ${
            isVideoFeedPage 
              ? 'h-full relative'
              : 'min-h-screen'
          }`}>
            {children}
          </div>
        </main>

        {/* Bottom Navigation Component - แสดงเฉพาะบน Mobile */}
        <div className="md:hidden">
          <VideoBottomNav />
        </div>
      </div>
    </div>
  )
}