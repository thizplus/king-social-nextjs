// components/layout/DesktopHeader.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {

  MessagesSquare,
  Bell,
  Search,

} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
//import { usePathname } from 'next/navigation'
import PrimaryNav from './PrimaryNav'

interface DesktopHeaderProps {
  onMenuClick?: () => void
}

const DesktopHeader = ({  }: DesktopHeaderProps) => {
  const { user, isAuthenticated } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])


  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 border-b border-border bg-background text-foreground">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-4">
              <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center mr-2 text-white">
                Z
              </div>
              <span className="text-xl font-bold">VOOBIZE</span>
            </Link>

            {/* Primary Navigation */}
            <PrimaryNav />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="ค้นหากระทู้ที่น่าสนใจ..."
                className="w-full py-1.5 pl-10 pr-4 rounded-md"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Right Side: Actions and User */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <ActionButton icon={<Bell className="size-[20px]" />} />

            {/* Messages */}
            <ActionButton icon={<MessagesSquare className="size-[20px]" />} />

            {/* Theme Toggle */}
            <ModeToggle />

            {!isMounted ? (
              // Loading state - แสดง skeleton หรือว่าง
              <div className="flex items-center space-x-2">
                <div className="h-10 w-20 bg-muted rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-muted rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <Link href="/profile" className="flex items-center ml-2">
                <Avatar className="h-10 w-10 border border-border">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.fullName || user.username} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-2 mr-1">
                  <span className="text-sm font-medium">
                    {user?.fullName || user?.username || 'User'}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-10"
                >
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="h-10"
                >
                  <Link href="/register">ลงทะเบียน</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


// Action Button Component
function ActionButton({
  icon,
  onClick,
  className = ""
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-md w-10 h-10 ${className}`}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export default DesktopHeader