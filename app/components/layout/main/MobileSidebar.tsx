// components/layout/MobileSidebar.tsx
"use client"

import { useState } from "react"
import Link from 'next/link'
import { 
  Home,
  Search, 
  Bell, 
  MessageSquare, 
  Bookmark, 
  User,
  Settings,
  LogOut,
  Compass,
  Users,
  Star,

  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface MobileSidebarProps {
  children: React.ReactNode
}

export default function MobileSidebar({ children }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  
  // ปิด Sheet เมื่อคลิกที่เมนู
  const handleNavigate = () => {
    setOpen(false)
  }
  
  // ตรวจสอบว่าเมนูไหนที่ active
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px] bg-background text-foreground border-r">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
            <SheetTitle className="text-foreground">
              <Link href="/" className="flex items-center" onClick={handleNavigate}>
                <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center mr-3 text-foreground">
                  <h1 className="font-bold text-xl">Z</h1>
                </div>
                <span className="text-xl font-bold">VOOBIZE</span>
              </Link>
            </SheetTitle>
            <SheetClose>
            <X className="size-[28px]"  />
          </SheetClose>
          </SheetHeader>

        
          
          {/* User Profile */}
          {isAuthenticated && (
            <div className="p-4 border-b">
              <Link href="/profile" className="flex items-center" onClick={handleNavigate}>
                <Avatar className="h-12 w-12 border-2 border-primary mr-3">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.fullName || user.username} />
                  ) : (
                    <AvatarFallback className="bg-primary text-foreground">
                      {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-sm text-muted-foreground">@{user?.username}</p>
                </div>
              </Link>
            </div>
          )}
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav className="space-y-1 px-2">
              <NavItem 
                href="/" 
                icon={<Home size={20} />} 
                label="หน้าหลัก" 
                active={isActive('/')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/explore" 
                icon={<Compass size={20} />} 
                label="สำรวจ" 
                active={isActive('/explore')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/popular" 
                icon={<Star size={20} />} 
                label="ยอดนิยม" 
                active={isActive('/popular')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/search" 
                icon={<Search size={20} />} 
                label="ค้นหา" 
                active={isActive('/search')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/notifications" 
                icon={<Bell size={20} />} 
                label="แจ้งเตือน" 
                active={isActive('/notifications')}
                onClick={handleNavigate}
                badge="12"
              />
              <NavItem 
                href="/messages" 
                icon={<MessageSquare size={20} />} 
                label="ข้อความ" 
                active={isActive('/messages')}
                onClick={handleNavigate}
                badge="5"
              />
              <NavItem 
                href="/bookmarks" 
                icon={<Bookmark size={20} />} 
                label="บุ๊คมาร์ค" 
                active={isActive('/bookmarks')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/friends" 
                icon={<Users size={20} />} 
                label="เพื่อน" 
                active={isActive('/friends')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/profile" 
                icon={<User size={20} />} 
                label="โปรไฟล์" 
                active={isActive('/profile')}
                onClick={handleNavigate}
              />
              <NavItem 
                href="/settings" 
                icon={<Settings size={20} />} 
                label="ตั้งค่า" 
                active={isActive('/settings')}
                onClick={handleNavigate}
              />
            </nav>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t flex items-center justify-end">
            <ModeToggle />
            
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => {
                  setOpen(false)
                  logout()
                }}
              >
                <LogOut size={20} />
              </Button>
            ) : (
              <div className="flex gap-2 items-center">
                {/* Theme Toggle */}
               

                {/* Login Button */}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-foreground hover:bg-secondary"
                  onClick={() => {
                    setOpen(false)
                  }}
                  asChild
                >
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-foreground"
                  onClick={() => {
                    setOpen(false)
                  }}
                  asChild
                >
                  <Link href="/register">ลงทะเบียน</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Navigation Item
function NavItem({ 
  href, 
  icon, 
  label, 
  active = false, 
  badge, 
  onClick 
}: { 
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md ${
        active 
          ? 'bg-secondary text-foreground' 
          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-foreground">
          {badge}
        </span>
      )}
    </Link>
  )
}