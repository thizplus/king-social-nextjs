"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 

  MessageCircle, 
  User 
} from 'lucide-react'

export default function VideoBottomNav() {
  const pathname = usePathname()
  
  // ตรวจสอบว่าหน้าไหนกำลัง active
  const isActive = (path: string) => pathname === path
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 bg-black/80 backdrop-blur-md border-t border-white/10 z-10 md:hidden">
      <Link href="/video" className="flex flex-col items-center">
        <Home size={24} className={`mb-1 ${isActive('/video') ? 'text-primary' : 'text-white'}`} />
        <span className="text-xs">หน้าแรก</span>
      </Link>
      
      <Link href="/video/explore" className="flex flex-col items-center">
        <Search size={24} className={`mb-1 ${isActive('/video/explore') ? 'text-primary' : 'text-white'}`} />
        <span className="text-xs">ค้นหา</span>
      </Link>
      
      <Link href="/video/upload" className="flex flex-col items-center">
        <div className="bg-primary rounded-md w-10 h-10 flex items-center justify-center text-white mb-1">+</div>
        <span className="text-xs">สร้าง</span>
      </Link>
      
      <Link href="/video/messages" className="flex flex-col items-center">
        <MessageCircle 
          size={24} 
          className={`mb-1 ${isActive('/video/messages') ? 'text-primary' : 'text-white'}`} 
        />
        <span className="text-xs">กล่อง</span>
      </Link>
      
      <Link href="/profile" className="flex flex-col items-center">
        <User 
          size={24} 
          className={`mb-1 ${isActive('/profile') ? 'text-primary' : 'text-white'}`} 
        />
        <span className="text-xs">โปรไฟล์</span>
      </Link>
    </nav>
  )
}