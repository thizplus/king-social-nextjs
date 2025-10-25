"use client"

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import DesktopHeader from '@/components/layout/main/DesktopHeader'
import MobileHeader from '@/components/layout/main/MobileHeader'
import { useAuth } from '@/hooks/useAuth'
import ForumFooter from '@/components/layout/main/ForumFooter'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  // สลับสถานะของ Sidebar
  const toggleSidebar = () => {
    console.log('toggleSidebar',isAuthenticated)
    setSidebarOpen(!sidebarOpen)
  }
  


  // สำหรับหน้าแรก แสดงเฉพาะ header
  if (isHomePage) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Desktop Header - ซ่อนบนมือถือด้วย CSS */}
        <div className="hidden md:block">
          <DesktopHeader onMenuClick={toggleSidebar} />
        </div>
        
        {/* Mobile Header - ซ่อนบนหน้าจอขนาดกลางขึ้นไปด้วย CSS */}
        <div className="block md:hidden">
          <MobileHeader />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 pt-0 overflow-hidden md:pt-16">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto ">
            {children}
          </main>
        </div>
        
        <ForumFooter />
      </div>
    )
  }

  // สำหรับหน้าอื่นๆ
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Desktop Header - ซ่อนบนมือถือด้วย CSS */}
      <div className="hidden md:block">
        <DesktopHeader onMenuClick={toggleSidebar} />
      </div>
      
      {/* Mobile Header - ซ่อนบนหน้าจอขนาดกลางขึ้นไปด้วย CSS */}
      <div className="block md:hidden">
        <MobileHeader />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 pt-0 overflow-hidden md:pt-16">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      <ForumFooter />
    </div>
  )
}